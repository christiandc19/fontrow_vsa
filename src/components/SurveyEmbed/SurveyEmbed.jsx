import React from "react";
import { getClientConfig } from "../../chatbots/registry";
import "./SurveyEmbed.css";

export default function SurveyEmbed({
  clientKey = "demo",
  surveyKey = "senior-living",
}) {
  const client = getClientConfig(clientKey);

  const title =
    client?.survey?.embed?.title || "Is Senior Living the Right Next Step?";

  const subtitle =
    client?.survey?.embed?.subtitle ||
    "Learn about your options and get personalized results with this quick assessment.";

  const buttonLabel =
    client?.survey?.embed?.buttonLabel || "Start Assessment";

  const poweredBy =
    client?.survey?.embed?.poweredBy || "Powered by WebSmartAssistant";

  const primaryColor =
    client?.survey?.branding?.primaryColor || "#2f5d50";

  const primaryHoverColor =
    client?.survey?.branding?.primaryHoverColor || "#24483f";

  const heroImage =
    client?.survey?.branding?.heroImages?.[surveyKey] ||
    "/images/surveys/senior-living-survey-hero.webp";

  const surveyUrl = `/assessments/${clientKey}/${surveyKey}`;

  return (
    <section className="wsa-survey-embed">
      <div className="wsa-survey-embed-card">
        
        {/* LEFT CONTENT */}
        <div className="wsa-survey-embed-content">
          <span className="wsa-survey-kicker">Free Assessment</span>

          <h2>{title}</h2>

          <p>{subtitle}</p>

          <a
            href={surveyUrl}
            className="wsa-survey-embed-btn"
            style={{ backgroundColor: primaryColor }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = primaryHoverColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = primaryColor;
            }}
          >
            {buttonLabel}
          </a>

          <small className="wsa-survey-note">
            Takes 3–5 minutes • Private & secure
          </small>

          <div className="wsa-survey-embed-powered">
            {poweredBy}
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="wsa-survey-embed-image">
          <img src={heroImage} alt="Survey visual" />
        </div>

      </div>
    </section>
  );
}