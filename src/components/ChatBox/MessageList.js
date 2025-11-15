import React from 'react';

const MessageList = ({ messages }) => (
  <div className="chatbox-messages">
    {messages.length === 0 ? (
      <div className="welcome-message">Hello! How can I help you?</div>
    ) : (
      messages.map((msg, index) => (
        <div key={index} className={`message ${msg.sender}`}>
          {msg.text}
        </div>
      ))
    )}
  </div>
);

export default MessageList;
