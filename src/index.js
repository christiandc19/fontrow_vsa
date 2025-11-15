import React from "react";
import ReactDOM from "react-dom/client";
import ChatBox from "./components/ChatBox/ChatBox";
import "./index.css";

// Expose globally for WordPress
window.ChatBox = ChatBox;
window.React = React;
window.ReactDOM = ReactDOM;

// DO NOT RENDER ANYTHING HERE
// NO <App /> rendering
// NO root
// NO StrictMode
