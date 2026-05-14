import React, { useEffect, useState } from "react";

export default function OptionsFlow({ config, onBack }) {
  const [isTyping, setIsTyping] = useState(true);

  const options = Array.isArray(config?.options) ? config.options : [];

  const optionsIntro =
    config?.optionsIntro || "Choose a living option below to learn more.";

  useEffect(() => {
    // Show typing dots first, then reveal the Living Options content.
    const timer = setTimeout(() => {
      setIsTyping(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = (option) => {
    if (option.url) {
      window.location.href = option.url;
    }
  };

  if (isTyping) {
    return (
      <div className="options-flow-container">
        <div className="chat-message bot typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  return (
    <div className="options-flow-container options-slide-up">
      <div className="chat-message bot options-message">
        {optionsIntro}
      </div>

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

        <button type="button" className="cta-btn" onClick={onBack}>
          Back to Main Menu
        </button>
      </div>
    </div>
  );
}