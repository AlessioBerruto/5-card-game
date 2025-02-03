import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Matches = () => {
	const user = useSelector((state) => state.user);
	const [opponent, setOpponent] = useState("");
	const [result, setResult] = useState("");
	const [matches, setMatches] = useState([]);
	const [leaderboard, setLeaderboard] = useState([]);

	useEffect(() => {
		if (user?.email) {
			fetchMatches();
			fetchLeaderboard();
		}
	}, [user]);

	const fetchMatches = async () => {
		try {
			const response = await axios.get(
				`https://five-card-game.onrender.com/api/matches/${user.email}`
			);
			setMatches(response.data);
		} catch (error) {
			console.error("Errore nel caricamento delle partite", error);
		}
	};

	const fetchLeaderboard = async () => {
		try {
			const response = await axios.get(
				"https://five-card-game.onrender.com/api/leaderboard"
			);
			setLeaderboard(response.data);
		} catch (error) {
			console.error("Errore nel caricamento della classifica", error);
		}
	};

	const handleAddMatch = async () => {
		if (!opponent || !result) {
			alert("Inserisci tutti i campi!");
			return;
		}

		try {
			console.log({ player: user.email, opponent, result });

			await axios.post("https://five-card-game.onrender.com/api/matches", {
				player: user.name,
				opponent,
				result,
			});

			setOpponent("");
			setResult("");
			fetchMatches();
			fetchLeaderboard();
		} catch (error) {
			console.error(
				"Errore nel salvataggio della partita",
				error.response?.data || error.message
			);
		}
	};

	return (
		<>
			<div className="matches-page">
				<div className="tables-container">
					<div className="score-container">
						<div className="result-input">
							<h2>Inserisci una nuova partita</h2>
							<p>
								Giocatore: <strong>{user?.name}</strong>
							</p>
							<input
								type="text"
								placeholder="Nome avversario"
								value={opponent}
								onChange={(e) => setOpponent(e.target.value)}
							/>
							<div className="result-options">
								<label>
									<input
										type="radio"
										name="result"
										value="win"
										checked={result === "win"}
										onChange={(e) => setResult(e.target.value)}
									/>
									Vittoria
								</label>
								<label>
									<input
										type="radio"
										name="result"
										value="draw"
										checked={result === "draw"}
										onChange={(e) => setResult(e.target.value)}
									/>
									Pareggio
								</label>
								<label>
									<input
										type="radio"
										name="result"
										value="loss"
										checked={result === "loss"}
										onChange={(e) => setResult(e.target.value)}
									/>
									Sconfitta
								</label>
							</div>
							<button onClick={handleAddMatch}>Conferma</button>
						</div>

						<div className="match-history">
							<h3>Storico Partite</h3>
							<ul>
								{matches.map((match) => (
									<li key={match._id}>
										{match.opponent} - {match.result.toUpperCase()} (
										{new Date(match.date).toLocaleString()})
									</li>
								))}
							</ul>
						</div>
					</div>
					<div className="report-container">
						<h2>Classifica</h2>
						<ul>
							{leaderboard.map((player, index) => (
								<li key={player._id}>
									{index + 1}. {player._id} - {player.wins} Vittorie,{" "}
									{player.draws} Pareggi, {player.losses} Sconfitte
								</li>
							))}
						</ul>
					</div>
				</div>

				<footer>
					<Link to="/game" className="footer-link">
						↱ Torna al gioco ↰
					</Link>
				</footer>
			</div>
		</>
	);
};

export default Matches;
