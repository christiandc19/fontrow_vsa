import React from "react";
import ReactDOM from "react-dom/client";

import ChatBox from "./components/ChatBox/ChatBox";

import "./components/ChatBox/ChatBox.css";

window.WebSmartAssistant = function (config = {}) {
  const rootId = "websmartassistant-root";

  const existing = document.getElementById(rootId);

  if (existing) {
    existing.remove();
  }

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

  root.render(<ChatBox config={config} />);
};