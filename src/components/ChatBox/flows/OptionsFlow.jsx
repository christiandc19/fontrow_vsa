import React, { useEffect, useState } from "react";

export default function OptionsFlow({ config, onBack }) {
  // Controls the typing indicator before submenu buttons appear
  const [isTyping, setIsTyping] = useState(true);

  // Safe fallback if options are missing
  const options = Array.isArray(config?.options)
    ? config.options
    : [];

  // Intro text shown above the submenu buttons
  const optionsIntro =
    config?.optionsIntro ||
    "Choose a living option below to learn more.";

  // Show typing indicator briefly before rendering submenu options
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(false);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  // After submenu buttons appear,
  // scroll just enough so the bottom button becomes visible
  useEffect(() => {
    if (isTyping) return;

    const timer = setTimeout(() => {
      const chatMain = document.querySelector(".chatbox-main");

      if (!chatMain) return;

      chatMain.scrollTo({
        top: chatMain.scrollHeight,
        behavior: "smooth",
      });
    }, 120);

    return () => clearTimeout(timer);
  }, [isTyping]);

  // Handles submenu button links
  const handleClick = (option) => {
    if (option.url) {
      window.location.href = option.url;
    }
  };

  // Typing indicator state
  if (isTyping) {
    return (
      <div className="options-typing-container">
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
      {/* Intro message */}
      <div className="chat-message bot options-message">
        {optionsIntro}
      </div>

      {/* Submenu buttons */}
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

        {/* Return to chatbot main menu */}
        <button
          type="button"
          className="cta-btn"
          onClick={onBack}
        >
          Back to Main Menu
        </button>
      </div>
    </div>
  );
}