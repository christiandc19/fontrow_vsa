import React, { useEffect, useRef, useState } from "react";
import { createLead, getUserByIP } from "../../services/widgetApi.js";
import "./ChatBox.css";

/* ==========================
   API BASE
========================== */
const getApiBase = () => {
  if (typeof process !== "undefined" && process.env && process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  return "http://localhost:5297";
};
const API_BASE = getApiBase();

/* ==========================
   HELPERS
========================== */
const formatDateLabel = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
};

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];
const weekdayShort = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const toISODate = (date) => {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
};

/* ==========================
   UI COMPONENTS
========================== */
const ChatHeader = ({ onClose, title, subtitle, logoUrl }) => (
  <div className="chatbox-header">
    <div className="chatbox-header-left">
      {logoUrl && <img src={logoUrl} alt="Logo" className="chatbox-logo" />}
      <div className="chatbox-header-text">
        <div className="chatbox-title">{title}</div>
        <div className="chatbox-subtitle">{subtitle}</div>
      </div>
    </div>
    <button className="chat-close-btn" onClick={onClose}>×</button>
  </div>
);

const ChatMessages = ({ messages }) => (
  <div className="chat-messages">
    {messages.map((msg) => (
      <div key={msg.id} className={`chat-message ${msg.sender} ${msg.isWelcome ? "welcome" : ""}`}>
        {msg.text}
      </div>
    ))}
  </div>
);

const MainMenuBubbleNav = ({ items, activeId, onSelect }) => (
  <div className="mainmenu-bubble-nav">
    {items.map((item) => (
      <button
        key={item.id}
        className={`nav-bubble ${activeId === item.id ? "active" : ""}`}
        onClick={() => onSelect(item)}
      >
        {item.label}
      </button>
    ))}
  </div>
);

const MainMenuButtons = ({ items, visible, onSelect }) => {
  if (!visible) return null;
  return (
    <div className="chatbox-ctas">
      {items.map((item) => (
        <button key={item.id} className="cta-btn" onClick={() => onSelect(item)}>
          {item.label}
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
          className={`bubble ${selected === option ? "selected" : ""}`}
          onClick={() => onSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

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

  const isSelected = (year, month, day) => {
    if (!selectedDate) return false;
    const d = new Date(selectedDate);
    return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
  };

  const handleClick = (day) => {
    if (!day) return;
    if (isDisabled(viewYear, viewMonth, day)) return;
    const date = new Date(viewYear, viewMonth, day);
    onSelectDate(toISODate(date));
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
          <div key={d} className="calendar-weekday">{d}</div>
        ))}

        {cells.map((day, idx) => {
          if (day === null) return <div key={idx} className="calendar-day empty" />;

          const disabled = isDisabled(viewYear, viewMonth, day);
          const selected = isSelected(viewYear, viewMonth, day);

          return (
            <button
              key={idx}
              className={`calendar-day ${disabled ? "disabled-date" : ""} ${selected ? "selected-date" : ""}`}
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
export default function ChatBox({ config }) {
  // Config (safe defaults)
  const clientKey = config?.clientKey || "default";
  const logoUrl = config?.logoUrl || null;
  const headerTitle = config?.headerTitle || `Chat with ${config?.communityName || ""}`.trim() || "Chat with us";
  const headerSubtitle = config?.headerSubtitle || "We’re here to help you explore options.";
  const welcomeMessage = config?.welcomeMessage || "How can I help you today?";

  const mainMenu = Array.isArray(config?.mainMenu) ? config.mainMenu : [];

  const services = Array.isArray(config?.services) ? config.services : [];
  const projects = Array.isArray(config?.projects) ? config.projects : [];

  const quoteCfg = config?.quote || {};
  const scheduleCfg = config?.schedule || {};
  const askCfg = config?.ask || {};

  const QUOTE_PROJECT_TYPES = quoteCfg.projectTypes || [];
  const QUOTE_CLIENT_TYPES = quoteCfg.clientTypes || [];
  const QUOTE_TIMELINES = quoteCfg.timelines || [];

  const CALL_TIME_SLOTS = scheduleCfg.timeSlots || ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"];

  // UI
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [activeFlowId, setActiveFlowId] = useState(null);

  // Lead state
  const [foundUserData, setFoundUserData] = useState(null);
  const [isCheckingIP, setIsCheckingIP] = useState(false);

  // Form state
  const INITIAL_FORM = { name: "", email: "", phone: "" };
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  // Quote flow
  const INITIAL_QUOTE = { projectType: null, clientType: null, timeline: null };
  const [quoteSelections, setQuoteSelections] = useState(INITIAL_QUOTE);

  // Schedule flow
  const INITIAL_CALL = { date: null, time: null };
  const [callSelections, setCallSelections] = useState(INITIAL_CALL);

  // Ask flow
  const [askQuestion, setAskQuestion] = useState("");
  const [hasTypedQuestion, setHasTypedQuestion] = useState(false);
  const [pendingConversations, setPendingConversations] = useState([]);

  // Scroll
  const scrollRef = useRef(null);
  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, activeFlowId, quoteSelections, callSelections, hasTypedQuestion]);

  const openLink = (url) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  /* CHECK USER BY IP */
  const checkUserByIP = async (updateFormData = true) => {
    setIsCheckingIP(true);
    try {
      const userData = await getUserByIP();
      if (userData) {
        // Handle array response - get first user
        const user = Array.isArray(userData) ? userData[0] : userData;
        
        if (user) {
          setFoundUserData(userData); // Keep original for submission
          
          // Only update form data if explicitly requested (e.g., on initial chat open)
          if (updateFormData) {
            setFormData({
              name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
              email: user.email || '',
              phone: user.phone || ''
            });
          }
          
          console.log('Found existing user, saving welcome message:', user);
          // Save initial welcome message for existing user
          await saveConversationMessage('How can I help you today?', 'bot', userData);
          return userData;
        } else {
          console.log('No existing user found by IP');
          return null;
        }
      }
      return null;
    } catch (error) {
      console.error('Error checking user by IP:', error);
      return null;
    } finally {
      setIsCheckingIP(false);
    }
  };

  /* ---------- SAVE CONVERSATION MESSAGE ---------- */
  const saveConversationMessage = async (message, sender = "user", userDataParam = null) => {
    const dataToUse = userDataParam || foundUserData;
    if (!dataToUse) {
      console.log('No user data available, storing conversation locally');
      // Store conversation locally for new users
      setPendingConversations(prev => [...prev, {
        message: message,
        sender: sender,
        timestamp: new Date().toISOString()
      }]);
      return;
    }
    
    try {
      const userData = Array.isArray(dataToUse) ? dataToUse[0] : dataToUse;
      if (!userData?.id) return;

      const payload = { leadId: userData.id, message, sender };

      const res = await fetch(`${API_BASE}/api/Conversations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Conversation API error:", errorText);
      }
    } catch (err) {
      console.error("Error saving conversation message:", err);
    }
  };



  /* ---------- OPEN CHAT ---------- */
  const openChat = async () => {
    setIsOpen(true);
    setMessages([{ id: "welcome", sender: "bot", text: welcomeMessage, isWelcome: true }]);

    // reset flows
    setActiveFlowId(null);
    setQuoteSelections(INITIAL_QUOTE);
    setCallSelections(INITIAL_CALL);
    setAskQuestion("");
    setHasTypedQuestion(false);

    // reset lead state
    setFoundUserData(null);
    setFormData(INITIAL_FORM);

    await checkUserByIP();
  };

  const closeChat = () => setIsOpen(false);
  const handleToggle = () => (isOpen ? closeChat() : openChat());

  /* ---------- MAIN MENU SELECT ---------- */
  const handleMainMenuSelect = (item) => {
    // item: { id, label, type: "flow"|"link", url? }
    saveConversationMessage(item.label, "user");

    if (item.type === "link") {
      openLink(item.url);
      return;
    }

    setActiveFlowId(item.id);

    // reset per flow
    if (item.id !== "quote") setQuoteSelections(INITIAL_QUOTE);
    if (item.id !== "schedule") setCallSelections(INITIAL_CALL);
    if (item.id !== "ask") {
      setAskQuestion("");
      setHasTypedQuestion(false);
    }
  };

  const handleBackToMainMenu = () => {
    saveConversationMessage("Back to Main Menu", "user");
    setActiveFlowId(null);
    setQuoteSelections(INITIAL_QUOTE);
    setCallSelections(INITIAL_CALL);
    setAskQuestion("");
    setHasTypedQuestion(false);
  };

  /* ---------- SERVICES / PROJECTS ---------- */
  const handleServiceSelect = (label) => {
    const svc = services.find((s) => s.label === label);
    if (!svc) return;
    saveConversationMessage(`Service: ${svc.label}`, "user");
    openLink(svc.url);
  };

  const handleProjectSelect = (label) => {
    const p = projects.find((x) => x.label === label);
    if (!p) return;
    saveConversationMessage(`Industry: ${p.label}`, "user");
    openLink(p.url);
  };

  /* ---------- QUOTE ---------- */
  const handleSelectProjectType = (option) => {
    saveConversationMessage(`Quote - Project Type: ${option}`, "user");
    setQuoteSelections((prev) => ({ ...prev, projectType: option }));
  };
  const handleSelectClientType = (option) => {
    saveConversationMessage(`Quote - Client Type: ${option}`, "user");
    setQuoteSelections((prev) => ({ ...prev, clientType: option }));
  };
  const handleSelectTimeline = (option) => {
    saveConversationMessage(`Quote - Timeline: ${option}`, "user");
    setQuoteSelections((prev) => ({ ...prev, timeline: option }));
  };

  /* ---------- SCHEDULE ---------- */
  const handleSelectCallDate = (isoDate) => {
    saveConversationMessage(`Call - Date: ${isoDate}`, "user");
    setCallSelections((prev) => ({ ...prev, date: isoDate }));
  };
  const handleSelectCallTime = (time) => {
    saveConversationMessage(`Call - Time: ${time}`, "user");
    setCallSelections((prev) => ({ ...prev, time }));
  };

  /* ---------- ASK ---------- */
  const handleAskQuestionSubmit = (e) => {
    e.preventDefault();
    if (!askQuestion.trim()) return;
    saveConversationMessage(`Question: ${askQuestion}`, "user");
    setHasTypedQuestion(true);
  };

  /* ---------- FORM ---------- */
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetAllFlows = () => {
    setActiveFlowId(null);
    setQuoteSelections(INITIAL_QUOTE);
    setCallSelections(INITIAL_CALL);
    setAskQuestion("");
    setHasTypedQuestion(false);
    if (!foundUserData) setFormData(INITIAL_FORM);
  };

  const handleSubmitForm = async (e) => {
    if (e) e.preventDefault();
    setIsSubmittingLead(true);

    try {
      let conversationMessage = "";
      if (activeFlowId === "quote") {
        conversationMessage = `Quote Request: ${JSON.stringify(quoteSelections)}`;
      } else if (activeFlowId === "schedule") {
        conversationMessage = `Call Request: ${callSelections.date} ${callSelections.time}`;
      } else if (activeFlowId === "ask") {
        conversationMessage = `Question: ${askQuestion}`;
      } else {
        conversationMessage = `Lead from chatbot (${activeFlowId || "main_menu"})`;
      }

      if (foundUserData) {
        const userData = Array.isArray(foundUserData) ? foundUserData[0] : foundUserData;
        if (!userData?.id) throw new Error("Lead ID not found for returning user.");

        const payload = { leadId: userData.id, message: conversationMessage, sender: "user" };

        const res = await fetch(`${API_BASE}/api/Conversations`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Failed to save conversation: ${errorText}`);
        }
      } else {
        const [firstName = "", ...rest] = formData.name.trim().split(" ");
        const lastName = rest.join(" ");

        const leadPayload = {
          clientKey, // <— important for dashboard later
          email: formData.email,
          firstName,
          lastName,
          phone: formData.phone,
          meta: { flow: activeFlowId, quoteSelections, callSelections },
          conversations: [{ message: conversationMessage, sender: "user" }],
        };

        await createLead(leadPayload);
        
        // After creating new lead, check IP again to get the newly created user data
        // so subsequent interactions will be treated as existing user
        // Don't update form data since user just submitted it
        const newUserData = await checkUserByIP(false);
        if (newUserData) {
          setFoundUserData(newUserData);
          // Clear pending conversations since user is now registered
          setPendingConversations([]);
          console.log('User registered successfully, switched to existing user mode');
        }
      }

      let botReply = "";
      if (activeFlowId === "ask") {
        botReply = `Thanks, ${formData.name}! We received your question and our team will reach out soon.`;
      } else if (activeFlowId === "schedule" && callSelections.date && callSelections.time) {
        botReply = `Thank you, ${formData.name}! We’ll confirm your call on ${formatDateLabel(callSelections.date)} at ${callSelections.time}.`;
      } else {
        botReply = `Thank you, ${formData.name}! A team member will reach out soon.`;
      }

      setMessages((prev) => [...prev, { id: Date.now(), sender: "bot", text: botReply }]);
      resetAllFlows();
    } catch (err) {
      console.error("Submission failed:", err);
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: "bot", text: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setIsSubmittingLead(false);
    }
  };

  /* ---------- ACTIVE STATES ---------- */
  const showMainMenuButtons = !activeFlowId;

  const showServicesSection = activeFlowId === "services";
  const showProjectsSection = activeFlowId === "projects";
  const showQuoteSection = activeFlowId === "quote";
  const showScheduleSection = activeFlowId === "schedule";
  const showAskSection = activeFlowId === "ask";

  const quoteHasAll = !!(quoteSelections.projectType && quoteSelections.clientType && quoteSelections.timeline);
  const callHasBoth = !!(callSelections.date && callSelections.time);

  const showQuoteForm = showQuoteSection && quoteHasAll && !foundUserData;
  const showQuoteSubmit = showQuoteSection && quoteHasAll && !!foundUserData;

  const showScheduleForm = showScheduleSection && callHasBoth && !foundUserData;
  const showScheduleSubmit = showScheduleSection && callHasBoth && !!foundUserData;

  const showAskForm = showAskSection && hasTypedQuestion && !foundUserData;
  const showAskSubmit = showAskSection && hasTypedQuestion && !!foundUserData;

  /* ==========================
     RENDER
========================== */
  return (
    <>
      {!isOpen && (
        <button className="chat-toggle-btn" onClick={handleToggle}>
          {logoUrl && <img src={logoUrl} alt="Logo" className="chat-toggle-logo" />}
          <span className="chat-toggle-label">Chat</span>
        </button>
      )}

      {isOpen && (
        <div className="chatbox-container" role="dialog" aria-label="Chat with us">
          <ChatHeader
            onClose={handleToggle}
            title={headerTitle}
            subtitle={headerSubtitle}
            logoUrl={logoUrl}
          />

          <div className="chatbox-main" ref={scrollRef}>
            <div className="chat-scroll-stack">
              <ChatMessages messages={messages} />

              {isCheckingIP && (
                <div className="chat-message bot">Checking your info…</div>
              )}

              {activeFlowId && (
                <MainMenuBubbleNav items={mainMenu} activeId={activeFlowId} onSelect={handleMainMenuSelect} />
              )}

              {/* ========= SERVICES ========= */}
              {showServicesSection && (
                <div className="flow-section">
                  <div className="step-question">{config?.servicesTitle || "Please select a service:"}</div>
                  <StepCTAs options={services.map((s) => s.label)} onSelect={handleServiceSelect} />
                </div>
              )}

              {/* ========= PROJECTS ========= */}
              {showProjectsSection && (
                <div className="flow-section">
                  <div className="step-question">{config?.projectsTitle || "Select a project category:"}</div>
                  <StepCTAs options={projects.map((p) => p.label)} onSelect={handleProjectSelect} />
                </div>
              )}

              {/* ========= QUOTE ========= */}
              {showQuoteSection && (
                <div className="pricing-section">
                  {quoteCfg.intro && <div className="step-question">{quoteCfg.intro}</div>}

                  <div className="step-block">
                    <div className="step-question">{quoteCfg.q1 || "What type of project is this?"}</div>
                    {quoteSelections.projectType === null ? (
                      <StepCTAs options={QUOTE_PROJECT_TYPES} onSelect={handleSelectProjectType} />
                    ) : (
                      <BubbleStep options={QUOTE_PROJECT_TYPES} selected={quoteSelections.projectType} onSelect={handleSelectProjectType} />
                    )}
                  </div>

                  {quoteSelections.projectType && (
                    <div className="step-block">
                      <div className="step-question">{quoteCfg.q2 || "Who are you?"}</div>
                      {quoteSelections.clientType === null ? (
                        <StepCTAs options={QUOTE_CLIENT_TYPES} onSelect={handleSelectClientType} />
                      ) : (
                        <BubbleStep options={QUOTE_CLIENT_TYPES} selected={quoteSelections.clientType} onSelect={handleSelectClientType} />
                      )}
                    </div>
                  )}

                  {quoteSelections.projectType && quoteSelections.clientType && (
                    <div className="step-block">
                      <div className="step-question">{quoteCfg.q3 || "What is your timeline?"}</div>
                      {quoteSelections.timeline === null ? (
                        <StepCTAs options={QUOTE_TIMELINES} onSelect={handleSelectTimeline} />
                      ) : (
                        <BubbleStep options={QUOTE_TIMELINES} selected={quoteSelections.timeline} onSelect={handleSelectTimeline} />
                      )}
                    </div>
                  )}

                  {showQuoteForm && (
                    <div className="step-block">
                      <div className="step-question">{quoteCfg.contactPrompt || "Please provide your contact details so we can follow up."}</div>
                      <form className="chat-form" onSubmit={handleSubmitForm}>
                        <input name="name" value={formData.name} onChange={handleFormChange} placeholder="First & Last Name" required />
                        <input type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="Email" required />
                        <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} placeholder="Phone" required />
                        <button className="cta-btn" type="submit" disabled={isSubmittingLead}>
                          {isSubmittingLead ? "Sending…" : "Submit"}
                        </button>
                      </form>
                    </div>
                  )}

                  {showQuoteSubmit && (
                    <div className="step-block">
                      <div className="step-question">{quoteCfg.returningPrompt || "Welcome back! We’ll follow up with your quote request."}</div>
                      <div className="existing-user-info">
                        <p><strong>Name:</strong> {formData.name}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>Phone:</strong> {formData.phone}</p>
                        <button className="cta-btn" onClick={handleSubmitForm} disabled={isSubmittingLead}>
                          {isSubmittingLead ? "Sending…" : (quoteCfg.returningButton || "Submit Request")}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ========= SCHEDULE ========= */}
              {showScheduleSection && (
                <div className="schedule-section">
                  {scheduleCfg.intro && <div className="step-question">{scheduleCfg.intro}</div>}

                  <div className="step-block">
                    <div className="step-question">{scheduleCfg.q1 || "What date would you like to schedule a call?"}</div>
                    <ScheduleCalendar selectedDate={callSelections.date} onSelectDate={handleSelectCallDate} />
                    {callSelections.date && (
                      <div className="schedule-selected">
                        Selected date: <span>{formatDateLabel(callSelections.date)}</span>
                      </div>
                    )}
                  </div>

                  {callSelections.date && (
                    <div className="step-block">
                      <div className="step-question">{scheduleCfg.q2 || "What time works best for you?"}</div>
                      {!callSelections.time ? (
                        <StepCTAs options={CALL_TIME_SLOTS} onSelect={handleSelectCallTime} />
                      ) : (
                        <BubbleStep options={CALL_TIME_SLOTS} selected={callSelections.time} onSelect={handleSelectCallTime} />
                      )}
                    </div>
                  )}

                  {showScheduleForm && (
                    <div className="step-block">
                      <div className="step-question">{scheduleCfg.contactPrompt || "Please share your contact details and we’ll confirm your call."}</div>
                      <form className="chat-form" onSubmit={handleSubmitForm}>
                        <input name="name" value={formData.name} onChange={handleFormChange} placeholder="First & Last Name" required />
                        <input type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="Email" required />
                        <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} placeholder="Phone" required />
                        <button className="cta-btn" type="submit" disabled={isSubmittingLead}>
                          {isSubmittingLead ? "Sending…" : "Submit"}
                        </button>
                      </form>
                    </div>
                  )}

                  {showScheduleSubmit && (
                    <div className="step-block">
                      <div className="step-question">
                        {scheduleCfg.returningPrompt ||
                          `Welcome back! We'll confirm your call on ${formatDateLabel(callSelections.date)} at ${callSelections.time}.`}
                      </div>
                      <div className="existing-user-info">
                        <p><strong>Name:</strong> {formData.name}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>Phone:</strong> {formData.phone}</p>
                        <button className="cta-btn" onClick={handleSubmitForm} disabled={isSubmittingLead}>
                          {isSubmittingLead ? "Sending…" : (scheduleCfg.returningButton || "Confirm Call")}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ========= ASK ========= */}
              {showAskSection && (
                <div className="flow-section">
                  {!hasTypedQuestion ? (
                    <>
                      <div className="step-question">{askCfg.q1 || "What question do you have?"}</div>
                      <form className="chat-form" onSubmit={handleAskQuestionSubmit}>
                        <textarea
                          className="ask-textarea"
                          value={askQuestion}
                          onChange={(e) => setAskQuestion(e.target.value)}
                          placeholder={askCfg.placeholder || "Type your question here..."}
                          required
                          rows="3"
                        />
                        <button className="cta-btn" type="submit">Continue</button>
                      </form>
                    </>
                  ) : showAskForm ? (
                    <>
                      <div className="step-question">{askCfg.contactPrompt || "Please share your contact details so we can follow up."}</div>
                      <form className="chat-form" onSubmit={handleSubmitForm}>
                        <input name="name" value={formData.name} onChange={handleFormChange} placeholder="First & Last Name" required />
                        <input type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="Email" required />
                        <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} placeholder="Phone" required />
                        <button className="cta-btn" type="submit" disabled={isSubmittingLead}>
                          {isSubmittingLead ? "Sending…" : "Submit"}
                        </button>
                      </form>
                    </>
                  ) : showAskSubmit ? (
                    <>
                      <div className="step-question">{askCfg.returningPrompt || "Thanks! We’ll follow up with you about your question."}</div>
                      <div className="existing-user-info">
                        <p><strong>Name:</strong> {formData.name}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>Phone:</strong> {formData.phone}</p>
                        <button className="cta-btn" onClick={handleSubmitForm} disabled={isSubmittingLead}>
                          {isSubmittingLead ? "Sending…" : (askCfg.returningButton || "Submit Question")}
                        </button>
                      </div>
                    </>
                  ) : null}
                </div>
              )}
            </div>
          </div>

          <MainMenuButtons items={mainMenu} visible={showMainMenuButtons} onSelect={handleMainMenuSelect} />

          {activeFlowId && (
            <button className="back-menu-btn" onClick={handleBackToMainMenu}>
              Back to Main Menu
            </button>
          )}
        </div>
      )}
    </>
  );
}