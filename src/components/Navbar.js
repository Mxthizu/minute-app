import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/compteur">Compteur</Link>
        </li>
        <li>
          <Link to="/chronometre">Chronomètre</Link>
        </li>
        <li>
          <Link to="/minuteur">Minuteur</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
