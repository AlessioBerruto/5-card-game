import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import User from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
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

// Aggiornamento dati utente
app.put('/api/user', async (req, res) => {
    const { email, name, password, currentEmail } = req.body;

    try {
        const user = await User.findOne({ email: currentEmail });
        if (!user) {
            return res.status(404).json({ message: 'Utente non trovato' });
        }

        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: 'Email già in uso' });
            }
            user.email = email;
        }

        if (name) user.name = name;
        if (password) user.password = password;

        await user.save();

        res.status(200).json({
            message: 'Utente aggiornato con successo',
            user: {
                name: user.name,
                email: user.email,
                password: password
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Errore durante l\'aggiornamento', error });
    }
});

// Eliminazione dell'utente
app.delete('/api/user', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Utente non trovato' });
        }

        await User.deleteOne({ email });

        res.status(200).json({ message: 'Utente eliminato con successo' });
    } catch (error) {
        res.status(500).json({ message: 'Errore durante l\'eliminazione dell\'utente', error });
    }
});

// Logout
app.post('/api/logout', async (req, res) => {
    res.status(200).json({ message: 'Logout avvenuto con successo' });
});

// Avvio del server
app.listen(PORT, () => {
    console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
