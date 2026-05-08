import React, { useState } from "react";

export default function OptionsFlow({ config }) {
  const options = config?.options || [];
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleClick = (option) => {
    if (option.message) {
      setSelectedMessage(option.message);
    }
  };

  return (
    <div className="options-flow-container">
      {/* MESSAGE FIRST */}
      {selectedMessage && (
        <div className="chat-message bot options-message">
          {selectedMessage}
        </div>
      )}

      {/* OPTIONS SECOND */}
      <div className="chatbox-ctas options-buttons">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className="cta-btn"
            onClick={() => handleClick(option)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}