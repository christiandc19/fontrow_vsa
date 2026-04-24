import React from "react";

export default function GuideFlow({ onSelectGuide }) {
  const guides = [
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

  return (
    <div className="chatbox-ctas">
      {guides.map((guide) => (
        <button
          key={guide.id}
          type="button"
          className="cta-btn"
          onClick={() => onSelectGuide(guide)}
        >
          {guide.label}
        </button>
      ))}
    </div>
  );
}