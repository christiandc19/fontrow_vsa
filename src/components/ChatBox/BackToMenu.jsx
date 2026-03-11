import React from 'react';
import './BackToMenu.css';

const BackToMenu = ({ handleBack }) => (
  <div className="back-to-menu-container">
    <button className="back-to-menu-btn" onClick={handleBack}>
      ← Back to Menu
    </button>
  </div>
);

export default BackToMenu;
