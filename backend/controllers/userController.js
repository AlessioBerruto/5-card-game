import User from "../models/User.js";

// Aggiornamento utente
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

// Cancellazione utente
export const deleteUser = async (req, res) => {
    const { email } = req.body;  

    try {        
        const user = await User.findOneAndDelete({ email });

        if (!user) {
            return res.status(404).json({ message: "Utente non trovato" });
        }

        res.status(200).json({ message: "Account eliminato con successo" });
    } catch (error) {
        res.status(500).json({ message: "Errore durante la cancellazione dell'account", error });
    }
};

