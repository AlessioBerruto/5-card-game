import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import User from "./models/User.js";
import dotenv from "dotenv";
import multer from "multer"; 
import { Storage } from '@google-cloud/storage'; 

dotenv.config();

// Configurazione della connessione a MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connessione al database riuscita"))
  .catch((err) => console.error("Connessione al database fallita", err));

// Configurazione Google Cloud Storage
const storage = new Storage({
  keyFilename: './config/google-cloud-key.json' 
});
const bucket = storage.bucket("5-cardgame-bucket");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: ["http://localhost:5173", "https://alessioberruto.github.io"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(bodyParser.json());

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

// Registrazione
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Utente già esistente' });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ 
            message: 'Utente registrato con successo', 
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                password: password
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Errore nel server', error });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Utente non trovato' });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: 'Password errata' });
        }

        res.status(200).json({
            message: 'Login avvenuto con successo',
            user: {
                name: user.name,
                email: user.email,
                password: password
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Errore nel server', error });
    }
});

// Caricamento immagine profilo
app.post('/api/upload-profile-image', upload.single('image'), async (req, res) => {
    try {
        const file = req.file;
        const userEmail = req.body.email;
        const fileName = `${userEmail}-${Date.now()}.jpg`;
        const blob = bucket.file(fileName);
        const blobStream = blob.createWriteStream({
            resumable: false,
            contentType: file.mimetype,
        });

        blobStream.on('error', (err) => {
            res.status(500).json({ message: 'Errore durante il caricamento dell\'immagine', error: err });
        });

        blobStream.on('finish', async () => {
            const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
            const user = await User.findOneAndUpdate({ email: userEmail }, { profileImage: imageUrl });

            res.status(200).json({ message: 'Immagine caricata con successo', imageUrl });
        });

        blobStream.end(file.buffer);
    } catch (error) {
        res.status(500).json({ message: 'Errore durante il caricamento dell\'immagine', error });
    }
});

// Aggiornamento email utente e immagine profilo
app.put('/api/user', async (req, res) => {
    try {
        const userEmail = req.body.email;
        const user = await User.findOneAndUpdate({ email: req.user.email }, { email: userEmail });

        if (user.profileImage) {
            const fileName = `${userEmail}-${Date.now()}.jpg`;
            const blob = bucket.file(fileName);
            const blobStream = blob.createWriteStream({
                resumable: false,
                contentType: 'image/jpeg',
            });

            blobStream.on('error', (err) => {
                res.status(500).json({ message: 'Errore durante l\'aggiornamento dell\'immagine', error: err });
            });

            blobStream.on('finish', async () => {
                const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
                user.profileImage = imageUrl;
                await user.save();
            });

            blobStream.end(user.profileImage.buffer);
        }

        res.status(200).json({ message: 'Mail aggiornata con successo' });
    } catch (error) {
        res.status(500).json({ message: 'Errore durante l\'aggiornamento della mail', error });
    }
});

// Logout
app.post('/api/logout', async (req, res) => {
    res.status(200).json({ message: 'Logout avvenuto con successo' });
});

// Avvio del server
app.listen(PORT, () => {
    console.log(`Server in esecuzione su http://localhost:${PORT} o su "https://alessioberruto.github.io"`);
});