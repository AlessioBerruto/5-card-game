import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setSubscriptionStatus } from "../slices/userSlice";
import emailjs from "emailjs-com";

const Community = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.user.userData.email);
  const userName = useSelector((state) => state.user.userData.name); // Aggiunto per ottenere il nome dell'utente
  const isSubscribed = useSelector((state) => state.user.userData.isSubscribedToNewsletter);
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isSubscribed) {
      setIsChecked(true);
    }
  }, [isSubscribed]);

  const handleSubscribe = async () => {
    if (!userEmail || !userName) {
      setError("L'utente non è loggato o non ha un nome/email associato.");
      console.error("Dati mancanti:", { userEmail, userName });
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      
      const response = await axios.post("https://five-card-game.onrender.com/api/subscribe-newsletter", { email: userEmail });

      if (response.data.message === "Iscrizione alla newsletter avvenuta con successo") {
        dispatch(setSubscriptionStatus(true));
        setIsChecked(true);

        
        const emailParams = {
          user_name: userName,
          user_email: userEmail,
        };

        await emailjs.send(
          "contact_service",
          "newsletter_template",
          emailParams,
          "bMOpUWBSnYE6ynS4K"
        );

        alert("Iscrizione alla newsletter completata e mail inviata!");
      }
    } catch (err) {
      setError("Si è verificato un errore durante l'iscrizione.");
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
          Connettiti con la community per condividere i tuoi risultati e
          obiettivi, o anche solo per fare due parole con gli altri giocatori di
          questo fantastico gioco.
        </p>
        <button
          onClick={() => window.open("https://discord.gg/BT4wQHZKhd", "_blank")}
          className="btn btn-primary"
        >
          Unisciti al nostro gruppo Discord
        </button>
        <p>
          Iscriviti alla nostra newsletter e rimani sempre aggiornato sulle
          novità.
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
            className="btn btn-primary"
          >
            Iscriviti
          </button>
        )}
        {error && <p className="error">{error}</p>}
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
