export const seniorLivingSurvey = {
  slug: "senior-living",

  landing: {
    title: "Is Senior Living the Right Next Step?",
    subtitle:
      "We’ll walk through a few thoughtful questions to help you better understand what kind of support may be helpful now or in the near future.",
    cta: "Start Assessment",
    heroImage: "/images/senior-bg.webp",
  },

  questions: [
    {
      id: "whoFor",
      section: "Getting Started",
      type: "select",
      title: "Who are you exploring senior living for today?",
      subtitle: "Select one option to continue.",
      placeholder: "Choose one",
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


// AGE


{
  id: "age",
  section: "Getting Started",
  title: {
    self: "What is your age?",
    mom: "How old is your mom?",
    dad: "How old is your dad?",
    wife: "How old is your wife?",
    husband: "How old is your husband?",
    grandma: "How old is your grandma?",
    grandpa: "How old is your grandpa?",
    friend: "How old is your friend?",
    someoneElse: "How old is your loved one?",
  },
  subtitle: "This helps us better tailor the guidance.",
  help: {
    title: "Why this matters",
    text: "Age can influence care options, timing, and what types of support may be most appropriate.",
  },
  options: [
    { label: "Under 65", value: "under65", score: 1 },
    { label: "65–74", value: "65-74", score: 2 },
    { label: "75–84", value: "75-84", score: 3 },
    { label: "85+", value: "85+", score: 4 },
  ],
},



    {
      id: "whyNow",
      section: "Understanding the Situation",
      intro: {
        self: "Let’s start with what’s been on your mind.",
        mom: "Let’s start with what’s been on your mind about your mom.",
        dad: "Let’s start with what’s been on your mind about your dad.",
        wife: "Let’s start with what’s been on your mind about your wife.",
        husband: "Let’s start with what’s been on your mind about your husband.",
        grandma: "Let’s start with what’s been on your mind about your grandma.",
        grandpa: "Let’s start with what’s been on your mind about your grandpa.",
        friend: "Let’s start with what’s been on your mind about your friend.",
        someoneElse: "Let’s start with what’s been on your mind.",
      },
      title: {
        self: "What’s making you think about this now?",
        mom: "What’s making you think about your mom’s situation now?",
        dad: "What’s making you think about your dad’s situation now?",
        wife: "What’s making you think about your wife’s situation now?",
        husband: "What’s making you think about your husband’s situation now?",
        grandma: "What’s making you think about your grandma’s situation now?",
        grandpa: "What’s making you think about your grandpa’s situation now?",
        friend: "What’s making you think about your friend’s situation now?",
        someoneElse:
          "What’s making you think about your loved one’s situation now?",
      },
      subtitle: "Select all that apply.",
      multi: true,
      help: {
        title: "Why this matters",
        text: "Understanding what’s driving this search helps point to the right next steps and gives helpful context for everything that follows.",
      },
      options: [
        { label: "I’ve noticed some changes lately", value: "changes", score: 2 },
        { label: "I’m worried about safety", value: "safety", score: 3 },
        {
          label: "Things are getting harder to manage",
          value: "overwhelmed",
          score: 3,
        },
        {
          label: "I don’t want to wait for a crisis",
          value: "proactive",
          score: 2,
        },
        {
          label: "There’s been a recent health change",
          value: "health",
          score: 3,
        },
        {
          label: "I’m just trying to understand the options",
          value: "exploring",
          score: 1,
        },
      ],
    },

    {
      id: "timeline",
      section: "Planning",
      intro: {
        self: "Everyone is in a different stage of the process.",
        mom: "Everyone is in a different stage of the process.",
        dad: "Everyone is in a different stage of the process.",
        wife: "Everyone is in a different stage of the process.",
        husband: "Everyone is in a different stage of the process.",
        grandma: "Everyone is in a different stage of the process.",
        grandpa: "Everyone is in a different stage of the process.",
        friend: "Everyone is in a different stage of the process.",
        someoneElse: "Everyone is in a different stage of the process.",
      },
      title: {
        self: "How soon do you think a decision may be needed?",
        mom: "How soon do you think a decision may be needed for your mom?",
        dad: "How soon do you think a decision may be needed for your dad?",
        wife: "How soon do you think a decision may be needed for your wife?",
        husband:
          "How soon do you think a decision may be needed for your husband?",
        grandma:
          "How soon do you think a decision may be needed for your grandma?",
        grandpa:
          "How soon do you think a decision may be needed for your grandpa?",
        friend:
          "How soon do you think a decision may be needed for your friend?",
        someoneElse:
          "How soon do you think a decision may be needed for your loved one?",
      },
      subtitle: "Choose the option that feels closest to where you are right now.",
      help: {
        title: "Why this matters",
        text: "Some families are simply gathering information, while others need to make decisions quickly. Knowing the timeline helps shape the guidance.",
      },
      options: [
        { label: "I’m just researching for now", value: "researching", score: 1 },
        {
          label: "Probably within the next few months",
          value: "fewMonths",
          score: 2,
        },
        { label: "Soon", value: "soon", score: 3 },
        { label: "As soon as possible", value: "urgent", score: 4 },
      ],
    },

    {
      id: "bathing",
      section: "Daily Life",
      intro: {
        self: "Next, let’s look at how daily routines are going.",
        mom: "Next, let’s look at how your mom is doing with daily routines.",
        dad: "Next, let’s look at how your dad is doing with daily routines.",
        wife: "Next, let’s look at how your wife is doing with daily routines.",
        husband:
          "Next, let’s look at how your husband is doing with daily routines.",
        grandma:
          "Next, let’s look at how your grandma is doing with daily routines.",
        grandpa:
          "Next, let’s look at how your grandpa is doing with daily routines.",
        friend:
          "Next, let’s look at how your friend is doing with daily routines.",
        someoneElse:
          "Next, let’s look at how your loved one is doing with daily routines.",
      },
      title: {
        self: "How much help do you need with bathing or personal care?",
        mom: "How much help does your mom need with bathing or personal care?",
        dad: "How much help does your dad need with bathing or personal care?",
        wife: "How much help does your wife need with bathing or personal care?",
        husband:
          "How much help does your husband need with bathing or personal care?",
        grandma:
          "How much help does your grandma need with bathing or personal care?",
        grandpa:
          "How much help does your grandpa need with bathing or personal care?",
        friend:
          "How much help does your friend need with bathing or personal care?",
        someoneElse:
          "How much help does your loved one need with bathing or personal care?",
      },
      subtitle: "Choose the answer that feels closest.",
      help: {
        title: "Why this matters",
        text: "Changes in bathing and personal care are often among the earliest signs that more day-to-day support may be helpful.",
      },
      options: [
        { label: "No help is needed", value: "none", score: 1 },
        { label: "A few reminders help", value: "reminders", score: 2 },
        { label: "Regular help is needed", value: "regularHelp", score: 3 },
        {
          label: "Full assistance is needed",
          value: "fullAssistance",
          score: 4,
        },
      ],
    },

    {
      id: "dressing",
      section: "Daily Life",
      intro: {
        self: "Getting dressed can also say a lot about how everyday life is going.",
        mom: "Getting dressed can also say a lot about how your mom is doing day to day.",
        dad: "Getting dressed can also say a lot about how your dad is doing day to day.",
        wife: "Getting dressed can also say a lot about how your wife is doing day to day.",
        husband:
          "Getting dressed can also say a lot about how your husband is doing day to day.",
        grandma:
          "Getting dressed can also say a lot about how your grandma is doing day to day.",
        grandpa:
          "Getting dressed can also say a lot about how your grandpa is doing day to day.",
        friend:
          "Getting dressed can also say a lot about how your friend is doing day to day.",
        someoneElse:
          "Getting dressed can also say a lot about how your loved one is doing day to day.",
      },
      title: {
        self: "How independent are you when getting dressed?",
        mom: "How independent is your mom when getting dressed?",
        dad: "How independent is your dad when getting dressed?",
        wife: "How independent is your wife when getting dressed?",
        husband: "How independent is your husband when getting dressed?",
        grandma: "How independent is your grandma when getting dressed?",
        grandpa: "How independent is your grandpa when getting dressed?",
        friend: "How independent is your friend when getting dressed?",
        someoneElse:
          "How independent is your loved one when getting dressed?",
      },
      subtitle: "Think about choosing clothing and putting it on safely.",
      help: {
        title: "Why this matters",
        text: "Difficulty with dressing can point to mobility, strength, or memory-related changes.",
      },
      options: [
        { label: "Fully independent", value: "independent", score: 1 },
        {
          label: "Needs a little help sometimes",
          value: "minorHelp",
          score: 2,
        },
        { label: "Needs regular help", value: "regularHelp", score: 3 },
        { label: "Cannot dress independently", value: "cannotDress", score: 4 },
      ],
    },

    {
      id: "mobility",
      section: "Daily Life",
      intro: {
        self: "Let’s talk about getting around safely.",
        mom: "Let’s talk about how your mom is getting around day to day.",
        dad: "Let’s talk about how your dad is getting around day to day.",
        wife: "Let’s talk about how your wife is getting around day to day.",
        husband:
          "Let’s talk about how your husband is getting around day to day.",
        grandma:
          "Let’s talk about how your grandma is getting around day to day.",
        grandpa:
          "Let’s talk about how your grandpa is getting around day to day.",
        friend:
          "Let’s talk about how your friend is getting around day to day.",
        someoneElse:
          "Let’s talk about how your loved one is getting around day to day.",
      },
      title: {
        self: "How is your mobility around the home?",
        mom: "How is your mom’s mobility around the home?",
        dad: "How is your dad’s mobility around the home?",
        wife: "How is your wife’s mobility around the home?",
        husband: "How is your husband’s mobility around the home?",
        grandma: "How is your grandma’s mobility around the home?",
        grandpa: "How is your grandpa’s mobility around the home?",
        friend: "How is your friend’s mobility around the home?",
        someoneElse: "How is your loved one’s mobility around the home?",
      },
      subtitle: "Think about walking, standing, and moving from room to room.",
      help: {
        title: "Why this matters",
        text: "Mobility changes can affect confidence, independence, and safety at home.",
      },
      options: [
        { label: "Moves around independently", value: "independent", score: 1 },
        { label: "Some difficulty", value: "someDifficulty", score: 2 },
        { label: "Needs assistance", value: "assistance", score: 3 },
        { label: "Mobility is very limited", value: "limited", score: 4 },
      ],
    },

    {
      id: "meals",
      section: "Daily Life",
      intro: {
        self: "Meals are another important part of staying healthy and independent.",
        mom: "Meals are another important part of helping your mom stay healthy and independent.",
        dad: "Meals are another important part of helping your dad stay healthy and independent.",
        wife: "Meals are another important part of helping your wife stay healthy and independent.",
        husband:
          "Meals are another important part of helping your husband stay healthy and independent.",
        grandma:
          "Meals are another important part of helping your grandma stay healthy and independent.",
        grandpa:
          "Meals are another important part of helping your grandpa stay healthy and independent.",
        friend:
          "Meals are another important part of helping your friend stay healthy and independent.",
        someoneElse:
          "Meals are another important part of helping your loved one stay healthy and independent.",
      },
      title: {
        self: "How are meals usually handled for you?",
        mom: "How are meals usually handled for your mom?",
        dad: "How are meals usually handled for your dad?",
        wife: "How are meals usually handled for your wife?",
        husband: "How are meals usually handled for your husband?",
        grandma: "How are meals usually handled for your grandma?",
        grandpa: "How are meals usually handled for your grandpa?",
        friend: "How are meals usually handled for your friend?",
        someoneElse: "How are meals usually handled for your loved one?",
      },
      subtitle: "Think about planning, preparing, and eating meals regularly.",
      help: {
        title: "Why this matters",
        text: "Changes in eating habits or nutrition can quickly affect energy, health, and overall wellbeing.",
      },
      options: [
        {
          label: "Meals are handled independently",
          value: "independent",
          score: 1,
        },
        { label: "Some help is needed", value: "someHelp", score: 2 },
        {
          label: "Relies on others for meals",
          value: "reliesOnOthers",
          score: 3,
        },
        { label: "Cannot manage meals", value: "cannotManage", score: 4 },
      ],
    },

    {
      id: "medication",
      section: "Daily Life",
      intro: {
        self: "Medication routines can be one of the clearest signs that extra support may help.",
        mom: "Medication routines can be one of the clearest signs that your mom may need more support.",
        dad: "Medication routines can be one of the clearest signs that your dad may need more support.",
        wife: "Medication routines can be one of the clearest signs that your wife may need more support.",
        husband:
          "Medication routines can be one of the clearest signs that your husband may need more support.",
        grandma:
          "Medication routines can be one of the clearest signs that your grandma may need more support.",
        grandpa:
          "Medication routines can be one of the clearest signs that your grandpa may need more support.",
        friend:
          "Medication routines can be one of the clearest signs that your friend may need more support.",
        someoneElse:
          "Medication routines can be one of the clearest signs that your loved one may need more support.",
      },
      title: {
        self: "How well are your medications being managed?",
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
      subtitle: "Think about taking the right medications at the right time.",
      help: {
        title: "Why this matters",
        text: "Missed doses, duplicate doses, or confusion around medication can become serious health concerns.",
      },
      options: [
        { label: "Managed independently", value: "independent", score: 1 },
        { label: "Reminders are helpful", value: "reminders", score: 2 },
        { label: "Supervision is needed", value: "supervision", score: 3 },
        {
          label: "Cannot be managed safely without help",
          value: "cannotManage",
          score: 4,
        },
      ],
    },

    {
      id: "falls",
      section: "Safety",
      intro: {
        self: "Now let’s look a little more closely at safety.",
        mom: "Now let’s look a little more closely at safety for your mom.",
        dad: "Now let’s look a little more closely at safety for your dad.",
        wife: "Now let’s look a little more closely at safety for your wife.",
        husband:
          "Now let’s look a little more closely at safety for your husband.",
        grandma:
          "Now let’s look a little more closely at safety for your grandma.",
        grandpa:
          "Now let’s look a little more closely at safety for your grandpa.",
        friend:
          "Now let’s look a little more closely at safety for your friend.",
        someoneElse:
          "Now let’s look a little more closely at safety for your loved one.",
      },
      title: {
        self: "Have you had any recent falls?",
        mom: "Has your mom had any recent falls?",
        dad: "Has your dad had any recent falls?",
        wife: "Has your wife had any recent falls?",
        husband: "Has your husband had any recent falls?",
        grandma: "Has your grandma had any recent falls?",
        grandpa: "Has your grandpa had any recent falls?",
        friend: "Has your friend had any recent falls?",
        someoneElse: "Has your loved one had any recent falls?",
      },
      subtitle: "Include slips, trips, or loss of balance.",
      help: {
        title: "Why this matters",
        text: "Even one fall can increase concern about future safety and may be a sign that more support would help.",
      },
      options: [
        { label: "No falls", value: "none", score: 1 },
        { label: "One minor fall", value: "oneMinor", score: 2 },
        { label: "More than one fall", value: "multiple", score: 3 },
        {
          label: "Falls have been frequent or serious",
          value: "frequent",
          score: 4,
        },
      ],
    },

    {
      id: "emergencies",
      section: "Safety",
      intro: {
        self: "Recent emergencies can also signal that the current setup may not feel as manageable as it once did.",
        mom: "Recent emergencies can also signal that your mom may need more support.",
        dad: "Recent emergencies can also signal that your dad may need more support.",
        wife: "Recent emergencies can also signal that your wife may need more support.",
        husband:
          "Recent emergencies can also signal that your husband may need more support.",
        grandma:
          "Recent emergencies can also signal that your grandma may need more support.",
        grandpa:
          "Recent emergencies can also signal that your grandpa may need more support.",
        friend:
          "Recent emergencies can also signal that your friend may need more support.",
        someoneElse:
          "Recent emergencies can also signal that your loved one may need more support.",
      },
      title: {
        self: "Have you had any recent emergencies or hospital visits?",
        mom: "Has your mom had any recent emergencies or hospital visits?",
        dad: "Has your dad had any recent emergencies or hospital visits?",
        wife: "Has your wife had any recent emergencies or hospital visits?",
        husband:
          "Has your husband had any recent emergencies or hospital visits?",
        grandma:
          "Has your grandma had any recent emergencies or hospital visits?",
        grandpa:
          "Has your grandpa had any recent emergencies or hospital visits?",
        friend:
          "Has your friend had any recent emergencies or hospital visits?",
        someoneElse:
          "Has your loved one had any recent emergencies or hospital visits?",
      },
      subtitle: "This can include ER visits, urgent care, or 911 calls.",
      help: {
        title: "Why this matters",
        text: "A pattern of emergencies can point to increasing care needs or an environment that no longer feels manageable.",
      },
      options: [
        { label: "No recent emergencies", value: "none", score: 1 },
        { label: "One recent event", value: "oneRecent", score: 2 },
        { label: "A few events", value: "occasional", score: 3 },
        { label: "Frequent emergencies", value: "frequent", score: 4 },
      ],
    },

    {
      id: "homeSafety",
      section: "Safety",
      intro: {
        self: "The home itself can also affect safety and peace of mind.",
        mom: "The home itself can also affect your mom’s safety and peace of mind.",
        dad: "The home itself can also affect your dad’s safety and peace of mind.",
        wife: "The home itself can also affect your wife’s safety and peace of mind.",
        husband:
          "The home itself can also affect your husband’s safety and peace of mind.",
        grandma:
          "The home itself can also affect your grandma’s safety and peace of mind.",
        grandpa:
          "The home itself can also affect your grandpa’s safety and peace of mind.",
        friend:
          "The home itself can also affect your friend’s safety and peace of mind.",
        someoneElse:
          "The home itself can also affect your loved one’s safety and peace of mind.",
      },
      title: {
        self: "How safe does your current home environment feel?",
        mom: "How safe does your mom’s current home environment feel?",
        dad: "How safe does your dad’s current home environment feel?",
        wife: "How safe does your wife’s current home environment feel?",
        husband: "How safe does your husband’s current home environment feel?",
        grandma: "How safe does your grandma’s current home environment feel?",
        grandpa: "How safe does your grandpa’s current home environment feel?",
        friend: "How safe does your friend’s current home environment feel?",
        someoneElse:
          "How safe does your loved one’s current home environment feel?",
      },
      subtitle:
        "Think about stairs, clutter, accessibility, and getting around safely.",
      help: {
        title: "Why this matters",
        text: "Even a familiar home can become harder to navigate as needs change.",
      },
      options: [
        { label: "It feels very safe", value: "verySafe", score: 1 },
        { label: "It feels mostly safe", value: "mostlySafe", score: 2 },
        { label: "There are some concerns", value: "someRisks", score: 3 },
        {
          label: "There are significant safety concerns",
          value: "unsafe",
          score: 4,
        },
      ],
    },

    {
      id: "memory",
      section: "Memory",
      intro: {
        self: "Next, let’s talk about memory and day-to-day thinking.",
        mom: "Next, let’s talk about your mom’s memory and day-to-day thinking.",
        dad: "Next, let’s talk about your dad’s memory and day-to-day thinking.",
        wife: "Next, let’s talk about your wife’s memory and day-to-day thinking.",
        husband:
          "Next, let’s talk about your husband’s memory and day-to-day thinking.",
        grandma:
          "Next, let’s talk about your grandma’s memory and day-to-day thinking.",
        grandpa:
          "Next, let’s talk about your grandpa’s memory and day-to-day thinking.",
        friend:
          "Next, let’s talk about your friend’s memory and day-to-day thinking.",
        someoneElse:
          "Next, let’s talk about your loved one’s memory and day-to-day thinking.",
      },
      title: {
        self: "How would you describe your memory right now?",
        mom: "How would you describe your mom’s memory right now?",
        dad: "How would you describe your dad’s memory right now?",
        wife: "How would you describe your wife’s memory right now?",
        husband: "How would you describe your husband’s memory right now?",
        grandma: "How would you describe your grandma’s memory right now?",
        grandpa: "How would you describe your grandpa’s memory right now?",
        friend: "How would you describe your friend’s memory right now?",
        someoneElse: "How would you describe your loved one’s memory right now?",
      },
      subtitle: "Think about recall, consistency, and forgetfulness.",
      help: {
        title: "Why this matters",
        text: "Changes in memory can affect routines, confidence, and safety, and may shape what kind of support would be most helpful.",
      },
      options: [
        {
          label: "Memory seems strong and consistent",
          value: "strong",
          score: 1,
        },
        {
          label: "There’s some mild forgetfulness",
          value: "mildForgetfulness",
          score: 2,
        },
        {
          label: "There’s been noticeable decline",
          value: "noticeableDecline",
          score: 3,
        },
        {
          label: "Memory problems have become significant",
          value: "severeIssues",
          score: 4,
        },
      ],
    },

    {
      id: "confusion",
      section: "Memory",
      intro: {
        self: "Sometimes the concern is less about forgetting and more about confusion.",
        mom: "Sometimes the concern is less about forgetting and more about confusion.",
        dad: "Sometimes the concern is less about forgetting and more about confusion.",
        wife: "Sometimes the concern is less about forgetting and more about confusion.",
        husband:
          "Sometimes the concern is less about forgetting and more about confusion.",
        grandma:
          "Sometimes the concern is less about forgetting and more about confusion.",
        grandpa:
          "Sometimes the concern is less about forgetting and more about confusion.",
        friend:
          "Sometimes the concern is less about forgetting and more about confusion.",
        someoneElse:
          "Sometimes the concern is less about forgetting and more about confusion.",
      },
      title: {
        self: "Have you been experiencing confusion or disorientation?",
        mom: "Has your mom been experiencing confusion or disorientation?",
        dad: "Has your dad been experiencing confusion or disorientation?",
        wife: "Has your wife been experiencing confusion or disorientation?",
        husband:
          "Has your husband been experiencing confusion or disorientation?",
        grandma:
          "Has your grandma been experiencing confusion or disorientation?",
        grandpa:
          "Has your grandpa been experiencing confusion or disorientation?",
        friend:
          "Has your friend been experiencing confusion or disorientation?",
        someoneElse:
          "Has your loved one been experiencing confusion or disorientation?",
      },
      subtitle: "For example, uncertainty about time, place, or routine.",
      help: {
        title: "Why this matters",
        text: "Disorientation can create stress for both the individual and the family, and may be an important sign that more support is needed.",
      },
      options: [
        { label: "Rarely or never", value: "rarely", score: 1 },
        { label: "Sometimes", value: "sometimes", score: 2 },
        { label: "Often", value: "often", score: 3 },
        { label: "Very frequently", value: "veryFrequent", score: 4 },
      ],
    },

    {
      id: "decisionMaking",
      section: "Memory",
      intro: {
        self: "Daily decision-making can also change over time.",
        mom: "Daily decision-making can also change over time.",
        dad: "Daily decision-making can also change over time.",
        wife: "Daily decision-making can also change over time.",
        husband: "Daily decision-making can also change over time.",
        grandma: "Daily decision-making can also change over time.",
        grandpa: "Daily decision-making can also change over time.",
        friend: "Daily decision-making can also change over time.",
        someoneElse: "Daily decision-making can also change over time.",
      },
      title: {
        self: "How well are you able to make everyday decisions?",
        mom: "How well is your mom able to make everyday decisions?",
        dad: "How well is your dad able to make everyday decisions?",
        wife: "How well is your wife able to make everyday decisions?",
        husband: "How well is your husband able to make everyday decisions?",
        grandma: "How well is your grandma able to make everyday decisions?",
        grandpa: "How well is your grandpa able to make everyday decisions?",
        friend: "How well is your friend able to make everyday decisions?",
        someoneElse:
          "How well is your loved one able to make everyday decisions?",
      },
      subtitle:
        "Think about appointments, finances, routines, or simple choices.",
      help: {
        title: "Why this matters",
        text: "When everyday decisions become harder, it can affect both independence and safety.",
      },
      options: [
        {
          label: "Makes decisions independently",
          value: "independent",
          score: 1,
        },
        { label: "Some guidance helps", value: "someGuidance", score: 2 },
        { label: "Regular help is needed", value: "regularHelp", score: 3 },
        {
          label: "Unable to make decisions independently",
          value: "unable",
          score: 4,
        },
      ],
    },

    {
      id: "social",
      section: "Social Wellbeing",
      intro: {
        self: "Now let’s talk about connection and daily life beyond care needs.",
        mom: "Now let’s talk about your mom’s connection to other people and daily life.",
        dad: "Now let’s talk about your dad’s connection to other people and daily life.",
        wife: "Now let’s talk about your wife’s connection to other people and daily life.",
        husband:
          "Now let’s talk about your husband’s connection to other people and daily life.",
        grandma:
          "Now let’s talk about your grandma’s connection to other people and daily life.",
        grandpa:
          "Now let’s talk about your grandpa’s connection to other people and daily life.",
        friend:
          "Now let’s talk about your friend’s connection to other people and daily life.",
        someoneElse:
          "Now let’s talk about your loved one’s connection to other people and daily life.",
      },
      title: {
        self: "How socially connected do you feel?",
        mom: "How socially connected does your mom seem?",
        dad: "How socially connected does your dad seem?",
        wife: "How socially connected does your wife seem?",
        husband: "How socially connected does your husband seem?",
        grandma: "How socially connected does your grandma seem?",
        grandpa: "How socially connected does your grandpa seem?",
        friend: "How socially connected does your friend seem?",
        someoneElse: "How socially connected does your loved one seem?",
      },
      subtitle: "Think about time with family, friends, or community.",
      help: {
        title: "Why this matters",
        text: "Social connection plays a major role in emotional wellbeing, cognitive health, and quality of life.",
      },
      options: [
        { label: "Very connected and active", value: "veryActive", score: 1 },
        { label: "Somewhat connected", value: "somewhatActive", score: 2 },
        { label: "Rarely social", value: "rarelySocial", score: 3 },
        { label: "Mostly isolated", value: "isolated", score: 4 },
      ],
    },

    {
      id: "mood",
      section: "Social Wellbeing",
      intro: {
        self: "Emotional changes can be just as important as physical ones.",
        mom: "Emotional changes can be just as important as physical ones.",
        dad: "Emotional changes can be just as important as physical ones.",
        wife: "Emotional changes can be just as important as physical ones.",
        husband: "Emotional changes can be just as important as physical ones.",
        grandma: "Emotional changes can be just as important as physical ones.",
        grandpa: "Emotional changes can be just as important as physical ones.",
        friend: "Emotional changes can be just as important as physical ones.",
        someoneElse:
          "Emotional changes can be just as important as physical ones.",
      },
      title: {
        self: "How would you describe your mood overall?",
        mom: "How would you describe your mom’s mood overall?",
        dad: "How would you describe your dad’s mood overall?",
        wife: "How would you describe your wife’s mood overall?",
        husband: "How would you describe your husband’s mood overall?",
        grandma: "How would you describe your grandma’s mood overall?",
        grandpa: "How would you describe your grandpa’s mood overall?",
        friend: "How would you describe your friend’s mood overall?",
        someoneElse: "How would you describe your loved one’s mood overall?",
      },
      subtitle: "Think about emotional wellbeing, outlook, and energy.",
      help: {
        title: "Why this matters",
        text: "A lower mood, anxiety, or withdrawal can sometimes be a sign that more support, structure, or community would help.",
      },
      options: [
        {
          label: "Generally positive and steady",
          value: "positive",
          score: 1,
        },
        {
          label: "Sometimes a little down",
          value: "occasionalLowMood",
          score: 2,
        },
        {
          label: "Often sad, worried, or withdrawn",
          value: "frequentSadness",
          score: 3,
        },
        {
          label: "Emotionally distressed much of the time",
          value: "severeDistress",
          score: 4,
        },
      ],
    },

    {
      id: "engagement",
      section: "Social Wellbeing",
      intro: {
        self: "We also want to understand how engaged daily life feels.",
        mom: "We also want to understand how engaged your mom feels in day-to-day life.",
        dad: "We also want to understand how engaged your dad feels in day-to-day life.",
        wife: "We also want to understand how engaged your wife feels in day-to-day life.",
        husband:
          "We also want to understand how engaged your husband feels in day-to-day life.",
        grandma:
          "We also want to understand how engaged your grandma feels in day-to-day life.",
        grandpa:
          "We also want to understand how engaged your grandpa feels in day-to-day life.",
        friend:
          "We also want to understand how engaged your friend feels in day-to-day life.",
        someoneElse:
          "We also want to understand how engaged your loved one feels in day-to-day life.",
      },
      title: {
        self: "How engaged do you feel in everyday activities?",
        mom: "How engaged is your mom in everyday activities?",
        dad: "How engaged is your dad in everyday activities?",
        wife: "How engaged is your wife in everyday activities?",
        husband: "How engaged is your husband in everyday activities?",
        grandma: "How engaged is your grandma in everyday activities?",
        grandpa: "How engaged is your grandpa in everyday activities?",
        friend: "How engaged is your friend in everyday activities?",
        someoneElse: "How engaged is your loved one in everyday activities?",
      },
      subtitle:
        "Think about hobbies, routines, interests, or mental stimulation.",
      help: {
        title: "Why this matters",
        text: "A drop in engagement can affect mood, cognition, and overall quality of life.",
      },
      options: [
        { label: "Very engaged", value: "highlyEngaged", score: 1 },
        { label: "Somewhat engaged", value: "moderatelyEngaged", score: 2 },
        {
          label: "Engagement has become limited",
          value: "limitedEngagement",
          score: 3,
        },
        {
          label: "There is very little engagement",
          value: "notEngaged",
          score: 4,
        },
      ],
    },

    {
      id: "caregiver",
      section: "Support System",
      intro: {
        self: "Now let’s look at the support system around you.",
        mom: "Now let’s look at the support system around your mom.",
        dad: "Now let’s look at the support system around your dad.",
        wife: "Now let’s look at the support system around your wife.",
        husband: "Now let’s look at the support system around your husband.",
        grandma: "Now let’s look at the support system around your grandma.",
        grandpa: "Now let’s look at the support system around your grandpa.",
        friend: "Now let’s look at the support system around your friend.",
        someoneElse:
          "Now let’s look at the support system around your loved one.",
      },
      title: {
        self: "Who is helping support you right now?",
        mom: "Who is helping support your mom right now?",
        dad: "Who is helping support your dad right now?",
        wife: "Who is helping support your wife right now?",
        husband: "Who is helping support your husband right now?",
        grandma: "Who is helping support your grandma right now?",
        grandpa: "Who is helping support your grandpa right now?",
        friend: "Who is helping support your friend right now?",
        someoneElse: "Who is helping support your loved one right now?",
      },
      subtitle: "This can include family, friends, or professionals.",
      help: {
        title: "Why this matters",
        text: "Understanding how care is being handled today helps reveal whether the current arrangement feels realistic long-term.",
      },
      options: [
        { label: "No one — no help is needed", value: "none", score: 1 },
        { label: "Family or friends occasionally help", value: "occasional", score: 2 },
        { label: "Family, friends, or aides help regularly", value: "regular", score: 3 },
        { label: "A full-time caregiver or care team is helping", value: "fullTime", score: 4 },
      ],
    },

    {
      id: "stress",
      section: "Support System",
      intro: {
        self: "Managing care or support can take a lot emotionally and physically.",
        mom: "Caregiver wellbeing matters too.",
        dad: "Caregiver wellbeing matters too.",
        wife: "Caregiver wellbeing matters too.",
        husband: "Caregiver wellbeing matters too.",
        grandma: "Caregiver wellbeing matters too.",
        grandpa: "Caregiver wellbeing matters too.",
        friend: "Caregiver wellbeing matters too.",
        someoneElse: "Caregiver wellbeing matters too.",
      },
      title: {
        self: "How stressful does the current situation feel?",
        mom: "How stressful does the current care situation feel?",
        dad: "How stressful does the current care situation feel?",
        wife: "How stressful does the current care situation feel?",
        husband: "How stressful does the current care situation feel?",
        grandma: "How stressful does the current care situation feel?",
        grandpa: "How stressful does the current care situation feel?",
        friend: "How stressful does the current care situation feel?",
        someoneElse: "How stressful does the current care situation feel?",
      },
      subtitle: "Think about emotional, physical, or day-to-day strain.",
      help: {
        title: "Why this matters",
        text: "Many families wait until they feel overwhelmed, but stress and burnout are often signs that more support should be explored sooner.",
      },
      options: [
        { label: "It feels manageable", value: "notStressed", score: 1 },
        { label: "It feels a little stressful", value: "mild", score: 2 },
        { label: "It feels pretty stressful", value: "moderate", score: 3 },
        { label: "It feels overwhelming", value: "burnout", score: 4 },
      ],
    },

    {
      id: "sustainability",
      section: "Support System",
      intro: {
        self: "Finally, let’s look at whether the current setup feels realistic long-term.",
        mom: "Finally, let’s look at whether the current arrangement can realistically continue.",
        dad: "Finally, let’s look at whether the current arrangement can realistically continue.",
        wife: "Finally, let’s look at whether the current arrangement can realistically continue.",
        husband:
          "Finally, let’s look at whether the current arrangement can realistically continue.",
        grandma:
          "Finally, let’s look at whether the current arrangement can realistically continue.",
        grandpa:
          "Finally, let’s look at whether the current arrangement can realistically continue.",
        friend:
          "Finally, let’s look at whether the current arrangement can realistically continue.",
        someoneElse:
          "Finally, let’s look at whether the current arrangement can realistically continue.",
      },
      title: {
        self: "Does the current situation feel sustainable long-term?",
        mom: "Does the current care situation feel sustainable long-term?",
        dad: "Does the current care situation feel sustainable long-term?",
        wife: "Does the current care situation feel sustainable long-term?",
        husband: "Does the current care situation feel sustainable long-term?",
        grandma: "Does the current care situation feel sustainable long-term?",
        grandpa: "Does the current care situation feel sustainable long-term?",
        friend: "Does the current care situation feel sustainable long-term?",
        someoneElse:
          "Does the current care situation feel sustainable long-term?",
      },
      subtitle: "Choose the answer that feels most honest.",
      help: {
        title: "Why this matters",
        text: "When care no longer feels sustainable, families often benefit from exploring options before a crisis forces a rushed decision.",
      },
      options: [
        {
          label: "Yes, it feels sustainable",
          value: "fullySustainable",
          score: 1,
        },
        { label: "There are some concerns", value: "someConcerns", score: 2 },
        {
          label: "It probably isn’t sustainable much longer",
          value: "likelyNotSustainable",
          score: 3,
        },
        {
          label: "No, it does not feel sustainable",
          value: "notSustainable",
          score: 4,
        },
      ],
    },

    {
      id: "openness",
      section: "Next Steps",
      intro: {
        self: "One last question.",
        mom: "One last question.",
        dad: "One last question.",
        wife: "One last question.",
        husband: "One last question.",
        grandma: "One last question.",
        grandpa: "One last question.",
        friend: "One last question.",
        someoneElse: "One last question.",
      },
      title: {
        self: "How open are you to the idea of getting more support or considering senior living?",
        mom: "How open does your mom seem to the idea of senior living?",
        dad: "How open does your dad seem to the idea of senior living?",
        wife: "How open does your wife seem to the idea of senior living?",
        husband:
          "How open does your husband seem to the idea of senior living?",
        grandma:
          "How open does your grandma seem to the idea of senior living?",
        grandpa:
          "How open does your grandpa seem to the idea of senior living?",
        friend: "How open does your friend seem to the idea of senior living?",
        someoneElse:
          "How open does your loved one seem to the idea of senior living?",
      },
      subtitle:
        "This helps shape what kind of next step may feel most realistic.",
      help: {
        title: "Why this matters",
        text: "Even when support is needed, emotional readiness can affect how to approach the conversation and what next steps make the most sense.",
      },
      options: [
        { label: "Very open", value: "veryOpen", score: 1 },
        { label: "Somewhat open", value: "somewhatOpen", score: 2 },
        { label: "Resistant", value: "resistant", score: 3 },
        { label: "Strongly opposed", value: "stronglyOpposed", score: 4 },
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
      scoreAnswer(answers.confusion) +
      scoreAnswer(answers.decisionMaking);

    const safetyScore =
      scoreAnswer(answers.falls) +
      scoreAnswer(answers.emergencies) +
      scoreAnswer(answers.homeSafety);

    const dailyLivingScore =
      scoreAnswer(answers.bathing) +
      scoreAnswer(answers.dressing) +
      scoreAnswer(answers.mobility) +
      scoreAnswer(answers.meals) +
      scoreAnswer(answers.medication);

    const supportSystemScore =
      scoreAnswer(answers.caregiver) +
      scoreAnswer(answers.stress) +
      scoreAnswer(answers.sustainability);

    if (memoryScore >= 10) {
      return {
        key: "memory-support",
        title: "It may be time to explore memory support options.",
        description:
          "Your answers suggest that memory and cognitive changes may be playing a meaningful role. Learning about communities with specialized memory support could be a helpful next step.",
        cta: "Explore Memory Support",
      };
    }

    if (
      dailyLivingScore >= 15 ||
      safetyScore >= 10 ||
      supportSystemScore >= 10 ||
      totalScore >= 52
    ) {
      return {
        key: "supportive-care",
        title:
          "It may be time to actively explore supportive senior living options.",
        description:
          "Based on these answers, additional support may be helpful in the near future. Touring communities and comparing care options could be a strong next step.",
        cta: "Talk to a Specialist",
      };
    }

    if (totalScore >= 36) {
      return {
        key: "assisted-living",
        title: "This may be a good time to explore supportive living options.",
        description:
          "Your answers suggest that some support needs are beginning to emerge. Exploring options now may help you make a more confident decision before things feel urgent.",
        cta: "Explore Options",
      };
    }

    if (totalScore >= 22) {
      return {
        key: "planning",
        title: "This looks like a good time to plan ahead.",
        description:
          "Your answers suggest you may not need immediate changes, but this is a smart time to learn about what kinds of support and living options are available.",
        cta: "See Next Steps",
      };
    }

    return {
      key: "keep-exploring",
      title: "You’re in a good place to keep exploring your options.",
      description:
        "Your answers suggest this is a helpful time to gather information, compare possibilities, and think through what kind of future support may fit best.",
      cta: "Keep Exploring",
    };
  },

  defaultResult: {
    title: "You’re in a good place to keep exploring your options.",
    description:
      "Your answers suggest this is a helpful time to gather information, compare possibilities, and think through what kind of future support may fit best.",
    cta: "Keep Exploring",
  },
};