import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser"; 
import User from "./models/User.js"; 
import dotenv from "dotenv";

dotenv.config();

mongoose.
connect(process.env.MONGODB_URI)
	.then(() => console.log("Connessione al database riuscita"))
	.catch((err) => console.error("Connessione al database fallita", err));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
	origin: "http://localhost:5173", 
	methods: ["GET", "POST", "PUT", "DELETE"],
	credentials: true
  }));
app.use(bodyParser.json());


// Rotta per la registrazione
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Utente già esistente' });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ message: 'Utente registrato con successo', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Errore nel server', error });
    }
});

// Rotta per il login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Utente non trovato' });
        }

        // Verifica della password usando il metodo definito nel modello
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Password errata' });
        }

        res.status(200).json({ message: 'Login avvenuto con successo', user });
    } catch (error) {
        res.status(500).json({ message: 'Errore nel server', error });
    }
});

// Rotta per il logout
app.post('/api/logout', async (req, res) => {
    // Qui puoi gestire il logout, ad esempio invalidando un token, se necessario
    res.status(200).json({ message: 'Logout avvenuto con successo' });
});


// Avvio del server
app.listen(PORT, () => {
    console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
