import React, { useState, useRef, useEffect } from 'react';
import '../styles/Minuteur.css';
import '../variables.css';

function Minuteur() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [canStart, setCanStart] = useState(true); // Add canStart state variable
  const intervalRef = useRef(null);

  const handleStart = () => {
    if (canStart && (hours > 0 && minutes > 0 && seconds > 0)) {
      setIsActive(true);
      setCanStart(false);
    }
  };  
  
  const handleStop = (currentTimer) => {
    clearInterval(intervalRef.current);
    setTimer(currentTimer);
    setIsActive(false);
    setCanStart(true);
  };  
  
  const handleReset = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setTimer(0);
    setIsActive(false);
    setCanStart(true); // Set canStart to true
    handleStop(); // Stop the timer
  };

  const formatTime = (time) => {
    let hours = Math.floor(time / 3600).toString().padStart(2, '0');
    let minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    let seconds = (time % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    const name = e.target.name;
    if (!isNaN(value)) {
      switch (name) {
        case 'hours':
          setHours(value);
          break;
        case 'minutes':
          setMinutes(value);
          break;
        case 'seconds':
          setSeconds(value);
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    setTimer(totalSeconds);
    setIsActive(true);
  };

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isActive]);

  return (
    <div className="Minuteur">
      <h1 className="title">Minuteur</h1>
      <div className="timer-container">
        <p className="timer">{formatTime(timer)}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="minuteur-inputs">
          <div className="input-container">
            <label htmlFor="hours">Heures:</label>
            <input type="number" id="hours" name="hours" min="0" value={hours} onChange={handleInputChange} />
          </div>
          <div className="input-container">
            <label htmlFor="minutes">Minutes:</label>
            <input type="number" id="minutes" name="minutes" min="0" max="59" value={minutes} onChange={handleInputChange} />
          </div>
          <div className="input-container">
            <label htmlFor="seconds">Secondes:</label>
            <input type="number" id="seconds" name="seconds" min="0" max="59" value={seconds} onChange={handleInputChange} />
          </div>
        </div>
        <div className="button-container">
          {!isActive ? (
            <button className="button" onClick={handleStart}>
              Démarrer
            </button>
          ) : (
            <button className="button" onClick={() => handleStop(timer)}>
              Arrêter
            </button>
          )}
          <button className="button" onClick={handleReset}>
            Réinitialiser
          </button>
        </div>
      </form>
    </div>
  );
  
}

export default Minuteur;