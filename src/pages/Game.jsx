import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import userProfileImg from "/assets/utente-bianco.svg";
// import rulesImg from "/assets/regole-bianco.svg";
// import assistanceImg from "/assets/assistenza-bianco.svg";
// import logoutImg from "/assets/logout-bianco.svg";
// import gameBg from "/assets/cinque-game-bg.png";


const Game = () => {
	const navigate = useNavigate();
	const [showLogoutModal, setShowLogoutModal] = useState(false);
	
	const handleLogout = async () => {
		try {
			await axios.post("https://five-card-game.onrender.com/api/logout");
			navigate("/");
		} catch (error) {
			console.error("Errore nel logout:", error);
		}
	};
	
	const openLogoutModal = () => {
		setShowLogoutModal(true);	};

	
	const closeLogoutModal = () => {
		setShowLogoutModal(false);
	};

	return (
		<>
			<div className={`game-page ${showLogoutModal ? "modal-active" : ""}`}>
				<div className="left-navbar">
					<Link to="/profile" className="navbar-link">
						<div className="card-bg-trasparent">
							<img
								src="/assets/utente-bianco.svg"
								className="card-img-top"
								alt="user-profile-img"
							/>
							<div className="card-body">Profilo</div>
						</div>
					</Link>

					<Link to="/rules" className="navbar-link">
						<div className="card-bg-trasparent">
							<img
								src="/assets/regole-bianco.svg"
								className="card-img-top"
								alt="rules-img"
							/>
							<div className="card-body">Regole</div>
						</div>
					</Link>
				</div>
				<div className="game-window">
					<img src="/assets/cinque-game-bg.png" alt="5 Game Background" />					
				</div>
				<div className="right-navbar">
					<Link to="/assistance" className="navbar-link">
						<div className="card-bg-trasparent">
							<img
								src="/assets/assistenza-bianco.svg"
								className="card-img-top"
								alt="assistance-img"
							/>
							<div className="card-body">Assistenza</div>
						</div>
					</Link>

					<div className="navbar-link logout-link" onClick={openLogoutModal}>
						<div className="card-bg-trasparent">
							<img
								src="/assets/logout-bianco.svg"
								className="card-img-top"
								alt="logout-img"
							/>
							<div className="card-body"><span>Logout</span></div>
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
		</>
	);
};

export default Game;
