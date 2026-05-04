const careNeedsSurvey = {
  slug: "care-needs",

  landing: {
    title: "Is It Time to Get More Support?",
    subtitle:
      "Answer a few simple questions to better understand what type of support may be helpful.",
    cta: "Start Assessment",
    heroImage: "/images/senior-bg.webp",
  },

  questions: [
    {
      id: "whoFor",
      section: "Getting Started",
      type: "select",
      title: "Who are you exploring support options for?",
      subtitle: "Select one option to continue.",
      options: [
        { label: "Myself", value: "self" },
        { label: "A parent", value: "parent" },
        { label: "My spouse or partner", value: "spouse" },
        { label: "Another loved one", value: "loved-one" },
      ],
    },

    {
      id: "mainConcern",
      section: "Main Concern",
      title: "What is the biggest reason you’re looking for support right now?",
      subtitle: "Choose the answer that feels closest.",
      help: {
        title: "Why this matters",
        text: "The main concern helps point toward the kind of support that may be most helpful.",
      },
      options: [
        { label: "Daily tasks are getting harder", value: "dailyTasks", score: 3 },
        { label: "Safety is becoming a concern", value: "safety", score: 4 },
        { label: "Memory or confusion concerns", value: "memory", score: 4 },
        { label: "Caregiver stress or burnout", value: "caregiverStress", score: 3 },
        { label: "Just planning ahead", value: "planningAhead", score: 1 },
      ],
    },

    {
      id: "dailySupport",
      section: "Daily Life",
      title: "How much help is needed with everyday routines?",
      subtitle: "Think about meals, bathing, dressing, mobility, and reminders.",
      help: {
        title: "Why this matters",
        text: "Changes in daily routines often reveal whether occasional help, regular support, or a more structured setting may be needed.",
      },
      options: [
        { label: "No help is needed", value: "none", score: 1 },
        { label: "A little help or reminders", value: "littleHelp", score: 2 },
        { label: "Regular help is needed", value: "regularHelp", score: 3 },
        { label: "Help is needed most of the day", value: "mostOfDay", score: 4 },
      ],
    },

    {
      id: "safety",
      section: "Safety",
      title: "How safe does the current living situation feel?",
      subtitle: "Think about falls, emergencies, wandering, stairs, or being alone.",
      help: {
        title: "Why this matters",
        text: "Safety concerns can be an important sign that more support should be explored sooner rather than later.",
      },
      options: [
        { label: "Very safe", value: "verySafe", score: 1 },
        { label: "Mostly safe", value: "mostlySafe", score: 2 },
        { label: "Some concerns", value: "someConcerns", score: 3 },
        { label: "Significant concerns", value: "significantConcerns", score: 4 },
      ],
    },

    {
      id: "memory",
      section: "Memory",
      title: "Are memory changes or confusion becoming a concern?",
      subtitle: "Choose the answer that fits best.",
      help: {
        title: "Why this matters",
        text: "Memory-related changes can affect safety, routines, and the type of care environment that may be most appropriate.",
      },
      options: [
        { label: "No concern right now", value: "none", score: 1 },
        { label: "Occasional forgetfulness", value: "occasional", score: 2 },
        { label: "Noticeable confusion or decline", value: "noticeable", score: 3 },
        { label: "Frequent confusion or safety concerns", value: "frequent", score: 4 },
      ],
    },

    {
      id: "caregiverStress",
      section: "Support System",
      title: "How stressful does the current situation feel?",
      subtitle: "Think about family strain, caregiving responsibilities, and peace of mind.",
      help: {
        title: "Why this matters",
        text: "Caregiver stress can be a sign that the current arrangement may not be sustainable long-term.",
      },
      options: [
        { label: "Manageable", value: "manageable", score: 1 },
        { label: "A little stressful", value: "littleStressful", score: 2 },
        { label: "Very stressful", value: "veryStressful", score: 3 },
        { label: "Overwhelming", value: "overwhelming", score: 4 },
      ],
    },

    {
      id: "timeline",
      section: "Planning",
      title: "How soon do you think more support may be needed?",
      subtitle: "Choose the option that feels closest.",
      help: {
        title: "Why this matters",
        text: "Knowing the timeline helps shape whether the next step is learning, planning, or taking action soon.",
      },
      options: [
        { label: "Just researching", value: "researching", score: 1 },
        { label: "Within the next year", value: "nextYear", score: 2 },
        { label: "Within the next few months", value: "fewMonths", score: 3 },
        { label: "As soon as possible", value: "urgent", score: 4 },
      ],
    },
  ],

  getResult(answers = {}) {
    const normalizeToArray = (answer) => {
      if (!answer) return [];
      return Array.isArray(answer) ? answer : [answer];
    };

    const scoreAnswer = (answer) =>
      normalizeToArray(answer).reduce(
        (sum, item) => sum + (item?.score || 0),
        0
      );

    const totalScore = Object.values(answers).reduce(
      (sum, answer) => sum + scoreAnswer(answer),
      0
    );

    const memoryScore =
      scoreAnswer(answers.memory) +
      (answers.mainConcern?.value === "memory" ? 4 : 0);

    const safetyScore =
      scoreAnswer(answers.safety) +
      (answers.mainConcern?.value === "safety" ? 4 : 0);

    const careStressScore =
      scoreAnswer(answers.caregiverStress) +
      (answers.mainConcern?.value === "caregiverStress" ? 3 : 0);

    if (memoryScore >= 7) {
      return {
        key: "memory-support",
        title: "Memory support may be worth exploring.",
        description:
          "Your answers suggest memory changes or confusion may be affecting daily life or safety. Learning about memory support options could be a helpful next step.",
        cta: "Explore Memory Support",
      };
    }

    if (safetyScore >= 7 || totalScore >= 23) {
      return {
        key: "supportive-care",
        title: "More supportive care may be helpful soon.",
        description:
          "Your answers suggest that daily support, safety, or caregiver strain may be becoming more significant. Exploring senior living or supportive care options may help you plan with confidence.",
        cta: "Explore Support Options",
      };
    }

    if (careStressScore >= 6 || totalScore >= 17) {
      return {
        key: "planning",
        title: "This may be a good time to plan ahead.",
        description:
          "Your answers suggest that support needs may be starting to grow. Planning now can help avoid rushed decisions later.",
        cta: "Start Planning",
      };
    }

    return {
      key: "early-stage",
      title: "You’re in a good place to keep learning.",
      description:
        "Your answers suggest this may be an early planning stage. Learning about available support options now can help you feel prepared if needs change.",
      cta: "Keep Exploring",
    };
  },

  defaultResult: {
    title: "It may be helpful to explore support options.",
    description:
      "Your answers suggest that learning about available care and support options may be a helpful next step.",
    cta: "Explore Next Steps",
  },
};

export default careNeedsSurvey;