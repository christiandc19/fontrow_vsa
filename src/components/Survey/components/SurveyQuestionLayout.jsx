import React from "react";
import "./SurveyQuestionLayout.css";

export default function SurveyQuestionLayout({
  title,
  subtitle,
  question,
  options = [],
  selected,
  onSelect,
  onNext,
}) {
  return (
    <div className="survey-step-page">
      <header className="survey-step-header">
        <h2>{title}</h2>
      </header>

      <main className="survey-step-main">
        <div className="survey-step-content">
          <p>{subtitle}</p>
          <h1>{question}</h1>

          <div className="survey-options">
            {options.map((opt) => (
              <button
                key={opt.value}
                className={
                  selected === opt.value
                    ? "option selected"
                    : "option"
                }
                onClick={() => onSelect(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <button
            className="next-btn"
            disabled={!selected}
            onClick={onNext}
          >
            Next →
          </button>
        </div>
      </main>
    </div>
  );
}