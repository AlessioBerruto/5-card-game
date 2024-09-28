import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Navbar.scss";
import brandmarkBlu from "../assets/brandmark-blu.png";

function Navbar() {

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);  
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  useEffect(() => {    
    const navLinks = document.querySelectorAll(".navbar-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (!isNavCollapsed) {
          handleNavCollapse();
        }
      });
    });
  }, [isNavCollapsed]);

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <div className="navbar-brand">
          <img
            src={brandmarkBlu}
            alt="AB Brand"
            width="24"
            height="30"
            className="d-inline-block align-text-top"
          />
          <p className="brand-name">AB Development</p>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${!isNavCollapsed ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="navbar-link" onClick={handleNavCollapse}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/game" className="navbar-link" onClick={handleNavCollapse}>
                Game
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="navbar-link" onClick={handleNavCollapse}>
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
