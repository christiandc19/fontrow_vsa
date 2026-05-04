export const downsizingSurvey = {
  slug: "downsizing",

  landing: {
    title: "Would Downsizing Make Life Easier Right Now?",
    subtitle:
      "Answer a few quick questions to explore whether simplifying the home may be the right next step.",
    cta: "Start Assessment",
    heroImage: "/images/senior-bg.webp",
  },

  questions: [
    {
      id: "whoFor",
      section: "Getting Started",
      type: "select",
      title: "Who are you exploring downsizing for today?",
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
      id: "spaceNeed",
      section: "Current Home",
      title: {
        self: "How does your current home feel today?",
        mom: "How does your mom’s current home feel today?",
        dad: "How does your dad’s current home feel today?",
        wife: "How does your wife’s current home feel today?",
        husband: "How does your husband’s current home feel today?",
        grandma: "How does your grandma’s current home feel today?",
        grandpa: "How does your grandpa’s current home feel today?",
        friend: "How does your friend’s current home feel today?",
        someoneElse: "How does your loved one’s current home feel today?",
      },
      subtitle: "Choose the answer that fits best.",
      help: {
        title: "Why this matters",
        text: "A home that once felt comfortable can begin to feel too large, difficult to maintain, or less practical over time.",
      },
      options: [
        { label: "Still feels manageable", value: "manageable", score: 1 },
        { label: "More space than needed", value: "tooMuchSpace", score: 2 },
        { label: "Hard to maintain", value: "hardToMaintain", score: 3 },
        { label: "Overwhelming most days", value: "overwhelming", score: 4 },
      ],
    },

    {
      id: "maintenance",
      section: "Current Home",
      title: {
        self: "How manageable is home maintenance right now?",
        mom: "How manageable is home maintenance for your mom right now?",
        dad: "How manageable is home maintenance for your dad right now?",
        wife: "How manageable is home maintenance for your wife right now?",
        husband: "How manageable is home maintenance for your husband right now?",
        grandma: "How manageable is home maintenance for your grandma right now?",
        grandpa: "How manageable is home maintenance for your grandpa right now?",
        friend: "How manageable is home maintenance for your friend right now?",
        someoneElse: "How manageable is home maintenance for your loved one right now?",
      },
      subtitle: "Think about cleaning, repairs, yardwork, and upkeep.",
      help: {
        title: "Why this matters",
        text: "Maintenance responsibilities are one of the most common reasons people begin considering a simpler living arrangement.",
      },
      options: [
        { label: "Easy to manage", value: "easy", score: 1 },
        { label: "A little harder than before", value: "harder", score: 2 },
        { label: "Often stressful", value: "stressful", score: 3 },
        { label: "No longer manageable", value: "notManageable", score: 4 },
      ],
    },

    {
      id: "safety",
      section: "Safety",
      title: {
        self: "How safe does your current home feel?",
        mom: "How safe does your mom’s current home feel?",
        dad: "How safe does your dad’s current home feel?",
        wife: "How safe does your wife’s current home feel?",
        husband: "How safe does your husband’s current home feel?",
        grandma: "How safe does your grandma’s current home feel?",
        grandpa: "How safe does your grandpa’s current home feel?",
        friend: "How safe does your friend’s current home feel?",
        someoneElse: "How safe does your loved one’s current home feel?",
      },
      subtitle: "Think about stairs, clutter, bathrooms, lighting, and layout.",
      help: {
        title: "Why this matters",
        text: "Safety concerns can make a familiar home feel less comfortable and may signal that a more accessible space would help.",
      },
      options: [
        { label: "Very safe", value: "verySafe", score: 1 },
        { label: "Mostly safe", value: "mostlySafe", score: 2 },
        { label: "Some concerns", value: "someConcerns", score: 3 },
        { label: "Significant concerns", value: "significantConcerns", score: 4 },
      ],
    },

    {
      id: "stairs",
      section: "Safety",
      title: {
        self: "Are stairs or layout becoming difficult?",
        mom: "Are stairs or layout becoming difficult for your mom?",
        dad: "Are stairs or layout becoming difficult for your dad?",
        wife: "Are stairs or layout becoming difficult for your wife?",
        husband: "Are stairs or layout becoming difficult for your husband?",
        grandma: "Are stairs or layout becoming difficult for your grandma?",
        grandpa: "Are stairs or layout becoming difficult for your grandpa?",
        friend: "Are stairs or layout becoming difficult for your friend?",
        someoneElse: "Are stairs or layout becoming difficult for your loved one?",
      },
      subtitle: "Choose the closest answer.",
      help: {
        title: "Why this matters",
        text: "A home’s layout can become a daily challenge, especially when mobility or confidence begins to change.",
      },
      options: [
        { label: "No issue", value: "noIssue", score: 1 },
        { label: "Occasionally inconvenient", value: "inconvenient", score: 2 },
        { label: "Frequently difficult", value: "difficult", score: 3 },
        { label: "A major concern", value: "majorConcern", score: 4 },
      ],
    },

    {
      id: "clutter",
      section: "Belongings",
      title: {
        self: "How do you feel about the amount of belongings in the home?",
        mom: "How does your mom seem to feel about the amount of belongings in the home?",
        dad: "How does your dad seem to feel about the amount of belongings in the home?",
        wife: "How does your wife seem to feel about the amount of belongings in the home?",
        husband: "How does your husband seem to feel about the amount of belongings in the home?",
        grandma: "How does your grandma seem to feel about the amount of belongings in the home?",
        grandpa: "How does your grandpa seem to feel about the amount of belongings in the home?",
        friend: "How does your friend seem to feel about the amount of belongings in the home?",
        someoneElse: "How does your loved one seem to feel about the amount of belongings in the home?",
      },
      subtitle: "Think about furniture, keepsakes, storage, and unused rooms.",
      help: {
        title: "Why this matters",
        text: "Downsizing often feels emotional because it involves both practical decisions and meaningful memories.",
      },
      options: [
        { label: "Feels manageable", value: "manageable", score: 1 },
        { label: "There is more than needed", value: "moreThanNeeded", score: 2 },
        { label: "It feels cluttered", value: "cluttered", score: 3 },
        { label: "It feels overwhelming", value: "overwhelming", score: 4 },
      ],
    },

    {
      id: "emotionalReadiness",
      section: "Readiness",
      title: {
        self: "How do you feel emotionally about downsizing?",
        mom: "How does your mom seem to feel emotionally about downsizing?",
        dad: "How does your dad seem to feel emotionally about downsizing?",
        wife: "How does your wife seem to feel emotionally about downsizing?",
        husband: "How does your husband seem to feel emotionally about downsizing?",
        grandma: "How does your grandma seem to feel emotionally about downsizing?",
        grandpa: "How does your grandpa seem to feel emotionally about downsizing?",
        friend: "How does your friend seem to feel emotionally about downsizing?",
        someoneElse: "How does your loved one seem to feel emotionally about downsizing?",
      },
      subtitle: "There is no wrong answer.",
      help: {
        title: "Why this matters",
        text: "Readiness affects how quickly someone can move forward and how much support they may need through the process.",
      },
      options: [
        { label: "Open to it", value: "open", score: 1 },
        { label: "Curious but unsure", value: "unsure", score: 2 },
        { label: "Anxious about it", value: "anxious", score: 3 },
        { label: "Very resistant", value: "resistant", score: 4 },
      ],
    },

    {
      id: "timeline",
      section: "Planning",
      title: {
        self: "When might downsizing need to happen?",
        mom: "When might downsizing need to happen for your mom?",
        dad: "When might downsizing need to happen for your dad?",
        wife: "When might downsizing need to happen for your wife?",
        husband: "When might downsizing need to happen for your husband?",
        grandma: "When might downsizing need to happen for your grandma?",
        grandpa: "When might downsizing need to happen for your grandpa?",
        friend: "When might downsizing need to happen for your friend?",
        someoneElse: "When might downsizing need to happen for your loved one?",
      },
      subtitle: "Choose the option that feels closest.",
      help: {
        title: "Why this matters",
        text: "Some people are planning ahead, while others need to simplify quickly because of health, safety, or family concerns.",
      },
      options: [
        { label: "Just researching for now", value: "researching", score: 1 },
        { label: "Within the next year", value: "nextYear", score: 2 },
        { label: "Within the next few months", value: "fewMonths", score: 3 },
        { label: "As soon as possible", value: "urgent", score: 4 },
      ],
    },

    {
      id: "support",
      section: "Support",
      title: {
        self: "How much help would you have with the downsizing process?",
        mom: "How much help would your mom have with the downsizing process?",
        dad: "How much help would your dad have with the downsizing process?",
        wife: "How much help would your wife have with the downsizing process?",
        husband: "How much help would your husband have with the downsizing process?",
        grandma: "How much help would your grandma have with the downsizing process?",
        grandpa: "How much help would your grandpa have with the downsizing process?",
        friend: "How much help would your friend have with the downsizing process?",
        someoneElse: "How much help would your loved one have with the downsizing process?",
      },
      subtitle: "Think about family, friends, movers, organizers, or professionals.",
      help: {
        title: "Why this matters",
        text: "Having the right support can make downsizing feel less stressful and more manageable.",
      },
      options: [
        { label: "Plenty of help is available", value: "plenty", score: 1 },
        { label: "Some help is available", value: "some", score: 2 },
        { label: "Very little help is available", value: "little", score: 3 },
        { label: "No clear support yet", value: "none", score: 4 },
      ],
    },

    {
      id: "futureLifestyle",
      section: "Next Steps",
      title: {
        self: "What would you hope downsizing could improve?",
        mom: "What would you hope downsizing could improve for your mom?",
        dad: "What would you hope downsizing could improve for your dad?",
        wife: "What would you hope downsizing could improve for your wife?",
        husband: "What would you hope downsizing could improve for your husband?",
        grandma: "What would you hope downsizing could improve for your grandma?",
        grandpa: "What would you hope downsizing could improve for your grandpa?",
        friend: "What would you hope downsizing could improve for your friend?",
        someoneElse: "What would you hope downsizing could improve for your loved one?",
      },
      subtitle: "Select all that apply.",
      multi: true,
      help: {
        title: "Why this matters",
        text: "The best next step depends on what someone is hoping to gain: less stress, more safety, more freedom, or more connection.",
      },
      options: [
        { label: "Less home maintenance", value: "lessMaintenance", score: 2 },
        { label: "A safer layout", value: "saferLayout", score: 3 },
        { label: "Lower stress", value: "lowerStress", score: 2 },
        { label: "More social connection", value: "connection", score: 2 },
        { label: "Being closer to family", value: "closerToFamily", score: 2 },
        { label: "Planning ahead before a crisis", value: "planningAhead", score: 1 },
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

    const homeScore =
      scoreAnswer(answers.spaceNeed) + scoreAnswer(answers.maintenance);

    const safetyScore =
      scoreAnswer(answers.safety) + scoreAnswer(answers.stairs);

    const emotionalScore =
      scoreAnswer(answers.clutter) + scoreAnswer(answers.emotionalReadiness);

    const planningScore =
      scoreAnswer(answers.timeline) + scoreAnswer(answers.support);

    if (safetyScore >= 7 || totalScore >= 31) {
      return {
        key: "active-downsizing",
        title: "Downsizing may be an important next step.",
        description:
          "Your answers suggest the current home may be creating safety, maintenance, or stress concerns. Exploring a simpler, more supportive living arrangement may be helpful.",
        cta: "Explore Downsizing Options",
      };
    }

    if (homeScore >= 6 || planningScore >= 6 || totalScore >= 24) {
      return {
        key: "start-planning",
        title: "This may be a good time to start planning.",
        description:
          "Your answers suggest downsizing may not be urgent, but planning now could make the process easier and less stressful later.",
        cta: "Start Planning",
      };
    }

    if (emotionalScore >= 6 || totalScore >= 18) {
      return {
        key: "gentle-conversation",
        title: "A gentle conversation about downsizing may be helpful.",
        description:
          "Your answers suggest there may be some emotional or practical concerns around the home. Starting with a thoughtful conversation may be the best next step.",
        cta: "See Conversation Tips",
      };
    }

    return {
      key: "keep-exploring",
      title: "You’re in a good place to keep exploring.",
      description:
        "Your answers suggest downsizing may not need to happen right away, but learning about options now can help you feel more prepared.",
      cta: "Keep Exploring",
    };
  },

  defaultResult: {
    title: "Downsizing may be worth exploring.",
    description:
      "Your answers suggest that simplifying the living situation may offer more flexibility, comfort, and peace of mind.",
    cta: "Explore Next Steps",
  },
};