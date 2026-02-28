export const quests = [
  {
    id: "social-media-likes",
    title: "Should Social Media Hide Likes?",
    completed: false,

    reading: {
      text: `Social media platforms use “likes” to show how popular a post is. For many users, likes can be motivating and make them feel valued. Teenagers, in particular, often see likes as a sign of approval from others. Some argue that likes help creators understand what content people enjoy and encourage interaction online.

      However, others believe that likes can cause stress and anxiety. When users compare their number of likes to others, they may feel insecure or pressured to look perfect. Experts also warn that focusing too much on likes can affect self-esteem and mental health, especially among young people. Because of this, some platforms have considered hiding likes to reduce comparison and promote healthier online behavior.`,
    },

    multipleChoice: {
      question: "What is the main idea of the text?",
      options: [
        {
          id: "a",
          text: "Social media likes are only useful for young, famous creators seeking validation.",
        },
        {
          id: "b",
          text: "Likes can motivate users but may also negatively affect mental health.",
        },
        {
          id: "c",
          text: "Teenagers often use social media irresponsibly, leading to risky behaviors.",
        },
        {
          id: "d",
          text: "Social media platforms should be closed to prevent poor online choices.",
        },
      ],
      correctAnswerIndex: 1,
    },

    dragAndDrop: {
      instruction: "Drag and drop each idea into the correct column.",

      items: [
        { text: "Likes can motivate users.", type: "positive" },
        { text: "Users may feel anxious or insecure.", type: "negative" },
        { text: "Likes show what content people enjoy.", type: "positive" },
        { text: "Comparing likes can affect self-esteem.", type: "negative" },
        { text: "Likes encourage interaction.", type: "positive" },
      ],
    },

    inference: {
      question: "Based on the text, what does the text suggest?",
      options: [
        "Likes should never be used on social media.",
        "Social media does not affect people’s mental health.",
        "Some platforms have shown interest in user's mental health.",
        "Teenagers should stop using social media.",
      ],
      correctAnswerIndex: 2,
    },

    speaking: [
      {
        scrambled: [
          "I",
          "think",
          "social media",
          "should",
          "hide",
          "likes",
          "because",
          "they",
          "cause",
          "stress",
        ],
        correctSentence:
          "I think social media should hide likes because they cause stress.",
      },
      {
        scrambled: [
          "In my opinion",
          "likes",
          "are",
          "important",
          "because",
          "they",
          "help",
          "creators",
          "understand",
          "what",
          "people",
          "enjoy",
        ],
        correctSentence:
          "In my opinion, likes are important because they help creators understand what people enjoy.",
      },
      {
        scrambled: [
          "I",
          "believe",
          "focusing",
          "too much",
          "on",
          "likes",
          "can",
          "affect",
          "self-esteem",
        ],
        correctSentence:
          "I believe focusing too much on likes can affect self-esteem.",
      },
    ],
  },

  {
    id: "phones-in-class",
    title: "Should Phones Be Allowed in Class?",
    completed: true,

    reading: {
      text: `Smartphones are part of students’ daily lives, and many bring them to school every day. Some teachers believe phones can be useful in class because students can research information, use educational apps, or take pictures of notes. Phones can also help students communicate in emergencies.

      However, many teachers worry that phones can be a distraction. Students might use social media, play games, or cheat on exams using their phones. With the rise of artificial intelligence tools, some fear that students could misuse these technologies to complete assignments dishonestly. Because of these concerns, schools have different policies on phone usage, and there is ongoing debate about whether phones should be allowed in class.`,
    },

    multipleChoice: {
      question: "What is the main idea of the text?",
      options: [
        {
          id: "a",
          text: "Smartphones are only useful for emergencies at school.",
        },
        {
          id: "b",
          text: "Smartphones help students use artificial intelligence in class.",
        },
        { id: "c", text: "Smartphones have advantages and disadvantages." },
        { id: "d", text: "All schools should completely ban phones." },
      ],
      correctAnswerIndex: 2,
    },

    dragAndDrop: {
      instruction: "Drag and drop each idea into the correct column.",

      items: [
        { text: "Students can look for information.", type: "positive" },
        {
          text: "Phones can assist students in communicating during emergencies.",
          type: "positive",
        },
        {
          text: "Students get distracted by social media.",
          type: "negative",
        },
        {
          text: "Phones can be used to cheat in exams.",
          type: "negative",
        },
        {
          text: "AI tools can be misused.",
          type: "negative",
        },
        {
          text: "Students can use educational apps.",
          type: "positive",
        },
      ],
    },

    inference: {
      question: "Based on the text, what does the text suggest?",
      options: [
        "Schools are not prepared to deal with artificial intelligence.",
        "There is disagreement among schools regarding policies on phone usage.",
        "Artificial intelligence should be completely banned from education.",
        "Students use phones only for social media during class.",
      ],
      correctAnswerIndex: 1,
    },

    speaking: [
      {
        scrambled: [
          "I",
          "think",
          "phones",
          "should",
          "be",
          "allowed",
          "in class",
          "because",
          "they",
          "help",
          "students",
          "research",
          "information",
        ],
        correctSentence:
          "I think phones should be allowed in class because they help students research information.",
      },
      {
        scrambled: [
          "In my opinion",
          "phones",
          "are",
          "a",
          "distraction",
          "because",
          "students",
          "use",
          "social media",
          "in class",
        ],
        correctSentence:
          "In my opinion, phones are a distraction because students use social media in class.",
      },
      {
        scrambled: [
          "I",
          "believe",
          "phones",
          "make",
          "cheating",
          "easier",
          "especially",
          "with",
          "artificial intelligence",
        ],
        correctSentence:
          "I believe phones make cheating easier, especially with artificial intelligence.",
      },
    ],
  },
];
