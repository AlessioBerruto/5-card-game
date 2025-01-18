import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import emailjs from "emailjs-com";

const Assistance = () => {
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackColor, setFeedbackColor] = useState("green");
  const user = useSelector((state) => state.user.userData);
  const [contactNumber, setContactNumber] = useState("");

  useEffect(() => {
    const randomContactNumber = Math.floor(Math.random() * 9999) + 1;
    setContactNumber(randomContactNumber);
  }, []);

  const handleSend = (e) => {
    e.preventDefault();

    
    if (!message.trim()) {
      setFeedback("Per favore, scrivi un messaggio prima di inviare.");
      setFeedbackColor("darkred");
      return;
    }

    const userName = user ? user.name : "Utente Sconosciuto";
    const userEmail = user ? user.email : "Email non fornita";

    const templateParams = {
      user_name: userName,
      user_email: userEmail,
      message: message,
      contact_number: contactNumber,
    };

    emailjs
      .send(
        "contact_service",
        "contact_form",
        templateParams,
        "bMOpUWBSnYE6ynS4K"
      )
      .then((response) => {
        if (response.status === 200) {
          setFeedback("Messaggio inviato con successo! ✅");
          setFeedbackColor("blue");
          setMessage(""); 
        } else {
          setFeedback(
            `Qualcosa è andato storto (codice: ${response.status}). Riprova più tardi.`
          );
          setFeedbackColor("darkred");
        }
      })
      .catch((error) => {
        setFeedback("Errore nell'invio del messaggio. ❌");
        setFeedbackColor("darkred");
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
            required
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
        <footer>
          <Link to="/game" className="footer-link">
            ↱ Torna al gioco ↰
          </Link>
        </footer>
      </div>
    </>
  );
};

export default Assistance;
