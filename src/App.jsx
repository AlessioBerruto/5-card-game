import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./slices/authSlice";
import { setUserData, updateAchievements } from "./slices/userSlice";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./styles/App.scss";
import Loader from "./components/Loader";
import { setLoading } from "./slices/loadingSlice";

const App = () => {
	const [isRegistering, setIsRegistering] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [error, setError] = useState(null);
	const [showAchievementPopup, setShowAchievementPopup] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const showAchievementNotification = () => {
		setShowAchievementPopup(true);
		setTimeout(() => {
			setShowAchievementPopup(false);
		}, 5000);
	};

	// Funzione per gestire il login
	const handleLogin = async (e) => {
		e.preventDefault();

		if (!email || !password) {
			setError("Email e password sono obbligatorie");
			return;
		}

		try {
			dispatch(setLoading(true));
			const response = await axios.post(
				"https://five-card-game.onrender.com/api/login",
				{
					email,
					password,
				}
			);
			const { user, token } = response.data;

			dispatch(login({ token }));
			dispatch(setUserData(user));
			dispatch(updateAchievements(user.achievements));

			navigate("/game");
		} catch (err) {
			console.log(err.response);
			setError(
				"Errore nel login: " + err.response?.data?.message || err.message
			);
		} finally {
			dispatch(setLoading(false));
		}
	};

	// Funzione per gestire la registrazione
	const handleRegister = async (e) => {
		e.preventDefault();

		if (!name || !email || !password) {
			setError("Tutti i campi sono obbligatori");
			return;
		}

		if (password.length < 6) {
			setError("La password deve avere almeno 6 caratteri");
			return;
		}

		try {
			dispatch(setLoading(true));
			const response = await axios.post(
				"https://five-card-game.onrender.com/api/register",
				{
					name,
					email,
					password,
				}
			);
			const { user, token } = response.data;

			const updatedAchievements = [...user.achievements];

			dispatch(login({ token }));
			dispatch(setUserData({ ...user, achievements: updatedAchievements }));
			dispatch(updateAchievements(updatedAchievements));

			navigate("/game");
			showAchievementNotification();
		} catch (err) {
			console.log(err.response);
			setError(
				"Errore nella registrazione: " + err.response?.data?.message ||
					err.message
			);
		} finally {
			dispatch(setLoading(false));
		}
	};

	return (
		<>
			<Loader />

			{showAchievementPopup && (
				<div className="achievement-popup">
					<img
						src={`${import.meta.env.BASE_URL}/assets/trofeo.svg`}
						className="trophy-img"
						alt="trofeo"
					/>
					<p> Obiettivo Sbloccato! </p>
					<img
						src={`${import.meta.env.BASE_URL}/assets/trofeo.svg`}
						className="trophy-img"
						alt="trofeo"
					/>
				</div>
			)}

			<div className="home-page">
				<div className="home-container">
					<div className="home-description">
						<h1 className="home-title">5 - The Card Game</h1>
						<p>
							Benvenuto in Cinque, un nuovo gioco di carte ispirato a Solitario
							ma multigiocatore.
						</p>
						<p>
							Registrati o Accedi per scoprire le regole di questo gioco, in
							attesa dell'uscita della sua versione digitale.
						</p>
					</div>
					<div className="form-wrapper">
						<h2>{isRegistering ? "Registrati" : "Accedi"}</h2>
						<form onSubmit={isRegistering ? handleRegister : handleLogin}>
							{isRegistering && (
								<div className="input-field">
									<label htmlFor="name">Nome</label>
									<input
										type="text"
										id="name"
										value={name}
										onChange={(e) => setName(e.target.value)}
										required
									/>
								</div>
							)}
							<div className="input-field">
								<label htmlFor="email">Email</label>
								<input
									type="email"
									id="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<div className="input-field">
								<label htmlFor="password">Password</label>
								<input
									type="password"
									id="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>
							{error && <p className="error-message">{error}</p>}
							<button type="submit" className="submit-btn">
								{isRegistering ? "Registrati" : "Accedi"}
							</button>
						</form>
						<p>
							{isRegistering ? (
								<>
									Hai già un account?{" "}
									<span
										onClick={() => setIsRegistering(false)}
										className="toggle-form"
									>
										Accedi
									</span>
								</>
							) : (
								<>
									Non hai un account?{" "}
									<span
										onClick={() => setIsRegistering(true)}
										className="toggle-form"
									>
										Registrati
									</span>
								</>
							)}
						</p>
					</div>
				</div>
			</div>
			<footer>
				<Link to="/game" className="navbar-link">
					Game
				</Link>
			</footer>
		</>
	);
};

export default App;
