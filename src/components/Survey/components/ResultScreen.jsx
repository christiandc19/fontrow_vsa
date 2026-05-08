import React from "react";

export default function ResultScreen({
  result,
  client,
  onRestart,
  onPrimaryAction,
}) {
  if (!result) return null;

  const logo = client?.survey?.branding?.logo || client?.logoUrl;

  return (
    <div className="result-screen">
      <div className="result-card">
        {logo && (
          <img
            src={logo}
            alt={client?.communityName || "Client logo"}
            className="result-logo"
          />
        )}

        <div className="result-kicker">Your Recommendation</div>

        <h1 className="result-title">{result.title}</h1>

        <p className="result-description">{result.description}</p>

        <div className="result-actions">
          <button
            type="button"
            className="result-btn result-btn-primary"
            onClick={onPrimaryAction}
          >
            {result.cta || "Keep Exploring"}
          </button>

          <button
            type="button"
            className="result-btn result-btn-secondary"
            onClick={onRestart}
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
}