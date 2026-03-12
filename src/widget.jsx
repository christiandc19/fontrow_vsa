import React from "react";
import ReactDOM from "react-dom/client";
import ChatBox from "./components/ChatBox/ChatBox";
import "./components/ChatBox/ChatBox.css";

window.WebSmartAssistant = function (config = {}) {
  const existing = document.getElementById("websmartassistant-root");
  if (existing) existing.remove();

  const container = document.createElement("div");
  container.id = "websmartassistant-root";
  document.body.appendChild(container);

  const root = ReactDOM.createRoot(container);
  root.render(<ChatBox config={config} />);
};