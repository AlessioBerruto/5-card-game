import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setLoading } from "../slices/loadingSlice";
import { setRegistrationGoalUnlocked } from "../slices/userSlice";

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
			}, 9995000);
		}
	}, [registrationGoalUnlocked, dispatch]);

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
					<img
						src={`${import.meta.env.BASE_URL}/assets/cinque-game-bg.png`}
						alt="5 Game Background"
					/>
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
						className="trophy-img"
						alt="trofeo"
					/>
					<p>Obiettivo Sbloccato</p>
					<img
						src={`${import.meta.env.BASE_URL}/assets/trofeo.svg`}
						className="trophy-img"
						alt="trofeo"
					/>
				</div>
			)}
		</>
	);
};

export default Game;
