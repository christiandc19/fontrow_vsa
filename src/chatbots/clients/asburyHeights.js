const asburyHeightsConfig = {
  clientKey: "asbury-heights",

  communityName: "Asbury Heights Senior Living",

  logoUrl:
    "https://cdn.websmartassistant.com/clients/asbury-heights/chatbot-logo.png",

  headerTitle: "Smart Assistant",
  headerSubtitle: "Asbury Heights",

  welcomeMessage:
    "Hi there! How can we help you explore Asbury Heights today?",

  launcherTitle: "Smart Assistant",
  launcherSubtitle: "Asbury Heights",

  theme: {
    primary: "#1b2f4d",
    primaryHover: "#15263d",

    headerBg: "#ffffff",

    botBubbleBg: "#f4f6fa",
    userBubbleBg: "#1b2f4d",

    textDark: "#24352f",

    launcherBg: "#ffffff",
    launcherAccent: "#D6B36A",
  },

  mainMenu: [
    { id: "schedule", label: "Schedule a Visit", type: "flow" },
    { id: "options", label: "Living Options", type: "flow" },
    { id: "community", label: "View Community", type: "flow" },
    { id: "community-life", label: "Community Life", type: "flow" },
    { id: "pricing", label: "Pricing", type: "flow" },
    { id: "floorplans", label: "View Floor Plans", type: "flow" },
    { id: "jobs", label: "Job Inquiry", type: "link", url: "/careers/" },
    { id: "contact", label: "Contact Us", type: "link", url: "/contact/" },
    { id: "ask", label: "Ask a Question", type: "flow" },
  ],

  services: [],
  projects: [],
  quote: {},

  optionsIntro:
    "Asbury Heights offers Independent Living and a continuum of on-site care. Choose an option below to learn more.",

  options: [
    {
      id: "independent-living",
      label: "Independent Living",
      url: "/independent-living",
    },
    {
      id: "assisted-living",
      label: "Assisted Living",
      url: "/assisted-living",
    },
    {
      id: "memory-care",
      label: "Memory Care",
      url: "/memory-care",
    },
  ],

  schedule: {
    q1: "What day works best for your visit?",
    q2: "What time works best?",

    contactPrompt:
      "Please confirm or update your contact details and we’ll confirm your visit.",

    returningButton: "Schedule Visit",

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
    q1: "What would you like to know about Asbury Heights?",

    placeholder:
      "Ex: pricing, availability, levels of care, amenities, tours…",

    contactPrompt:
      "Please confirm or update your contact information so our team can follow up with you.",

    returningButton: "Send Message",
  },
};

export default asburyHeightsConfig;