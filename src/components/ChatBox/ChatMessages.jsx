import React from "react";

export default function ChatMessages({ messages }) {
  return (
    <div className="chat-messages">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`chat-message ${msg.sender} ${msg.isWelcome ? "welcome" : ""}`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
}