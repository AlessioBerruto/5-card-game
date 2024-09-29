import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./styles/App.scss";
import Navbar from "./components/Navbar";

const App = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', { // Cambia l'URL in base al tuo backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Login successful");
        navigate("/game"); 
      } else {
        setError(data.message || "Errore nel login");
      }
    } catch (err) {
      setError("Errore nel login: " + err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/register', { // Cambia l'URL in base al tuo backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Registrazione avvenuta con successo");
        navigate("/game"); 
      } else {
        setError(data.message || "Errore nella registrazione");
      }
    } catch (err) {
      setError("Errore nella registrazione: " + err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="home-page">
        <h1 className="home-title">5 - The Card Game</h1>
        <div className="home-container">
          <div className="home-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, ad asperiores. Dolorum, laborum rem quae commodi earum error animi saepe itaque veniam laudantium, vero laboriosam necessitatibus ducimus hic nihil beatae.
          </div>
          <div className="form-wrapper">
            <h2>{isRegistering ? "Registrati" : "Accedi"}</h2>
            <form onSubmit={isRegistering ? handleRegister : handleLogin}>
              {isRegistering && (
                <div className="input-field">
                  <label htmlFor="name">Nome</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}
              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="submit-btn">
                {isRegistering ? "Registrati" : "Accedi"}
              </button>
            </form>
            <p>
              {isRegistering ? (
                <>
                  Hai già un account?{" "}
                  <span onClick={() => setIsRegistering(false)} className="toggle-form">
                    Accedi
                  </span>
                </>
              ) : (
                <>
                  Non hai un account?{" "}
                  <span onClick={() => setIsRegistering(true)} className="toggle-form">
                    Registrati
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
