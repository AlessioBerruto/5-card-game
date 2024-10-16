import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser"; 
import User from "./models/User.js"; 
import dotenv from "dotenv";
import bcrypt from "bcrypt"; 


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
            user: newUser 
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


        // Verifica della password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Password errata' });
        }


        res.status(200).json({
            message: 'Login avvenuto con successo',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: password, 
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Errore nel server', error });
    }
});


// Aggiornamento dati utente
app.put('/api/user', async (req, res) => {
    const { email, name, password } = req.body;
    console.log("Dati ricevuti per l'aggiornamento:", { email, name, password });

    try {
        // Trova l'utente in base alla vecchia email (user.email nel frontend).
        const user = await User.findOne({ email: req.body.currentEmail }); 
        if (!user) {
            return res.status(404).json({ message: 'Utente non trovato' });
        }

        // Se l'utente cambia email, verifica che non sia già usata.
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: 'Email già in uso' });
            }
            user.email = email; // Aggiorna l'email.
        }

        // Aggiorna altri campi.
        if (name) user.name = name;
        if (password) user.password = password; // Manteniamo la trasmissione della password come testo normale.

        await user.save();

        console.log("Utente aggiornato con successo:", user);

        res.status(200).json({ 
            message: 'Utente aggiornato con successo', 
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                password: user.password, // Restituiamo la password così come è (richiesta del progetto).
            }
        });
    } catch (error) {
        console.error("Errore durante l'aggiornamento:", error);
        res.status(500).json({ message: 'Errore durante l\'aggiornamento', error });
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