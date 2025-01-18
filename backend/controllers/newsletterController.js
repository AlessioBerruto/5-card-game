import User from "../models/User.js";

export const subscribeToNewsletter = async (req, res) => {
	const { email } = req.body;

	if (!email) {
		return res.status(400).json({ message: "Email mancante" });
	}

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ message: "Utente non trovato" });
		}

		if (user.isSubscribedToNewsletter) {
			return res.status(400).json({ message: "Utente già iscritto alla newsletter" });
		}

		user.isSubscribedToNewsletter = true;
		await user.save();

		res.status(200).json({ message: "Iscrizione alla newsletter avvenuta con successo" });
	} catch (error) {
		res.status(500).json({ message: "Errore durante l'iscrizione alla newsletter", error });
	}
};
