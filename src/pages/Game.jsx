import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Game = () => {
	const navigate = useNavigate();
	const [showLogoutModal, setShowLogoutModal] = useState(false);

	// Funzione per gestire il logout
	const handleLogout = async () => {
		try {
			// await axios.post("http://localhost:5000/api/logout"); 
			navigate("/"); 
		} catch (error) {
			console.error("Errore nel logout:", error);
		}
	};

	// Funzione per mostrare la finestra di conferma del logout
	const openLogoutModal = () => {
		setShowLogoutModal(true);
	};

	// Funzione per chiudere la finestra di conferma del logout
	const closeLogoutModal = () => {
		setShowLogoutModal(false);
	};

	return (
		<>
			<div className={`game-page ${showLogoutModal ? "modal-active" : ""}`}>
				<div className="left-navbar">
					<Link to="/profile" className="navbar-link">
						<div className="card">
							<img
								src="./src/assets/user-profile-img.svg"
								className="card-img-top"
								alt="user-profile-img"
							/>
							<div className="card-body">Profilo</div>
						</div>
					</Link>

					<Link to="/rules" className="navbar-link">
						<div className="card">
							<img
								src="./src/assets/rules-img.svg"
								className="card-img-top"
								alt="rules-img"
							/>
							<div className="card-body">Regole</div>
						</div>
					</Link>
				</div>
				<div className="game-window">
					<div className="game-timer">
						<h1>Coming Soon...</h1>
					</div>
				</div>
				<div className="right-navbar">
					<Link to="/assistance" className="navbar-link">
						<div className="card">
							<img
								src="./src/assets/assistance-img.svg"
								className="card-img-top"
								alt="assistance-img"
							/>
							<div className="card-body">Assistenza</div>
						</div>
					</Link>

					<div className="navbar-link logout-link" onClick={openLogoutModal}>
						<div className="card">
							<img
								src="./src/assets/logout-img.svg"
								className="card-img-top"
								alt="logout-img"
							/>
							<div className="card-body">Logout</div>
						</div>
					</div>
				</div>
			</div>

			{/* Finestra modale per la conferma del logout */}
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
		</>
	);
};

export default Game;
