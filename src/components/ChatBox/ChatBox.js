import React, { useState } from 'react';
import './ChatBox.css';

const mainCTAs = [
  'Schedule a Visit',
  'Living Options',
  'Community Life',
  'View Floor Plans',
  'Pricing',
  'Job Inquiry',
  'Ask Us Anything',
];

const livingOptionsCTAs = [
  'Independent Living',
  'Assisted Living',
  'Memory Care',
  'Skilled Nursing',
  'Rehabilitation',
];

const communityLifeCTAs = ['About', 'Amenities', 'Dining', 'Events', 'Gallery'];

const pricingLivingOptionsCTAs = [
  'Independent Living',
  'Assisted Living',
  'Memory Care',
  'Skilled Nursing',
  'Not Sure',
  'Other',
];

const whoIsThisForCTAs = ['Myself', 'Parent', 'Spouse', 'Relative', 'Friend', 'Other'];

const timelineCTAs = ['Immediately', '1 to 3 Months', '3 Months +', 'Just Researching'];

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentCTAs, setCurrentCTAs] = useState(mainCTAs);
  const [pricingStep, setPricingStep] = useState(0); // 0 = not started, 1 = select living option, 2 = who is this for, 3 = timeline, 4 = contact info
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setMessages([]);
      setCurrentCTAs(mainCTAs);
      setPricingStep(0);
      setFormData({ name: '', email: '', phone: '' });
    }
  };

  const handleCTA = (cta) => {
    const newMessages = [...messages];

    // Handle Pricing multi-step first
    if (pricingStep > 0) {
      if (pricingStep === 1) {
        newMessages.push({ text: `You selected "${cta}"`, sender: 'bot' });
        newMessages.push({ text: 'Who is this for?', sender: 'bot' });
        setMessages(newMessages);
        setCurrentCTAs(whoIsThisForCTAs);
        setPricingStep(2);
      } else if (pricingStep === 2) {
        newMessages.push({ text: `You selected "${cta}"`, sender: 'bot' });
        newMessages.push({ text: 'What is your timeline?', sender: 'bot' });
        setMessages(newMessages);
        setCurrentCTAs(timelineCTAs);
        setPricingStep(3);
      } else if (pricingStep === 3) {
        newMessages.push({ text: `You selected "${cta}"`, sender: 'bot' });
        newMessages.push({
          text: 'Please provide your first & last name, email, and phone number:',
          sender: 'bot',
        });
        setMessages(newMessages);
        setCurrentCTAs([]);
        setPricingStep(4);
      }
      return;
    }

    // Main CTAs
    if (mainCTAs.includes(cta)) {
      switch (cta) {
        case 'Schedule a Visit':
          newMessages.push({ text: 'Thank you! A representative will reach out to you.', sender: 'bot' });
          setMessages(newMessages);
          setCurrentCTAs([]);
          break;
        case 'Living Options':
          newMessages.push({ text: 'Please select a living option:', sender: 'bot' });
          setMessages(newMessages);
          setCurrentCTAs(livingOptionsCTAs);
          break;
        case 'Community Life':
          newMessages.push({ text: 'What would you like to learn about Community Life?', sender: 'bot' });
          setMessages(newMessages);
          setCurrentCTAs(communityLifeCTAs);
          break;
        case 'View Floor Plans':
          window.open('https://foxwoodseniorliving.org/floor-plans/', '_blank');
          break;
        case 'Pricing':
          newMessages.push({ text: 'What living option are you interested in?', sender: 'bot' });
          setMessages(newMessages);
          setCurrentCTAs(pricingLivingOptionsCTAs);
          setPricingStep(1);
          break;
        case 'Job Inquiry':
          window.open('https://foxwoodseniorliving.org/careers/', '_blank');
          break;
        case 'Ask Us Anything':
          newMessages.push({ text: 'Please type your question below.', sender: 'bot' });
          setMessages(newMessages);
          setCurrentCTAs([]);
          break;
        default:
          break;
      }
      return;
    }

    // Living Options buttons redirect
    if (livingOptionsCTAs.includes(cta)) {
      if (cta === 'Independent Living') {
        window.open('https://foxwoodseniorliving.org/independent-living/', '_blank');
      } else {
        newMessages.push({ text: `You selected "${cta}"`, sender: 'bot' });
        setMessages(newMessages);
      }
      setCurrentCTAs([]);
      return;
    }

    // Community Life
    if (communityLifeCTAs.includes(cta)) {
      newMessages.push({ text: `You selected "${cta}"`, sender: 'bot' });
      setMessages(newMessages);
      setCurrentCTAs([]);
      return;
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const newMessages = [...messages];
    newMessages.push({ text: `Thank you, ${formData.name}. We will contact you soon!`, sender: 'bot' });
    setMessages(newMessages);
    setFormData({ name: '', email: '', phone: '' });
    setCurrentCTAs(mainCTAs);
    setPricingStep(0);
  };

  const handleBackToMenu = () => {
    setMessages([]);
    setCurrentCTAs(mainCTAs);
    setPricingStep(0);
  };

  return (
    <>
      {!isOpen && (
        <button className="chat-toggle-btn" onClick={handleToggle}>
          Chat
        </button>
      )}
      {isOpen && (
        <div className="chatbox-container">
          <div className="chatbox-header">
            <span>Chat with us</span>
            <button className="chat-close-btn" onClick={handleToggle}>
              ×
            </button>
          </div>
          <div className="chatbox-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbox-ctas">
            {currentCTAs.map((cta, idx) => (
              <button key={idx} className="cta-btn" onClick={() => handleCTA(cta)}>
                {cta}
              </button>
            ))}
          </div>
          {pricingStep === 4 && (
            <form className="chat-form" onSubmit={handleSubmitForm}>
              <input
                type="text"
                name="name"
                placeholder="First & Last Name"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleFormChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleFormChange}
                required
              />
              <button type="submit" className="cta-btn">
                Submit
              </button>
            </form>
          )}
          <button className="back-menu-btn" onClick={handleBackToMenu}>
            Back to Menu
          </button>
        </div>
      )}
    </>
  );
};

export default ChatBox;
