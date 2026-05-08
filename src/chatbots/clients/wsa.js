const webSmartAssistantConfig = {
  clientKey: "web-smart-assistant",

  clientName: "Web Smart Assistant",

  logoUrl:
    "https://cdn.websmartassistant.com/clients/smart-web-assistant/wsa-logo.png",

  headerTitle: "Web Smart Assistant",
  headerSubtitle: "",
  welcomeMessage: "Hi there! How can I help you today?",

  launcherTitle: "Web Smart Assistant",
  launcherSubtitle: "Chatbots, surveys, and lead tools",

  theme: {
    primary: "#0f172a",
    primaryHover: "#1e293b",
    accent: "#38bdf8",

    headerBg: "#0f172a",
    headerText: "#ffffff",
    headerSubtitle: "#cbd5e1",

    botBubbleBg: "#f8fafc",
    userBubbleBg: "#0f172a",
    textDark: "#0f172a",

    launcherBg: "#0f172a",
    launcherAccent: "#38bdf8",

    backButtonBg: "#0f172a",
    backButtonText: "#ffffff",
    backButtonHoverBg: "#1e293b",
  },

  mainMenu: [
    {
      id: "schedule",
      label: "Book a Call",
      type: "flow",
    },
    {
      id: "options",
      label: "Benefits",
      type: "flow",
    },
    {
      id: "features",
      label: "View Features",
      type: "link",
      url: "https://websmartassistant.com/solutions/",
    },
    {
      id: "demo",
      label: "Request Demo",
      type: "flow",
    },
    {
      id: "ask",
      label: "Ask a Question",
      type: "flow",
    },
  ],

  // 🔥 Clean + scalable options
  options: [
    {
      id: "capture-leads",
      label: "Capture More Leads",
      message:
        "Capture More Leads helps turn website visitors into real inquiries by guiding them toward actions like booking a call or requesting a demo.",
    },
    {
      id: "answer-questions",
      label: "Answer Common Questions",
      message:
        "Answer Common Questions helps visitors get quick responses about your services without waiting.",
    },
    {
      id: "guide-visitors",
      label: "Guide Website Visitors",
      message:
        "Guide Website Visitors helps people navigate your website and find what they need faster.",
    },
  ],

  // 🔥 Reusable scheduling engine
  schedule: {
    q1: "Let’s get your call scheduled. What day works best for your call?",
    q2: "What time works best?",
    contactPrompt: "Share your contact details and we’ll confirm your call.",
    returningPrompt: "Thanks! We’ll confirm your call schedule shortly.",
    returningButton: "Book Call",
    timeSlots: [
      "9:00 AM",
      "10:00 AM",
      "11:00 AM",
      "1:00 PM",
      "2:00 PM",
      "3:00 PM",
    ],
  },

  demo: {
    q1: "Let’s get your demo scheduled. What day works best for your demo?",
    q2: "What time works best?",
    contactPrompt: "Share your contact details and we’ll confirm your demo.",
    returningPrompt: "Thanks! We’ll confirm your demo schedule shortly.",
    returningButton: "Request Demo",
    timeSlots: [
      "9:00 AM",
      "10:00 AM",
      "11:00 AM",
      "1:00 PM",
      "2:00 PM",
      "3:00 PM",
    ],
  },

  ask: {
    q1: "If you have any questions, let us know. We will be more than happy to help!",
    placeholder:
      "Ex: chatbot setup, surveys, pricing, dashboard, integrations, or demos…",
    contactPrompt: "Leave your contact info and we’ll get back to you shortly.",
    returningPrompt: "Thanks! We’ll follow up shortly.",
    returningButton: "Send Message",
  },

  services: [],
  projects: [],
  quote: {},
};

export default webSmartAssistantConfig;