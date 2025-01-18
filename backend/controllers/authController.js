import User from "../models/User.js";

// Registrazione
export const registerUser = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "Utente già esistente" });
		}

		const newUser = new User({
			name,
			email,
			password,
			profileImage: null,			
			isSubscribedToNewsletter: false,
		});
		await newUser.save();

		res.status(201).json({
			message: "Utente registrato con successo",
			user: {
				id: newUser._id,
				name,
				email,
				password,
				profileImage: newUser.profileImage
			},
		});
	} catch (error) {
		res.status(500).json({ message: "Errore nel server", error });
	}
};

// Login
export const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user || user.password !== password) {
			return res.status(400).json({ message: "Email o password errati" });
		}

		res.status(200).json({
			message: "Login avvenuto con successo",
			user: {
				name: user.name,
				email,
				password,
				profileImage: user.profileImage || null
			},
		});
	} catch (error) {
		res.status(500).json({ message: "Errore nel server", error });
	}
};
