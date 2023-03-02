import React from 'react';
import Link from '../components/Link';
import '../styles/HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <h1>Choisissez un outil :</h1>
      <ul>
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
    </div>
  );
}

export default HomePage;
