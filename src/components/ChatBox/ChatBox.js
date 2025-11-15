import React, { useState, useEffect, useRef } from 'react';
import './ChatBox.css';

/* ==========================
   CONFIG
========================== */

const MAIN_MENU_OPTIONS = [
  'Schedule a Visit',
  'Living Options',
  'Community Life',
  'View Floor Plans',
  'Pricing',
  'Job Inquiry',
  'Ask Us Anything',
];

const LIVING_OPTIONS_CTAS = [
  'Independent Living',
  'Assisted Living',
  'Memory Care',
  'Skilled Nursing',
  'Rehabilitation',
];

const COMMUNITY_LIFE_CTAS = ['About', 'Amenities', 'Dining', 'Events', 'Gallery'];

const PRICING_LIVING_OPTIONS_CTAS = [
  'Independent Living',
  'Assisted Living',
  'Memory Care',
  'Skilled Nursing',
  'Not Sure',
  'Other',
];

const WHO_IS_THIS_FOR_CTAS = ['Myself', 'Parent', 'Spouse', 'Relative', 'Friend', 'Other'];

const TIMELINE_CTAS = ['Immediately', '1 to 3 Months', '3 Months +', 'Just Researching'];

const LINKS = {
  floorPlans: 'https://example.com', // TODO: update with real URLs
  jobInquiry: 'https://example.com/careers',
  livingOptionBase: 'https://example.com/options',
};

const INITIAL_FORM = { name: '', email: '', phone: '' };
const INITIAL_PRICING = { livingOption: null, whoIsThisFor: null, timeline: null };

/* ==========================
   SUBCOMPONENTS
========================== */

const ChatHeader = ({ onClose }) => (
  <div className="chatbox-header">
    <div className="chatbox-header-text">
      <div className="chatbox-title">Chat with Us</div>
      <div className="chatbox-subtitle">We’re here to help you explore options.</div>
    </div>
    <button className="chat-close-btn" onClick={onClose} aria-label="Close chat">
      ×
    </button>
  </div>
);

const ChatMessages = ({ messages }) => (
  <div className="chat-messages">
    {messages.map((msg) => (
      <div
        key={msg.id}
        className={`chat-message ${msg.sender} ${msg.isWelcome ? 'welcome' : ''}`}
      >
        {msg.text}
      </div>
    ))}
  </div>
);

/* Main menu bubble nav (always visible after first selection) */
const MainMenuBubbleNav = ({ active, onSelect }) => (
  <div className="mainmenu-bubble-nav">
    {MAIN_MENU_OPTIONS.map((option) => (
      <button
        key={option}
        type="button"
        className={`nav-bubble ${active === option ? 'active' : ''}`}
        onClick={() => onSelect(option)}
      >
        {option}
      </button>
    ))}
  </div>
);

/* Initial main menu rectangular buttons (only when no category selected) */
const MainMenuButtons = ({ visible, onClick }) => {
  if (!visible) return null;
  return (
    <div className="chatbox-ctas">
      {MAIN_MENU_OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          className="cta-btn"
          onClick={() => onClick(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

/* Rectangular CTAs for each step */
const StepCTAs = ({ options, onSelect }) => (
  <div className="step-cta-list">
    {options.map((option) => (
      <button
        key={option}
        type="button"
        className="step-cta-btn"
        onClick={() => onSelect(option)}
      >
        {option}
      </button>
    ))}
  </div>
);

/* Single-step subgroup (question + bubbles) */
const BubbleStep = ({ question, options, selected, onSelect }) => (
  <div className="step-block">
    {question && <div className="step-question">{question}</div>}
    <div className="bubble-group">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={`bubble ${selected === option ? 'selected' : ''}`}
          onClick={() => onSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

/* Pricing flow */
const PricingSection = ({
  pricingSelections,
  onSelectLivingOption,
  onSelectWhoIsThisFor,
  onSelectTimeline,
  showForm,
  children,
}) => {
  const { livingOption, whoIsThisFor, timeline } = pricingSelections;

  return (
    <div className="pricing-section">
      {/* Step 1: Living Option */}
      <div className="step-block">
        <div className="step-question">What living option are you interested in?</div>
        {livingOption === null ? (
          <StepCTAs options={PRICING_LIVING_OPTIONS_CTAS} onSelect={onSelectLivingOption} />
        ) : (
          <div className="bubble-group">
            {PRICING_LIVING_OPTIONS_CTAS.map((option) => (
              <button
                key={option}
                type="button"
                className={`bubble ${livingOption === option ? 'selected' : ''}`}
                onClick={() => onSelectLivingOption(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Step 2: Who is this for? */}
      {livingOption !== null && (
        <div className="step-block">
          <div className="step-question">Who is this for?</div>
          {whoIsThisFor === null ? (
            <StepCTAs options={WHO_IS_THIS_FOR_CTAS} onSelect={onSelectWhoIsThisFor} />
          ) : (
            <div className="bubble-group">
              {WHO_IS_THIS_FOR_CTAS.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`bubble ${whoIsThisFor === option ? 'selected' : ''}`}
                  onClick={() => onSelectWhoIsThisFor(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step 3: Timeline */}
      {livingOption !== null && whoIsThisFor !== null && (
        <div className="step-block">
          <div className="step-question">What is your timeline?</div>
          {timeline === null ? (
            <StepCTAs options={TIMELINE_CTAS} onSelect={onSelectTimeline} />
          ) : (
            <div className="bubble-group">
              {TIMELINE_CTAS.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`bubble ${timeline === option ? 'selected' : ''}`}
                  onClick={() => onSelectTimeline(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step 4: Form */}
      {showForm && (
        <div className="step-block">
          <div className="step-question">
            Please provide your contact details so we can share pricing information.
          </div>
          {children}
        </div>
      )}
    </div>
  );
};

const LeadForm = ({ formData, onChange, onSubmit, isSubmitting }) => (
  <form className="chat-form" onSubmit={onSubmit}>
    <input
      type="text"
      name="name"
      placeholder="First & Last Name"
      value={formData.name}
      onChange={onChange}
      required
    />
    <input
      type="email"
      name="email"
      placeholder="Email"
      value={formData.email}
      onChange={onChange}
      required
    />
    <input
      type="tel"
      name="phone"
      placeholder="Phone"
      value={formData.phone}
      onChange={onChange}
      required
    />
    <button type="submit" className="cta-btn" disabled={isSubmitting}>
      {isSubmitting ? 'Sending…' : 'Submit'}
    </button>
  </form>
);

/* ==========================
   MAIN COMPONENT
========================== */

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([]);
  const [activeMainMenu, setActiveMainMenu] = useState(null); // which main category is active

  const [pricingSelections, setPricingSelections] = useState(INITIAL_PRICING);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  // one-step flows
  const [livingSelection, setLivingSelection] = useState(null);
  const [communitySelection, setCommunitySelection] = useState(null);

  const scrollRef = useRef(null);

  // Smooth scroll whenever layout changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, activeMainMenu, pricingSelections, livingSelection, communitySelection]);

  const openChat = () => {
    setIsOpen(true);
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: 'How can I help you today?',
        isWelcome: true,
      },
    ]);
    setActiveMainMenu(null);
    setPricingSelections(INITIAL_PRICING);
    setFormData(INITIAL_FORM);
    setLivingSelection(null);
    setCommunitySelection(null);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  const handleToggle = () => {
    if (isOpen) closeChat();
    else openChat();
  };

  const handleBackToMainMenu = () => {
    setActiveMainMenu(null);
    setPricingSelections(INITIAL_PRICING);
    setLivingSelection(null);
    setCommunitySelection(null);
  };

  /* MAIN MENU selection (button or nav bubble) */
  const handleMainMenuSelect = (option) => {
    setActiveMainMenu(option);

    // Reset category-specific states when switching
    if (option !== 'Pricing') {
      setPricingSelections(INITIAL_PRICING);
    }
    if (option !== 'Living Options') {
      setLivingSelection(null);
    }
    if (option !== 'Community Life') {
      setCommunitySelection(null);
    }

    if (option === 'View Floor Plans') {
      window.open(LINKS.floorPlans, '_blank', 'noopener,noreferrer');
      return;
    }

    if (option === 'Job Inquiry') {
      window.open(LINKS.jobInquiry, '_blank', 'noopener,noreferrer');
      return;
    }

    // Pricing, Living Options, Community Life, Schedule a Visit, Ask Us Anything
    // are handled in render via activeMainMenu
  };

  /* PRICING handlers */
  const handleSelectPricingLivingOption = (option) => {
    setPricingSelections((prev) => ({
      ...prev,
      livingOption: option,
      whoIsThisFor: prev.whoIsThisFor, // keep previous if they already chose
      timeline: prev.timeline,
    }));
  };

  const handleSelectWhoIsThisFor = (option) => {
    setPricingSelections((prev) => ({
      ...prev,
      whoIsThisFor: option,
      timeline: prev.timeline,
    }));
  };

  const handleSelectTimeline = (option) => {
    setPricingSelections((prev) => ({
      ...prev,
      timeline: option,
    }));
  };

  /* LIVING OPTIONS */
  const handleLivingOptionSelect = (option) => {
    setLivingSelection(option);
    // Open general living options page for now
    window.open(LINKS.livingOptionBase, '_blank', 'noopener,noreferrer');
  };

  /* COMMUNITY LIFE */
  const handleCommunitySelect = (option) => {
    setCommunitySelection(option);
    // You could expand this to show more info or open URLs
  };

  /* FORM HANDLERS */
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setIsSubmittingLead(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'bot',
          text: `Thank you, ${formData.name}! A team member will reach out soon.`,
        },
      ]);

      setPricingSelections(INITIAL_PRICING);
      setFormData(INITIAL_FORM);
      setIsSubmittingLead(false);
      setActiveMainMenu(null);
    }, 800);
  };

  const showMainMenuButtons = !activeMainMenu;

  const showPricingSection = activeMainMenu === 'Pricing';
  const showLivingSection = activeMainMenu === 'Living Options';
  const showCommunitySection = activeMainMenu === 'Community Life';
  const showScheduleSection = activeMainMenu === 'Schedule a Visit';
  const showAskSection = activeMainMenu === 'Ask Us Anything';

  const showPricingForm =
    showPricingSection &&
    pricingSelections.livingOption !== null &&
    pricingSelections.whoIsThisFor !== null &&
    pricingSelections.timeline !== null;

  return (
    <>
      {!isOpen && (
        <button className="chat-toggle-btn" onClick={handleToggle}>
          Chat
        </button>
      )}

      {isOpen && (
        <div className="chatbox-container" role="dialog" aria-label="Chat with us">
          <ChatHeader onClose={handleToggle} />

          <div className="chatbox-main" ref={scrollRef}>
            <div className="chat-scroll-stack">
              {/* Welcome / message stack */}
              <ChatMessages messages={messages} />

              {/* Main menu bubble nav (appears after first selection) */}
              {activeMainMenu && (
                <MainMenuBubbleNav
                  active={activeMainMenu}
                  onSelect={handleMainMenuSelect}
                />
              )}

              {/* PRICING FLOW */}
              {showPricingSection && (
                <PricingSection
                  pricingSelections={pricingSelections}
                  onSelectLivingOption={handleSelectPricingLivingOption}
                  onSelectWhoIsThisFor={handleSelectWhoIsThisFor}
                  onSelectTimeline={handleSelectTimeline}
                  showForm={showPricingForm}
                >
                  {showPricingForm && (
                    <LeadForm
                      formData={formData}
                      onChange={handleFormChange}
                      onSubmit={handleSubmitForm}
                      isSubmitting={isSubmittingLead}
                    />
                  )}
                </PricingSection>
              )}

              {/* LIVING OPTIONS FLOW */}
              {showLivingSection && (
                <div className="flow-section">
                  {livingSelection === null ? (
                    <>
                      <div className="step-question">Please select a living option:</div>
                      <StepCTAs
                        options={LIVING_OPTIONS_CTAS}
                        onSelect={handleLivingOptionSelect}
                      />
                    </>
                  ) : (
                    <BubbleStep
                      question="Please select a living option:"
                      options={LIVING_OPTIONS_CTAS}
                      selected={livingSelection}
                      onSelect={handleLivingOptionSelect}
                    />
                  )}
                </div>
              )}

              {/* COMMUNITY LIFE FLOW */}
              {showCommunitySection && (
                <div className="flow-section">
                  {communitySelection === null ? (
                    <>
                      <div className="step-question">
                        What would you like to learn about Community Life?
                      </div>
                      <StepCTAs
                        options={COMMUNITY_LIFE_CTAS}
                        onSelect={handleCommunitySelect}
                      />
                    </>
                  ) : (
                    <BubbleStep
                      question="What would you like to learn about Community Life?"
                      options={COMMUNITY_LIFE_CTAS}
                      selected={communitySelection}
                      onSelect={handleCommunitySelect}
                    />
                  )}
                </div>
              )}

              {/* SCHEDULE A VISIT: direct form */}
              {showScheduleSection && (
                <div className="flow-section">
                  <div className="step-question">
                    Share your contact details and we’ll help you schedule a visit.
                  </div>
                  <LeadForm
                    formData={formData}
                    onChange={handleFormChange}
                    onSubmit={handleSubmitForm}
                    isSubmitting={isSubmittingLead}
                  />
                </div>
              )}

              {/* ASK US ANYTHING: static for now */}
              {showAskSection && (
                <div className="flow-section">
                  <div className="step-question">
                    You can share your questions here, and a team member will follow up with you.
                  </div>
                  {/* Later you can add a text input + submit here */}
                </div>
              )}
            </div>
          </div>

          {/* Initial main menu buttons */}
          <MainMenuButtons
            visible={showMainMenuButtons}
            onClick={handleMainMenuSelect}
          />

          {/* Back button only when in a category */}
          {activeMainMenu && (
            <button className="back-menu-btn" type="button" onClick={handleBackToMainMenu}>
              Back to Main Menu
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBox;
