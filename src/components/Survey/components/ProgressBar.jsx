import React from "react";

export default function ProgressBar({ currentStep, totalSteps }) {
  const progress = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="survey-progress">
      <div className="survey-progress-meta">
        <span>
          Step {currentStep} of {totalSteps}
        </span>
        <span>{progress}%</span>
      </div>

      <div className="survey-progress-track">
        <div
          className="survey-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}