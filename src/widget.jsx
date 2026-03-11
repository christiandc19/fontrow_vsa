import "./process-shim.js";
import React from "react";
import ReactDOM from "react-dom/client";
import ChatBox from "./components/ChatBox/ChatBox.jsx";
import "./index.css";
import "./App.css";

function WebSmartAssistant(config = {}) {
  let container = document.getElementById("wsa-widget-root");

  if (!container) {
    container = document.createElement("div");
    container.id = "wsa-widget-root";
    document.body.appendChild(container);
  }

  if (!container._root) {
    container._root = ReactDOM.createRoot(container);
  }

  container._root.render(<ChatBox config={config} />);
}

if (typeof window !== "undefined") {
  window.WebSmartAssistant = WebSmartAssistant;
}

export default WebSmartAssistant;