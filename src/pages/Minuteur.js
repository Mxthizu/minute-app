import React, { useState, useRef } from 'react';
import '../styles/App.css';
import '../variables.css';
import '../styles/Minuteur.css'

function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const handleStart = () => {
    if (time > 0) {
      setIsRunning(true);
      setIsPaused(false);
      if (!intervalRef.current) {
        setTime(time);
      }
      intervalRef.current = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    }
  };  

  const handlePause = () => {
    clearInterval(intervalRef.current);
    setIsPaused(true);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsPaused(false);
    setTime(0);
    document.querySelectorAll('input[type=number]').forEach(input => input.value = 0);
    intervalRef.current = null;
  };   

  const handleHoursChange = (e) => {
    setTime(
      e.target.value * 3600 +
        Math.floor((time - Math.floor(time / 3600) * 3600) / 60) * 60 +
        Math.floor(time - Math.floor(time / 60) * 60)
    );
  };

  const handleMinutesChange = (e) => {
    setTime(
      Math.floor(time / 3600) * 3600 +
        e.target.value * 60 +
        Math.floor(time - Math.floor(time / 60) * 60)
    );
  };

  const handleSecondsChange = (e) => {
    setTime(
      Math.floor(time / 3600) * 3600 +
        Math.floor((time - Math.floor(time / 3600) * 3600) / 60) * 60 +
        parseInt(e.target.value)
    );
  };

  const formatTime = (time) => {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time - hours * 3600) / 60);
    let seconds = time - hours * 3600 - minutes * 60;

    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="Timer">
      <h1 className="title">Minuteur</h1>
      <p className="timer">{formatTime(time)}</p>
      <div className="time-selection">
        <div>
          <label>Heures:</label>
          <input type="number" min="0" max="23" defaultValue={Math.floor(time / 3600)} onChange={handleHoursChange} />
        </div>
        <div>
          <label>Minutes:</label>
          <input type="number" min="0" max="59" defaultValue={Math.floor((time % 3600) / 60)} onChange={handleMinutesChange} />
        </div>
        <div>
          <label>Secondes:</label>
          <input type="number" min="0" max="59" defaultValue={time % 60} onChange={handleSecondsChange} />
        </div>
      </div>
      <div className="button-container">
      {!isRunning && (
        <button className="button" onClick={handleStart}>
          Démarrer
        </button>
      )}
      {isRunning && isPaused && (
        <button className="button" onClick={() => {
          setIsPaused(false);
          handleStart();
        }}>
          Reprise
        </button>
      )}
        {isRunning && !isPaused && (
          <button className="button" onClick={handlePause}>
            Pause
          </button>
        )}
        {(isRunning || isPaused) && (
          <button className="button" onClick={handleReset}>
            Réinitialiser
          </button>
        )}
      </div>
    </div>
  );   
}

export default Timer;
