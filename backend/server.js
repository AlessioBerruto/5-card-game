import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser"; 
import User from "./models/User.js"; 
import dotenv from "dotenv";


dotenv.config();
console.log(process.env.MONGODB_URI);


mongoose.
connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log("Connessione al database riuscita"))
	.catch((err) => console.error("Connessione al database fallita", err));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json()); 

// Registrazione utente
app.post("/api/register", async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "Utente già esistente" });
		}

		const newUser = new User({ name, email, password });
		await newUser.save();

		res
			.status(201)
			.json({ message: "Utente registrato con successo", user: newUser });
	} catch (error) {
		res.status(500).json({ message: "Errore nel server", error });
	}
});

// Login utente
app.post("/api/login", async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user || user.password !== password) {
			return res.status(400).json({ message: "Credenziali errate" });
		}

		res.status(200).json({ message: "Login avvenuto con successo", user });
	} catch (error) {
		res.status(500).json({ message: "Errore nel server", error });
	}
});

// Modifica utente
app.put("/api/user/:id", async (req, res) => {
	const { id } = req.params;
	const { name, email, password } = req.body;

	try {
		const updatedUser = await User.findByIdAndUpdate(
			id,
			{ name, email, password },
			{ new: true }
		);

		if (!updatedUser) {
			return res.status(404).json({ message: "Utente non trovato" });
		}

		res
			.status(200)
			.json({ message: "Utente aggiornato con successo", user: updatedUser });
	} catch (error) {
		res.status(500).json({ message: "Errore nel server", error });
	}
});

// Cancellazione utente
app.delete("/api/user/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const deletedUser = await User.findByIdAndDelete(id);

		if (!deletedUser) {
			return res.status(404).json({ message: "Utente non trovato" });
		}

		res.status(200).json({ message: "Utente cancellato con successo" });
	} catch (error) {
		res.status(500).json({ message: "Errore nel server", error });
	}
});

// Avvio del server
app.listen(PORT, () => {
	console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
