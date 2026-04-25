import React from "react";

export default function BubbleStep({ question, options, selected, onSelect }) {
  return (
    <div className="step-block">
      {question && <div className="step-question">{question}</div>}

      <div className="bubble-group">
        {options.map((option) => (
          <button
            key={option}
            className={`bubble ${selected === option ? "selected" : ""}`}
            onClick={() => onSelect(option)}
            type="button"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}