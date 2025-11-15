import React, { useState, useEffect, useRef } from 'react';
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
  const [pricingStep, setPricingStep] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const [pricingSelections, setPricingSelections] = useState({
    livingOption: null,
    whoIsThisFor: null,
    timeline: null,
  });

  const scrollRef = useRef(null);

  // Scroll to bottom when something changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, pricingSelections, currentCTAs, currentQuestion, pricingStep]);

  // Load state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('chatboxState');
    if (saved) {
      const parsed = JSON.parse(saved);
      setIsOpen(parsed.isOpen ?? false);
      setMessages(parsed.messages ?? []);
      setCurrentCTAs(parsed.currentCTAs ?? mainCTAs);
      setPricingStep(parsed.pricingStep ?? 0);
      setCurrentQuestion(parsed.currentQuestion ?? '');
      setFormData(parsed.formData ?? { name: '', email: '', phone: '' });
      setPricingSelections(parsed.pricingSelections ?? {
        livingOption: null,
        whoIsThisFor: null,
        timeline: null,
      });
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem(
      'chatboxState',
      JSON.stringify({
        isOpen,
        messages,
        currentCTAs,
        pricingStep,
        currentQuestion,
        formData,
        pricingSelections,
      })
    );
  }, [isOpen, messages, currentCTAs, pricingStep, currentQuestion, formData, pricingSelections]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setMessages([]);
      setCurrentCTAs(mainCTAs);
      setPricingStep(0);
      setCurrentQuestion('');
      setFormData({ name: '', email: '', phone: '' });
      setPricingSelections({ livingOption: null, whoIsThisFor: null, timeline: null });
    }
  };

  const handlePreviousSelectionChange = (step, option) => {
    setPricingSelections((prev) => {
      const newSelections = { ...prev, [step]: option };

      if (step === 'livingOption') {
        newSelections.whoIsThisFor = null;
        newSelections.timeline = null;
        setCurrentQuestion('Who is this for?');
        setCurrentCTAs(whoIsThisForCTAs);
        setPricingStep(2);
      } else if (step === 'whoIsThisFor') {
        newSelections.timeline = null;
        setCurrentQuestion('What is your timeline?');
        setCurrentCTAs(timelineCTAs);
        setPricingStep(3);
      } else if (step === 'timeline') {
        setCurrentQuestion('Please provide your first & last name, email, and phone number:');
        setCurrentCTAs([]);
        setPricingStep(4);
      }

      return newSelections;
    });
  };

  const handleCTA = (cta) => {
    const newMessages = [...messages];

    // Pricing multi-step
    if (pricingStep > 0 || cta === 'Pricing') {
      if (cta === 'Pricing') {
        setCurrentQuestion('What living option are you interested in?');
        setCurrentCTAs(pricingLivingOptionsCTAs);
        setPricingStep(1);
        return;
      }

      if (pricingStep === 1 && pricingLivingOptionsCTAs.includes(cta)) {
        setPricingSelections((prev) => ({ ...prev, livingOption: cta }));
        setCurrentQuestion('Who is this for?');
        setCurrentCTAs(whoIsThisForCTAs);
        setPricingStep(2);
        return;
      }

      if (pricingStep === 2 && whoIsThisForCTAs.includes(cta)) {
        setPricingSelections((prev) => ({ ...prev, whoIsThisFor: cta }));
        setCurrentQuestion('What is your timeline?');
        setCurrentCTAs(timelineCTAs);
        setPricingStep(3);
        return;
      }

      if (pricingStep === 3 && timelineCTAs.includes(cta)) {
        setPricingSelections((prev) => ({ ...prev, timeline: cta }));
        setCurrentQuestion('Please provide your first & last name, email, and phone number:');
        setCurrentCTAs([]);
        setPricingStep(4);
        return;
      }
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
          window.open('https://example.com', '_blank');
          break;
        case 'Job Inquiry':
          window.open('https://example.com', '_blank');
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

    // Living Options → external links
    if (livingOptionsCTAs.includes(cta)) {
      window.open('https://example.com', '_blank');
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
    setPricingSelections({ livingOption: null, whoIsThisFor: null, timeline: null });
    setCurrentQuestion('');
  };

  const handleBackToMenu = () => {
    setMessages([]);
    setCurrentCTAs(mainCTAs);
    setPricingStep(0);
    setPricingSelections({ livingOption: null, whoIsThisFor: null, timeline: null });
    setCurrentQuestion('');
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

          {/* Messages + Pricing Scroll */}
          <div className="chatbox-messages" ref={scrollRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}

            {/* Pricing bubbles + questions */}
            <div className="pricing-scroll-container">
              {pricingSelections.livingOption && (
                <div className="pricing-question-block">
                  <div className="previous-question">What living option are you interested in?</div>
                  <div className="pricing-option-bubbles">
                    {pricingLivingOptionsCTAs.map((option) => (
                      <div
                        key={option}
                        className={`bubble ${pricingSelections.livingOption === option ? 'selected' : ''}`}
                        onClick={() => handlePreviousSelectionChange('livingOption', option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {pricingSelections.whoIsThisFor && (
                <div className="pricing-question-block">
                  <div className="previous-question">Who is this for?</div>
                  <div className="pricing-option-bubbles">
                    {whoIsThisForCTAs.map((option) => (
                      <div
                        key={option}
                        className={`bubble ${pricingSelections.whoIsThisFor === option ? 'selected' : ''}`}
                        onClick={() => handlePreviousSelectionChange('whoIsThisFor', option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {pricingSelections.timeline && (
                <div className="pricing-question-block">
                  <div className="previous-question">What is your timeline?</div>
                  <div className="pricing-option-bubbles">
                    {timelineCTAs.map((option) => (
                      <div
                        key={option}
                        className={`bubble ${pricingSelections.timeline === option ? 'selected' : ''}`}
                        onClick={() => handlePreviousSelectionChange('timeline', option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {pricingStep > 0 && pricingStep < 4 && currentQuestion && (
                <div className="current-question">{currentQuestion}</div>
              )}

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
            </div>
          </div>

          {/* Current CTAs */}
          <div className="chatbox-ctas">
            {currentCTAs.map((cta, idx) => (
              <button key={idx} className="cta-btn" onClick={() => handleCTA(cta)}>
                {cta}
              </button>
            ))}
          </div>

          <button className="back-menu-btn" onClick={handleBackToMenu}>
            Back to Menu
          </button>
        </div>
      )}
    </>
  );
};

export default ChatBox;
