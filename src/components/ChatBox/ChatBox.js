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

const COMMUNITY_LIFE_LINKS = {
  About: 'https://example.com/community-life/about',
  Amenities: 'https://example.com/community-life/amenities',
  Dining: 'https://example.com/community-life/dining',
  Events: 'https://example.com/community-life/events',
  Gallery: 'https://example.com/community-life/gallery',
};

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

const SCHEDULE_TIME_SLOTS = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
];

const LINKS = {
  floorPlans: 'https://example.com',
  jobInquiry: 'https://example.com/careers',
  livingOptionBase: 'https://example.com/options',
};

const INITIAL_FORM = { name: '', email: '', phone: '' };
const INITIAL_PRICING = { livingOption: null, whoIsThisFor: null, timeline: null };
const INITIAL_SCHEDULE = { date: null, time: null };

/* ==========================
   HELPERS
========================== */

const formatDateLabel = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/* ==========================
   COMPONENTS
========================== */

const ChatHeader = ({ onClose, communityName, logoUrl }) => (
  <div className="chatbox-header">
    <div className="chatbox-header-left">
      {logoUrl && (
        <img src={logoUrl} alt="Community Logo" className="chatbox-logo" />
      )}
      <div className="chatbox-header-text">
        <div className="chatbox-title">Chat with {communityName}</div>
        <div className="chatbox-subtitle">We’re here to help you explore options.</div>
      </div>
    </div>
    <button className="chat-close-btn" onClick={onClose}>
      ×
    </button>
  </div>
);

const ChatMessages = ({ messages }) => (
  <div className="chat-messages">
    {messages.map((msg) => (
      <div key={msg.id} className={`chat-message ${msg.sender} ${msg.isWelcome ? 'welcome' : ''}`}>
        {msg.text}
      </div>
    ))}
  </div>
);

const MainMenuBubbleNav = ({ active, onSelect }) => (
  <div className="mainmenu-bubble-nav">
    {MAIN_MENU_OPTIONS.map((option) => (
      <button
        key={option}
        className={`nav-bubble ${active === option ? 'active' : ''}`}
        onClick={() => onSelect(option)}
      >
        {option}
      </button>
    ))}
  </div>
);

const MainMenuButtons = ({ visible, onClick }) => {
  if (!visible) return null;
  return (
    <div className="chatbox-ctas">
      {MAIN_MENU_OPTIONS.map((option) => (
        <button key={option} className="cta-btn" onClick={() => onClick(option)}>
          {option}
        </button>
      ))}
    </div>
  );
};

const StepCTAs = ({ options, onSelect }) => (
  <div className="step-cta-list">
    {options.map((option) => (
      <button key={option} className="step-cta-btn" onClick={() => onSelect(option)}>
        {option}
      </button>
    ))}
  </div>
);

const BubbleStep = ({ question, options, selected, onSelect }) => (
  <div className="step-block">
    {question && <div className="step-question">{question}</div>}
    <div className="bubble-group">
      {options.map((option) => (
        <button
          key={option}
          className={`bubble ${selected === option ? 'selected' : ''}`}
          onClick={() => onSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

/* ==========================
   SCHEDULE CALENDAR
========================== */

const monthNames = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];
const weekdayShort = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const toISODate = (date) => {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, '0');
  const d = `${date.getDate()}`.padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const ScheduleCalendar = ({ selectedDate, onSelectDate }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const initial = selectedDate ? new Date(selectedDate) : today;
  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());

  const firstDay = new Date(viewYear, viewMonth, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isDisabled = (year, month, day) => {
    const test = new Date(year, month, day);
    test.setHours(0, 0, 0, 0);
    return test < today;
  };

  const handleClick = (day) => {
    if (!day) return;
    if (isDisabled(viewYear, viewMonth, day)) return;
    const date = new Date(viewYear, viewMonth, day);
    onSelectDate(toISODate(date));
  };

  const isSelected = (year, month, day) => {
    if (!selectedDate) return false;
    const d = new Date(selectedDate);
    return (
      d.getFullYear() === year &&
      d.getMonth() === month &&
      d.getDate() === day
    );
  };

  return (
    <div className="schedule-calendar">
      <div className="calendar-header">
        <button
          className="calendar-nav-btn"
          onClick={() => {
            const newMonth = viewMonth - 1;
            if (newMonth < 0) {
              setViewYear((y) => y - 1);
              setViewMonth(11);
            } else {
              setViewMonth(newMonth);
            }
          }}
        >
          ‹
        </button>

        <div className="calendar-title">
          {monthNames[viewMonth]} {viewYear}
        </div>

        <button
          className="calendar-nav-btn"
          onClick={() => {
            const newMonth = viewMonth + 1;
            if (newMonth > 11) {
              setViewYear((y) => y + 1);
              setViewMonth(0);
            } else {
              setViewMonth(newMonth);
            }
          }}
        >
          ›
        </button>
      </div>

      <div className="calendar-grid">
        {weekdayShort.map((d) => (
          <div key={d} className="calendar-weekday">
            {d}
          </div>
        ))}

        {cells.map((day, idx) => {
          if (day === null) return <div key={idx} className="calendar-day empty"></div>;

          const disabled = isDisabled(viewYear, viewMonth, day);
          const selected = isSelected(viewYear, viewMonth, day);

          return (
            <button
              key={idx}
              className={`calendar-day ${disabled ? 'disabled-date' : ''} ${
                selected ? 'selected-date' : ''
              }`}

              disabled={disabled}
              onClick={() => handleClick(day)}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* ==========================
   MAIN CHATBOX
========================== */

const ChatBox = ({ communityName, logoUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([]);
  const [activeMainMenu, setActiveMainMenu] = useState(null);

  const [pricingSelections, setPricingSelections] = useState(INITIAL_PRICING);
  const [scheduleSelections, setScheduleSelections] = useState(INITIAL_SCHEDULE);

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  const [livingSelection, setLivingSelection] = useState(null);
  const [communitySelection, setCommunitySelection] = useState(null);

  const [askQuestion, setAskQuestion] = useState("");
  const [hasTypedQuestion, setHasTypedQuestion] = useState(false);

  const scrollRef = useRef(null);

  /* Smooth scroll */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [
    messages,
    activeMainMenu,
    pricingSelections,
    scheduleSelections,
    livingSelection,
    communitySelection,
  ]);

  /* OPEN CHAT */
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
    setScheduleSelections(INITIAL_SCHEDULE);
    setFormData(INITIAL_FORM);
    setLivingSelection(null);
    setCommunitySelection(null);
    setAskQuestion("");
    setHasTypedQuestion(false);
  };

  const closeChat = () => setIsOpen(false);

  const handleToggle = () => (isOpen ? closeChat() : openChat());

  /* MAIN MENU SELECT */
  const handleMainMenuSelect = (option) => {
    setActiveMainMenu(option);

    if (option !== 'Pricing') setPricingSelections(INITIAL_PRICING);
    if (option !== 'Schedule a Visit') setScheduleSelections(INITIAL_SCHEDULE);
    if (option !== 'Living Options') setLivingSelection(null);
    if (option !== 'Community Life') setCommunitySelection(null);
    if (option !== 'Ask Us Anything') {
      setAskQuestion("");
      setHasTypedQuestion(false);
    }

    if (option === 'View Floor Plans') {
      window.open(LINKS.floorPlans, '_blank');
      return;
    }

    if (option === 'Job Inquiry') {
      window.open(LINKS.jobInquiry, '_blank');
      return;
    }
  };

  const handleBackToMainMenu = () => {
    setActiveMainMenu(null);
    setPricingSelections(INITIAL_PRICING);
    setScheduleSelections(INITIAL_SCHEDULE);
    setLivingSelection(null);
    setCommunitySelection(null);
    setAskQuestion("");
    setHasTypedQuestion(false);
  };

  /* PRICING SELECTORS */
  const handleSelectPricingLivingOption = (option) =>
    setPricingSelections((prev) => ({ ...prev, livingOption: option }));

  const handleSelectWhoIsThisFor = (option) =>
    setPricingSelections((prev) => ({ ...prev, whoIsThisFor: option }));

  const handleSelectTimeline = (option) =>
    setPricingSelections((prev) => ({ ...prev, timeline: option }));

  /* COMMUNITY LIFE — FIXED */
  const handleCommunitySelect = (option) => {
    const url = COMMUNITY_LIFE_LINKS[option];
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
    setCommunitySelection(null);
  };

  /* LIVING OPTIONS — FIXED */
  const handleLivingOptionSelect = (option) => {
    window.open(LINKS.livingOptionBase, '_blank', 'noopener,noreferrer');
    setLivingSelection(null);
  };

  /* SCHEDULE HANDLERS */
  const handleSelectScheduleDate = (isoDate) => {
    setScheduleSelections((prev) => ({ ...prev, date: isoDate }));
  };

  const handleSelectScheduleTime = (time) => {
    setScheduleSelections((prev) => ({ ...prev, time }));
  };

  /* ASK US ANYTHING HANDLERS */
  const handleAskQuestionSubmit = (e) => {
    e.preventDefault();
    if (!askQuestion.trim()) return;
    setHasTypedQuestion(true);
  };

  /* FORM HANDLERS */
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setIsSubmittingLead(true);

    setTimeout(() => {
      let botReply = "";

      if (activeMainMenu === "Ask Us Anything") {
        botReply = `Thanks, ${formData.name}! We received your question and our team will reach out soon.`;
      } else {
        const scheduleText =
          activeMainMenu === 'Schedule a Visit' &&
          scheduleSelections.date &&
          scheduleSelections.time
            ? ` for a visit on ${formatDateLabel(scheduleSelections.date)} at ${scheduleSelections.time}`
            : '';

        botReply = `Thank you, ${formData.name}! A team member will reach out soon${scheduleText}.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'bot',
          text: botReply,
        },
      ]);

      resetAllFlows();
      setIsSubmittingLead(false);
    }, 800);
  };

  /* RESET FLOWS */
  const resetAllFlows = () => {
    setActiveMainMenu(null);
    setPricingSelections(INITIAL_PRICING);
    setScheduleSelections(INITIAL_SCHEDULE);
    setFormData(INITIAL_FORM);
    setLivingSelection(null);
    setCommunitySelection(null);
    setAskQuestion("");
    setHasTypedQuestion(false);
  };

  /* ACTIVE STATES */
  const showMainMenuButtons = !activeMainMenu;

  const showPricingSection = activeMainMenu === 'Pricing';
  const showLivingSection = activeMainMenu === 'Living Options';
  const showCommunitySection = activeMainMenu === 'Community Life';
  const showScheduleSection = activeMainMenu === 'Schedule a Visit';
  const showAskSection = activeMainMenu === 'Ask Us Anything';

  const pricingHasAll =
    pricingSelections.livingOption &&
    pricingSelections.whoIsThisFor &&
    pricingSelections.timeline;

  const showPricingForm = showPricingSection && pricingHasAll;

  const scheduleHasDate = !!scheduleSelections.date;
  const scheduleHasTime = !!scheduleSelections.time;
  const showScheduleForm = showScheduleSection && scheduleHasDate && scheduleHasTime;

  return (
    <>
      {!isOpen && (
        <button className="chat-toggle-btn" onClick={handleToggle}>
          {logoUrl && (
            <img
              src={logoUrl}
              alt={`${communityName || 'Community'} logo`}
              className="chat-toggle-logo"
            />
          )}
          <span className="chat-toggle-label">Chat</span>
        </button>
      )}


      {isOpen && (
        <div className="chatbox-container" role="dialog" aria-label="Chat with us">
          <ChatHeader 
            onClose={handleToggle}
            communityName={communityName}
            logoUrl={logoUrl}
          />

          <div className="chatbox-main" ref={scrollRef}>
            <div className="chat-scroll-stack">

              {/* Chat messages */}
              <ChatMessages messages={messages} />

              {/* BUBBLE NAV */}
              {activeMainMenu && (
                <MainMenuBubbleNav
                  active={activeMainMenu}
                  onSelect={handleMainMenuSelect}
                />
              )}

              {/* PRICING FLOW */}
              {showPricingSection && (
                <div className="pricing-section">
                  
                  {/* Step 1 */}
                  <div className="step-block">
                    <div className="step-question">What living option are you interested in?</div>
                    {pricingSelections.livingOption === null ? (
                      <StepCTAs
                        options={PRICING_LIVING_OPTIONS_CTAS}
                        onSelect={handleSelectPricingLivingOption}
                      />
                    ) : (
                      <BubbleStep
                        options={PRICING_LIVING_OPTIONS_CTAS}
                        selected={pricingSelections.livingOption}
                        onSelect={handleSelectPricingLivingOption}
                      />
                    )}
                  </div>

                  {/* Step 2 */}
                  {pricingSelections.livingOption && (
                    <div className="step-block">
                      <div className="step-question">Who is this for?</div>
                      {pricingSelections.whoIsThisFor === null ? (
                        <StepCTAs
                          options={WHO_IS_THIS_FOR_CTAS}
                          onSelect={handleSelectWhoIsThisFor}
                        />
                      ) : (
                        <BubbleStep
                          options={WHO_IS_THIS_FOR_CTAS}
                          selected={pricingSelections.whoIsThisFor}
                          onSelect={handleSelectWhoIsThisFor}
                        />
                      )}
                    </div>
                  )}

                  {/* Step 3 */}
                  {pricingSelections.livingOption &&
                    pricingSelections.whoIsThisFor && (
                      <div className="step-block">
                        <div className="step-question">What is your timeline?</div>
                        {pricingSelections.timeline === null ? (
                          <StepCTAs
                            options={TIMELINE_CTAS}
                            onSelect={handleSelectTimeline}
                          />
                        ) : (
                          <BubbleStep
                            options={TIMELINE_CTAS}
                            selected={pricingSelections.timeline}
                            onSelect={handleSelectTimeline}
                          />
                        )}
                      </div>
                    )}

                  {/* Step 4 — Contact Form */}
                  {showPricingForm && (
                    <div className="step-block">
                      <div className="step-question">
                        Please provide your contact details so we can share pricing info.
                      </div>
                      <form className="chat-form" onSubmit={handleSubmitForm}>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleFormChange}
                          placeholder="First & Last Name"
                          required
                        />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          placeholder="Email"
                          required
                        />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleFormChange}
                          placeholder="Phone"
                          required
                        />

                        <button className="cta-btn" type="submit" disabled={isSubmittingLead}>
                          {isSubmittingLead ? 'Sending…' : 'Submit'}
                        </button>
                      </form>
                    </div>
                  )}

                </div>
              )}

              {/* SCHEDULE A VISIT */}
              {showScheduleSection && (
                <div className="schedule-section">
                  
                  {/* Step 1 — Calendar */}
                  <div className="step-block">
                    <div className="step-question">What date would you like to schedule a visit?</div>

                    <ScheduleCalendar
                      selectedDate={scheduleSelections.date}
                      onSelectDate={handleSelectScheduleDate}
                    />

                    {scheduleHasDate && (
                      <div className="schedule-selected">
                        Selected date:{' '}
                        <span>{formatDateLabel(scheduleSelections.date)}</span>
                      </div>
                    )}
                  </div>

                  {/* Step 2 — Time selection */}
                  {scheduleHasDate && (
                    <div className="step-block">
                      <div className="step-question">What time works best for you?</div>

                      {!scheduleHasTime ? (
                        <StepCTAs
                          options={SCHEDULE_TIME_SLOTS}
                          onSelect={handleSelectScheduleTime}
                        />
                      ) : (
                        <BubbleStep
                          options={SCHEDULE_TIME_SLOTS}
                          selected={scheduleSelections.time}
                          onSelect={handleSelectScheduleTime}
                        />
                      )}
                    </div>
                  )}

                  {/* Step 3 — Contact form */}
                  {showScheduleForm && (
                    <div className="step-block">
                      <div className="step-question">
                        Please share your contact details and we’ll confirm your visit.
                      </div>

                      <form className="chat-form" onSubmit={handleSubmitForm}>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleFormChange}
                          placeholder="First & Last Name"
                          required
                        />

                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          placeholder="Email"
                          required
                        />

                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleFormChange}
                          placeholder="Phone"
                          required
                        />

                        <button className="cta-btn" type="submit" disabled={isSubmittingLead}>
                          {isSubmittingLead ? 'Sending…' : 'Submit'}
                        </button>
                      </form>
                    </div>
                  )}

                </div>
              )}

              {/* LIVING OPTIONS */}
              {showLivingSection && (
                <div className="flow-section">
                  <div className="step-question">Please select a living option:</div>

                  {livingSelection === null ? (
                    <StepCTAs
                      options={LIVING_OPTIONS_CTAS}
                      onSelect={handleLivingOptionSelect}
                    />
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

              {/* COMMUNITY LIFE */}
              {showCommunitySection && (
                <div className="flow-section">
                  <div className="step-question">
                    What would you like to learn about Community Life?
                  </div>

                  {communitySelection === null ? (
                    <StepCTAs
                      options={COMMUNITY_LIFE_CTAS}
                      onSelect={handleCommunitySelect}
                    />
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

              {/* ASK US ANYTHING */}
              {showAskSection && (
                <div className="flow-section">

                  {!hasTypedQuestion ? (
                    <>
                      <div className="step-question">What question do you have?</div>

                      <form className="chat-form" onSubmit={handleAskQuestionSubmit}>
                        <textarea
                          className="ask-textarea"
                          value={askQuestion}
                          onChange={(e) => setAskQuestion(e.target.value)}
                          placeholder="Type your question here..."
                          required
                          rows="3"
                        ></textarea>

                        <button className="cta-btn" type="submit">
                          Continue
                        </button>
                      </form>
                    </>
                  ) : (
                    <>
                      <div className="step-question">
                        Thanks! Please share your contact details so we can follow up.
                      </div>

                      <form className="chat-form" onSubmit={handleSubmitForm}>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleFormChange}
                          placeholder="First & Last Name"
                          required
                        />

                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          placeholder="Email"
                          required
                        />

                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleFormChange}
                          placeholder="Phone"
                          required
                        />

                        <button className="cta-btn" type="submit" disabled={isSubmittingLead}>
                          {isSubmittingLead ? "Sending…" : "Submit"}
                        </button>
                      </form>
                    </>
                  )}

                </div>
              )}

            </div>
          </div>

          {/* MAIN MENU BUTTONS */}
          {showMainMenuButtons && (
            <MainMenuButtons
              visible={showMainMenuButtons}
              onClick={handleMainMenuSelect}
            />
          )}

          {/* BACK BUTTON */}
          {activeMainMenu && (
            <button className="back-menu-btn" onClick={handleBackToMainMenu}>
              Back to Main Menu
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBox;
