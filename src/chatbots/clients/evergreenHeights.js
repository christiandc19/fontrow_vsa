const evergreenHeightsConfig = {
  clientKey: "evergreen-heights",
  communityName: "Evergreen Heights Senior Living",

  logoUrl: "https://cdn.websmartassistant.com/clients/evergreen-heights/evergreen-heights.png",

  headerTitle: "Chat with Evergreen Heights",
  headerSubtitle: "We’re here to help you explore senior living options.",
  welcomeMessage:
    "Hi there! How can we help you explore Evergreen Heights today?",

  launcherTitle: "Evergreen Heights",
  launcherSubtitle: "Chat with our team",

  theme: {
    primary: "#2f5d50",
    primaryHover: "#24483f",
    headerBg: "#ffffff",
    botBubbleBg: "#f4f7f3",
    userBubbleBg: "#2f5d50",
    textDark: "#24352f",
    launcherBg: "#ffffff",
    launcherAccent: "#c69c3f",
  },

  survey: {
    enabled: true,
    defaultSurveyKey: "senior-living",

    branding: {
      logo:
        "https://cdn.websmartassistant.com/clients/evergreen-heights/evergreen-heights.png",

      heroImages: {
        "senior-living":
          "/images/surveys/senior-living-survey-hero.webp",
        downsizing:
          "/images/surveys/downsizing-survey-hero.webp",
        "memory-support":
          "/images/surveys/memory-survey-hero.webp",
        affordability:
          "/images/surveys/affordability-survey-hero.webp",
      },

      overlayColor: "rgba(36, 72, 63, 0.66)",
      textColor: "#ffffff",
      primaryColor: "#2f5d50",
      primaryHoverColor: "#24483f",
    },

    landing: {
      kicker: "Evergreen Heights",
      ctaLabel: "Start Assessment",
      trustNote:
        "Private, simple, and designed to help you explore your options with confidence.",
    },

    embed: {
      title: "Is Senior Living the Right Next Step?",
      subtitle:
        "Learn about your options and get personalized results with this quick assessment.",
      buttonLabel: "Start Now",
      poweredBy: "Powered by WebSmartAssistant",
    },

    leadCapture: {
      title: "See Your Recommendation",
      subtitle:
        "Before we show your results, share your details so our team can help you explore the right next step.",
      firstNameLabel: "First Name",
      lastNameLabel: "Last Name",
      emailLabel: "Email",
      phoneLabel: "Phone",
      consentLabel:
        "I agree to be contacted about senior living options and next steps.",
      submitLabel: "Show My Results",
      backLabel: "Back",
      note:
        "Your information stays private and is only used to help with your inquiry.",
    },

    actions: {
      primary: "#",
      memory: "#",
      assisted: "#",
    },
  },

  mainMenu: [
    { id: "survey", label: "Get Your Guide", type: "flow" },
    { id: "schedule", label: "Schedule a Tour", type: "flow" },
    { id: "living-options", label: "Living Options", type: "flow" },
    { id: "floorplans", label: "View Floor Plans", type: "link", url: "#" },
    { id: "contact", label: "Contact Us", type: "link", url: "#" },
    { id: "ask", label: "Ask a Question", type: "flow" },
  ],

  services: [],
  projects: [],
  quote: {},

  Options: [
    { id: "independent-living", label: "Independent Living", url: "#" },
    { id: "assisted-living", label: "Assisted Living", url: "#" },
    { id: "memory-care", label: "Memory Care", url: "#" },
  ],

  schedule: {
    intro: "Let’s schedule a time to visit Evergreen Heights.",
    q1: "What day works best for your tour?",
    q2: "What time works best?",
    contactPrompt: "Share your contact details and we’ll confirm your tour.",
    returningPrompt: "We’ll confirm your visit shortly.",
    returningButton: "Schedule Tour",
    timeSlots: ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"],
  },

  ask: {
    q1: "What would you like to know about Evergreen Heights?",
    placeholder: "Ex: pricing, availability, levels of care, amenities, tours…",
    contactPrompt: "Leave your contact info and we’ll get back to you shortly.",
    returningPrompt: "Thanks! We’ll follow up shortly.",
    returningButton: "Send Message",
  },
};

export default evergreenHeightsConfig;