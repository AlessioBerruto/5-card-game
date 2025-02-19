import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setLoading } from "../slices/loadingSlice";
import {
	setRegistrationGoalUnlocked,
	setIsLoggedIn,
} from "../slices/userSlice";

const Game = () => {
	const navigate = useNavigate();
	const [showLogoutModal, setShowLogoutModal] = useState(false);
	const dispatch = useDispatch();

	const { registrationGoalUnlocked } = useSelector(
		(state) => state.user.userData
	);

	useEffect(() => {
		if (registrationGoalUnlocked) {
			setTimeout(() => {
				dispatch(setRegistrationGoalUnlocked(false));
			}, 5000);
		}
	}, [registrationGoalUnlocked, dispatch]);

	const handleLogout = async () => {
		try {
			dispatch(setLoading(true));
			await axios.post("https://five-card-game.onrender.com/api/logout");
			dispatch(setIsLoggedIn(false));
			navigate("/");
		} catch (error) {
			console.error("Errore nel logout:", error);
		} finally {
			dispatch(setLoading(false));
		}
	};

	const openLogoutModal = () => {
		setShowLogoutModal(true);
	};

	const closeLogoutModal = () => {
		setShowLogoutModal(false);
	};

	const [timeLeft, setTimeLeft] = useState("");

	useEffect(() => {
		const targetDate = new Date("2025-09-30T00:00:00").getTime();
		const savedTimestamp = localStorage.getItem("countdownTimestamp");

		if (!savedTimestamp) {
			localStorage.setItem("countdownTimestamp", targetDate);
		}

		const updateCountdown = () => {
			const now = new Date();
			const endDate = new Date(
				parseInt(localStorage.getItem("countdownTimestamp"))
			);

			if (now >= endDate) {
				setTimeLeft("00 mesi, 00 giorni, 00:00:00");
				clearInterval(interval);
				localStorage.removeItem("countdownTimestamp");
				return;
			}

			let monthsDiff =
				(endDate.getFullYear() - now.getFullYear()) * 12 +
				(endDate.getMonth() - now.getMonth());
			let nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
			let daysRemaining = Math.floor((nextMonth - now) / (1000 * 60 * 60 * 24));

			const remainingTime = endDate - now;
			const hours = Math.floor(
				(remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			const minutes = Math.floor(
				(remainingTime % (1000 * 60 * 60)) / (1000 * 60)
			);
			const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

			setTimeLeft(
				`${monthsDiff.toString().padStart(2, "0")} mesi, ` +
					`${daysRemaining.toString().padStart(2, "0")} giorni, ` +
					`${hours.toString().padStart(2, "0")}:` +
					`${minutes.toString().padStart(2, "0")}:` +
					`${seconds.toString().padStart(2, "0")}`
			);
		};

		const interval = setInterval(updateCountdown, 1000);
		updateCountdown();

		return () => clearInterval(interval);
	}, []);

	return (
		<>
			<div className={`game-page ${showLogoutModal ? "modal-active" : ""}`}>
				<div className="left-navbar">
					<Link to="/profile" className="navbar-link">
						<div className="card-bg-trasparent">
							<img
								src={`${import.meta.env.BASE_URL}/assets/utente-bianco.svg`}
								className="card-img-top"
								alt="icona del profilo"
							/>
							<div className="card-body">Profilo</div>
						</div>
					</Link>
					<Link to="/objective" className="navbar-link">
						<div className="card-bg-trasparent">
							<img
								src={`${import.meta.env.BASE_URL}/assets/obiettivi-bianco.svg`}
								className="card-img-top"
								alt="icona del profilo"
							/>
							<div className="card-body">Obiettivi</div>
						</div>
					</Link>
					<Link to="/community" className="navbar-link">
						<div className="card-bg-trasparent">
							<img
								src={`${import.meta.env.BASE_URL}/assets/community-bianco.svg`}
								className="card-img-top"
								alt="icona del profilo"
							/>
							<div className="card-body">Community</div>
						</div>
					</Link>
				</div>
				<div className="game-window">
					<div className="countdown">Countdown: {timeLeft}</div>
					<p className="game-text">
						5 - The Card Game sarà disponibile al termine del countdown. <br />
						<br />
						In attesa dell'uscita potrai scoprire le Regole ed esercitarti,
						oppure segnare i tuoi punteggi tramite il pulsante qui sotto.
					</p>
					<span className="arrow">&#8595;</span>
					<Link to="/matches">
						<button className="matches-button">Segnapunti</button>
					</Link>
					<p className="scores-text">
						Se entro il rilascio del gioco avrai utilizzato il segnapunti per
						minimo 30 giorni, riceverai un premio speciale.
					</p>
				</div>

				<div className="right-navbar">
					<Link to="/rules" className="navbar-link">
						<div className="card-bg-trasparent">
							<img
								src={`${import.meta.env.BASE_URL}/assets/regole-bianco.svg`}
								className="card-img-top"
								alt="icona delle regole"
							/>
							<div className="card-body">Regole</div>
						</div>
					</Link>

					<Link to="/assistance" className="navbar-link">
						<div className="card-bg-trasparent">
							<img
								src={`${import.meta.env.BASE_URL}/assets/assistenza-bianco.svg`}
								className="card-img-top"
								alt="icona dell'assistenza"
							/>
							<div className="card-body">Assistenza</div>
						</div>
					</Link>

					<div className="navbar-link logout-link" onClick={openLogoutModal}>
						<div className="card-bg-trasparent">
							<img
								src={`${import.meta.env.BASE_URL}/assets/logout-bianco.svg`}
								className="card-img-top"
								alt="icona del logout"
							/>
							<div className="card-body">
								<span>Logout</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{showLogoutModal && (
				<div className="logout-modal-overlay">
					<div className="logout-modal">
						<h2>Vuoi effettuare il Logout?</h2>
						<div className="logout-modal-buttons">
							<button className="btn-confirm" onClick={handleLogout}>
								Sì
							</button>
							<button className="btn-cancel" onClick={closeLogoutModal}>
								No
							</button>
						</div>
					</div>
				</div>
			)}

			{registrationGoalUnlocked && (
				<div className="popup">
					<img
						src={`${import.meta.env.BASE_URL}/assets/trofeo.svg`}
						className="trophy-img-left"
						alt="trofeo"
					/>
					<p>Obiettivo Sbloccato</p>
					<img
						src={`${import.meta.env.BASE_URL}/assets/trofeo.svg`}
						className="trophy-img-right"
						alt="trofeo"
					/>
				</div>
			)}
		</>
	);
};

export default Game;
