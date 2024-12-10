import React from "react";
import { Link } from "react-router-dom";

const Objective = () => {
	return (
		<>
			<div className="objective-page"></div>
			<footer>
				<Link to="/game" className="footer-link">
					↱ Torna al gioco ↰
				</Link>
			</footer>
		</>
	);
};

export default Objective;
