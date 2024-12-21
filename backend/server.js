import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import User from "./models/User.js";
import dotenv from "dotenv";
import multer from "multer";
import { Storage } from "@google-cloud/storage";
import fs from "fs";
import emailjs from "emailjs-com";

dotenv.config();

// Decodifica chiave Base64
const decodedKey = Buffer.from(process.env.GOOGLE_CLOUD_KEY, "base64").toString(
	"utf-8"
);
const tempKeyPath = "/tmp/google-cloud-key.json";
fs.writeFileSync(tempKeyPath, decodedKey);

// Connessione a MongoDB
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log("Connessione al database riuscita"))
	.catch((err) => console.error("Connessione al database fallita", err));

// Configurazione Google Cloud Storage
const storage = new Storage({ keyFilename: tempKeyPath });
const bucket = storage.bucket("5-cardgame-bucket");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
	cors({
		origin: ["http://localhost:5173", "https://alessioberruto.github.io"],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);
app.use(bodyParser.json());

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

// Registrazione
app.post("/api/register", async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "Utente già esistente" });
		}

		const defaultAchievements = [
			{
				id: 1,
				text: "Benvenuto in 5 - The Card Game : effettua la Registrazione al sito",
				unlocked: true,
			},
			{ id: 2, text: "Prima volta : Gioca una partita", unlocked: false },
			{
				id: 3,
				text: "Che soddisfazione! : Vinci una partita",
				unlocked: false,
			},
			{
				id: 4,
				text: "Sei più forte tu : Ottieni una sconfitta",
				unlocked: false,
			},
			{ id: 5, text: "Niente da fare : Ottieni un pareggio", unlocked: false },
			{ id: 6, text: "Dammi il 5! : Vinci 5 partite", unlocked: false },
			{
				id: 7,
				text: "Che combo : Attacca 5 carte in un turno",
				unlocked: false,
			},
			{ id: 8, text: "5x5 = 25 : Vinci 25 partite", unlocked: false },
			{
				id: 9,
				text: "Infermabile : Attacca 10 carte in un turno",
				unlocked: false,
			},
			{ id: 10, text: "Campione di 5 : Vinci 50 partite", unlocked: false },
		];

		const newUser = new User({
			name,
			email,
			password,
			profileImage: null,
			achievements: defaultAchievements,
			isSubscribedToNewsletter: false,
		});
		await newUser.save();

		res.status(201).json({
			message: "Utente registrato con successo",
			user: {
				id: newUser._id,
				name,
				email,
				password,
				profileImage: newUser.profileImage,
				achievements: newUser.achievements,
			},
		});
	} catch (error) {
		res.status(500).json({ message: "Errore nel server", error });
	}
});

// Login
app.post("/api/login", async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user || user.password !== password) {
			return res.status(400).json({ message: "Email o password errati" });
		}

		res.status(200).json({
			message: "Login avvenuto con successo",
			user: {
				name: user.name,
				email,
				password,
				profileImage: user.profileImage || null,
				achievements: user.achievements,
			},
		});
	} catch (error) {
		res.status(500).json({ message: "Errore nel server", error });
	}
});

// Iscrizione alla newsletter
app.post("/api/subscribe-newsletter", async (req, res) => {
	const { email } = req.body;

	if (!email) {
		return res.status(400).json({ message: "Email mancante" });
	}

	console.log("Ricevuto email:", email);

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ message: "Utente non trovato" });
		}

		if (user.isSubscribedToNewsletter) {
			return res
				.status(400)
				.json({ message: "Utente già iscritto alla newsletter" });
		}

		user.isSubscribedToNewsletter = true;
		await user.save();

		const emailParams = {
			user_name: user.name,
			user_email: email,
		};

		emailjs
			.send(
				"contact_service",
				"newsletter_template",
				emailParams,
				"bMOpUWBSnYE6ynS4K"
			)
			.then(
				(response) => {
					console.log("Email inviata con successo:", response);
				},
				(error) => {
					console.error("Errore nell'invio dell'email:", error);
				}
			);

		res
			.status(200)
			.json({ message: "Iscrizione alla newsletter avvenuta con successo" });
	} catch (error) {
		console.error("Errore durante l'iscrizione alla newsletter:", error);
		res
			.status(500)
			.json({ message: "Errore durante l'iscrizione alla newsletter", error });
	}
});

// Caricamento immagine profilo
app.post(
	"/api/upload-profile-image",
	upload.single("image"),
	async (req, res) => {
		try {
			const file = req.file;
			const userEmail = req.body.email;

			if (!file) {
				return res.status(400).json({ message: "Nessun file caricato." });
			}

			const allowedTypes = ["image/jpeg", "image/png"];
			if (!allowedTypes.includes(file.mimetype)) {
				return res.status(400).json({
					message:
						"Tipo di file non supportato. Carica solo immagini JPEG o PNG.",
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
	}
);

// Aggiornamento dati utente
app.put("/api/user", async (req, res) => {
	const { currentEmail, email, name, password } = req.body;

	try {
		const user = await User.findOneAndUpdate(
			{ email: currentEmail },
			{ email, name, password },
			{ new: true }
		);

		if (!user) {
			return res.status(404).json({ message: "Utente non trovato" });
		}

		res.status(200).json({
			message: "Dati aggiornati con successo",
			user: { name: user.name, email: user.email, password: user.password },
		});
	} catch (error) {
		res
			.status(500)
			.json({ message: "Errore durante l'aggiornamento dei dati", error });
	}
});

// Logout
app.post("/api/logout", (req, res) => {
	res.status(200).json({ message: "Logout avvenuto con successo" });
});

// Avvio del server
app.listen(PORT, () => {
	console.log(
		`Server in esecuzione su http://localhost:${PORT} o su https://alessioberruto.github.io`
	);
});
