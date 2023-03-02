import React, { useState, useRef } from 'react';
import '../styles/App.css';
import '../variables.css';

function Chronometre() {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [savedTimes, setSavedTimes] = useState([]);
  const intervalRef = useRef(null);

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
        <button className="button" onClick={handleSave}>
          Sauvegarder
        </button>
        <button className="button" onClick={handleReset}>
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
    </div>
  );
}

export default Chronometre;
