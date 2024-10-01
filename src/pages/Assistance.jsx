import React from "react";
import { Link } from "react-router-dom";

const Assistance = () => {
	return (
		<>
			<div className="assistance-page">
				<div className="contact-section">
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
						excepturi eveniet dolore, facere libero repudiandae! Exercitationem
						fugit asperiores quibusdam sed.
					</p>
					<textarea name="message" className="input-effect"></textarea>
					<input type="submit" value="Send" className="send-button" />
					<div id="form-feedback" class="feedback-message"></div>
					<p>o visita il mio sito Web LINK</p>
				</div>
			</div>
			<footer>
				<Link to="/game" className="navbar-link">
					Game
				</Link>
			</footer>
		</>
	);
};

export default Assistance;
