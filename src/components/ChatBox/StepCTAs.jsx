import React from "react";

export default function StepCTAs({ options, onSelect }) {
  return (
    <div className="step-cta-list">
      {options.map((option) => (
        <button
          key={option}
          className="step-cta-btn"
          onClick={() => onSelect(option)}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  );
}