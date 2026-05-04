import React from "react";
import "./SurveyQuestionLayout.css";

export default function SurveyQuestionLayout({
  title,
  section,
  intro,
  question,
  helperSubtitle,
  options = [],
  selected,
  onSelect,
  onNext,
  help,
  onBack,
  showBack,
  currentStep,
  totalSteps,
}) {
  const progress =
    totalSteps > 0 ? Math.round((currentStep / totalSteps) * 100) : 0;

  return (
    <div className="survey-split">
      <section className="survey-left">
        <div>
          <div className="survey-topbar">
            <h2 className="survey-topbar-title">{title}</h2>
          </div>

          <div className="survey-step-row">
            <span className="survey-step">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="survey-step-percent">{progress}%</span>
          </div>

          <div className="survey-progress-bar">
            <div
              className="survey-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="survey-question-wrap">
            {section && <p className="survey-section">{section}</p>}
            {intro && <p className="survey-left-guide">{intro}</p>}

            <h1 className="survey-title">{question}</h1>

            {helperSubtitle && (
              <p className="survey-subtitle">{helperSubtitle}</p>
            )}

            <div className="survey-options">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`survey-option-btn ${
                    selected === opt.value ? "selected" : ""
                  }`}
                  onClick={() => onSelect(opt.value)}
                >
                  <span className="survey-indicator" />
                  <span className="survey-option-label">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="survey-footer">
          {showBack ? (
            <button
              type="button"
              className="survey-btn survey-btn-prev"
              onClick={onBack}
            >
              ← Back
            </button>
          ) : (
            <span />
          )}

          <button
            type="button"
            className="survey-btn survey-btn-next"
            disabled={!selected}
            onClick={onNext}
          >
            Next →
          </button>
        </div>
      </section>

      <aside className="survey-right">
        <h3 className="survey-help-title">
          {help?.title || "Helpful Guide"}
        </h3>

        <p className="survey-help-text">
          {help?.text ||
            "Choose the answer that best matches your current situation."}
        </p>

        <p className="survey-help-secondary">
          Your answers are private and only used to help personalize your result.
        </p>
      </aside>
    </div>
  );
}