import React from "react";
import { Link } from "react-router-dom";

const Community = () => {
	return (
		<>
			<div className="community-page"></div>
			<footer>
				<Link to="/game" className="footer-link">
					↱ Torna al gioco ↰
				</Link>
			</footer>
		</>
	);
};

export default Community;
