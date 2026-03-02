const fontrowConfig = {
  clientKey: "fontrow",

  communityName: "Font Row Media",
  logoUrl: "/fontrow-logo.png",

  headerTitle: "Chat with Font Row Media",
  headerSubtitle: "Web design, development, and ongoing support.",
  welcomeMessage: "What can we help you with today?",

  mainMenu: [
    { id: "web", label: "Web Development", type: "link", url: "https://fontrow.com" },
    { id: "maintenance", label: "Website Maintenance", type: "link", url: "https://fontrow.com" },
    { id: "social", label: "Social Media Management", type: "link", url: "https://fontrow.com" },
    { id: "ask", label: "Ask a Question", type: "flow" },
  ],

  ask: {
    q1: "Tell us what you need help with:",
    placeholder: "Ex: website redesign, new landing page, SEO, social media, etc.",
    contactPrompt: "Drop your contact info and we’ll reach out shortly.",
    returningButton: "Send Message",
  },
};

export default fontrowConfig;