const ChatHeader = ({ onClose, communityName, logoUrl }) => (
  <div className="chatbox-header">
    <div className="chatbox-header-left">
      {logoUrl && (
        <img src={logoUrl} alt="Community Logo" className="chatbox-logo" />
      )}
      <div className="chatbox-header-text">
        <div className="chatbox-title">Chat with {communityName}</div>
        <div className="chatbox-subtitle">
          We’re here to help you explore options.
        </div>
      </div>
    </div>
    <button className="chat-close-btn" onClick={onClose}>×</button>
  </div>
);
