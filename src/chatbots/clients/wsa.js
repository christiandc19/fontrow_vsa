const smartWebAssistantConfig = {
  clientKey: "smart-webassistant",

  // ✅ New naming (backward-compatible handled in ChatBox)
  clientName: "Smart WebAssistant",

  logoUrl: "https://cdn.websmartassistant.com/clients/smart-webassistant/logo.webp",

  headerTitle: "Chat with Smart WebAssistant",
  headerSubtitle: "Chatbots, surveys, and lead tools for modern websites.",
  welcomeMessage:
    "Hi there! I can help you explore Smart WebAssistant — our chatbot, survey, and lead engagement tools.",

  launcherTitle: "Smart WebAssistant",
  launcherSubtitle: "Explore our tools",

  // 🔥 DARK PREMIUM THEME
theme: {
  // Main brand colors
  primary: "#0f172a",
  primaryHover: "#1e293b",
  accent: "#38bdf8",

  // Header / launcher
  headerBg: "#0f172a",
  headerText: "#ffffff",
  headerSubtitle: "#cbd5e1",

  launcherBg: "#0f172a",
  launcherText: "#ffffff",
  launcherSubtitle: "#cbd5e1",
  launcherAccent: "#38bdf8",

  // Chat body
  chatBg: "#f8fafc",
  panelBg: "#ffffff",

  // Bubbles
  botBubbleBg: "#1e293b",
  botBubbleText: "#f8fafc",
  userBubbleBg: "#0f172a",
  userBubbleText: "#ffffff",

  // General text
  textDark: "#0f172a",
  textLight: "#ffffff",
  textMuted: "#64748b",

  // Buttons
  buttonBg: "#ffffff",
  buttonText: "#0f172a",
  buttonBorder: "#cbd5e1",
  buttonActiveBg: "#0f172a",
  buttonActiveText: "#ffffff",

  // Back button
  backButtonBg: "#0f172a",
  backButtonText: "#ffffff",
  backButtonHoverBg: "#1e293b",

  // Calendar / forms
  calendarBg: "#ffffff",
  calendarText: "#0f172a",
  calendarMutedText: "#94a3b8",
  inputBg: "#ffffff",
  inputText: "#0f172a",
  inputBorder: "#cbd5e1",
},



  // 🎯 MAIN MENU (Product-focused)
  mainMenu: [
    {
    id: "survey",
    label: "Get Your Guide",
    type: "flow",
    },
    {
    id: "schedule",
    label: "Book a Call",
    type: "flow",
    },
    {
      id: "contact",
      label: "Contact Us",
      type: "link",
      url: "https://websmartassistant.com/contact/",
    },
    {
      id: "ask",
      label: "Ask a Question",
      type: "flow",
    },
  ],

  // 📚 GUIDE SUBMENU (links to product pages)
  guideOptions: [
    {
      id: "senior-living",
      label: "Is It Time for Senior Living?",
      url: "https://websmartassistant.com/#/",
    },
    {
      id: "afford",
      label: "Can You Afford Senior Living?",
      url: "https://websmartassistant.com/#/",
    },
    {
      id: "memory-care",
      label: "Is It Time for Memory Care?",
      url: "https://websmartassistant.com/#/",
    },
    {
      id: "downsizing",
      label: "Would Downsizing Make Life Easier?",
      url: "https://websmartassistant.com/#/",
    },
  ],

  // 🧠 SERVICES (optional future use)
  services: [
    {
      id: "chatbot",
      label: "Website Chatbot",
      description:
        "A branded chatbot that answers questions, guides users, and captures leads.",
    },
    {
      id: "survey",
      label: "Guided Surveys",
      description:
        "Interactive assessments that qualify prospects before they contact you.",
    },
    {
      id: "analytics",
      label: "Lead Analytics",
      description:
        "Track conversations, leads, and engagement from your dashboard.",
    },
  ],

  projects: [],
  quote: {},

  // 📅 BOOK A CALL (replaces schedule)
  // ⚠️ Keep key as "schedule" if your ChatBox depends on it
  schedule: {
    intro: "Let’s schedule a quick call to see if Smart WebAssistant is a good fit.",
    q1: "What day works best for your call?",
    q2: "What time works best?",
    contactPrompt: "Share your contact details and we’ll confirm the call.",
    returningPrompt: "We’ll confirm your call shortly.",
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

  // 💬 ASK FLOW
  ask: {
    q1: "What would you like to know about Smart WebAssistant?",
    placeholder:
      "Ex: chatbot setup, surveys, pricing, integrations, demos…",
    contactPrompt:
      "Leave your contact info and we’ll follow up with helpful details.",
    returningPrompt: "Thanks! We’ll follow up shortly.",
    returningButton: "Send Message",
  },
};

export default smartWebAssistantConfig;