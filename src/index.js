import React from "react";
import ReactDOM from "react-dom/client";
import ChatBox from "./components/ChatBox/ChatBox";
import "./index.css";
import App from "./App";

// Expose globally so WordPress can access your widget
window.ChatBox = ChatBox;
window.React = React;
window.ReactDOM = ReactDOM;

// NORMAL APP RENDER (so local dev is NOT blank)
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
