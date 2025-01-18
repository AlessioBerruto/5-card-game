import User from "../models/User.js";

export const updateUser = async (req, res) => {
	const { currentEmail, email, name, password } = req.body;

	try {
		const user = await User.findOneAndUpdate(
			{ email: currentEmail },
			{ email, name, password },
			{ new: true }
		);

		if (!user) {
			return res.status(404).json({ message: "Utente non trovato" });
		}

		res.status(200).json({
			message: "Dati aggiornati con successo",
			user: { name: user.name, email: user.email, password: user.password },
		});
	} catch (error) {
		res.status(500).json({ message: "Errore durante l'aggiornamento dei dati", error });
	}
};
