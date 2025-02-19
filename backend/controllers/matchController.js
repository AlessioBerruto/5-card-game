import Match from "../models/Match.js";

// Nuova partita
export const addMatch = async (req, res) => {
	const { playerId, playerName, opponent, result, date } = req.body;

	if (!playerId || !playerName || !opponent || !result || !date) {
		return res.status(400).json({ message: "Tutti i campi sono obbligatori" });
	}

	if (playerName === opponent) {
		return res
			.status(400)
			.json({ message: "Non puoi giocare contro te stesso!" });
	}

	try {
		const newMatch = new Match({
			playerId,
			playerName,
			opponent,
			result,
			date,
		});
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
	const { playerId } = req.params;

	try {
		const matches = await Match.find({ playerId }).sort({ date: -1 });
		res.status(200).json(matches);
	} catch (error) {
		res.status(500).json({ message: "Errore nel server", error });
	}
};

// Report
export const getMatchReport = async (req, res) => {
	const { playerId } = req.params;

	try {
		const matches = await Match.find({ playerId });

		const report = matches.reduce(
			(acc, match) => {
				const mapping = {
					vittoria: "totalWins",
					pareggio: "totalDraws",
					sconfitta: "totalLosses",
				};

				if (mapping[match.result]) acc[mapping[match.result]]++;

				return acc;
			},
			{ totalWins: 0, totalDraws: 0, totalLosses: 0 }
		);

		res.status(200).json(report);
	} catch (error) {
		res.status(500).json({ message: "Errore nel server", error });
	}
};

export const deleteLastMatch = async (req, res) => {
	const { playerId } = req.params;

	try {
		const lastMatch = await Match.findOne({ playerId }).sort({ date: -1 });

		if (!lastMatch) {
			return res.status(404).json({ message: "Nessuna partita da eliminare" });
		}

		await Match.findByIdAndDelete(lastMatch._id);
		res.status(200).json({ message: "Ultima partita eliminata con successo" });
	} catch (error) {
		res.status(500).json({ message: "Errore durante l'eliminazione", error });
	}
};
