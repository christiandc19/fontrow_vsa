const evergreenHeightsConfig = {
  clientKey: "evergreen-heights",
  communityName: "Evergreen Heights Senior Living",

  logoUrl:
    "https://cdn.websmartassistant.com/clients/evergreen-heights/evergreen-heights.png",

  headerTitle: "Smart Assistant",
  headerSubtitle: "Evergreen Heights",
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
          "https://cdn.websmartassistant.com/survey/images/senior-living-survey-hero.webp",

        downsizing:
          "https://cdn.websmartassistant.com/survey/images/downsizing-survey-hero.webp",

        "memory-support":
          "https://cdn.websmartassistant.com/survey/images/memory-survey-hero.webp",

        affordability:
          "https://cdn.websmartassistant.com/survey/images/affordability-survey-hero.webp",
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
    {
      id: "schedule",
      label: "Schedule a Visit",
      type: "flow",
    },

    // Opens the Living Options flow
    {
      id: "options",
      label: "Living Options",
      type: "flow",
    },

    // Opens the expanded community gallery view
    {
      id: "community",
      label: "View Community",
      type: "flow",
    },

    {
      id: "pricing",
      label: "Pricing",
      type: "flow",
    },

    {
      id: "floorplans",
      label: "View Floor Plans",
      type: "link",
      url: "#",
    },

    {
      id: "contact",
      label: "Contact Us",
      type: "link",
      url: "#",
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

  /*
        Community gallery content used by the View Community flow.
      */
      community: {
        images: [
          {
            id: "community-1",
            src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
            alt: "Evergreen Heights apartment interior",
          },

          {
            id: "community-2",
            src: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",
            alt: "Evergreen Heights living room",
          },
        ],

        buttons: [
          {
            id: "pricing",
            label: "Pricing",
            type: "flow",
            flowId: "pricing",
          },

          {
            id: "schedule",
            label: "Schedule A Visit",
            type: "flow",
            flowId: "schedule",
          },

          {
            id: "ask",
            label: "Ask A Question",
            type: "flow",
            flowId: "ask",
          },
        ],

      },

  pricing: {
    q1: "What living option are you interested in?",
    q2: "Who is this for?",
    q3: "What is your timeline?",

    livingOptions: [
      "Assisted Living",
      "Memory Care",
      "Skilled Nursing",
      "Not Sure",
      "Other",
    ],

    inquiryForOptions: [
      "Myself",
      "Parent",
      "Spouse",
      "Relative",
      "Friend",
      "Other",
    ],

    timelineOptions: [
      "Immediately",
      "1 to 3 Months",
      "3 Months +",
      "Just Researching",
    ],

    contactPrompt:
      "Share your contact details and we’ll help you understand pricing and next steps.",

    returningPrompt:
      "Thanks! We’ll follow up with pricing information shortly.",

    returningButton: "Request Pricing",
  },


  /*
    Intro text shown above the Living Options buttons.
  */
  optionsIntro:
    "A Life Plan Community offers Independent Living and a continuum of on-site care. Choose an option below to learn more.",

  /*
    Living Options buttons.
    Each button redirects to a webpage instead of showing another message.
  */
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
      id: "skilled-nursing",
      label: "Skilled Nursing",
      url: "/skilled-nursing",
    },
  ],

  schedule: {
    intro: "Let’s schedule a time to visit Evergreen Heights.",

    q1: "What day works best for your tour?",

    q2: "What time works best?",

    contactPrompt:
      "Share your contact details and we’ll confirm your tour.",

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
    q1: "What would you like to know about Evergreen Heights?",

    placeholder:
      "Ex: pricing, availability, levels of care, amenities, tours…",

    contactPrompt:
      "Please share your contact information so our team can follow up with you.",

    returningPrompt:
      "We found your contact information. Please confirm it, then send your message.",

    returningButton: "Send Message",
  },
  };

export default evergreenHeightsConfig;