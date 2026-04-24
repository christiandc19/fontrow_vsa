import React from "react";

export default function ChatHeader({ onClose, title, subtitle, logoUrl }) {
  return (
    <div className="chatbox-header">
      <div className="chatbox-header-left">
        {logoUrl && <img src={logoUrl} alt="Logo" className="chatbox-logo" />}

        <div className="chatbox-header-text">
          <div className="chatbox-title">{title}</div>
          <div className="chatbox-subtitle">{subtitle}</div>
        </div>
      </div>

      <button
        className="chat-close-btn"
        onClick={onClose}
        type="button"
        aria-label="Close chat"
      >
        ×
      </button>
    </div>
  );
}