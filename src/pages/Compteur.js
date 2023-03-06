import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import '../styles/App.css';
import '../variables.css';

function Compteur() {
  const [count, setCount] = useState(0);
  const [savedCounts, setSavedCounts] = useState([]);

  const handleSave = () => {
    setSavedCounts([...savedCounts, count]);
    setCount(0);
  };

  const lastFiveSavedCounts = savedCounts.slice(-5);

  const handleExport = () => {
    const data = lastFiveSavedCounts.join('\n');
    const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'saved-counts.txt');
  };

  return (
    <div className="Compteur">
      <h1 className="title">Compteur</h1>
      <p className="counter">{count}</p>
      <div className="button-container">
        <button className="button" onClick={() => setCount(count + 1)}>
          Incrémenter
        </button>
        <button className="button" onClick={handleSave}>
          Sauvegarder
        </button>
      </div>
      {lastFiveSavedCounts.length > 0 && (
        <div className="saved-counts-container">
          {lastFiveSavedCounts.map((savedCount, index) => (
            <div key={index} className="saved-count">
              {savedCount}
            </div>
          ))}
        </div>
      )}
      <button className="button export-button" onClick={handleExport}>
        Exporter les résultats
      </button>
    </div>
  );
}

export default Compteur;
