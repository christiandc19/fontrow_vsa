const robinRunConfig = {
  clientKey: "robin-run",
  communityName: "Robin Run Village",

  logoUrl: "https://cdn.websmartassistant.com/clients/robin-run/robin-run-logo.webp",

  headerTitle: "Chat with Robin Run Village",
  headerSubtitle: "We’re here to help you explore senior living options.",
  welcomeMessage:
    "Hi there! How can we help you explore Robin Run Village today?",

  launcherTitle: "Robin Run Village",
  launcherSubtitle: "Chat with our team",

  theme: {
    primary: "#16335b",
    primaryHover: "#122847",
    headerBg: "#ffffff",
    botBubbleBg: "#f3f4f6",
    userBubbleBg: "#16335b",
    textDark: "#1f2937",
    launcherBg: "#ffffff",
    launcherAccent: "#16335b",
  },

  mainMenu: [
    {
      id: "schedule",
      label: "Schedule a Tour",
      type: "flow",
    },
    {
      id: "living-options",
      label: "Living Options",
      type: "flow",
    },
    {
      id: "floorplans",
      label: "View Floor Plans",
      type: "link",
      url: "https://www.robinrunvillage.com/floor-plans/",
    },
    {
      id: "contact",
      label: "Contact Us",
      type: "link",
      url: "https://www.robinrunvillage.com/contact/",
    },
    {
      id: "ask",
      label: "Ask a Question",
      type: "flow",
    },
  ],

  services: [],
  projects: [],
  quote: {},

  Options: [
    {
      id: "independent-living",
      label: "Independent Living",
      url: "https://www.robinrunvillage.com/independent-living/",
    },
    {
      id: "assisted-living",
      label: "Assisted Living",
      url: "https://www.robinrunvillage.com/assisted-living/",
    },
    {
      id: "memory-care",
      label: "Memory Care",
      url: "https://www.robinrunvillage.com/memory-care/",
    },
  ],

  schedule: {
    intro: "Let’s schedule a time to visit Robin Run Village.",
    q1: "What day works best for your tour?",
    q2: "What time works best?",
    contactPrompt: "Share your contact details and we’ll confirm your tour.",
    returningPrompt: "We’ll confirm your visit shortly.",
    returningButton: "Schedule Tour",
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
    q1: "What would you like to know about Robin Run Village?",
    placeholder: "Ex: pricing, availability, levels of care, amenities, tours…",
    contactPrompt: "Leave your contact info and we’ll get back to you shortly.",
    returningPrompt: "Thanks! We’ll follow up shortly.",
    returningButton: "Send Message",
  },
};

export default robinRunConfig;