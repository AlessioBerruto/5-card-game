import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setLoading } from '../slices/loadingSlice';

const Game = () => {
	const navigate = useNavigate();
	const [showLogoutModal, setShowLogoutModal] = useState(false);
	const dispatch = useDispatch();

	const handleLogout = async () => {
		try {
			dispatch(setLoading(true));
			await axios.post("https://five-card-game.onrender.com/api/logout");
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
				</div>
				<div className="game-window">
					<img
						src={`${import.meta.env.BASE_URL}/assets/cinque-game-bg.png`}
						alt="5 Game Background"
					/>
				</div>
				<div className="right-navbar">
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
		</>
	);
};

export default Game;
