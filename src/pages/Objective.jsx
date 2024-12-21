import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Objective = () => {
	const user = useSelector((state) => state.user);
	const [achievements, setAchievements] = useState([]);

	useEffect(() => {
		if (user && user.achievements) {
		  setAchievements(user.achievements);
		}
	  }, [user]);

	return (
		<div className="objective-page">
			<h1 className="objective-title">OBIETTIVI</h1>
			{achievements && achievements.length > 0 && achievements.map((achievement) => (
				<div
					key={achievement.id}
					className={`objective-description ${
						achievement.unlocked ? "unlocked" : ""
					}`}
				>
					<img
						src={`${import.meta.env.BASE_URL}/assets/trofeo.svg`}
						className="trophy-img"
						alt="trofeo"
					/>
					{achievement.text}
				</div>
			))}

			<footer>
				<Link to="/game" className="footer-link">
					↱ Torna al gioco ↰
				</Link>
			</footer>
		</div>
	);
};

export default Objective;
