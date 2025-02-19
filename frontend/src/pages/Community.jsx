import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setSubscriptionStatus } from "../slices/userSlice";
import emailjs from "emailjs-com";

const Community = () => {
	const dispatch = useDispatch();
	const userEmail = useSelector((state) => state.user.userData.email);
	const userName = useSelector((state) => state.user.userData.name);
	const isSubscribed = useSelector(
		(state) => state.user.userData.isSubscribedToNewsletter
	);
	const isLoggedIn = useSelector((state) => state.user.userData.isLoggedIn);
	const [isChecked, setIsChecked] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");
	const [feedback, setFeedback] = useState("");
	const [feedbackColor, setFeedbackColor] = useState("");

	useEffect(() => {
		if (isSubscribed) {
			setIsChecked(true);
		}
	}, [isSubscribed]);

	const handleSubscribe = async () => {
		setError("");
		setFeedback("");
		setFeedbackColor("");
		setIsSubmitting(true);

		if (!userEmail || !userName) {
			setError("L'utente non è loggato o non ha un nome/email associato.");
			setIsSubmitting(false);
			return;
		}

		try {
			const response = await axios.post(
				"https://five-card-game.onrender.com/api/subscribe-newsletter",
				{ email: userEmail }
			);

			const { status, message } = response.data;

			if (status === "success") {
				dispatch(setSubscriptionStatus(true));
				setIsChecked(true);

				const emailParams = { user_name: userName, user_email: userEmail };
				await emailjs
					.send(
						"contact_service",
						"newsletter_template",
						emailParams,
						"bMOpUWBSnYE6ynS4K"
					)
					.then((response) => {
						if (response.status === 200) {
							setFeedback(
								"Iscrizione completata e email inviata con successo! ✅"
							);
							setFeedbackColor("blue");
						} else {
							setFeedback(
								`Iscrizione completata, ma qualcosa è andato storto con l'invio dell'email (codice: ${response.status}).`
							);
							setFeedbackColor("darkred");
						}
					})
					.catch(() => {
						setFeedback(
							"Iscrizione completata, ma errore nell'invio dell'email."
						);
						setFeedbackColor("darkred");
					});
			} else if (status === "already_subscribed" && isLoggedIn) {
				setError("Sei già iscritto alla newsletter.");
			}
		} catch (err) {
			setError("Errore durante l'iscrizione alla newsletter.");
			console.error(err);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="community-page">
			<div className="community-content">
				<h1 className="community-title">COMMUNITY</h1>
				<p>
					Connettiti con la community per condividere
					<br /> i tuoi pensieri, risultati o obiettivi.
				</p>
				<button
					onClick={() => window.open("https://discord.gg/BT4wQHZKhd", "_blank")}
					className="discord-button"
				>
					<img
						src={`${import.meta.env.BASE_URL}/assets/discord-logo.svg`}
						className="discord-logo-img"
						alt="logo discord"
					/>
					Unisciti al nostro gruppo Discord
				</button>
				<p>
					Iscriviti alla nostra newsletter <br />e rimani sempre aggiornato
					sulle novità.
				</p>
				<div>
					<input
						type="checkbox"
						id="subscribeCheckbox"
						checked={isChecked}
						onChange={() => setIsChecked(!isChecked)}
						disabled={isSubscribed}
					/>
					<label htmlFor="subscribeCheckbox"> Iscriviti alla newsletter</label>
				</div>
				{isSubscribed ? (
					<p>Iscrizione già effettuata</p>
				) : (
					<button
						disabled={!isChecked || isSubmitting || !userEmail}
						onClick={handleSubscribe}
						className="subscribe-button"
					>
						Iscriviti
					</button>
				)}
				{error && <p className="error">{error}</p>}
				{feedback && (
					<div
						id="feedback-message"
						className="feedback-message"
						style={{ color: feedbackColor }}
					>
						{feedback}
					</div>
				)}
			</div>
			<div className="community-img">
				<img
					src={`${import.meta.env.BASE_URL}/assets/fronte-carta.svg`}
					className="front-card-img"
					alt="fronte carta 5"
				/>
			</div>
			<footer>
				<Link to="/game" className="footer-link">
					↱ Torna al gioco ↰
				</Link>
			</footer>
		</div>
	);
};

export default Community;
