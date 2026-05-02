const careNeedsSurvey = {
  key: "care-needs",
  landing: {
    title: "Is It Time to Get More Support?",
    subtitle:
      "Answer a few simple questions to better understand what type of support may be helpful.",
    cta: "Start Assessment",
  },
  questions: [
    {
      id: "whoFor",
      question: "Who are you exploring support options for?",
      options: [
        { label: "Myself", value: "self" },
        { label: "A parent", value: "parent" },
        { label: "My spouse or partner", value: "spouse" },
        { label: "Another loved one", value: "loved-one" },
      ],
    },
  ],
};

export default careNeedsSurvey;