const chef = {
    title: 'Chef',
    description: 'As a chef, you’ll need to master recipes, manage time, and avoid culinary disasters! Test your knowledge of cooking techniques and kitchen safety.',
    requirements: [
      'Basic cooking skills',
      'Knowledge of recipes and ingredients',
      'Attention to detail',
      'Good memory and multitasking',
      'Time management under pressure',
    ],
    quizQuestions: [
      {
        question: 'What is the correct internal temperature for cooked chicken?',
        options: ['65°C', '75°C', '85°C', '95°C'],
        correctIndex: 1, // 75°C
      },
      {
        question: 'Which herb is commonly used in pesto?',
        options: ['Parsley', 'Cilantro', 'Basil', 'Rosemary'],
        correctIndex: 2, // Basil
      },
      {
        question: 'What is the main ingredient in a roux?',
        options: ['Butter and flour', 'Egg and milk', 'Sugar and butter', 'Olive oil and garlic'],
        correctIndex: 0, // Butter and flour
      },
      {
        question: 'Which knife is used for chopping vegetables?',
        options: ['Paring knife', 'Chef’s knife', 'Bread knife', 'Boning knife'],
        correctIndex: 1, // Chef’s knife
      },
      {
        question: 'How long should pasta be cooked "al dente"?',
        options: ['10-12 min', '6-8 min', '3-4 min', '15-20 min'],
        correctIndex: 1, // 6-8 min
      },
      {
        question: 'Which type of rice is used for sushi?',
        options: ['Basmati', 'Arborio', 'Jasmine', 'Short-grain'],
        correctIndex: 3, // Short-grain
      },
      {
        question: 'What is the French term for "put in place"?',
        options: ['Mise en place', 'Bonjour', 'Chef de partie', 'À la carte'],
        correctIndex: 0, // Mise en place
      },
      {
        question: 'Which of these is a thickening agent?',
        options: ['Salt', 'Cornstarch', 'Baking soda', 'Olive oil'],
        correctIndex: 1, // Cornstarch
      },
      {
        question: 'Which oil has the highest smoke point?',
        options: ['Olive oil', 'Butter', 'Avocado oil', 'Sesame oil'],
        correctIndex: 2, // Avocado oil
      },
      {
        question: 'Which is the safest way to defrost meat?',
        options: ['Room temperature', 'Microwave', 'Refrigerator', 'Hot water'],
        correctIndex: 2, // Refrigerator
      },
    ],
  };
  
  export default chef;