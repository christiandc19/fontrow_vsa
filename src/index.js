import React from "react";
import ReactDOM from "react-dom/client";
import ChatBox from "./ChatBox";
import "./index.css";

// 🔥 Expose globally so WordPress can access
window.ChatBox = ChatBox;
window.React = React;
window.ReactDOM = ReactDOM;

// ❗ Do NOT render anything here.
// WordPress will handle mounting using ReactDOM.createRoot()
// inside your footer snippet.
