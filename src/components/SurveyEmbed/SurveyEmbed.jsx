import React from "react";
import { getClientConfig } from "../../chatbots/registry";
import "./SurveyEmbed.css";

export default function SurveyEmbed({
  clientKey = "demo",
  surveyKey = "senior-living",
}) {
  const client = getClientConfig(clientKey);

const defaultContent = {
  "senior-living": {
    title: "Is Senior Living the Right Next Step?",
    subtitle:
      "Learn about your options and get personalized guidance with this quick assessment.",
    image:
      "https://cdn.websmartassistant.com/widget/v1.8.7/images/senior-living-survey-hero.webp",
    alt: "Senior living assessment",
  },
  downsizing: {
    title: "Would Downsizing Make Life Easier Right Now?",
    subtitle:
      "Explore whether simplifying the home and daily responsibilities may be helpful.",
    image:
      "https://cdn.websmartassistant.com/widget/v1.8.7/images/downsizing-survey-hero.webp",
    alt: "Downsizing assessment",
  },
  "memory-support": {
    title: "Could Memory Support Be the Right Next Step?",
    subtitle:
      "Answer a few quick questions to better understand whether memory support may be helpful.",
      image:
      "https://cdn.websmartassistant.com/widget/v1.8.7/images/memory-survey-hero.webp",
    alt: "Memory support assessment",
  },
  affordability: {
    title: "What Could Senior Living Cost for Your Situation?",
    subtitle:
      "Get guidance around planning, budgeting, and comparing senior living options.",
    image:
    "https://cdn.websmartassistant.com/widget/v1.8.7/images/affordability-survey-hero.webp",
  },
};


  const content = defaultContent[surveyKey] || defaultContent["senior-living"];

  const title =
    client?.survey?.embed?.[surveyKey]?.title || content.title;

  const subtitle =
  client?.survey?.embed?.[surveyKey]?.subtitle || content.subtitle;

  const buttonLabel =
    client?.survey?.embed?.buttonLabel || "Start Assessment";

  const poweredBy =
    client?.survey?.embed?.poweredBy || "Powered by WebSmartAssistant";

  const primaryColor =
    client?.survey?.branding?.primaryColor || "#2f5d50";

  const primaryHoverColor =
    client?.survey?.branding?.primaryHoverColor || "#24483f";

  const surveyUrl = `https://tools.websmartassistant.com/assessments/${clientKey}/${surveyKey}`;


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
            <img src={content.image} alt={content.alt} />        
        </div>

      </div>
    </section>
  );
}