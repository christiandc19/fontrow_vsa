// This line of code is for local development and testing. It renders the App component into the root element of the HTML document. In production, the FontRowChatbot function will be used to render the ChatBox component instead.
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// This line of code is for production. It defines a global function FontRowChatbot that takes a configuration object as an argument. It creates a new div element, appends it to the body of the document, and renders the ChatBox component into that div using ReactDOM.createRoot. The ChatBox component receives the configuration object as a prop.
// import React from "react";
// import ReactDOM from "react-dom/client";
// import ChatBox from "./components/ChatBox/ChatBox";
// import "./index.css";

// window.FontRowChatbot = function (config = {}) {
//   let container = document.getElementById("fontrow-chatbot-root");

//   if (!container) {
//     container = document.createElement("div");
//     container.id = "fontrow-chatbot-root";
//     document.body.appendChild(container);
//   }

//   if (!container._root) {
//     container._root = ReactDOM.createRoot(container);
//   }

//   container._root.render(<ChatBox config={config} />);
// };