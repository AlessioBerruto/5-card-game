import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Game = () => {
	const navigate = useNavigate();
	const handleLogout = () => {
		navigate("/");
	};

	return (
		<>
			<div className="game-page">
				<div className="left-navbar">
					<div className="card">
						<img
							src="./src/assets/AB-icon.png"
							className="card-img-top"
							alt="..."
						/>
						<div className="card-body">
							<Link to="/profile" className="navbar-link">
								Profile
							</Link>
						</div>
					</div>
					<div className="card">
						<img
							src="./src/assets/AB-icon.png"
							className="card-img-top"
							alt="..."
						/>
						<div className="card-body">
							<Link to="/rules" className="navbar-link">
								Rules
							</Link>
						</div>
					</div>
				</div>
				<div className="game-window">
					<div className="game-timer">
						<h1>Coming Soon...</h1>
					</div>
				</div>
				<div className="right-navbar">
					<div className="card">
						<img
							src="./src/assets/AB-icon.png"
							className="card-img-top"
							alt="..."
						/>
						<div className="card-body">
							<Link to="/assistance" className="navbar-link">
								Assistance
							</Link>
						</div>
					</div>
					<div className="card">
						<img
							src="./src/assets/AB-icon.png"
							className="card-img-top"
							alt="..."
						/>
						<div className="card-body">
							<span className="navbar-link logout-link" onClick={handleLogout}>
								Logout
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Game;
