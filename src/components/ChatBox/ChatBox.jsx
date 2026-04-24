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

const API_BASE = "https://api.websmartassistant.com";

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

export default function ChatBox({ config = {} }) {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const clientKey = config?.clientKey || "default";
  const brandConfig = getBotConfig(clientKey);

  const mergedConfig = {
    ...brandConfig,
    ...config,
  };

  const logoUrl = mergedConfig?.logoUrl || null;

  const headerTitle =
    mergedConfig?.headerTitle ||
    `Chat with ${mergedConfig?.communityName || ""}`.trim() ||
    "Chat with us";

  const headerSubtitle =
    mergedConfig?.headerSubtitle || "We’re here to help you explore options.";

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
    "--chat-header-bg": theme.headerBg || "#fcf8ec",
    "--chat-bot-bubble-bg": theme.botBubbleBg || "#ececec",
    "--chat-user-bubble-bg": theme.userBubbleBg || "#935135",
    "--chat-text-dark": theme.textDark || "#333333",
    "--chat-launcher-bg": theme.launcherBg || "#ffffff",
    "--chat-launcher-accent": theme.launcherAccent || "#16335b",
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
  const scheduleCfg = mergedConfig?.schedule || {};
  const askCfg = mergedConfig?.ask || {};

  const quoteProjectTypes = quoteCfg.projectTypes || [];
  const quoteClientTypes = quoteCfg.clientTypes || [];
  const quoteTimelines = quoteCfg.timelines || [];

  const callTimeSlots = scheduleCfg.timeSlots || [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
  ];

  const initialForm = { name: "", email: "", phone: "" };
  const initialQuote = {
    projectType: null,
    clientType: null,
    timeline: null,
  };
  const initialCall = { date: null, time: null };

  const [isOpen, setIsOpen] = useState(false);
  const [launcherMode, setLauncherMode] = useState("hidden");
  const [messages, setMessages] = useState([]);
  const [activeFlowId, setActiveFlowId] = useState(null);
  const [foundUserData, setFoundUserData] = useState(null);
  const [isCheckingIP, setIsCheckingIP] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [quoteSelections, setQuoteSelections] = useState(initialQuote);
  const [callSelections, setCallSelections] = useState(initialCall);
  const [askQuestion, setAskQuestion] = useState("");
  const [hasTypedQuestion, setHasTypedQuestion] = useState(false);
  const [pendingConversations, setPendingConversations] = useState([]);

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

  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, activeFlowId, quoteSelections, callSelections, hasTypedQuestion]);

  const openLink = (url) => {
    if (!url) return;

    if (url.startsWith("/")) {
      navigate(url);
      setIsOpen(false);
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const checkUserByIP = async (updateFormData = true) => {
    setIsCheckingIP(true);

    try {
      const userData = await getUserByIP();
      const user = Array.isArray(userData) ? userData[0] : userData;

      if (!user) return null;

      setFoundUserData(user);

      if (updateFormData) {
        setFormData({
          name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
          email: user.email || "",
          phone: user.phone || "",
        });
      }

      return user;
    } catch (error) {
      console.error("Error checking user by IP:", error);
      return null;
    } finally {
      setIsCheckingIP(false);
    }
  };

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
    setQuoteSelections(initialQuote);
    setCallSelections(initialCall);
    setAskQuestion("");
    setHasTypedQuestion(false);
    setFoundUserData(null);
    setPendingConversations([]);

    const userData = await checkUserByIP();

    if (!userData) {
      setFormData(initialForm);
    }

    await saveConversationMessage(welcomeMessage, "bot", userData);
  };

  const closeChat = () => {
    setIsOpen(false);
    setLauncherMode("circle");
  };

  const expandLauncherToPill = () => {
    setLauncherMode("pill");
  };

  const collapseLauncherToCircle = (e) => {
    if (e) e.stopPropagation();
    setLauncherMode("circle");
  };

  const syncKnownUserIntoForm = () => {
    if (foundUserData && formData.name === "") {
      setFormData({
        name: `${foundUserData.firstName || ""} ${foundUserData.lastName || ""}`.trim(),
        email: foundUserData.email || "",
        phone: foundUserData.phone || "",
      });
    }
  };

  const handleMainMenuSelect = (item) => {
    saveConversationMessage(item.label, "user");

    if (item.type === "link") {
      openLink(item.url);
      return;
    }

    setActiveFlowId(item.id);

    if (item.id !== "quote") setQuoteSelections(initialQuote);
    if (item.id !== "schedule") setCallSelections(initialCall);
    if (item.id !== "ask") {
      setAskQuestion("");
      setHasTypedQuestion(false);
    }

    syncKnownUserIntoForm();
  };

  const handleBackToMainMenu = () => {
    saveConversationMessage("Back to Main Menu", "user");
    setActiveFlowId(null);
    setQuoteSelections(initialQuote);
    setCallSelections(initialCall);
    setAskQuestion("");
    setHasTypedQuestion(false);
    syncKnownUserIntoForm();
  };

  const handleServiceSelect = (label) => {
    const svc = services.find((s) => s.label === label);
    if (!svc) return;

    saveConversationMessage(`Service: ${svc.label}`, "user");
    openLink(svc.url);
  };

  const handleProjectSelect = (label) => {
    const project = projects.find((p) => p.label === label);
    if (!project) return;

    saveConversationMessage(`Industry: ${project.label}`, "user");
    openLink(project.url);
  };

const handleSelectGuide = (guide) => {
  if (!guide) return;

  saveConversationMessage(`Guide: ${guide.label}`, "user");

  const clientKey = mergedConfig?.clientKey || "robin-run";
  const surveyKey =
    guide?.id || mergedConfig?.survey?.defaultSurveyKey || "senior-living";

  openLink(`/assessments/${clientKey}/${surveyKey}`);
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

  const handleSelectCallDate = (isoDate) => {
    saveConversationMessage(`Call - Date: ${isoDate}`, "user");
    setCallSelections((prev) => ({ ...prev, date: isoDate }));
  };

  const handleSelectCallTime = (time) => {
    saveConversationMessage(`Call - Time: ${time}`, "user");
    setCallSelections((prev) => ({ ...prev, time }));
  };

  const handleAskQuestionSubmit = (e) => {
    e.preventDefault();
    if (!askQuestion.trim()) return;
    setHasTypedQuestion(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetAllFlows = () => {
    setActiveFlowId(null);
    setQuoteSelections(initialQuote);
    setCallSelections(initialCall);
    setAskQuestion("");
    setHasTypedQuestion(false);

    if (!foundUserData) {
      setFormData(initialForm);
    } else {
      setFormData({
        name: `${foundUserData.firstName || ""} ${foundUserData.lastName || ""}`.trim(),
        email: foundUserData.email || "",
        phone: foundUserData.phone || "",
      });
    }
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

      let newUserData = null;

      if (foundUserData) {
        const leadId = foundUserData?.id;
        if (!leadId) throw new Error("Lead ID not found in user data");

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

  const showMainMenuButtons = !activeFlowId;
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

  const flowData = {
    mergedConfig,
    services,
    projects,
    quoteCfg,
    scheduleCfg,
    askCfg,
    quoteProjectTypes,
    quoteClientTypes,
    quoteTimelines,
    callTimeSlots,
  };

  const flowState = {
    quoteSelections,
    callSelections,
    hasTypedQuestion,
    askQuestion,
    setAskQuestion,
    formData,
    isSubmittingLead,
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
    handleSelectGuide,
    handleSelectProjectType,
    handleSelectClientType,
    handleSelectTimeline,
    handleSelectCallDate,
    handleSelectCallTime,
    handleAskQuestionSubmit,
    handleFormChange,
    handleSubmitForm,
  };

  return (
    <>
      {launcherMode !== "hidden" && !isOpen && (
        <div className={`chat-launcher ${launcherMode}`} style={themeVars}>
          <button
            className="chat-launcher-main"
            onClick={launcherMode === "circle" ? expandLauncherToPill : openChat}
            type="button"
            aria-label={
              launcherMode === "circle" ? "Expand chat launcher" : "Open chat"
            }
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

              <FlowRenderer
                activeFlowId={activeFlowId}
                flowData={flowData}
                flowState={flowState}
                flowVisibility={flowVisibility}
                flowHandlers={flowHandlers}
                formatDateLabel={formatDateLabel}
              />
            </div>
          </div>

          <MainMenuButtons
            items={mainMenu}
            visible={showMainMenuButtons}
            onSelect={handleMainMenuSelect}
          />

          {activeFlowId && (
            <button
              className="back-menu-btn"
              onClick={handleBackToMainMenu}
              type="button"
            >
              Back to Main Menu
            </button>
          )}
        </div>
      )}
    </>
  );
}