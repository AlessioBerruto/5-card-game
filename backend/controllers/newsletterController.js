import User from "../models/User.js";

export const subscribeToNewsletter = async (req, res) => {
	const { email } = req.body;

	if (!email) {
		return res.status(400).json({ status: "error", message: "Email mancante" });
	}

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res
				.status(404)
				.json({ status: "error", message: "Utente non trovato" });
		}

		if (user.isSubscribedToNewsletter) {
			return res.status(200).json({
				status: "already_subscribed",
				message: "Utente già iscritto alla newsletter",
			});
		}

		user.isSubscribedToNewsletter = true;
		await user.save();

		return res.status(200).json({
			status: "success",
			message: "Iscrizione alla newsletter avvenuta con successo",
		});
	} catch (error) {
		return res.status(500).json({
			status: "error",
			message: "Errore durante l'iscrizione alla newsletter",
			error,
		});
	}
};
