import { Storage } from "@google-cloud/storage";
import fs from "fs";
import User from "../models/User.js";

// Funzione per gestire il caricamento dell'immagine
export const handleProfileImageUpload = async (req, res) => {
  try {
    // Decodifica la chiave Base64 per Google Cloud Storage
    const decodedKey = Buffer.from(process.env.GOOGLE_CLOUD_KEY, "base64").toString("utf-8");
    const tempKeyPath = "/tmp/google-cloud-key.json";
    fs.writeFileSync(tempKeyPath, decodedKey);

    // Configura Google Cloud Storage
    const storage = new Storage({ keyFilename: tempKeyPath });
    const bucket = storage.bucket("5-cardgame-bucket");

    const file = req.file;
    const userEmail = req.body.email;

    if (!file) {
      return res.status(400).json({ message: "Nessun file caricato." });
    }

    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({
        message: "Tipo di file non supportato. Carica solo immagini JPEG o PNG.",
      });
    }

    const fileName = `${userEmail}-${Date.now()}.jpg`;

    const blob = bucket.file(fileName);
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
    });

    blobStream.on("error", (err) => {
      console.error("Errore durante il caricamento:", err);
      res.status(500).json({
        message: "Errore durante il caricamento dell'immagine",
        error: err,
      });
    });

    blobStream.on("finish", async () => {
      const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

      const updatedUser = await User.findOneAndUpdate(
        { email: userEmail },
        { profileImage: imageUrl },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "Utente non trovato" });
      }

      res.status(200).json({
        message: "Immagine caricata con successo",
        imageUrl,
      });
    });

    blobStream.end(file.buffer);

  } catch (error) {
    console.error("Errore generale durante il caricamento:", error);
    res.status(500).json({
      message: "Errore durante il caricamento dell'immagine",
      error,
    });
  }
};
