import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Matches = () => {
	const user = useSelector((state) => state.user.userData);
	const [opponent, setOpponent] = useState("");
	const [result, setResult] = useState("");
	const [matches, setMatches] = useState([]);
	const [report, setReport] = useState(null);

	useEffect(() => {
		if (user?.name) {
			fetchMatches();
			fetchMatchReport();
		}
	}, [user]);

	const fetchMatches = async () => {
		try {
			const response = await axios.get(
				`https://five-card-game.onrender.com/api/matches/${user.name}`
			);
			setMatches(response.data);
		} catch (error) {
			console.error("Errore nel caricamento delle partite", error);
		}
	};

	const fetchMatchReport = async () => {
		try {
			const response = await axios.get(
				`https://five-card-game.onrender.com/api/matches/${user.name}/report`
			);
			setReport(response.data);
		} catch (error) {
			console.error("Errore nel caricamento del report", error);
		}
	};

	const handleAddMatch = async () => {
		if (!opponent || !result) {
			alert("Inserisci tutti i campi!");
			return;
		}

		try {
			await axios.post("https://five-card-game.onrender.com/api/matches", {
				player: user.name,
				opponent,
				result,
				date: new Date().toISOString(),
			});

			setOpponent("");
			setResult("");
			fetchMatches();
			fetchMatchReport();
		} catch (error) {
			console.error("Errore nel salvataggio della partita", error);
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
								Giocatore:{" "}
								<strong>{user?.name || "Nome non disponibile"}</strong>
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
										{user?.name} vs {match.opponent} -{" "}
										{match.result.toUpperCase()} (
										{new Date(match.date).toLocaleString()})
									</li>
								))}
							</ul>
						</div>
					</div>

					<div className="report-container">
						<h3>Resoconto delle Partite</h3>
						{report ? (
							<div>
								<p>
									<strong>{user.name}</strong> - Vittorie: {report.totalWins},
									Pareggi: {report.totalDraws}, Sconfitte: {report.totalLosses}
								</p>
								<h4>Avversari Affrontati:</h4>
								<ul>
									{report.opponents.map((opp) => (
										<li key={opp.name}>
											{opp.name} - Vittorie: {opp.wins}, Pareggi: {opp.draws},
											Sconfitte: {opp.losses}
										</li>
									))}
								</ul>
							</div>
						) : (
							<p>Nessun dato disponibile.</p>
						)}
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
