import React from "react";
import { Link } from "react-router-dom";

const Community = () => {
	return (
		<>
			<div className="community-page">
				<div className="community-content">
					<h1 className="community-title">COMMUNITY</h1>
					<p>
						Connettiti con la community per condividere i tuoi risultati e
						obiettivi, <br />o anche solo per fare due parole con gli altri
						giocatori di questo fantastico gioco.
					</p>
					<button
						onclick="window.open('https://discord.gg/BT4wQHZKhd', '_blank')"
						class="btn btn-primary"
					>
						Unisciti al nostro gruppo Discord
					</button>
					<p>
						Iscriviti alla nostra newsletter e rimani sempre aggiornato sulle
						novità e sull'uscita della versione digitale del gioco.
					</p>
					<textarea placeholder="Scrivi qui la mail su cui vuoi ricevere le comunicazioni..."></textarea>
					<input type="submit" value="Iscriviti" />
				</div>
				<div className="community-img">
					<img
						src={`${import.meta.env.BASE_URL}/assets/fronte-carta.svg`}
						className="front-card-img"
						alt="fronte carta"
					/>
				</div>
			</div>
			<footer>
				<Link to="/game" className="footer-link">
					↱ Torna al gioco ↰
				</Link>
			</footer>
		</>
	);
};

export default Community;
