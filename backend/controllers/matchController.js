import Match from "../models/Match.js";

// Nuova partita
export const addMatch = async (req, res) => {
  const { player, opponent, result } = req.body;

  if (!player || !opponent || !result) {
    return res.status(400).json({ message: "Tutti i campi sono obbligatori" });
  }

  try {
    const newMatch = new Match({ player, opponent, result });
    await newMatch.save();
    res.status(201).json({ message: "Partita salvata con successo", match: newMatch });
  } catch (error) {
    res.status(500).json({ message: "Errore nel server", error });
  }
};

// Storico delle partite
export const getMatches = async (req, res) => {
  const { player } = req.params;

  try {
    const matches = await Match.find({ player }).sort({ date: -1 });
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: "Errore nel server", error });
  }
};

// Classifica globale
export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Match.aggregate([
      {
        $group: {
          _id: "$player",
          wins: { $sum: { $cond: [{ $eq: ["$result", "win"] }, 1, 0] } },
          draws: { $sum: { $cond: [{ $eq: ["$result", "draw"] }, 1, 0] } },
          losses: { $sum: { $cond: [{ $eq: ["$result", "loss"] }, 1, 0] } },
          totalGames: { $sum: 1 }
        }
      },
      { $sort: { wins: -1, draws: -1 } }
    ]);

    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: "Errore nel server", error });
  }
};
