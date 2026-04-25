export const affordabilitySurvey = {
  slug: "affordability",
  landing: {
    title: "What Could Senior Living Cost for Your Situation?",
    subtitle:
      "Answer a few quick questions to get guidance around what to plan for.",
    cta: "Start Assessment",
    heroImage: "/images/senior-bg.webp",
  },
  questions: [
    {
      id: "budgetPlanning",
      title: "How far along are you in planning financially?",
      subtitle: "Choose the answer that best fits your situation.",
      options: [
        { label: "Just beginning", value: "beginning" },
        { label: "Have a rough budget", value: "roughBudget" },
        { label: "Actively comparing costs", value: "comparing" },
      ],
    },
  ],
  results: [],
  defaultResult: {
    title: "A clearer budget plan may help you compare options with confidence.",
    description:
      "Your answers suggest that understanding likely costs and available choices would be a helpful next step.",
    cta: "Explore Cost Planning",
  },
};