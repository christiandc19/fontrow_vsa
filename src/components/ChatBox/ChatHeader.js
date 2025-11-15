import React from 'react';

const ChatHeader = ({ toggleChat }) => (
  <div className="chatbox-header">
    <h3>Chat</h3>
    <button onClick={toggleChat} className="close-btn">✕</button>
  </div>
);

export default ChatHeader;
