export const developerTasks = [
  {
    id: '1',
    type: 'multiple-choice',
    title: 'Fix variable scope',
    difficulty: 1,
    question: `function greet() {\n  if (true) {\n    var message = "Hello";\n  }\n  console.log(message);\n}`,
    options: [
      `let message = "Hello";`,
      `const message = "Hello";`,
      `var message = "Hello";`, // ✅ correct
      `message := "Hello";`
    ],
    correctIndex: 2
  },
  {
    id: '2',
    type: 'multiple-choice',
    title: 'Fix return type',
    difficulty: 1,
    question: `function add(a, b) {\n  console.log(a + b);\n}`,
    options: [
      `return a + b;`, // ✅ correct
      `console.log(a * b);`,
      `a - b;`,
      `return;`
    ],
    correctIndex: 0
  },
  {
    id: '3',
    type: 'multiple-choice',
    title: 'Fix infinite loop',
    difficulty: 2,
    question: `let i = 0;\nwhile (i < 10) {\n  console.log(i);\n}`,
    options: [
      `i++;`, // ✅ correct
      `console.log(i);`,
      `i = 0;`,
      `break;`
    ],
    correctIndex: 0
  },
  {
    id: '4',
    type: 'multiple-choice',
    title: 'Fix undefined error',
    difficulty: 2,
    question: `function printName(user) {\n  console.log(user.name);\n}\nprintName();`,
    options: [
      `printName({ name: "Ana" });`, // ✅ correct
      `user.name = "Ana";`,
      `console.log("Ana");`,
      `printName("Ana");`
    ],
    correctIndex: 0
  },
  {
    id: '5',
    type: 'multiple-choice',
    title: 'Fix array access',
    difficulty: 1,
    question: `const arr = [1, 2, 3];\nconsole.log(arr[3]);`,
    options: [
      `console.log(arr[2]);`, // ✅ correct
      `console.log(arr[4]);`,
      `console.log(arr[-1]);`,
      `console.log(arr);`
    ],
    correctIndex: 0
  },
  {
    id: '6',
    type: 'multiple-choice',
    title: 'Fix object mutation',
    difficulty: 2,
    question: `const user = { name: "Luka" };\nuser = { name: "Ana" };`,
    options: [
      `user.name = "Ana";`, // ✅ correct
      `const user = "Ana";`,
      `let user = "Ana";`,
      `delete user;`
    ],
    correctIndex: 0
  },
  {
    id: '7',
    type: 'multiple-choice',
    title: 'Fix async issue',
    difficulty: 3,
    question: `function fetchData() {\n  const data = fetch("api/data");\n  console.log(data);\n}`,
    options: [
      `fetch("api/data").then(res => res.json()).then(data => console.log(data));`, // ✅ correct
      `const data = "api/data";`,
      `console.log("data");`,
      `return null;`
    ],
    correctIndex: 0
  },
  {
    id: '8',
    type: 'multiple-choice',
    title: 'Fix missing dependency',
    difficulty: 3,
    question: `useEffect(() => {\n  console.log(count);\n});`,
    options: [
      `useEffect(() => { console.log(count); }, [count]);`, // ✅ correct
      `useEffect(count);`,
      `console.log(count);`,
      `useEffect();`
    ],
    correctIndex: 0
  },
  {
    id: '9',
    type: 'multiple-choice',
    title: 'Fix state update',
    difficulty: 2,
    question: `const [count, setCount] = useState(0);\nsetCount = 5;`,
    options: [
      `setCount(5);`, // ✅ correct
      `count = 5;`,
      `let count = 5;`,
      `const setCount = 5;`
    ],
    correctIndex: 0
  },
  {
    id: '10',
    type: 'multiple-choice',
    title: 'Fix missing import',
    difficulty: 2,
    question: `console.log(moment().format());`,
    options: [
      `import moment from 'moment';`, // ✅ correct
      `import moment();`,
      `console.log(moment);`,
      `require('moment')();`
    ],
    correctIndex: 0
  },
  {
    id: '11',
    type: 'completion',
    title: 'Complete the loop condition',
    difficulty: 1,
    question: `for (let i = 0; ___; i++) {\n  console.log(i);\n}`,
    options: ['i < 5', 'i = 5', 'i == 5', 'i > 5'],
    correctIndex: 0
  },
  {
    id: '12',
    type: 'arrange',
    title: 'Arrange lines to define a function',
    difficulty: 2,
    lines: [
      'function greet(name) {',
      '  return "Hello, " + name;',
      '}'
    ],
    shuffled: [
      '  return "Hello, " + name;',
      '}',
      'function greet(name) {'
    ]
  },
  {
    id: '13',
    type: 'output',
    title: 'Expected vs Actual Output',
    difficulty: 2,
    question: `const nums = [1, 2, 3];\nconsole.log(nums.map(x => x * 2));`,
    expectedOutput: '[2, 4, 6]',
    options: ['[1, 2, 3]', '[2, 4, 6]', '[1, 4, 9]', 'undefined'],
    correctIndex: 1
  }
];
