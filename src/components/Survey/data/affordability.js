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
      id: "whoFor",
      section: "Getting Started",
      type: "select",
      title: "Who are you planning for financially?",
      subtitle: "Select one option to continue.",
      options: [
        { label: "Myself", value: "self" },
        { label: "Mom", value: "mom" },
        { label: "Dad", value: "dad" },
        { label: "Wife", value: "wife" },
        { label: "Husband", value: "husband" },
        { label: "Grandma", value: "grandma" },
        { label: "Grandpa", value: "grandpa" },
        { label: "Friend", value: "friend" },
        { label: "Someone else", value: "someoneElse" },
      ],
    },

    {
      id: "budgetPlanning",
      section: "Planning",
      title: "How far along are you in planning financially?",
      subtitle: "Choose the answer that best fits your situation.",
      help: {
        title: "Why this matters",
        text: "Knowing where you are in the process helps determine whether the next step is learning, estimating, or making decisions.",
      },
      options: [
        { label: "Just beginning", value: "beginning", score: 1 },
        { label: "Have a rough budget", value: "roughBudget", score: 2 },
        { label: "Actively comparing costs", value: "comparing", score: 3 },
        { label: "Ready to make a decision soon", value: "ready", score: 4 },
      ],
    },

    {
      id: "monthlyBudget",
      section: "Budget",
      title: "What monthly budget range feels realistic?",
      subtitle: "Choose the closest estimate.",
      help: {
        title: "Why this matters",
        text: "Monthly budget is one of the biggest factors when narrowing down senior living options.",
      },
      options: [
        { label: "Under $3,000", value: "under3k", score: 1 },
        { label: "$3,000 – $5,000", value: "3to5", score: 2 },
        { label: "$5,000 – $7,000", value: "5to7", score: 3 },
        { label: "$7,000+", value: "7plus", score: 4 },
      ],
    },

    {
      id: "homeOwnership",
      section: "Assets",
      title: "Is there a home that may be sold or used to support costs?",
      subtitle: "Think about current or future plans.",
      help: {
        title: "Why this matters",
        text: "Home equity is one of the most common ways families fund senior living.",
      },
      options: [
        { label: "Yes, and it’s part of the plan", value: "yesPlanned", score: 1 },
        { label: "Possibly, but not decided", value: "maybe", score: 2 },
        { label: "No", value: "no", score: 3 },
        { label: "Not sure", value: "unsure", score: 2 },
      ],
    },

    {
      id: "incomeSources",
      section: "Assets",
      title: "What income sources are available?",
      subtitle: "Select all that apply.",
      multi: true,
      help: {
        title: "Why this matters",
        text: "Different income sources (like Social Security, pensions, or savings) can affect what options are realistic.",
      },
      options: [
        { label: "Social Security", value: "ss", score: 1 },
        { label: "Pension", value: "pension", score: 1 },
        { label: "Retirement savings", value: "retirement", score: 2 },
        { label: "Investments", value: "investments", score: 2 },
        { label: "Family support", value: "family", score: 2 },
        { label: "Not sure yet", value: "unsure", score: 3 },
      ],
    },

    {
      id: "careLevel",
      section: "Care Needs",
      title: "What level of care may be needed?",
      subtitle: "Choose the closest option.",
      help: {
        title: "Why this matters",
        text: "Costs vary significantly depending on the level of care needed.",
      },
      options: [
        { label: "Independent living", value: "independent", score: 1 },
        { label: "Some assistance", value: "assisted", score: 2 },
        { label: "More hands-on care", value: "higherCare", score: 3 },
        { label: "Memory support", value: "memory", score: 4 },
      ],
    },

    {
      id: "timeline",
      section: "Planning",
      title: "How soon might a move be needed?",
      subtitle: "Choose the option that feels closest.",
      help: {
        title: "Why this matters",
        text: "The timeline helps determine whether planning, comparing, or immediate action makes the most sense.",
      },
      options: [
        { label: "Just researching", value: "researching", score: 1 },
        { label: "Within the next year", value: "nextYear", score: 2 },
        { label: "Within a few months", value: "fewMonths", score: 3 },
        { label: "As soon as possible", value: "urgent", score: 4 },
      ],
    },

    {
      id: "concern",
      section: "Concerns",
      title: "What concerns you most about affordability?",
      subtitle: "Select all that apply.",
      multi: true,
      help: {
        title: "Why this matters",
        text: "Understanding concerns helps guide the right next step, whether that’s planning, education, or financial guidance.",
      },
      options: [
        { label: "Running out of money", value: "runningOut", score: 3 },
        { label: "Unexpected costs", value: "unexpected", score: 2 },
        { label: "Understanding options", value: "confusion", score: 2 },
        { label: "Comparing communities", value: "comparison", score: 1 },
        { label: "Helping a loved one afford care", value: "familySupport", score: 2 },
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

    const planningScore = scoreAnswer(answers.budgetPlanning);
    const assetScore =
      scoreAnswer(answers.homeOwnership) +
      scoreAnswer(answers.incomeSources);

    const urgencyScore = scoreAnswer(answers.timeline);

    if (urgencyScore >= 4 || totalScore >= 26) {
      return {
        key: "urgent-planning",
        title: "It may be time to actively plan your budget.",
        description:
          "Your answers suggest a more immediate need to understand costs and options. Speaking with a specialist may help you move forward with confidence.",
        cta: "Talk to a Specialist",
      };
    }

    if (planningScore >= 3 || assetScore >= 5 || totalScore >= 20) {
      return {
        key: "compare-options",
        title: "This is a good time to compare costs and options.",
        description:
          "Your answers suggest you’re ready to look more closely at pricing, services, and what fits your situation best.",
        cta: "Compare Options",
      };
    }

    if (totalScore >= 14) {
      return {
        key: "build-plan",
        title: "Building a clearer financial plan may help.",
        description:
          "You may benefit from understanding typical costs, funding sources, and what to expect before making any decisions.",
        cta: "Start Planning",
      };
    }

    return {
      key: "early-stage",
      title: "You’re in a good place to start learning.",
      description:
        "This is a great time to begin understanding costs and options so you feel prepared when the time comes.",
      cta: "Learn More",
    };
  },

  defaultResult: {
    title:
      "A clearer budget plan may help you compare options with confidence.",
    description:
      "Your answers suggest that understanding likely costs and available choices would be a helpful next step.",
    cta: "Explore Cost Planning",
  },
};