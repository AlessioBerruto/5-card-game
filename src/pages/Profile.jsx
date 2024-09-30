import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Profile() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [userId, setUserId] = useState(null);
	const [message, setMessage] = useState("");

	// Gestione dei campi del form
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	// Registrazione utente
	const handleRegister = async () => {
		try {
			const response = await axios.post("http://localhost:5000/api/register", formData);
			setMessage(response.data.message);
			setUserId(response.data.userId); // Memorizza l'ID utente per operazioni successive
		} catch (error) {
			setMessage(
				error.response.data.message || "Errore durante la registrazione"
			);
		}
	};

	// Login utente
	const handleLogin = async () => {
		try {
			const response = await axios.post("http://localhost:5000/api/login", {
				email: formData.email,
				password: formData.password,
			});
			setMessage(response.data.message);
			setUserId(response.data.userId);
		} catch (error) {
			setMessage(error.response.data.message || "Errore durante il login");
		}
	};

	// Modifica dati utente
	const handleUpdate = async () => {
		try {
			if (!userId) {
				setMessage("Effettua prima il login per aggiornare i dati");
				return;
			}
			const response = await axios.put(`http://localhost:5000/api/users/${userId}`, formData);
			setMessage(response.data.message);
		} catch (error) {
			setMessage(
				error.response.data.message || "Errore durante l'aggiornamento"
			);
		}
	};

	// Cancellazione utente
	const handleDelete = async () => {
		try {
			if (!userId) {
				setMessage("Effettua prima il login per cancellare il profilo");
				return;
			}
			const response = await axios.delete(`http://localhost:5000/api/users/${userId}`);
			setMessage(response.data.message);
			setUserId(null); // Rimuovi l'ID utente dalla sessione
		} catch (error) {
			setMessage(
				error.response.data.message || "Errore durante la cancellazione"
			);
		}
	};

	return (
		<>
			<Navbar />
			<div className="profile-container">
				<h2>Gestione Profilo Utente</h2>
				<p>{message}</p>

				<input
					type="text"
					name="name"
					placeholder="Nome"
					value={formData.name}
					onChange={handleChange}
				/>
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={formData.email}
					onChange={handleChange}
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					value={formData.password}
					onChange={handleChange}
				/>

				<button onClick={handleRegister}>Registrati</button>
				<button onClick={handleLogin}>Accedi</button>
				<button onClick={handleUpdate}>Modifica</button>
				<button onClick={handleDelete}>Elimina Account</button>
			</div>
		</>
	);
}

export default Profile;
