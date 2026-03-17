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
        { id: "a", text: "Likes should never be used on social media." },
        {
          id: "b",
          text: "Social media does not affect people's mental health.",
        },
        {
          id: "c",
          text: "Some platforms have shown interest in user's mental health.",
        },
        { id: "d", text: "Teenagers should stop using social media." },
      ],
      correctAnswerIndex: 2,
    },

    speaking: [
      {
        words: [
          { id: "s1-w0", word: "I" },
          { id: "s1-w1", word: "think" },
          { id: "s1-w2", word: "social media" },
          { id: "s1-w3", word: "should" },
          { id: "s1-w4", word: "hide" },
          { id: "s1-w5", word: "likes" },
          { id: "s1-w6", word: "because" },
          { id: "s1-w7", word: "they" },
          { id: "s1-w8", word: "cause" },
          { id: "s1-w9", word: "stress" },
        ],
        correctSentence:
          "I think social media should hide likes because they cause stress.",
      },
      {
        words: [
          { id: "s2-w0", word: "In my opinion" },
          { id: "s2-w1", word: "likes" },
          { id: "s2-w2", word: "are" },
          { id: "s2-w3", word: "important" },
          { id: "s2-w4", word: "because" },
          { id: "s2-w5", word: "they" },
          { id: "s2-w6", word: "help" },
          { id: "s2-w7", word: "creators" },
          { id: "s2-w8", word: "understand" },
          { id: "s2-w9", word: "what" },
          { id: "s2-w10", word: "people" },
          { id: "s2-w11", word: "enjoy" },
        ],
        correctSentence:
          "In my opinion, likes are important because they help creators understand what people enjoy.",
      },
      {
        words: [
          { id: "s3-w0", word: "I" },
          { id: "s3-w1", word: "believe" },
          { id: "s3-w2", word: "focusing" },
          { id: "s3-w3", word: "too much" },
          { id: "s3-w4", word: "on" },
          { id: "s3-w5", word: "likes" },
          { id: "s3-w6", word: "can" },
          { id: "s3-w7", word: "affect" },
          { id: "s3-w8", word: "self-esteem" },
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
        {
          id: "a",
          text: "Schools are not prepared to deal with artificial intelligence.",
        },
        {
          id: "b",
          text: "There is disagreement among schools regarding policies on phone usage.",
        },
        {
          id: "c",
          text: "Artificial intelligence should be completely banned from education.",
        },
        {
          id: "d",
          text: "Students use phones only for social media during class.",
        },
      ],
      correctAnswerIndex: 1,
    },

    speaking: [
      {
        words: [
          { id: "p1-w0", word: "I" },
          { id: "p1-w1", word: "think" },
          { id: "p1-w2", word: "phones" },
          { id: "p1-w3", word: "should" },
          { id: "p1-w4", word: "be" },
          { id: "p1-w5", word: "allowed" },
          { id: "p1-w6", word: "in class" },
          { id: "p1-w7", word: "because" },
          { id: "p1-w8", word: "they" },
          { id: "p1-w9", word: "help" },
          { id: "p1-w10", word: "students" },
          { id: "p1-w11", word: "research" },
          { id: "p1-w12", word: "information" },
        ],
        correctSentence:
          "I think phones should be allowed in class because they help students research information.",
      },
      {
        words: [
          { id: "p2-w0", word: "In my opinion" },
          { id: "p2-w1", word: "phones" },
          { id: "p2-w2", word: "are" },
          { id: "p2-w3", word: "a" },
          { id: "p2-w4", word: "distraction" },
          { id: "p2-w5", word: "because" },
          { id: "p2-w6", word: "students" },
          { id: "p2-w7", word: "use" },
          { id: "p2-w8", word: "social media" },
          { id: "p2-w9", word: "in class" },
        ],
        correctSentence:
          "In my opinion, phones are a distraction because students use social media in class.",
      },
      {
        words: [
          { id: "p3-w0", word: "I" },
          { id: "p3-w1", word: "believe" },
          { id: "p3-w2", word: "phones" },
          { id: "p3-w3", word: "make" },
          { id: "p3-w4", word: "cheating" },
          { id: "p3-w5", word: "easier" },
          { id: "p3-w6", word: "especially" },
          { id: "p3-w7", word: "with" },
          { id: "p3-w8", word: "artificial intelligence" },
        ],
        correctSentence:
          "I believe phones make cheating easier, especially with artificial intelligence.",
      },
    ],
  },
];
