const itanexConfig = {
  clientKey: "itanex",
  communityName: "Itanex Engineering",

  logoUrl: null,

  headerTitle: "Chat with Itanex Engineering",
  headerSubtitle: "Engineering support and project coordination.",
  welcomeMessage: "How can we help you today?",

  launcherTitle: "Itanex Engineering",
  launcherSubtitle: "Chat with our team",

  theme: {
    primary: "#935135",
    primaryHover: "#7c402c",
    headerBg: "#fcf8ec",
    botBubbleBg: "#ececec",
    userBubbleBg: "#935135",
    textDark: "#333333",
    launcherBg: "#ffffff",
    launcherAccent: "#16335b",
  },

  mainMenu: [
    {
      id: "schedule",
      label: "Schedule A Call",
      type: "flow",
    },
    {
      id: "contact",
      label: "Contact Us",
      type: "link",
      url: "https://itanexengineering.com/contact",
    },
    {
      id: "ask",
      label: "Ask A Question",
      type: "flow",
    },
  ],

  services: [],
  projects: [],
  quote: {},

  schedule: {
    intro: "Choose a day and time and we’ll follow up.",
    q1: "What day works best?",
    q2: "What time works best?",
    contactPrompt: "Please share your contact details.",
    returningPrompt: "We’ll confirm your call shortly.",
    returningButton: "Confirm Call",
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
    q1: "What would you like to ask?",
    placeholder: "Type your question here...",
    contactPrompt: "Please share your contact details so we can follow up.",
    returningPrompt: "Thanks! We’ll follow up shortly.",
    returningButton: "Submit Question",
  },
};

export default itanexConfig;