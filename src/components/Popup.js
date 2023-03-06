import React from "react";
import "../styles/Popup.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function Popup({ title, message, onClose }) {
  return (
    <div className="popup-container">
      <div className="popup">
        <h2 className="popup-title">{title}</h2>
        <button className="popup-close" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <p className="popup-message">{message}</p>
      </div>
    </div>
  );
}

export default Popup;
