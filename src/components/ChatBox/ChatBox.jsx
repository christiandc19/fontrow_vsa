import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createLead, getUserByIP } from "../../services/widgetApi.js";
import { getClientConfig } from "../../chatbots/registry";
import "./ChatBox.css";

import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import MainMenuBubbleNav from "./MainMenuBubbleNav";
import MainMenuButtons from "./MainMenuButtons";
import FlowRenderer from "./FlowRenderer";

const API_BASE =
  typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL
    ? import.meta.env.VITE_API_URL
    : process.env.REACT_APP_API_URL;

const API_KEY =
  typeof import.meta !== "undefined" && import.meta.env?.VITE_CHATBOT_API_KEY
    ? import.meta.env.VITE_CHATBOT_API_KEY
    : process.env.REACT_APP_CHATBOT_API_KEY;

const authHeaders = {
  "Content-Type": "application/json",
  "X-Api-Key": API_KEY,
};

const getBotConfig = (clientKey) => getClientConfig(clientKey) || {};

const formatDateLabel = (iso) => {
  if (!iso) return "";

  const d = new Date(iso);

  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const normalizeEmail = (email = "") => email.trim().toLowerCase();
const normalizePhone = (phone = "") => phone.replace(/\D/g, "");

const buildVisitDateTime = (isoDate, timeStr) => {
  const [year, month, day] = isoDate.split("-").map(Number);
  const [time, meridiem] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (meridiem === "PM" && hours !== 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;
  const pad = (n) => String(n).padStart(2, "0");
  // Return a local ISO string (no Z / no UTC conversion) so the backend
  // receives the exact date and time the visitor selected in the chatbot.
  return `${year}-${pad(month)}-${pad(day)}T${pad(hours)}:${pad(minutes)}:00`;
};

const getFullNameFromLead = (lead) =>
  `${lead?.firstName || ""} ${lead?.lastName || ""}`.trim();

// ========================================
// LEAD ACTIVITY TRACKING
//
// Saves CRM-style activity events
// such as button clicks and link clicks.
// ========================================
const saveLeadActivity = async (
  leadId,
  activityType,
  title,
  description = null,
  url = null,
) => {
  try {
    if (!leadId) return;

    await fetch(`${API_BASE}/api/LeadActivities`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({
        leadId,
        activityType,
        title,
        description,
        url,
        source: "chatbot",
      }),
    });
  } catch (err) {
    console.error("Lead activity save failed:", err);
  }
};

export default function ChatBox({ config = {} }) {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const askTypingTimerRef = useRef(null);

  const clientKey = config?.clientKey || "default";
  const brandConfig = getBotConfig(clientKey);

  const mergedConfig = {
    ...brandConfig,
    ...config,
  };

  const logoUrl = mergedConfig?.logoUrl || null;

  const headerTitle =
    mergedConfig?.headerTitle ??
    (`Chat with ${mergedConfig?.communityName || ""}`.trim() || "Chat with us");

  const headerSubtitle =
    mergedConfig?.headerSubtitle ?? "We’re here to help you explore options.";

  const welcomeMessage =
    mergedConfig?.welcomeMessage || "How can I help you today?";

  const launcherTitle =
    mergedConfig?.launcherTitle ||
    mergedConfig?.communityName ||
    "Community Assistant";

  const launcherSubtitle =
    mergedConfig?.launcherSubtitle || "Chat with our team";

  const theme = mergedConfig?.theme || {};

  const themeVars = {
    "--chat-primary": theme.primary || "#935135",
    "--chat-primary-hover": theme.primaryHover || "#7c402c",
    "--chat-accent":
      theme.accent || theme.launcherAccent || theme.primary || "#16335b",
    "--chat-header-bg": theme.headerBg || "#fcf8ec",
    "--chat-header-text": theme.headerText || theme.textDark || "#333333",
    "--chat-header-subtitle":
      theme.headerSubtitle || theme.textMuted || theme.textDark || "#555555",
    "--chat-bot-bubble-bg": theme.botBubbleBg || "#ececec",
    "--chat-bot-bubble-text":
      theme.botBubbleText || theme.textDark || "#333333",
    "--chat-user-bubble-bg": theme.userBubbleBg || theme.primary || "#935135",
    "--chat-user-bubble-text": theme.userBubbleText || "#ffffff",
    "--chat-text-dark": theme.textDark || "#333333",
    "--chat-text-light": theme.textLight || "#ffffff",
    "--chat-text-muted": theme.textMuted || "#666666",
    "--chat-launcher-bg": theme.launcherBg || "#ffffff",
    "--chat-launcher-text": theme.launcherText || theme.textDark || "#333333",
    "--chat-launcher-subtitle":
      theme.launcherSubtitle || theme.textMuted || "#666666",
    "--chat-launcher-accent":
      theme.launcherAccent || theme.primary || "#16335b",
    "--chat-button-bg": theme.buttonBg || "#ffffff",
    "--chat-button-text": theme.buttonText || theme.textDark || "#333333",
    "--chat-button-border": theme.buttonBorder || "#dddddd",
    "--chat-button-active-bg":
      theme.buttonActiveBg || theme.primary || "#935135",
    "--chat-button-active-text": theme.buttonActiveText || "#ffffff",
    "--chat-back-button-bg": theme.backButtonBg || "#f3f4f6",
    "--chat-back-button-text":
      theme.backButtonText || theme.textDark || "#333333",
    "--chat-back-button-hover-bg":
      theme.backButtonHoverBg || theme.primaryHover || "#e5e7eb",
    "--chat-calendar-bg": theme.calendarBg || "#ffffff",
    "--chat-calendar-text": theme.calendarText || theme.textDark || "#333333",
    "--chat-calendar-muted-text":
      theme.calendarMutedText || theme.textMuted || "#999999",
    "--chat-input-bg": theme.inputBg || "#ffffff",
    "--chat-input-text": theme.inputText || theme.textDark || "#333333",
    "--chat-input-border": theme.inputBorder || "#dddddd",
  };

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
  const askCfg = mergedConfig?.ask || {};
  const pricingCfg = mergedConfig?.pricing || {};

  const quoteProjectTypes = quoteCfg.projectTypes || [];
  const quoteClientTypes = quoteCfg.clientTypes || [];
  const quoteTimelines = quoteCfg.timelines || [];

  const initialForm = { name: "", email: "", phone: "" };

  const initialQuote = {
    projectType: null,
    clientType: null,
    timeline: null,
  };

  const initialCall = {
    date: null,
    time: null,
  };

  const initialPricing = {
    livingOption: null,
    inquiryFor: null,
    timeline: null,
  };

  const [isOpen, setIsOpen] = useState(false);
  /* ========================================
    LAUNCHER START STATE

    If the visitor has already seen the auto-launch once,
    start the launcher as a pill after page refresh.

    If this is their first visit, start as a circle.
  ======================================== */
// NEW: Start hidden so the circle does not appear immediately on page load.
  const [launcherMode, setLauncherMode] = useState("hidden");

  const [messages, setMessages] = useState([]);
  const [activeFlowId, setActiveFlowId] = useState(null);
  const [foundUserData, setFoundUserData] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [savedLead, setSavedLead] = useState(() => {
    try {
      const clientSavedLead = localStorage.getItem(
        `wsa_chatbot_lead_submitted_${clientKey}`
      );

      const legacySavedLead = localStorage.getItem("wsa_chatbot_lead_submitted");

      return JSON.parse(clientSavedLead || legacySavedLead || "null");
    } catch {
      return null;
    }
  });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [quoteSelections, setQuoteSelections] = useState(initialQuote);
  const [callSelections, setCallSelections] = useState(initialCall);
  const [askQuestion, setAskQuestion] = useState("");
  const [hasTypedQuestion, setHasTypedQuestion] = useState(false);
  // Controls the typing animation before Ask flow appears
  const [showAskStart, setShowAskStart] = useState(false);
  const [pendingFlowId, setPendingFlowId] = useState(null);
  const [showFlowTyping, setShowFlowTyping] = useState(false);
  const [pendingConversations, setPendingConversations] = useState([]);
  const [showStartupTyping, setShowStartupTyping] = useState(false);
  const [pricingSelections, setPricingSelections] = useState(initialPricing);

  // Controls whether all main menu buttons are shown.
  // If false, larger menus will only show the first few buttons.
  const [showAllMenuButtons, setShowAllMenuButtons] = useState(false);

  const isSchedulingFlow =
    activeFlowId === "schedule" || activeFlowId === "demo";

  const scheduleCfg =
    activeFlowId === "demo"
      ? mergedConfig?.demo || {}
      : mergedConfig?.schedule || {};

  const callTimeSlots = scheduleCfg.timeSlots || [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
  ];

  useEffect(() => {
    if (!savedLead?.submitted) return;

    setFormData({
      name: savedLead.name || "",
      email: savedLead.email || "",
      phone: savedLead.phone || "",
    });
  }, [savedLead]);

    /* ========================================
      AUTO SCROLL TO LATEST MESSAGE

      Ensures the chatbot always scrolls to the
      newest message or newest flow content.

      This fixes the issue where the conversation
      stays at the top after new messages appear.
    ======================================== */
    useEffect(() => {
      if (!scrollRef.current) return;

      // Small delay allows React DOM rendering
      // to finish before calculating height.
      const timer = setTimeout(() => {
        const container = scrollRef.current;

        if (!container) return;

        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      }, 250);

      return () => clearTimeout(timer);
    }, [
      messages,
      activeFlowId,
      quoteSelections,
      callSelections,
      pricingSelections,
      hasTypedQuestion,
      showStartupTyping,
      showAskStart,
    ]);

  useEffect(() => {
    return () => {
      if (askTypingTimerRef.current) {
        clearTimeout(askTypingTimerRef.current);
      }
    };
  }, []);






  /* ========================================
    AUTO LAUNCH SEQUENCE

    First homepage visit:
    1. Start as circle
    2. Expand to pill
    3. Open full chatbot

    After refresh:
    - Stay as pill
    - Do not auto-open again
  ======================================== */

/* eslint-disable react-hooks/exhaustive-deps */
useEffect(() => {
  // NEW: Check if visitor already saw the launcher auto-open sequence.
  const hasSeenLauncher =
    localStorage.getItem("wsa-launcher-seen") === "true";

  // NEW: Returning visitors skip the delay and show the pill immediately.
  if (hasSeenLauncher) {
    setLauncherMode("pill");
    return;
  }

  // NEW: After 3 seconds, show the circle launcher.
  const circleTimer = setTimeout(() => {
    setLauncherMode("circle");
  }, 3000);

  // NEW: After circle appears, expand it into the pill.
  const pillTimer = setTimeout(() => {
    setLauncherMode("pill");
  }, 4200);

  // NEW: After pill appears, open the full chatbot.
  const openTimer = setTimeout(() => {
    openChat();

    // NEW: Save that visitor already saw the auto-launch sequence.
    localStorage.setItem("wsa-launcher-seen", "true");
  }, 5600);

  // NEW: Cleanup timers if component unmounts.
  return () => {
    clearTimeout(circleTimer);
    clearTimeout(pillTimer);
    clearTimeout(openTimer);
  };
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);





    const openLink = (url, label = "Link") => {
      if (!url) return;

      // NEW:
      // Track outbound link click
      if (foundUserData?.id) {
        saveLeadActivity(
          foundUserData.id,
          "LinkClicked",
          `Opened ${label}`,
          null,
          url
        );
      }

      if (url.startsWith("/")) {
        navigate(url);
        setIsOpen(false);
        return;
      }

      window.open(url, "_blank", "noopener,noreferrer");
    };

  const checkUserByIP = async (updateFormData = true) => {
    try {
      const referrer = window.location.origin + window.location.pathname;
      const userData = await getUserByIP(referrer);
      const user = Array.isArray(userData) ? userData[0] : userData;

      if (!user) return null;

      setFoundUserData(user);

      if (updateFormData) {
        setFormData({
          name: getFullNameFromLead(user),
          email: user.email || "",
          phone: user.phone || "",
        });
      }

      return user;
    } catch (error) {
      console.error("Error checking user by IP:", error);
      return null;
    }
  };

  const contactMatchesFoundUser = (contactData = formData) => {
    if (!foundUserData) return false;

    const foundEmail = normalizeEmail(foundUserData.email);
    const enteredEmail = normalizeEmail(contactData.email);

    if (foundEmail && enteredEmail) {
      return foundEmail === enteredEmail;
    }

    const foundPhone = normalizePhone(foundUserData.phone);
    const enteredPhone = normalizePhone(contactData.phone);

    if (foundPhone && enteredPhone) {
      return foundPhone === enteredPhone;
    }

    const foundName = getFullNameFromLead(foundUserData).toLowerCase();
    const enteredName = contactData.name.trim().toLowerCase();

    return !!foundName && !!enteredName && foundName === enteredName;
  };

  const saveConversationMessage = async (
    message,
    sender = "user",
    userDataParam = null,
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
        headers: authHeaders,
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

  const openChat = async () => {
    console.log("Chat opened with config:");
    setIsOpen(true);
    setMessages([]);
    // Start each new chat with the collapsed menu again.
    // This keeps large client menus clean when the chatbot is reopened.
    setShowAllMenuButtons(false);

    setShowStartupTyping(true);
    setShowFlowTyping(false);
    setPendingFlowId(null);
    setShowAskStart(false);

    if (askTypingTimerRef.current) {
      clearTimeout(askTypingTimerRef.current);
      askTypingTimerRef.current = null;
    }

    setActiveFlowId(null);
    setQuoteSelections(initialQuote);
    setCallSelections(initialCall);
    setPricingSelections(initialPricing);
    setAskQuestion("");
    setHasTypedQuestion(false);
    setFoundUserData(null);
    setPendingConversations([]);

    await new Promise((resolve) => setTimeout(resolve, 2200));

    setShowStartupTyping(false);

    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: welcomeMessage,
        isWelcome: true,
      },
    ]);

    // Do not prefill contact form from IP.
    // If this browser already submitted contact info, reuse it and lock
    // only the contact fields. Otherwise start with an empty form.
    if (savedLead?.submitted) {
      setFormData({
        name: savedLead.name || "",
        email: savedLead.email || "",
        phone: savedLead.phone || "",
      });
    } else {
      setFormData(initialForm);
    }

    setFoundUserData(null);

    await saveConversationMessage(welcomeMessage, "bot", null);
      };

  /* ========================================
    CLOSE FULL CHATBOT

    When the expanded chatbot is closed,
    return to the pill launcher instead of the circle.
  ======================================== */
  const closeChat = () => {
    if (askTypingTimerRef.current) {
      clearTimeout(askTypingTimerRef.current);
      askTypingTimerRef.current = null;
    }

    setShowFlowTyping(false);
    setPendingFlowId(null);
    setShowAskStart(false);
    setIsOpen(false);
    setLauncherMode("pill");
  };

  const expandLauncherToPill = () => {
    setLauncherMode("pill");
  };

  const collapseLauncherToCircle = (e) => {
    if (e) e.stopPropagation();
    setLauncherMode("circle");
  };

  const syncKnownUserIntoForm = () => {
    if (savedLead?.submitted) {
      setFormData({
        name: savedLead.name || "",
        email: savedLead.email || "",
        phone: savedLead.phone || "",
      });
      return;
    }

    if (foundUserData && formData.name === "") {
      setFormData({
        name: getFullNameFromLead(foundUserData),
        email: foundUserData.email || "",
        phone: foundUserData.phone || "",
      });
    }
  };

  const resetFlowSelections = (nextFlowId) => {
    if (nextFlowId !== "quote") setQuoteSelections(initialQuote);

    if (nextFlowId !== "schedule" && nextFlowId !== "demo") {
      setCallSelections(initialCall);
    }

    if (nextFlowId !== "pricing") {
      setPricingSelections(initialPricing);
    }

    if (nextFlowId !== "ask") {
      setAskQuestion("");
      setHasTypedQuestion(false);
    }
  };

  const handleMainMenuSelect = (item) => {
    if (item.id === "show-more") {
      setShowAllMenuButtons(true);
      return;
    }

    saveConversationMessage(item.label, "user");

    // NEW:
    // Save chatbot button activity
    if (foundUserData?.id) {
      saveLeadActivity(
        foundUserData.id,
        "ButtonClicked",
        `Clicked ${item.label}`
      );
    }
    
    if (item.type === "link") {
      openLink(item.url, item.label);
      return;
    }

    // Ask flow typing indicator before showing the question box.
    // This keeps the main menu hidden while the bot is "typing",
    // then shows the Ask flow after the delay.
    if (item.id === "ask") {
      if (askTypingTimerRef.current) {
        clearTimeout(askTypingTimerRef.current);
      }

      resetFlowSelections("ask");
      syncKnownUserIntoForm();
      setAskQuestion("");
      setHasTypedQuestion(false);
      setActiveFlowId(null);
      setPendingFlowId("ask");
      setShowAskStart(false);
      setShowFlowTyping(true);

      askTypingTimerRef.current = setTimeout(() => {
        setShowFlowTyping(false);
        setPendingFlowId(null);
        setActiveFlowId("ask");
        setShowAskStart(true);
        askTypingTimerRef.current = null;

        setTimeout(() => {
          scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth",
          });
        }, 100);
      }, 1400);

      return;
    }

    if (askTypingTimerRef.current) {
      clearTimeout(askTypingTimerRef.current);
      askTypingTimerRef.current = null;
    }

    setShowFlowTyping(false);
    setPendingFlowId(null);
    setActiveFlowId(item.id);
    resetFlowSelections(item.id);
    syncKnownUserIntoForm();
  };

  const handleBackToMainMenu = () => {
    if (askTypingTimerRef.current) {
      clearTimeout(askTypingTimerRef.current);
      askTypingTimerRef.current = null;
    }

    saveConversationMessage("Back to Main Menu", "user");
    setShowFlowTyping(false);
    setPendingFlowId(null);
    setActiveFlowId(null);
    setShowAskStart(false);
    resetFlowSelections(null);
    syncKnownUserIntoForm();
  };

  const handleCommunityFlowSelect = (flowId) => {
    // Used by Floor Plans to return to the normal main menu.
    if (flowId === "main-menu") {
      handleBackToMainMenu();
      return;
    }

    if (askTypingTimerRef.current) {
      clearTimeout(askTypingTimerRef.current);
      askTypingTimerRef.current = null;
    }

    // Used by Community, Dining, and Floor Plans buttons.
    saveConversationMessage(`Community action: ${flowId}`, "user");
    setShowFlowTyping(false);
    setPendingFlowId(null);
    setActiveFlowId(flowId);
    resetFlowSelections(flowId);
    syncKnownUserIntoForm();
  };

  const handleServiceSelect = (label) => {
    const svc = services.find((s) => s.label === label);
    if (!svc) return;

    saveConversationMessage(`Service: ${svc.label}`, "user");
    openLink(svc.url, svc.label);
  };

  const handleProjectSelect = (label) => {
    const project = projects.find((p) => p.label === label);
    if (!project) return;

    saveConversationMessage(`Industry: ${project.label}`, "user");
    openLink(project.url, project.label);
  };

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

  const handleSelectPricingLivingOption = (option) => {
    saveConversationMessage(`Pricing - Living Option: ${option}`, "user");

    setPricingSelections((prev) => ({
      ...prev,
      livingOption: option,
      inquiryFor: null,
      timeline: null,
    }));
  };

  const handleSelectPricingInquiryFor = (option) => {
    saveConversationMessage(`Pricing - For: ${option}`, "user");

    setPricingSelections((prev) => ({
      ...prev,
      inquiryFor: option,
      timeline: null,
    }));
  };

  const handleSelectPricingTimeline = (option) => {
    saveConversationMessage(`Pricing - Timeline: ${option}`, "user");

    setPricingSelections((prev) => ({
      ...prev,
      timeline: option,
    }));
  };

  const handleSelectCallDate = (isoDate) => {
    const label = activeFlowId === "demo" ? "Demo" : "Visit";
    saveConversationMessage(`${label} - Date: ${isoDate}`, "user");
    setCallSelections((prev) => ({ ...prev, date: isoDate }));
  };

  const handleSelectCallTime = (time) => {
    const label = activeFlowId === "demo" ? "Demo" : "Visit";
    saveConversationMessage(`${label} - Time: ${time}`, "user");
    setCallSelections((prev) => ({ ...prev, time }));
  };

  const handleAskQuestionSubmit = (e) => {
    e.preventDefault();

    if (!askQuestion.trim()) return;

    setHasTypedQuestion(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetAllFlows = () => {
    if (askTypingTimerRef.current) {
      clearTimeout(askTypingTimerRef.current);
      askTypingTimerRef.current = null;
    }

    setShowFlowTyping(false);
    setPendingFlowId(null);
    setShowAskStart(false);
    setActiveFlowId(null);
    setQuoteSelections(initialQuote);
    setCallSelections(initialCall);
    setPricingSelections(initialPricing);
    setAskQuestion("");
    setHasTypedQuestion(false);

    if (savedLead?.submitted) {
      setFormData({
        name: savedLead.name || "",
        email: savedLead.email || "",
        phone: savedLead.phone || "",
      });
    } else if (!foundUserData) {
      setFormData(initialForm);
    } else {
      setFormData({
        name: getFullNameFromLead(foundUserData),
        email: foundUserData.email || "",
        phone: foundUserData.phone || "",
      });
    }
  };

  const buildConversationMessage = (contactData = formData) => {
    if (activeFlowId === "quote") {
      return `Quote Request: ${JSON.stringify(quoteSelections)}`;
    }

    if (activeFlowId === "pricing") {
      return `Pricing Request

Name: ${contactData.name}
Email: ${contactData.email}
Phone: ${contactData.phone}

Living Option: ${pricingSelections.livingOption}
For: ${pricingSelections.inquiryFor}
Timeline: ${pricingSelections.timeline}`;
    }

    if (activeFlowId === "schedule") {
      return `Schedule Visit Request

Name: ${contactData.name}
Email: ${contactData.email}
Phone: ${contactData.phone}

Date: ${formatDateLabel(callSelections.date)}
Time: ${callSelections.time}`;
    }

    if (activeFlowId === "demo") {
      return `Demo Request: ${callSelections.date} ${callSelections.time}`;
    }

    if (activeFlowId === "ask") {
      return `Question Request

Name: ${contactData.name}
Email: ${contactData.email}
Phone: ${contactData.phone}

Question: ${askQuestion}`;
    }

    return `Lead from chatbot (${activeFlowId || "main_menu"})`;
  };

  const buildBotReply = (contactData = formData) => {
    if (activeFlowId === "ask") {
      return `Thanks, ${contactData.name}! We received your question and our team will reach out soon.`;
    }

    if (activeFlowId === "pricing") {
      return `Thanks, ${contactData.name}! We received your pricing request and our team will follow up shortly.`;
    }

    if (isSchedulingFlow && callSelections.date && callSelections.time) {
      const requestLabel = activeFlowId === "demo" ? "demo" : "visit";

      return `Thank you, ${contactData.name}! We'll confirm your ${requestLabel} on ${formatDateLabel(
        callSelections.date,
      )} at ${callSelections.time}.`;
    }

    return `Thank you, ${contactData.name}! A team member will reach out soon.`;
  };

  const handleSubmitForm = async (e) => {
    if (e) e.preventDefault();

    setIsSubmittingLead(true);

    const contactData = savedLead?.submitted
      ? {
          name: savedLead.name || "",
          email: savedLead.email || "",
          phone: savedLead.phone || "",
        }
      : formData;

    try {
      const conversationMessage = buildConversationMessage(contactData);
      let newUserData = null;
      const shouldAttachToFoundUser =
        foundUserData && contactMatchesFoundUser(contactData);

      if (shouldAttachToFoundUser) {
        const leadId = foundUserData?.id;

        if (!leadId) {
          throw new Error("Lead ID not found in user data");
        }

        const conversationPayload = {
          leadId,
          message: conversationMessage,
          sender: "user",

          // NEW:
          // Allows backend to attach community/clientKey
          // to older existing leads that previously
          // had no community assigned.
          clientKey,

          formKey:
            activeFlowId === "schedule"
              ? "schedule-visit-request"
              : activeFlowId || "chatbot",
          ...(activeFlowId === "schedule" &&
          callSelections.date &&
          callSelections.time
            ? {
                visitDate: buildVisitDateTime(
                  callSelections.date,
                  callSelections.time,
                ),
              }
            : {}),
        };

        const response = await fetch(`${API_BASE}/api/Conversations`, {
          method: "POST",
          headers: authHeaders,
          body: JSON.stringify(conversationPayload),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to save conversation: ${errorText}`);
        }
      } else {
        const [firstName = "", ...rest] = contactData.name.trim().split(" ");
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
          email: contactData.email,
          firstName,
          lastName,
          phone: contactData.phone,
          source: "chatbot",
          formKey:
            activeFlowId === "schedule"
              ? "schedule-visit-request"
              : activeFlowId || "chatbot",
          meta: {
            flow: activeFlowId,
            quoteSelections,
            callSelections,
            pricingSelections,
            askQuestion,
          },
          conversations: [
            ...pendingConversations,
            {
              message: conversationMessage,
              sender: "user",
            },
          ],
          Details: {
            Ip: userIP,
            Browser: navigator.userAgent,
            Referrer: window.location.origin + window.location.pathname,
          },
          ...(activeFlowId === "schedule" &&
          callSelections.date &&
          callSelections.time
            ? {
                VisitDate: buildVisitDateTime(
                  callSelections.date,
                  callSelections.time,
                ),
              }
            : {}),
        };

        await createLead(leadPayload);

        newUserData = await checkUserByIP(true);

        if (newUserData) {
          setFoundUserData(newUserData);
          setPendingConversations([]);
        }
      }

      const savedLeadData = {
        submitted: true,
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone,
      };

      localStorage.setItem(
        `wsa_chatbot_lead_submitted_${clientKey}`,
        JSON.stringify(savedLeadData)
      );

      setSavedLead(savedLeadData);
      setFormData({
        name: savedLeadData.name,
        email: savedLeadData.email,
        phone: savedLeadData.phone,
      });

      const botReply = buildBotReply(contactData);

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

  const showMainMenuButtons = !activeFlowId && !pendingFlowId;
  // If a client has 7 or more menu buttons,
  // only show the first 4 buttons at first.
  // This keeps large menus from feeling crowded.
  const shouldCollapseMenu = mainMenu.length >= 7;

  // These are the buttons actually shown in the chatbot.
  // Small menus show everything.
  // Large menus show only the first 4 until "Show More" is clicked.
  // Adds "Show More" as part of the same menu button group.
  // This keeps all buttons inside MainMenuButtons and prevents layout bugs.
  const visibleMainMenuButtons =
    shouldCollapseMenu && !showAllMenuButtons
      ? [
          ...mainMenu.slice(0, 4),
          {
            id: "show-more",
            label: "Show More",
            type: "action",
          },
        ]
      : mainMenu;
  const showQuoteSection = activeFlowId === "quote";
  const showScheduleSection = isSchedulingFlow;
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
  const showScheduleSubmit =
    showScheduleSection && callHasBoth && !!foundUserData;

  const showAskForm = showAskSection && hasTypedQuestion && !foundUserData;
  const showAskSubmit = showAskSection && hasTypedQuestion && !!foundUserData;

  const flowData = {
    mergedConfig,
    services,
    projects,
    quoteCfg,
    scheduleCfg,
    askCfg,
    pricingCfg,
    quoteProjectTypes,
    quoteClientTypes,
    quoteTimelines,
    callTimeSlots,
  };

  const flowState = {
    quoteSelections,
    callSelections,
    pricingSelections,
    hasTypedQuestion,
    askQuestion,
    setAskQuestion,
    formData,
    isSubmittingLead,
    showAskStart,
    savedLead,
    isLeadLocked: savedLead?.submitted === true,
  };

  const flowVisibility = {
    showQuoteForm,
    showQuoteSubmit,
    showScheduleForm,
    showScheduleSubmit,
    showAskForm,
    showAskSubmit,
  };

  const flowHandlers = {
    handleServiceSelect,
    handleProjectSelect,
    handleCommunityFlowSelect,
    handleSelectProjectType,
    handleSelectClientType,
    handleSelectTimeline,
    handleSelectCallDate,
    handleSelectCallTime,
    handleAskQuestionSubmit,
    handleFormChange,
    handleSubmitForm,
    handleSelectPricingLivingOption,
    handleSelectPricingInquiryFor,
    handleSelectPricingTimeline,
  };

  return (
    <>
      {launcherMode !== "hidden" && !isOpen && (
        <div className={`chat-launcher ${launcherMode}`} style={themeVars}>
          <button
            className="chat-launcher-main"
            onClick={
              launcherMode === "circle" ? expandLauncherToPill : openChat
            }
            type="button"
            aria-label={
              launcherMode === "circle" ? "Expand chat launcher" : "Open chat"
            }
            title={launcherTitle}
          >
            <div className="chat-launcher-avatar-wrap">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Logo"
                  className="chat-launcher-avatar"
                />
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

      {isOpen && (
        <div
          className={`chatbox-container
            ${mainMenu.length >= 7 ? "chatbox-tall" : ""}
            ${
              activeFlowId === "community" ||
              activeFlowId === "dining" ||
              activeFlowId === "floorplans"
                ? "community-expanded"
                : ""
            }
          `}
          style={{
            ...themeVars,
            "--chatbox-open-height":
              mainMenu.length >= 7 && showAllMenuButtons ? "760px" : "650px",
          }}
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

              {showStartupTyping && (
                <div className="chat-message bot typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}

              {showFlowTyping && (
                <div className="chat-message bot typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}

              {activeFlowId && (
                <MainMenuBubbleNav
                  items={mainMenu}
                  activeId={activeFlowId}
                  onSelect={handleMainMenuSelect}
                />
              )}

              <FlowRenderer
                activeFlowId={activeFlowId}
                flowData={flowData}
                flowState={flowState}
                flowVisibility={flowVisibility}
                flowHandlers={flowHandlers}
                formatDateLabel={formatDateLabel}
                onBack={handleBackToMainMenu}
              />
            </div>
          </div>

          <MainMenuButtons
            items={visibleMainMenuButtons}
            visible={showMainMenuButtons}
            onSelect={handleMainMenuSelect}
            className={showAllMenuButtons ? "menu-expanded-animate" : ""}
          />
        </div>
      )}
    </>
  );
}
