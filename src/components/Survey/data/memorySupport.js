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
      id: "whoFor",
      section: "Getting Started",
      type: "select",
      title: "Who are you exploring memory support for today?",
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
      id: "memoryConcern",
      section: "Memory Changes",
      title: {
        self: "What memory concerns are you noticing most right now?",
        mom: "What memory concerns are you noticing most with your mom?",
        dad: "What memory concerns are you noticing most with your dad?",
        wife: "What memory concerns are you noticing most with your wife?",
        husband: "What memory concerns are you noticing most with your husband?",
        grandma: "What memory concerns are you noticing most with your grandma?",
        grandpa: "What memory concerns are you noticing most with your grandpa?",
        friend: "What memory concerns are you noticing most with your friend?",
        someoneElse:
          "What memory concerns are you noticing most with your loved one?",
      },
      subtitle: "Choose the answer that feels closest.",
      help: {
        title: "Why this matters",
        text: "Changes in memory can affect routines, confidence, safety, and the type of support that may be helpful.",
      },
      options: [
        { label: "Occasional forgetfulness", value: "occasional", score: 1 },
        { label: "More frequent forgetfulness", value: "frequent", score: 2 },
        { label: "Confusion or disorientation", value: "confusion", score: 3 },
        { label: "Safety concerns", value: "safety", score: 4 },
      ],
    },

    {
      id: "confusion",
      section: "Memory Changes",
      title: {
        self: "How often do you feel confused or disoriented?",
        mom: "How often does your mom seem confused or disoriented?",
        dad: "How often does your dad seem confused or disoriented?",
        wife: "How often does your wife seem confused or disoriented?",
        husband: "How often does your husband seem confused or disoriented?",
        grandma: "How often does your grandma seem confused or disoriented?",
        grandpa: "How often does your grandpa seem confused or disoriented?",
        friend: "How often does your friend seem confused or disoriented?",
        someoneElse:
          "How often does your loved one seem confused or disoriented?",
      },
      subtitle: "Think about time, place, routine, or familiar settings.",
      help: {
        title: "Why this matters",
        text: "Confusion or disorientation can increase stress and may point to a need for more structure or supervision.",
      },
      options: [
        { label: "Rarely or never", value: "rarely", score: 1 },
        { label: "Sometimes", value: "sometimes", score: 2 },
        { label: "Often", value: "often", score: 3 },
        { label: "Very frequently", value: "veryFrequently", score: 4 },
      ],
    },

    {
      id: "dailyRoutine",
      section: "Daily Life",
      title: {
        self: "How well are daily routines being managed?",
        mom: "How well is your mom managing daily routines?",
        dad: "How well is your dad managing daily routines?",
        wife: "How well is your wife managing daily routines?",
        husband: "How well is your husband managing daily routines?",
        grandma: "How well is your grandma managing daily routines?",
        grandpa: "How well is your grandpa managing daily routines?",
        friend: "How well is your friend managing daily routines?",
        someoneElse: "How well is your loved one managing daily routines?",
      },
      subtitle: "Think about meals, hygiene, appointments, and household tasks.",
      help: {
        title: "Why this matters",
        text: "Memory changes often become more noticeable when everyday routines start to break down.",
      },
      options: [
        { label: "Routines are managed independently", value: "independent", score: 1 },
        { label: "Reminders are helpful", value: "reminders", score: 2 },
        { label: "Regular help is needed", value: "regularHelp", score: 3 },
        { label: "Routines are not safe without help", value: "unsafeWithoutHelp", score: 4 },
      ],
    },

    {
      id: "medication",
      section: "Daily Life",
      title: {
        self: "How well are medications being managed?",
        mom: "How well are your mom’s medications being managed?",
        dad: "How well are your dad’s medications being managed?",
        wife: "How well are your wife’s medications being managed?",
        husband: "How well are your husband’s medications being managed?",
        grandma: "How well are your grandma’s medications being managed?",
        grandpa: "How well are your grandpa’s medications being managed?",
        friend: "How well are your friend’s medications being managed?",
        someoneElse:
          "How well are your loved one’s medications being managed?",
      },
      subtitle: "Think about missed doses, duplicate doses, or confusion.",
      help: {
        title: "Why this matters",
        text: "Medication mistakes can quickly become a serious safety concern, especially when memory changes are involved.",
      },
      options: [
        { label: "Managed independently", value: "independent", score: 1 },
        { label: "Occasional reminders help", value: "reminders", score: 2 },
        { label: "Supervision is needed", value: "supervision", score: 3 },
        { label: "Cannot be managed safely alone", value: "unsafe", score: 4 },
      ],
    },

    {
      id: "wandering",
      section: "Safety",
      title: {
        self: "Has wandering or getting lost become a concern?",
        mom: "Has wandering or getting lost become a concern for your mom?",
        dad: "Has wandering or getting lost become a concern for your dad?",
        wife: "Has wandering or getting lost become a concern for your wife?",
        husband: "Has wandering or getting lost become a concern for your husband?",
        grandma: "Has wandering or getting lost become a concern for your grandma?",
        grandpa: "Has wandering or getting lost become a concern for your grandpa?",
        friend: "Has wandering or getting lost become a concern for your friend?",
        someoneElse:
          "Has wandering or getting lost become a concern for your loved one?",
      },
      subtitle: "This may include leaving home, getting turned around, or confusion while out.",
      help: {
        title: "Why this matters",
        text: "Wandering or getting lost can be one of the clearest signs that a safer, more structured environment may be needed.",
      },
      options: [
        { label: "No concern", value: "none", score: 1 },
        { label: "A small concern", value: "smallConcern", score: 2 },
        { label: "Has happened once or twice", value: "hasHappened", score: 3 },
        { label: "A frequent or serious concern", value: "seriousConcern", score: 4 },
      ],
    },

    {
      id: "homeSafety",
      section: "Safety",
      title: {
        self: "How safe does the current home environment feel?",
        mom: "How safe does your mom’s current home environment feel?",
        dad: "How safe does your dad’s current home environment feel?",
        wife: "How safe does your wife’s current home environment feel?",
        husband: "How safe does your husband’s current home environment feel?",
        grandma: "How safe does your grandma’s current home environment feel?",
        grandpa: "How safe does your grandpa’s current home environment feel?",
        friend: "How safe does your friend’s current home environment feel?",
        someoneElse: "How safe does your loved one’s current home environment feel?",
      },
      subtitle: "Think about cooking, appliances, doors, stairs, clutter, and emergencies.",
      help: {
        title: "Why this matters",
        text: "As memory needs change, familiar homes can become harder to navigate safely without support.",
      },
      options: [
        { label: "Very safe", value: "verySafe", score: 1 },
        { label: "Mostly safe", value: "mostlySafe", score: 2 },
        { label: "Some concerns", value: "someConcerns", score: 3 },
        { label: "Significant safety concerns", value: "significantConcerns", score: 4 },
      ],
    },

    {
      id: "caregiverStress",
      section: "Support System",
      title: {
        self: "How stressful does managing memory-related needs feel?",
        mom: "How stressful does supporting your mom feel right now?",
        dad: "How stressful does supporting your dad feel right now?",
        wife: "How stressful does supporting your wife feel right now?",
        husband: "How stressful does supporting your husband feel right now?",
        grandma: "How stressful does supporting your grandma feel right now?",
        grandpa: "How stressful does supporting your grandpa feel right now?",
        friend: "How stressful does supporting your friend feel right now?",
        someoneElse: "How stressful does supporting your loved one feel right now?",
      },
      subtitle: "Think about emotional strain, supervision, and family impact.",
      help: {
        title: "Why this matters",
        text: "Caregiver stress often increases as memory needs become less predictable or require more frequent supervision.",
      },
      options: [
        { label: "Manageable", value: "manageable", score: 1 },
        { label: "A little stressful", value: "littleStressful", score: 2 },
        { label: "Very stressful", value: "veryStressful", score: 3 },
        { label: "Overwhelming", value: "overwhelming", score: 4 },
      ],
    },

    {
      id: "supervision",
      section: "Support System",
      title: {
        self: "How much supervision is needed during the day?",
        mom: "How much supervision does your mom need during the day?",
        dad: "How much supervision does your dad need during the day?",
        wife: "How much supervision does your wife need during the day?",
        husband: "How much supervision does your husband need during the day?",
        grandma: "How much supervision does your grandma need during the day?",
        grandpa: "How much supervision does your grandpa need during the day?",
        friend: "How much supervision does your friend need during the day?",
        someoneElse: "How much supervision does your loved one need during the day?",
      },
      subtitle: "Think about reminders, safety checks, and being alone.",
      help: {
        title: "Why this matters",
        text: "The amount of supervision needed is one of the biggest indicators of what level of support may fit best.",
      },
      options: [
        { label: "No supervision needed", value: "none", score: 1 },
        { label: "Occasional check-ins are enough", value: "checkIns", score: 2 },
        { label: "Regular supervision is needed", value: "regular", score: 3 },
        { label: "Cannot be left alone safely", value: "constant", score: 4 },
      ],
    },

    {
      id: "timeline",
      section: "Planning",
      title: {
        self: "How soon do you think a memory support decision may be needed?",
        mom: "How soon do you think a memory support decision may be needed for your mom?",
        dad: "How soon do you think a memory support decision may be needed for your dad?",
        wife: "How soon do you think a memory support decision may be needed for your wife?",
        husband:
          "How soon do you think a memory support decision may be needed for your husband?",
        grandma:
          "How soon do you think a memory support decision may be needed for your grandma?",
        grandpa:
          "How soon do you think a memory support decision may be needed for your grandpa?",
        friend:
          "How soon do you think a memory support decision may be needed for your friend?",
        someoneElse:
          "How soon do you think a memory support decision may be needed for your loved one?",
      },
      subtitle: "Choose the option that feels closest.",
      help: {
        title: "Why this matters",
        text: "A timeline helps determine whether the next step is learning, planning, touring, or immediate support.",
      },
      options: [
        { label: "Just researching for now", value: "researching", score: 1 },
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
      scoreAnswer(answers.memoryConcern) + scoreAnswer(answers.confusion);

    const safetyScore =
      scoreAnswer(answers.wandering) +
      scoreAnswer(answers.homeSafety) +
      scoreAnswer(answers.medication);

    const supportScore =
      scoreAnswer(answers.caregiverStress) +
      scoreAnswer(answers.supervision);

    if (safetyScore >= 10 || supportScore >= 7 || totalScore >= 30) {
      return {
        key: "memory-support",
        title: "It may be time to actively explore memory support.",
        description:
          "Your answers suggest that memory-related safety, supervision, or caregiver strain may be significant. A structured memory support setting may be worth exploring.",
        cta: "Explore Memory Support",
      };
    }

    if (memoryScore >= 5 || totalScore >= 23) {
      return {
        key: "planning",
        title: "This may be a good time to start planning for memory support.",
        description:
          "Your answers suggest memory-related changes are becoming more noticeable. Learning about available support now may help you prepare before things feel urgent.",
        cta: "Start Planning",
      };
    }

    if (totalScore >= 16) {
      return {
        key: "early-signs",
        title: "Some early memory support planning may be helpful.",
        description:
          "Your answers suggest there may be early concerns worth watching. It may be helpful to talk with a professional and learn what signs to monitor.",
        cta: "Learn More",
      };
    }

    return {
      key: "keep-observing",
      title: "You’re in a good place to keep observing and learning.",
      description:
        "Your answers suggest memory support may not be needed right away, but learning about options now can help you feel prepared if needs change.",
      cta: "Keep Exploring",
    };
  },

  defaultResult: {
    title: "It may be helpful to learn more about memory support options.",
    description:
      "Your answers suggest that additional guidance around memory-related care could be helpful.",
    cta: "Explore Next Steps",
  },
};