import React from "react";

export default function QuestionScreen({
  question,
  currentStep,
  totalSteps,
  answers,
  onSelect,
  onBack,
  onNext,
  surveyTitle,
  clientLogo,
}) {
  const safeCurrentStep = Number(currentStep) || 1;
  const safeTotalSteps = Number(totalSteps) || 1;
  const progress = Math.round((safeCurrentStep / safeTotalSteps) * 100);

  const currentAnswer = answers?.[question.id];
  const audience = answers?.whoFor?.value || "someoneElse";

  const resolveCopy = (field) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    if (typeof field === "object") {
      return field[audience] || field.someoneElse || field.self || "";
    }
    return "";
  };

  const isSelected = (option) => {
    if (question.multi) {
      return Array.isArray(currentAnswer)
        ? currentAnswer.some((item) => item.value === option.value)
        : false;
    }

    return currentAnswer?.value === option.value;
  };

  const handleOptionClick = (option) => {
    if (typeof onSelect !== "function") return;

    if (question.multi) {
      const existing = Array.isArray(currentAnswer) ? currentAnswer : [];
      const alreadySelected = existing.some((item) => item.value === option.value);

      const nextValue = alreadySelected
        ? existing.filter((item) => item.value !== option.value)
        : [...existing, option];

      onSelect(question, nextValue);
      return;
    }

    onSelect(question, option);
  };

  const canContinue = question.multi
    ? Array.isArray(currentAnswer) && currentAnswer.length > 0
    : !!currentAnswer;

  return (
    <div className="survey-split">
      <div className="survey-left">
        <div>
          <div className="survey-topbar">
            <div className="survey-topbar-title">
              {surveyTitle || "Assessment"}
            </div>

            {clientLogo ? (
              <img
                src={clientLogo}
                alt="Client logo"
                className="survey-topbar-logo"
              />
            ) : null}
          </div>

          <div className="survey-step-row">
            <span className="survey-step">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="survey-step-percent">
              {Math.round((currentStep / totalSteps) * 100)}%
            </span>
          </div>

          <div className="survey-progress-bar">
            <div
              className="survey-progress-fill"
              style={{
                width: `${Math.round((currentStep / totalSteps) * 100)}%`,
              }}
            />
          </div>

          <div className="survey-question-wrap">
            {question.section && (
              <div className="survey-section">{resolveCopy(question.section)}</div>
            )}

            {question.intro && (
              <div className="survey-intro">{resolveCopy(question.intro)}</div>
            )}

            <h1 className="survey-title">{resolveCopy(question.title)}</h1>

            {question.subtitle && (
              <p className="survey-subtitle">{resolveCopy(question.subtitle)}</p>
            )}




            {question.type === "select" ? (
              <div className="survey-select-wrap">
                <select
                  className="survey-select"
                  value={currentAnswer?.value || ""}
                  onChange={(e) => {
                    const selected = question.options.find(
                      (opt) => opt.value === e.target.value
                    );
                    if (selected) {
                      onSelect(question, selected);
                    }
                  }}
                >
                  <option value="">Select one</option>
                  {question.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="survey-options">
                {question.options.map((option) => {
                  const selected = isSelected(option);

                  return (
                    <button
                      key={option.value}
                      type="button"
                      className={`survey-option-btn ${selected ? "selected" : ""}`}
                      onClick={() => handleOptionClick(option)}
                    >
                      <span className="survey-indicator" />
                      <span className="survey-option-label">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        

        <div className="survey-footer">
          <button
            type="button"
            className="survey-btn survey-btn-prev"
            onClick={onBack}
          >
            ← Previous
          </button>

          <button
            type="button"
            className="survey-btn survey-btn-next"
            onClick={onNext}
            disabled={!canContinue}
          >
            Next →
          </button>
        </div>
      </div>

      <aside className="survey-right">
        <div className="survey-help-title">
          {resolveCopy(question.help?.title) || "Why this matters"}
        </div>

        <div className="survey-help-text">
          {resolveCopy(question.help?.text) ||
            resolveCopy(question.tip) ||
            "This question helps us better understand the situation so the guidance feels more relevant."}
        </div>

        {question.tip &&
          resolveCopy(question.help?.text) !== resolveCopy(question.tip) && (
            <div className="survey-help-secondary">
              {resolveCopy(question.tip)}
            </div>
          )}
      </aside>
    </div>
  );
}