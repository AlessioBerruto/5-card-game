import React from "react";
import { Link } from "react-router-dom";

const Objective = () => {
	return (
		<>
			<div className="objective-page">
				<h1 className="objective-title">OBIETTIVI</h1>
				<div className="objective-description unlocked"><img
								src={`${import.meta.env.BASE_URL}/assets/trofeo.svg`}
								className="trophy-img"
								alt="trofeo"
							/>Benvenuto in 5 - The Card Game : effettua la Registrazione al sito</div>
				<div className="objective-description"><img
								src={`${import.meta.env.BASE_URL}/assets/trofeo.svg`}
								className="trophy-img"
								alt="trofeo"
							/>Prima volta : Gioca una partita</div>
				<div className="objective-description"><img
								src={`${import.meta.env.BASE_URL}/assets/trofeo.svg`}
								className="trophy-img"
								alt="trofeo"
							/>Che soddisfazione! : Vinci una partita</div>
				<div className="objective-description"><img
								src={`${import.meta.env.BASE_URL}/assets/trofeo.svg`}
								className="trophy-img"
								alt="trofeo"
							/>Sei più forte tu : Ottieni una sconfitta</div>
				<div className="objective-description"><img
								src={`${import.meta.env.BASE_URL}/assets/trofeo.svg`}
								className="trophy-img"
								alt="trofeo"
							/>Niente da fare : Ottieni un pareggio</div>
				<div className="objective-description"><img
								src={`${import.meta.env.BASE_URL}/assets/trofeo.svg`}
								className="trophy-img"
								alt="trofeo"
							/>Dammi il 5! : Vinci 5 partite</div>
				<div className="objective-description"><img
								src={`${import.meta.env.BASE_URL}/assets/trofeo.svg`}
								className="trophy-img"
								alt="trofeo"
							/>Che combo : Attacca 5 carte in un turno</div>
				<div className="objective-description"><img
								src={`${import.meta.env.BASE_URL}/assets/trofeo.svg`}
								className="trophy-img"
								alt="trofeo"
							/>5x5 = 25 : Vinci 25 partite</div>
				<div className="objective-description"><img
								src={`${import.meta.env.BASE_URL}/assets/trofeo.svg`}
								className="trophy-img"
								alt="trofeo"
							/>Infermabile : Attacca 10 carte in un turno</div>
				<div className="objective-description"><img
								src={`${import.meta.env.BASE_URL}/assets/trofeo.svg`}
								className="trophy-img"
								alt="trofeo"
							/>Campione di 5 : Vinci 50 partite</div>

				<footer>
					<Link to="/game" className="footer-link">
						↱ Torna al gioco ↰
					</Link>
				</footer>
			</div>
		</>
	);
};

export default Objective;