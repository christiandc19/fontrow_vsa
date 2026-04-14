import React, { useEffect, useRef, useState } from "react";
import { createLead, getUserByIP } from "../../services/widgetApi.js";
import { getClientConfig } from "../../chatbots/registry";
import "./ChatBox.css";

/* ==========================
   API BASE
   Main backend URL used for creating leads
   and saving conversations.
========================== */
const API_BASE = "https://api.websmartassistant.com";

/* ==========================
   HELPERS
========================== */

/* Returns brand/client chatbot config */
const getBotConfig = (clientKey) => {
  return getClientConfig(clientKey) || {};
};

/* Formats ISO date into readable label */
const formatDateLabel = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

/* Month names for calendar UI */
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/* Weekday labels for calendar UI */
const weekdayShort = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

/* Converts JS Date to YYYY-MM-DD */
const toISODate = (date) => {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
};

/* ==========================
   UI COMPONENTS
========================== */

/* Top header of the open chatbox */
const ChatHeader = ({ onClose, title, subtitle, logoUrl }) => (
  <div className="chatbox-header">
    <div className="chatbox-header-left">
      {logoUrl && <img src={logoUrl} alt="Logo" className="chatbox-logo" />}
      <div className="chatbox-header-text">
        <div className="chatbox-title">{title}</div>
        <div className="chatbox-subtitle">{subtitle}</div>
      </div>
    </div>

    {/* Close button should collapse chat back to the launcher */}
    <button
      className="chat-close-btn"
      onClick={onClose}
      type="button"
      aria-label="Close chat"
    >
      ×
    </button>
  </div>
);

/* Renders bot and user messages */
const ChatMessages = ({ messages }) => (
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

/* Small bubble nav shown when a flow is active */
const MainMenuBubbleNav = ({ items, activeId, onSelect }) => (
  <div className="mainmenu-bubble-nav">
    {items.map((item) => (
      <button
        key={item.id}
        className={`nav-bubble ${activeId === item.id ? "active" : ""}`}
        onClick={() => onSelect(item)}
        type="button"
      >
        {item.label}
      </button>
    ))}
  </div>
);

/* Main action buttons shown at bottom when no flow is active */
const MainMenuButtons = ({ items, visible, onSelect }) => {
  if (!visible) return null;

  return (
    <div className="chatbox-ctas">
      {items.map((item) => (
        <button
          key={item.id}
          className="cta-btn"
          onClick={() => onSelect(item)}
          type="button"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

/* Standard CTA list used in flow steps */
const StepCTAs = ({ options, onSelect }) => (
  <div className="step-cta-list">
    {options.map((option) => (
      <button
        key={option}
        className="step-cta-btn"
        onClick={() => onSelect(option)}
        type="button"
      >
        {option}
      </button>
    ))}
  </div>
);

/* Bubble options after one is selected */
const BubbleStep = ({ question, options, selected, onSelect }) => (
  <div className="step-block">
    {question && <div className="step-question">{question}</div>}
    <div className="bubble-group">
      {options.map((option) => (
        <button
          key={option}
          className={`bubble ${selected === option ? "selected" : ""}`}
          onClick={() => onSelect(option)}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

/* Calendar picker for schedule flow */
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

  /* Disable past dates */
  const isDisabled = (year, month, day) => {
    const test = new Date(year, month, day);
    test.setHours(0, 0, 0, 0);
    return test < today;
  };

  /* Check selected date */
  const isSelected = (year, month, day) => {
    if (!selectedDate) return false;
    const d = new Date(selectedDate);
    return (
      d.getFullYear() === year &&
      d.getMonth() === month &&
      d.getDate() === day
    );
  };

  /* Select calendar date */
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
          type="button"
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
          type="button"
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
          if (day === null) {
            return <div key={idx} className="calendar-day empty" />;
          }

          const disabled = isDisabled(viewYear, viewMonth, day);
          const selected = isSelected(viewYear, viewMonth, day);

          return (
            <button
              key={idx}
              type="button"
              className={`calendar-day ${disabled ? "disabled-date" : ""} ${
                selected ? "selected-date" : ""
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
export default function ChatBox({ config = {} }) {
  /* Determine which chatbot brand config to load */
  const clientKey = config?.clientKey || "default";
  const brandConfig = getBotConfig(clientKey);

  /* Merge brand config with current runtime config */
  const mergedConfig = {
    ...brandConfig,
    ...config,
  };

  /* Branding and text content */
  const logoUrl = mergedConfig?.logoUrl || null;
  const headerTitle =
    mergedConfig?.headerTitle ||
    `Chat with ${mergedConfig?.communityName || ""}`.trim() ||
    "Chat with us";
  const headerSubtitle =
    mergedConfig?.headerSubtitle || "We’re here to help you explore options.";
  const welcomeMessage =
    mergedConfig?.welcomeMessage || "How can I help you today?";

  /* Launcher pill text */
  const launcherTitle =
    mergedConfig?.launcherTitle ||
    mergedConfig?.communityName ||
    "Community Assistant";
  const launcherSubtitle =
    mergedConfig?.launcherSubtitle || "Chat with our team";

  /* Theme values passed into CSS as variables */
  const theme = mergedConfig?.theme || {};
  const themeVars = {
    "--chat-primary": theme.primary || "#935135",
    "--chat-primary-hover": theme.primaryHover || "#7c402c",
    "--chat-header-bg": theme.headerBg || "#fcf8ec",
    "--chat-bot-bubble-bg": theme.botBubbleBg || "#ececec",
    "--chat-user-bubble-bg": theme.userBubbleBg || "#935135",
    "--chat-text-dark": theme.textDark || "#333333",
    "--chat-launcher-bg": theme.launcherBg || "#ffffff",
    "--chat-launcher-accent": theme.launcherAccent || "#16335b",
  };

  /* Main menu and flow configs */
  const mainMenu = Array.isArray(mergedConfig?.mainMenu)
    ? mergedConfig.mainMenu
    : [];

  const services = Array.isArray(mergedConfig?.services)
    ? mergedConfig.services
    : [];

  const projects = Array.isArray(mergedConfig?.projects)
    ? mergedConfig.projects
    : [];

  const quoteCfg = mergedConfig?.quote || {};
  const scheduleCfg = mergedConfig?.schedule || {};
  const askCfg = mergedConfig?.ask || {};

  const QUOTE_PROJECT_TYPES = quoteCfg.projectTypes || [];
  const QUOTE_CLIENT_TYPES = quoteCfg.clientTypes || [];
  const QUOTE_TIMELINES = quoteCfg.timelines || [];

  const CALL_TIME_SLOTS = scheduleCfg.timeSlots || [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
  ];

  /* Chat open/closed state */
  const [isOpen, setIsOpen] = useState(false);

  /* Launcher visual modes:
     hidden -> circle -> pill
     On close, it returns to circle */
  const [launcherMode, setLauncherMode] = useState("hidden");

  /* 
    On first page load:
    1. show circle
    2. expand to pill after a short delay
  */
  useEffect(() => {
    const circleTimer = setTimeout(() => {
      setLauncherMode("circle");
    }, 250);

    const pillTimer = setTimeout(() => {
      setLauncherMode("pill");
    }, 1100);

    return () => {
      clearTimeout(circleTimer);
      clearTimeout(pillTimer);
    };
  }, []);


  /* Chat messages */
  const [messages, setMessages] = useState([]);

  /* Active flow like services, quote, schedule, ask */
  const [activeFlowId, setActiveFlowId] = useState(null);

  /* User lookup by IP */
  const [foundUserData, setFoundUserData] = useState(null);
  const [isCheckingIP, setIsCheckingIP] = useState(false);

  /* Contact form */
  const INITIAL_FORM = { name: "", email: "", phone: "" };
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  /* Quote flow selections */
  const INITIAL_QUOTE = {
    projectType: null,
    clientType: null,
    timeline: null,
  };
  const [quoteSelections, setQuoteSelections] = useState(INITIAL_QUOTE);

  /* Call scheduling selections */
  const INITIAL_CALL = { date: null, time: null };
  const [callSelections, setCallSelections] = useState(INITIAL_CALL);

  /* Ask flow */
  const [askQuestion, setAskQuestion] = useState("");
  const [hasTypedQuestion, setHasTypedQuestion] = useState(false);

  /* Queue messages until a lead exists */
  const [pendingConversations, setPendingConversations] = useState([]);

  /* Auto-scroll chat content */
  const scrollRef = useRef(null);

  /* Scroll to bottom when messages or flow content changes */
  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, activeFlowId, quoteSelections, callSelections, hasTypedQuestion]);

  /* On page load:
     first show small circle,
     then expand to launcher pill */
  useEffect(() => {
    const showCircleTimer = setTimeout(() => {
      setLauncherMode("circle");
    }, 300);

    const expandToPillTimer = setTimeout(() => {
      setLauncherMode("pill");
    }, 1100);

    return () => {
      clearTimeout(showCircleTimer);
      clearTimeout(expandToPillTimer);
    };
  }, []);

  /* Open URL in new browser tab */
  const openLink = (url) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  /* Look up returning visitor by IP */
  const checkUserByIP = async (updateFormData = true) => {
    setIsCheckingIP(true);

    try {
      const userData = await getUserByIP();

      if (userData) {
        const user = Array.isArray(userData) ? userData[0] : userData;

        if (user) {
          setFoundUserData(user);

          if (updateFormData) {
            setFormData({
              name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
              email: user.email || "",
              phone: user.phone || "",
            });
          }

          return user;
        }
      }

      return null;
    } catch (error) {
      console.error("Error checking user by IP:", error);
      return null;
    } finally {
      setIsCheckingIP(false);
    }
  };

  /* Save a chat message to the API
     If no lead exists yet, queue it locally first */
  const saveConversationMessage = async (
    message,
    sender = "user",
    userDataParam = null
  ) => {
    const dataToUse = userDataParam || foundUserData;

    if (!dataToUse) {
      setPendingConversations((prev) => [
        ...prev,
        {
          message,
          sender,
          timestamp: new Date().toISOString(),
        },
      ]);
      return;
    }

    try {
      if (!dataToUse?.id) return;

      const payload = {
        leadId: dataToUse.id,
        message,
        sender,
      };

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

/* Opens the full chat widget */
const openChat = async () => {
  setIsOpen(true);

  setMessages([
    {
      id: "welcome",
      sender: "bot",
      text: welcomeMessage,
      isWelcome: true,
    },
  ]);

  setActiveFlowId(null);
  setQuoteSelections(INITIAL_QUOTE);
  setCallSelections(INITIAL_CALL);
  setAskQuestion("");
  setHasTypedQuestion(false);

  setFoundUserData(null);
  setPendingConversations([]);

  const userData = await checkUserByIP();

  if (!userData) {
    setFormData(INITIAL_FORM);
  }

  await saveConversationMessage(welcomeMessage, "bot", userData);
};

/* 
  Close the full widget back to circle only
*/
const closeChat = () => {
  setIsOpen(false);
  setLauncherMode("circle");
};

/* 
  Expand the closed circle into the preview pill
*/
const expandLauncherToPill = () => {
  setLauncherMode("pill");
};

/* 
  Collapse the preview pill back to circle
*/
const collapseLauncherToCircle = (e) => {
  if (e) e.stopPropagation();
  setLauncherMode("circle");
};

  /* Optional helper if you ever need a toggle */
  const handleToggle = () => {
    if (isOpen) {
      closeChat();
    } else {
      openChat();
    }
  };

  /* Main menu click handler */
  const handleMainMenuSelect = (item) => {
    saveConversationMessage(item.label, "user");

    if (item.type === "link") {
      openLink(item.url);
      return;
    }

    setActiveFlowId(item.id);

    if (item.id !== "quote") setQuoteSelections(INITIAL_QUOTE);
    if (item.id !== "schedule") setCallSelections(INITIAL_CALL);
    if (item.id !== "ask") {
      setAskQuestion("");
      setHasTypedQuestion(false);
    }

    if (foundUserData && formData.name === "") {
      setFormData({
        name: `${foundUserData.firstName || ""} ${foundUserData.lastName || ""}`.trim(),
        email: foundUserData.email || "",
        phone: foundUserData.phone || "",
      });
    }
  };

  /* Return to main menu */
  const handleBackToMainMenu = () => {
    saveConversationMessage("Back to Main Menu", "user");
    setActiveFlowId(null);
    setQuoteSelections(INITIAL_QUOTE);
    setCallSelections(INITIAL_CALL);
    setAskQuestion("");
    setHasTypedQuestion(false);

    if (foundUserData && formData.name === "") {
      setFormData({
        name: `${foundUserData.firstName || ""} ${foundUserData.lastName || ""}`.trim(),
        email: foundUserData.email || "",
        phone: foundUserData.phone || "",
      });
    }
  };

  /* Open selected service link */
  const handleServiceSelect = (label) => {
    const svc = services.find((s) => s.label === label);
    if (!svc) return;
    saveConversationMessage(`Service: ${svc.label}`, "user");
    openLink(svc.url);
  };

  /* Open selected project link */
  const handleProjectSelect = (label) => {
    const p = projects.find((x) => x.label === label);
    if (!p) return;
    saveConversationMessage(`Industry: ${p.label}`, "user");
    openLink(p.url);
  };

  /* Quote selections */
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

  /* Schedule selections */
  const handleSelectCallDate = (isoDate) => {
    saveConversationMessage(`Call - Date: ${isoDate}`, "user");
    setCallSelections((prev) => ({ ...prev, date: isoDate }));
  };

  const handleSelectCallTime = (time) => {
    saveConversationMessage(`Call - Time: ${time}`, "user");
    setCallSelections((prev) => ({ ...prev, time }));
  };

  /* Ask flow first submit */
  const handleAskQuestionSubmit = (e) => {
    e.preventDefault();
    if (!askQuestion.trim()) return;
    setHasTypedQuestion(true);
  };

  /* Update contact form fields */
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* Reset flow state after successful submit */
  const resetAllFlows = () => {
    setActiveFlowId(null);
    setQuoteSelections(INITIAL_QUOTE);
    setCallSelections(INITIAL_CALL);
    setAskQuestion("");
    setHasTypedQuestion(false);

    if (!foundUserData) {
      setFormData(INITIAL_FORM);
    } else {
      setFormData({
        name: `${foundUserData.firstName || ""} ${foundUserData.lastName || ""}`.trim(),
        email: foundUserData.email || "",
        phone: foundUserData.phone || "",
      });
    }
  };

  /* Submit lead / quote / schedule / ask request */
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

      let newUserData = null;

      if (foundUserData) {
        const leadId = foundUserData?.id;

        if (!leadId) {
          throw new Error("Lead ID not found in user data");
        }

        const conversationPayload = {
          leadId,
          message: conversationMessage,
          sender: "user",
        };

        const response = await fetch(`${API_BASE}/api/Conversations`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(conversationPayload),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to save conversation: ${errorText}`);
        }
      } else {
        const [firstName = "", ...rest] = formData.name.trim().split(" ");
        const lastName = rest.join(" ");

        let userIP = null;
        try {
          const ipResponse = await fetch("https://api.ipify.org?format=json");
          const ipData = await ipResponse.json();
          userIP = ipData.ip;
        } catch (error) {
          console.warn("Could not get IP address:", error);
        }

        const leadPayload = {
          clientKey,
          email: formData.email,
          firstName,
          lastName,
          phone: formData.phone,
          meta: {
            flow: activeFlowId,
            quoteSelections,
            callSelections,
          },
          conversations: [
            ...pendingConversations,
            { message: conversationMessage, sender: "user" },
          ],
          Details: {
            Ip: userIP,
            Browser: navigator.userAgent,
            Referrer: window.location.origin + window.location.pathname,
          },
        };

        await createLead(leadPayload);

        newUserData = await checkUserByIP(true);
        if (newUserData) {
          setFoundUserData(newUserData);
          setPendingConversations([]);
        }
      }

      let botReply = "";

      if (activeFlowId === "ask") {
        botReply = `Thanks, ${formData.name}! We received your question and our team will reach out soon.`;
      } else if (
        activeFlowId === "schedule" &&
        callSelections.date &&
        callSelections.time
      ) {
        botReply = `Thank you, ${formData.name}! We'll confirm your call on ${formatDateLabel(
          callSelections.date
        )} at ${callSelections.time}.`;
      } else {
        botReply = `Thank you, ${formData.name}! A team member will reach out soon.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "bot",
          text: botReply,
        },
      ]);

      const userDataForSaving = newUserData || foundUserData;
      await saveConversationMessage(botReply, "bot", userDataForSaving);

      resetAllFlows();
    } catch (err) {
      console.error("Submission failed:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "bot",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsSubmittingLead(false);
    }
  };

  /* UI visibility states */
  const showMainMenuButtons = !activeFlowId;

  const showServicesSection = activeFlowId === "services";
  const showProjectsSection = activeFlowId === "projects";
  const showQuoteSection = activeFlowId === "quote";
  const showScheduleSection = activeFlowId === "schedule";
  const showAskSection = activeFlowId === "ask";

  const quoteHasAll = !!(
    quoteSelections.projectType &&
    quoteSelections.clientType &&
    quoteSelections.timeline
  );

  const callHasBoth = !!(callSelections.date && callSelections.time);

  const showQuoteForm = showQuoteSection && quoteHasAll && !foundUserData;
  const showQuoteSubmit = showQuoteSection && quoteHasAll && !!foundUserData;

  const showScheduleForm = showScheduleSection && callHasBoth && !foundUserData;
  const showScheduleSubmit = showScheduleSection && callHasBoth && !!foundUserData;

  const showAskForm = showAskSection && hasTypedQuestion && !foundUserData;
  const showAskSubmit = showAskSection && hasTypedQuestion && !!foundUserData;

  return (
    <>
{/* ==========================
   CLOSED LAUNCHER
   - circle on first load
   - expands to pill after delay
   - clicking pill body opens chat
   - clicking pill X collapses to circle
========================== */}
    {launcherMode !== "hidden" && !isOpen && (
      <div
        className={`chat-launcher ${launcherMode}`}
        style={themeVars}
      >
        {/* Circle button or left logo area */}
        <button
          className="chat-launcher-main"
          onClick={launcherMode === "circle" ? expandLauncherToPill : openChat}
          type="button"
          aria-label={launcherMode === "circle" ? "Expand chat launcher" : "Open chat"}
          title={launcherTitle}
        >
          <div className="chat-launcher-avatar-wrap">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="chat-launcher-avatar" />
            ) : (
              <div className="chat-launcher-avatar-fallback">C</div>
            )}
          </div>

          {launcherMode === "pill" && (
            <div className="chat-launcher-text">
              <div className="chat-launcher-title">{launcherTitle}</div>
              <div className="chat-launcher-subtitle">{launcherSubtitle}</div>
            </div>
          )}
        </button>

        {/* Separate X button for the closed pill only */}
        {launcherMode === "pill" && (
          <button
            className="chat-launcher-close"
            onClick={collapseLauncherToCircle}
            type="button"
            aria-label="Collapse launcher"
          >
            ×
          </button>
        )}
      </div>
    )}

      {/* OPEN CHAT WINDOW */}
      {isOpen && (
        <div
          className="chatbox-container"
          role="dialog"
          aria-label="Chat with us"
          style={themeVars}
        >
          <ChatHeader
            onClose={closeChat}
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
                <MainMenuBubbleNav
                  items={mainMenu}
                  activeId={activeFlowId}
                  onSelect={handleMainMenuSelect}
                />
              )}

              {showServicesSection && (
                <div className="flow-section">
                  <div className="step-question">
                    {mergedConfig?.servicesTitle || "Please select a service:"}
                  </div>
                  <StepCTAs
                    options={services.map((s) => s.label)}
                    onSelect={handleServiceSelect}
                  />
                </div>
              )}

              {showProjectsSection && (
                <div className="flow-section">
                  <div className="step-question">
                    {mergedConfig?.projectsTitle || "Select a project category:"}
                  </div>
                  <StepCTAs
                    options={projects.map((p) => p.label)}
                    onSelect={handleProjectSelect}
                  />
                </div>
              )}

              {showQuoteSection && (
                <div className="pricing-section">
                  {quoteCfg.intro && <div className="step-question">{quoteCfg.intro}</div>}

                  <div className="step-block">
                    <div className="step-question">
                      {quoteCfg.q1 || "What type of project is this?"}
                    </div>

                    {quoteSelections.projectType === null ? (
                      <StepCTAs
                        options={QUOTE_PROJECT_TYPES}
                        onSelect={handleSelectProjectType}
                      />
                    ) : (
                      <BubbleStep
                        options={QUOTE_PROJECT_TYPES}
                        selected={quoteSelections.projectType}
                        onSelect={handleSelectProjectType}
                      />
                    )}
                  </div>

                  {quoteSelections.projectType && (
                    <div className="step-block">
                      <div className="step-question">
                        {quoteCfg.q2 || "Who are you?"}
                      </div>

                      {quoteSelections.clientType === null ? (
                        <StepCTAs
                          options={QUOTE_CLIENT_TYPES}
                          onSelect={handleSelectClientType}
                        />
                      ) : (
                        <BubbleStep
                          options={QUOTE_CLIENT_TYPES}
                          selected={quoteSelections.clientType}
                          onSelect={handleSelectClientType}
                        />
                      )}
                    </div>
                  )}

                  {quoteSelections.projectType && quoteSelections.clientType && (
                    <div className="step-block">
                      <div className="step-question">
                        {quoteCfg.q3 || "What is your timeline?"}
                      </div>

                      {quoteSelections.timeline === null ? (
                        <StepCTAs
                          options={QUOTE_TIMELINES}
                          onSelect={handleSelectTimeline}
                        />
                      ) : (
                        <BubbleStep
                          options={QUOTE_TIMELINES}
                          selected={quoteSelections.timeline}
                          onSelect={handleSelectTimeline}
                        />
                      )}
                    </div>
                  )}

                  {showQuoteForm && (
                    <div className="step-block">
                      <div className="step-question">
                        {quoteCfg.contactPrompt ||
                          "Please provide your contact details so we can follow up."}
                      </div>

                      <form className="chat-form" onSubmit={handleSubmitForm}>
                        <input
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
                    </div>
                  )}

                  {showQuoteSubmit && (
                    <div className="step-block">
                      <div className="step-question">
                        {quoteCfg.returningPrompt ||
                          "Welcome back! We’ll follow up with your quote request."}
                      </div>

                      <div className="existing-user-info">
                        <p><strong>Name:</strong> {formData.name}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>Phone:</strong> {formData.phone}</p>
                        <button
                          className="cta-btn"
                          onClick={handleSubmitForm}
                          disabled={isSubmittingLead}
                          type="button"
                        >
                          {isSubmittingLead
                            ? "Sending…"
                            : quoteCfg.returningButton || "Submit Request"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {showScheduleSection && (
                <div className="schedule-section">
                  {scheduleCfg.intro && <div className="step-question">{scheduleCfg.intro}</div>}

                  <div className="step-block">
                    <div className="step-question">
                      {scheduleCfg.q1 || "What date would you like to schedule a call?"}
                    </div>

                    <ScheduleCalendar
                      selectedDate={callSelections.date}
                      onSelectDate={handleSelectCallDate}
                    />

                    {callSelections.date && (
                      <div className="schedule-selected">
                        Selected date: <span>{formatDateLabel(callSelections.date)}</span>
                      </div>
                    )}
                  </div>

                  {callSelections.date && (
                    <div className="step-block">
                      <div className="step-question">
                        {scheduleCfg.q2 || "What time works best for you?"}
                      </div>

                      {!callSelections.time ? (
                        <StepCTAs
                          options={CALL_TIME_SLOTS}
                          onSelect={handleSelectCallTime}
                        />
                      ) : (
                        <BubbleStep
                          options={CALL_TIME_SLOTS}
                          selected={callSelections.time}
                          onSelect={handleSelectCallTime}
                        />
                      )}
                    </div>
                  )}

                  {showScheduleForm && (
                    <div className="step-block">
                      <div className="step-question">
                        {scheduleCfg.contactPrompt ||
                          "Please share your contact details and we’ll confirm your call."}
                      </div>

                      <form className="chat-form" onSubmit={handleSubmitForm}>
                        <input
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
                    </div>
                  )}

                  {showScheduleSubmit && (
                    <div className="step-block">
                      <div className="step-question">
                        {scheduleCfg.returningPrompt ||
                          `Welcome back! We'll confirm your call on ${formatDateLabel(
                            callSelections.date
                          )} at ${callSelections.time}.`}
                      </div>

                      <div className="existing-user-info">
                        <p><strong>Name:</strong> {formData.name}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>Phone:</strong> {formData.phone}</p>
                        <button
                          className="cta-btn"
                          onClick={handleSubmitForm}
                          disabled={isSubmittingLead}
                          type="button"
                        >
                          {isSubmittingLead
                            ? "Sending…"
                            : scheduleCfg.returningButton || "Confirm Call"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {showAskSection && (
                <div className="flow-section">
                  {!hasTypedQuestion ? (
                    <>
                      <div className="step-question">
                        {askCfg.q1 || "What question do you have?"}
                      </div>

                      <form className="chat-form" onSubmit={handleAskQuestionSubmit}>
                        <textarea
                          className="ask-textarea"
                          value={askQuestion}
                          onChange={(e) => setAskQuestion(e.target.value)}
                          placeholder={askCfg.placeholder || "Type your question here..."}
                          required
                          rows="3"
                        />
                        <button className="cta-btn" type="submit">
                          Continue
                        </button>
                      </form>
                    </>
                  ) : showAskForm ? (
                    <>
                      <div className="step-question">
                        {askCfg.contactPrompt ||
                          "Please share your contact details so we can follow up."}
                      </div>

                      <form className="chat-form" onSubmit={handleSubmitForm}>
                        <input
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
                  ) : showAskSubmit ? (
                    <>
                      <div className="step-question">
                        {askCfg.returningPrompt ||
                          "Thanks! We’ll follow up with you about your question."}
                      </div>

                      <div className="existing-user-info">
                        <p><strong>Name:</strong> {formData.name}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>Phone:</strong> {formData.phone}</p>
                        <button
                          className="cta-btn"
                          onClick={handleSubmitForm}
                          disabled={isSubmittingLead}
                          type="button"
                        >
                          {isSubmittingLead
                            ? "Sending…"
                            : askCfg.returningButton || "Submit Question"}
                        </button>
                      </div>
                    </>
                  ) : null}
                </div>
              )}
            </div>
          </div>

          <MainMenuButtons
            items={mainMenu}
            visible={showMainMenuButtons}
            onSelect={handleMainMenuSelect}
          />

          {activeFlowId && (
            <button className="back-menu-btn" onClick={handleBackToMainMenu} type="button">
              Back to Main Menu
            </button>
          )}
        </div>
      )}
    </>
  );
}