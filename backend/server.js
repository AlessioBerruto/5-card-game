const mongoose = require('mongoose');

mongoose.connect('URL_DEL_TUO_DATABASE', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connessione al database riuscita'))
    .catch(err => console.error('Connessione al database fallita', err));


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Endpoint di esempio
app.post('/api/register', (req, res) => {
    // Logica per la registrazione
    const { name, email, password } = req.body;
    // Salva l'utente nel database (implementa questa logica)
    res.status(201).json({ message: 'Utente registrato con successo' });
});

app.post('/api/login', (req, res) => {
    // Logica per il login
    const { email, password } = req.body;
    // Controlla le credenziali nel database (implementa questa logica)
    res.status(200).json({ message: 'Login avvenuto con successo' });
});

app.listen(PORT, () => {
    console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
