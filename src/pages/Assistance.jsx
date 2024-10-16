import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import emailjs from "emailjs-com";

const Assistance = () => {
	const [message, setMessage] = useState("");
	const [feedback, setFeedback] = useState("");
	const [feedbackColor, setFeedbackColor] = useState("green");
	const user = useSelector((state) => state.user.userData);

	const handleSend = (e) => {
		e.preventDefault();

		const userName = user ? user.name : "Utente Sconosciuto";
		const templateParams = {
			name: userName,
			message: message,
		};

		emailjs
			.send(
				"contact_service",
				"contact_form",
				templateParams,
				"bMOpUWBSnYE6ynS4K"
			)
			.then((response) => {
				setFeedback("Messaggio inviato con successo! ✅");
				setFeedbackColor("green");
				setMessage("");
			})
			.catch((error) => {
				setFeedback("Errore nell'invio del messaggio. ❌");
				setFeedbackColor("red");
				console.error("EmailJS error:", error);
			});
	};

	return (
		<>
			<div className="assistance-page">
				<div className="contact-section">
					<p className="contact-title">
						Per qualsiasi dubbio o richiesta, compila questo form...
					</p>
					<textarea
						name="message"
						className="input-effect"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
                        placeholder="Scrivi qui le tue richieste..."
					></textarea>
					<input
						type="submit"
						value="Invia"
						className="send-button"
						onClick={handleSend}
					/>
					<div
						id="form-feedback"
						className="feedback-message"
						style={{ color: feedbackColor }}
					>
						{feedback}
					</div>
					<p className="link-p">
						...o visita il mio sito Web{" "}
						<a href="https://alessioberruto.github.io/" target="_blank">
							AB Development
						</a>
					</p>
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

export default Assistance;
