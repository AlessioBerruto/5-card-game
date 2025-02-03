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
		res
			.status(201)
			.json({ message: "Partita salvata con successo", match: newMatch });
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

export const getMatchReport = async (req, res) => {
	const { player } = req.params;

	try {
		const matches = await Match.find({ player });

		const report = {
			totalWins: 0,
			totalDraws: 0,
			totalLosses: 0,
			opponents: {},
		};

		matches.forEach((match) => {
			if (match.result === "win") report.totalWins++;
			if (match.result === "draw") report.totalDraws++;
			if (match.result === "loss") report.totalLosses++;

			if (!report.opponents[match.opponent]) {
				report.opponents[match.opponent] = { wins: 0, draws: 0, losses: 0 };
			}

			if (match.result === "win") report.opponents[match.opponent].wins++;
			if (match.result === "draw") report.opponents[match.opponent].draws++;
			if (match.result === "loss") report.opponents[match.opponent].losses++;
		});

		res.status(200).json(report);
	} catch (error) {
		res.status(500).json({ message: "Errore nel server", error });
	}
};
