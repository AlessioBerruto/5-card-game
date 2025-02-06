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
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		if (user?.email) {
			fetchMatches();
			fetchMatchReport();
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

	const fetchMatchReport = async () => {
		try {
			const response = await axios.get(
				`https://five-card-game.onrender.com/api/matches/${user.email}/report`
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
				playerEmail: user.email,
				playerName: user.name,
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

	const handleDeleteLastMatch = async () => {
		try {
			await axios.delete(
				`https://five-card-game.onrender.com/api/matches/${user.email}/last`
			);
			fetchMatches();
			fetchMatchReport();
		} catch (error) {
			console.error("Errore nell'eliminazione dell'ultima partita", error);
		}
	};

	const filteredMatches = matches.filter((match) =>
		(match.opponent || "").toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<>
			<div className="matches-page">
				<h1>Partite e Punteggi</h1>
				<div className="tables-container">
					<div className="score-container">
						<h3>Inserisci una nuova partita</h3>
						<div className="input-container">
							<div className="players">
								<p>									
									<strong>{user?.name || "Nome non disponibile"}</strong>
								</p>
								<p>VS</p>
								<input
									type="text"
									placeholder="Nome avversario"
									className="opponent-input-left"
									value={opponent}
									onChange={(e) => setOpponent(e.target.value)}
								/>
							</div>
							<div className="result-options">
								<label>
									<input
										type="radio"
										name="result"
										value="vittoria"
										checked={result === "vittoria"}
										onChange={(e) => setResult(e.target.value)}
									/>
									Vittoria
								</label>
								<label>
									<input
										type="radio"
										name="result"
										value="pareggio"
										checked={result === "pareggio"}
										onChange={(e) => setResult(e.target.value)}
									/>
									Pareggio
								</label>
								<label>
									<input
										type="radio"
										name="result"
										value="sconfitta"
										checked={result === "sconfitta"}
										onChange={(e) => setResult(e.target.value)}
									/>
									Sconfitta
								</label>
							</div>
							<button className="confirm-button" onClick={handleAddMatch}>Conferma</button>
						</div>
						<h3>Resoconto delle Partite</h3>
						<div className="result-container">
							{report ? (
								<div className="scores">
									<p>Vittorie: {report.totalWins}</p>
									<p>Pareggi: {report.totalDraws}</p>
									<p>Sconfitte: {report.totalLosses}</p>
								</div>
							) : (
								<p>Caricamento dati...</p>
							)}
						</div>
					</div>

					<div className="report-container">
						<h3>Storico Partite</h3>
						<div className="search-bar">
							<img
								src={`${import.meta.env.BASE_URL}/assets/lens-icon-white.svg`}
								className="card-img-top"
								alt="icona della lente"
							/>
							<input
								type="text"
								placeholder="Nome avversario"
								className="opponent-input-right"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
							<img
								src={`${import.meta.env.BASE_URL}/assets/bin-icon-white.svg`}
								className="card-img-top"
								alt="icona del cestino"
							/>
							<button className="delete-button" onClick={handleDeleteLastMatch}>
								Elimina Ultima Partita
							</button>
						</div>

						<div className="match-history">
							<ul>
								{filteredMatches.length > 0 ? (
									filteredMatches.map((match) => (
										<li key={match._id}>
											{user?.name} vs {match.opponent} -{" "}
											{match.result.toUpperCase()} (
											{new Date(match.date).toLocaleString()})
										</li>
									))
								) : (
									<p>Nessuna partita trovata.</p>
								)}
							</ul>
						</div>
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
