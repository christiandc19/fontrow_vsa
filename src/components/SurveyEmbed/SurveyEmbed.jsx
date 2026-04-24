import React from "react";
import { getClientConfig } from "../../chatbots/registry";
import "./SurveyEmbed.css";

export default function SurveyEmbed({
  clientKey = "robin-run",
  surveyKey = "senior-living",
}) {
  const client = getClientConfig(clientKey);

  const title =
    client?.survey?.embed?.title || "Is Senior Living the Right Next Step?";

  const subtitle =
    client?.survey?.embed?.subtitle ||
    "Learn about your options and get personalized results with this quick assessment.";

  const buttonLabel =
    client?.survey?.embed?.buttonLabel || "Start Now";

  const poweredBy =
    client?.survey?.embed?.poweredBy || "Powered by WebSmartAssistant";

  const primaryColor =
    client?.survey?.branding?.primaryColor || "#8b2c1a";

  const primaryHoverColor =
    client?.survey?.branding?.primaryHoverColor || "#6f2215";

  const surveyUrl = `/assessments/${clientKey}/${surveyKey}`;

  return (
    <div className="wsa-survey-embed">
      <div className="wsa-survey-embed-card">
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

        <div className="wsa-survey-embed-powered">
          {poweredBy}
        </div>
      </div>
    </div>
  );
}