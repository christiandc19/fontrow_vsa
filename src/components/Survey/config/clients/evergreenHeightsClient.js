// src/components/Survey/config/clients/evergreenHeightsClient.js

const evergreenHeightsClient = {
  clientKey: "evergreen-heights",

  clientName: "Evergreen Heights Senior Living",

  logoUrl:
    "https://cdn.websmartassistant.com/clients/evergreen-heights/logo.png",

  headerTitle: "Chat with Evergreen Heights",
  headerSubtitle: "Guidance for your next chapter",
  welcomeMessage:
    "Hi there 👋 I'm here to help you explore senior living options at Evergreen Heights.",

  launcherTitle: "Evergreen Heights",
  launcherSubtitle: "Explore your options",

  theme: {
    primary: "#166534",
    primaryHover: "#14532d",
    accent: "#d4af37",

    headerBg: "#166534",
    headerText: "#ffffff",
    headerSubtitle: "#d1fae5",

    botBubbleBg: "#f0fdf4",
    userBubbleBg: "#166534",
    textDark: "#052e16",

    launcherBg: "#166534",
    launcherAccent: "#d4af37",

    backButtonBg: "#166534",
    backButtonText: "#ffffff",
  },

  survey: {
    landing: {
      kicker: "FREE ASSESSMENT",
      title: "Find the Right Senior Living Option",
      subtitle:
        "Answer a few simple questions and get personalized guidance for you or your loved one.",
      buttonText: "Start Assessment",
      trustNote: "Takes 2–3 minutes. No obligation.",

      overlayColor: "rgba(5, 46, 22, 0.65)",
      textColor: "#ffffff",
      primaryColor: "#166534",
      primaryHoverColor: "#14532d",
    },

    branding: {
      heroImages: {
        "senior-living":
          "https://cdn.websmartassistant.com/clients/evergreen-heights/senior-living.jpg",

        downsizing:
          "https://cdn.websmartassistant.com/clients/evergreen-heights/downsizing.jpg",

        "memory-support":
          "https://cdn.websmartassistant.com/clients/evergreen-heights/memory-support.jpg",

        affordability:
          "https://cdn.websmartassistant.com/clients/evergreen-heights/affordability.jpg",
      },
    },
  },
};

export default evergreenHeightsClient;