import Match from "../models/Match.js";

// Nuova partita
export const addMatch = async (req, res) => {
  const { playerEmail, playerName, opponent, result, date } = req.body;

  if (!playerEmail || !playerName || !opponent || !result || !date) {
    return res.status(400).json({ message: "Tutti i campi sono obbligatori" });
  }

  try {
    const newMatch = new Match({ playerEmail, playerName, opponent, result, date });
    await newMatch.save();
    res.status(201).json({ message: "Partita salvata con successo", match: newMatch });
  } catch (error) {
    res.status(500).json({ message: "Errore nel server", error });
  }
};

// Storico delle partite
export const getMatches = async (req, res) => {
  const { playerEmail } = req.params;

  try {
    const matches = await Match.find({ playerEmail }).sort({ date: -1 });
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: "Errore nel server", error });
  }
};

// Report
export const getMatchReport = async (req, res) => {
  const { playerEmail } = req.params;

  try {
    const matches = await Match.find({ playerEmail });

    const report = {
      totalWins: 0,
      totalDraws: 0,
      totalLosses: 0,
    };

    matches.forEach((match) => {
      if (match.result === "vittoria") report.totalWins++;
      if (match.result === "pareggio") report.totalDraws++;
      if (match.result === "sconfitta") report.totalLosses++;
    });

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: "Errore nel server", error });
  }
};
