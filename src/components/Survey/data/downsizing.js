export const downsizingSurvey = {
  slug: "downsizing",
  landing: {
    title: "Would Downsizing Make Life Easier Right Now?",
    subtitle:
      "Answer a few quick questions to explore whether downsizing may be the right next step.",
    cta: "Start Assessment",
    heroImage: "/images/senior-bg.webp",
  },
  questions: [
    {
      id: "spaceNeed",
      title: "How does the current home feel today?",
      subtitle: "Choose the answer that fits best.",
      options: [
        { label: "Still feels manageable", value: "manageable" },
        { label: "More space than needed", value: "tooMuchSpace" },
        { label: "Hard to maintain", value: "hardToMaintain" },
      ],
    },
  ],
  results: [],
  defaultResult: {
    title: "Downsizing may be worth exploring.",
    description:
      "Your answers suggest that simplifying your living situation may offer more flexibility and ease.",
    cta: "Explore Next Steps",
  },
};