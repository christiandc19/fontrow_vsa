const itanexConfig = {
  clientKey: "itanex",

  communityName: "Itanex Engineering",
  logoUrl: "/itanex-logo.png",

  headerTitle: "Chat with Itanex Engineering",
  headerSubtitle: "We’re here to help with your engineering project.",
  welcomeMessage: "How can we help you today?",

  mainMenu: [
    { id: "quote", label: "Request a Quote", type: "flow" },
    { id: "services", label: "Services", type: "flow" },
    { id: "projects", label: "Industries", type: "flow" },
    { id: "schedule", label: "Schedule a Call", type: "flow" },
    { id: "ask", label: "Ask a Question", type: "flow" },
  ],

  servicesTitle: "Please select a service:",
  services: [
    { label: "Mechanical Engineering", url: "https://itanex-engineering.com/mechanical-engineering/" },
    { label: "Electrical Engineering", url: "https://itanex-engineering.com/electrical-engineering/" },
    { label: "Plumbing Engineering", url: "https://itanex-engineering.com/plumbing-engineering-design-services/" },
    { label: "Dry Utility Coordination", url: "https://itanex-engineering.com/dry-utility-coordination-service/" },
    { label: "Energy Compliance", url: "https://itanex-engineering.com/energy-compliance-service/" },
    { label: "Additional Engineering Services", url: "https://itanex-engineering.com/integrated-additional-engineering-services/" },
  ],

  projectsTitle: "Select a project category:",
  projects: [
    { label: "Commercial", url: "https://itanex-engineering.com/commercial/" },
    { label: "Residential", url: "https://itanex-engineering.com/residential-engineering-portfolio/" },
    { label: "Industrial", url: "https://itanex-engineering.com/industrial/" },
    { label: "Healthcare", url: "https://itanex-engineering.com/healthcare/" },
    { label: "Education", url: "https://itanex-engineering.com/educational-facility-engineering/" },
  ],

  quote: {
    intro: "Tell us a bit about your project and we’ll follow up with next steps.",
    q1: "What type of project is this?",
    q2: "Who are you?",
    q3: "What is your timeline?",
    contactPrompt: "Please provide your contact details so we can follow up with a quote.",

    projectTypes: ["New Construction", "Renovation", "Tenant Improvement", "Design-Build", "Other"],
    clientTypes: ["Owner/Developer", "Architect", "Contractor", "Property Manager", "Other"],
    timelines: ["Immediately", "1 to 3 Months", "3 Months +", "Just Researching"],

    returningButton: "Submit Request",
  },

  schedule: {
    intro: "Pick a day and time and we’ll confirm a call.",
    q1: "What date would you like to schedule a call?",
    q2: "What time works best?",
    contactPrompt: "Please share your contact details and we’ll confirm your call.",
    returningButton: "Confirm Call",
    timeSlots: ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"],
  },

  ask: {
    q1: "What question do you have?",
    placeholder: "Type your question here...",
    contactPrompt: "Please share your contact details so we can follow up.",
    returningButton: "Submit Question",
  },
};

export default itanexConfig;