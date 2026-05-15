import React from "react";

export default function CommunityLifeFlow({ communityLife, onSelectFlow, onBack }) {
  const buttons = communityLife?.buttons || [];
  const intro =
    communityLife?.intro ||
    "Explore community life. Choose an option below to learn more.";

  const handleClick = (button) => {
    if (button.type === "link" && button.url) {
      window.location.href = button.url;
      return;
    }

    if (button.type === "flow" && button.flowId) {
      onSelectFlow(button.flowId);
    }
  };

  return (
    <div className="options-flow-container options-slide-up">
      <div className="chat-message bot options-message">{intro}</div>

      <div className="chatbox-ctas options-buttons">
        {buttons.map((button) => (
          <button
            key={button.id}
            type="button"
            className="cta-btn"
            onClick={() => handleClick(button)}
          >
            {button.label}
          </button>
        ))}

        <button type="button" className="cta-btn" onClick={onBack}>
          Back to Main Menu
        </button>
      </div>
    </div>
  );
}