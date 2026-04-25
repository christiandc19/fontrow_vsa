export const memorySupportSurvey = {
  slug: "memory-support",
  landing: {
    title: "Could Memory Support Be the Right Next Step?",
    subtitle:
      "Answer a few quick questions to better understand whether memory support may be helpful.",
    cta: "Start Assessment",
    heroImage: "/images/senior-bg.webp",
  },
  questions: [
    {
      id: "memoryConcern",
      title: "What concerns are you noticing most right now?",
      subtitle: "Choose the answer that feels closest.",
      options: [
        { label: "Occasional forgetfulness", value: "occasional" },
        { label: "More frequent confusion", value: "frequent" },
        { label: "Safety concerns", value: "safety" },
      ],
    },
  ],
  results: [],
  defaultResult: {
    title: "It may be helpful to learn more about memory support options.",
    description:
      "Your answers suggest that additional guidance around memory-related care could be helpful.",
    cta: "Explore Next Steps",
  },
};