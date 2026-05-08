import React from "react";
import ReactDOM from "react-dom/client";
import { MemoryRouter } from "react-router-dom";

import ChatBox from "./components/ChatBox/ChatBox";
import SurveyEmbed from "./components/SurveyEmbed/SurveyEmbed";

import "./components/ChatBox/ChatBox.css";
import "./components/SurveyEmbed/SurveyEmbed.css";

window.WebSmartAssistant = function (config = {}) {
  const type = config.type || "chatbot";

  const rootId =
    type === "survey"
      ? `websmartassistant-survey-root-${config.surveyKey || "default"}`
      : "websmartassistant-root";

  const existing = document.getElementById(rootId);
  if (existing) existing.remove();

  const container = document.createElement("div");
  container.id = rootId;

  const target = config.target
    ? document.querySelector(config.target)
    : document.body;

  if (!target) {
    console.error("WebSmartAssistant target not found:", config.target);
    return;
  }

  target.appendChild(container);

  const root = ReactDOM.createRoot(container);

  root.render(
    <MemoryRouter>
      {type === "survey" ? (
        <SurveyEmbed
          clientKey={config.clientKey}
          surveyKey={config.surveyKey || "senior-living"}
        />
      ) : (
        <ChatBox config={config} />
      )}
    </MemoryRouter>
  );
};