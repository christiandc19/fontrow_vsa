const fontrowConfig = {
  clientKey: "fontrow",
  communityName: "Font Row Media",

  logoUrl: "https://cdn.websmartassistant.com/clients/fontrow/logo-v2.png",

  headerTitle: "Chat with Font Row Media",
  headerSubtitle: "Web design, development, and ongoing support.",
  welcomeMessage: "What can we help you with today?",

  launcherTitle: "Font Row Media",
  launcherSubtitle: "Chat with our team",

  theme: {
    primary: "#000000",
    primaryHover: "#333333",
    headerBg: "#ffffff",
    botBubbleBg: "#f3f3f3",
    userBubbleBg: "#000000",
    textDark: "#000000",
    launcherBg: "#ffffff",
    launcherAccent: "#000000",
  },

    survey: {
    enabled: false,
  },

  mainMenu: [
    {
      id: "projects",
      label: "View Our Projects",
      type: "link",
      url: "https://fontrow.com/portfolio",
    },
    {
      id: "schedule",
      label: "Book A Call",
      type: "flow",
    },
    {
      id: "contact",
      label: "Contact Us",
      type: "link",
      url: "https://fontrow.com/contact",
    },

    {
      id: "ask",
      label: "Ask Us A Question",
      type: "flow",
    },
  ],

  // future-safe
  services: [],
  projects: [],
  quote: {},

  schedule: {
    intro: "Pick a date and time and we’ll confirm a quick call.",
    q1: "What day works best?",
    q2: "What time works best?",
    contactPrompt: "Share your contact details and we’ll confirm the call.",
    returningPrompt: "We'll confirm your call shortly.",
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
    q1: "What can we help you with?",
    placeholder:
      "Ex: new website, redesign, SEO, maintenance, social media…",
    contactPrompt: "Drop your contact info and we’ll reach out shortly.",
    returningPrompt: "Thanks! We’ll follow up shortly.",
    returningButton: "Send Message",
  },
};

export default fontrowConfig;