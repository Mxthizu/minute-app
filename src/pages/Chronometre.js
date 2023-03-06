import React, { useState, useRef } from 'react';
import '../styles/App.css';
import '../variables.css';
import Popup from "../components/Popup";

function Chronometre() {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [savedTimes, setSavedTimes] = useState([]);
  const intervalRef = useRef(null);
  const MAX_SAVED_TIMES = 25;
  const POPUP_TITLE = "Nombre maximal de temps sauvegardés atteint";
  const POPUP_MESSAGE = `Vous ne pouvez pas sauvegarder plus de ${MAX_SAVED_TIMES} temps.`;
  const [showPopup, setShowPopup] = useState(false);
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleStart = () => {
    setIsActive(true);
    intervalRef.current = setInterval(() => {
      setTimer((timer) => timer + 10);
    }, 10);
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
  };

  const handleSave = () => {
    if (savedTimes.length >= MAX_SAVED_TIMES) {
      setShowPopup(true);
      return;
    }
    setSavedTimes([...savedTimes, timer]);
  };

  const handleReset = () => {
    setSavedTimes([]);
    setTimer(0);
    clearInterval(intervalRef.current);
    setIsActive(false);
  };

  const formatTime = (time) => {
    const date = new Date(time);
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const milliseconds = Math.floor(date.getMilliseconds() / 10)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}.${milliseconds}`;
  };

  const handleExport = () => {
    // Créez un nouveau blob contenant les temps sauvegardés
    const blob = new Blob([savedTimes.map((time) => formatTime(time)).join('\n')], {
      type: 'text/plain;charset=utf-8',
    });
  
    // Créez une URL de données pour le blob
    const url = URL.createObjectURL(blob);
  
    // Créez un lien pour télécharger le fichier
    const link = document.createElement('a');
    link.href = url;
    link.download = 'saved_times.txt';
  
    // Cliquez sur le lien pour télécharger le fichier
    link.click();
  
    // Libérez l'URL de données
    URL.revokeObjectURL(url);
  }; 

  const handleDeleteAll = () => {
    setSavedTimes([]);
  };

  return (
    <div className="Chronometre">
      <h1 className="title">Chronomètre</h1>
      <p className="timer">{formatTime(timer)}</p>
      <div className="button-container">
        {!isActive ? (
          <button className="button" onClick={handleStart}>
          Start
        </button>
        ) : (
          <button className="button" onClick={handleStop}>
            Stop
          </button>
        )}
        <button className={`button`}
          onClick={handleSave}>
          Sauvegarder
        </button>
        <button className={`button`} onClick={handleReset}>
          Reset
        </button>
        </div>
        {savedTimes.length > 0 && (
          <div className="saved-times-container">
            {savedTimes.map((savedTime, index) => (
              <div key={index} className="saved-time">
                {formatTime(savedTime)}
              </div>
            ))}
          </div>
        )}
        {showPopup && (
          <Popup
            message={POPUP_MESSAGE}
            title={POPUP_TITLE}
            onClose={handleClosePopup}
          />
        )}
        {savedTimes.length > 0 && (
          <div>
            <button className={`button`} onClick={handleExport}>
              Exporter
            </button>
            <button className="button button-delete" onClick={handleDeleteAll}>
              Supprimer tout
            </button>
          </div>
        )}
    </div>
  )
}

export default Chronometre;
