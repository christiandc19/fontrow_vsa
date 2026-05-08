import React from "react";

export default function GuideFlow({ config, onSelectGuide }) {
  const guides =
    config?.guideOptions || [
      {
        id: "senior-living",
        label: "Is Senior Living the Right Next Step?",
      },
      {
        id: "downsizing",
        label: "Would Downsizing Make Life Easier Right Now?",
      },
      {
        id: "memory-support",
        label: "Could Memory Support Be the Right Next Step?",
      },
      {
        id: "affordability",
        label: "What Could Senior Living Cost for Your Situation?",
      },
    ];

  const handleGuideClick = (guide) => {
    // Web Smart Assistant/product clients: open URL
    if (guide.url) {
      window.location.href = guide.url;
      return;
    }

    // Robin Run/survey clients: keep existing survey behavior
    if (onSelectGuide) {
      onSelectGuide(guide);
    }
  };

  return (
    <div className="chatbox-ctas">
      {guides.map((guide) => (
        <button
          key={guide.id}
          type="button"
          className="cta-btn"
          onClick={() => handleGuideClick(guide)}
        >
          {guide.label}
        </button>
      ))}
    </div>
  );
}