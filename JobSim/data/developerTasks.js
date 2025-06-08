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
  },
  {
    id: 'arrange-1',
    type: 'arrange',
    title: 'Arrange: Find the maximum in array',
    difficulty: 2,
    lines: [
      'function findMax(arr) {',
      '  let max = arr[0];',
      '  for (let i = 1; i < arr.length; i++) {',
      '    if (arr[i] > max) {',
      '      max = arr[i];',
      '    }',
      '  }',
      '  return max;',
      '}',
    ],
    shuffled: [
      '  return max;',
      '  for (let i = 1; i < arr.length; i++) {',
      '  let max = arr[0];',
      '    if (arr[i] > max) {',
      '      max = arr[i];',
      '    }',
      'function findMax(arr) {',
      '}',
    ],
    lineNumbers: [6, 2, 1, 3, 4, 5, 0, 7, 8] // vrstni red vrstic v 'shuffled', ki bi moral biti za pravilen vrstni red
  },
  {
    id: 'arrange-2',
    type: 'arrange',
    title: 'Arrange: Reverse a string',
    difficulty: 2,
    lines: [
      'function reverseString(str) {',
      '  let reversed = "";',
      '  for (let i = str.length - 1; i >= 0; i--) {',
      '    reversed += str[i];',
      '  }',
      '  return reversed;',
      '}',
    ],
    shuffled: [
      '  for (let i = str.length - 1; i >= 0; i--) {',
      '  return reversed;',
      '  let reversed = "";',
      '    reversed += str[i];',
      '  }',
      'function reverseString(str) {',
      '}',
    ],
    lineNumbers: [2, 5, 1, 3, 4, 0, 6]
  },
  {
    id: 'arrange-3',
    type: 'arrange',
    title: 'Arrange: Check for palindrome',
    difficulty: 3,
    lines: [
      'function isPalindrome(str) {',
      '  let left = 0;',
      '  let right = str.length - 1;',
      '  while (left < right) {',
      '    if (str[left] !== str[right]) {',
      '      return false;',
      '    }',
      '    left++;',
      '    right--;',
      '  }',
      '  return true;',
      '}',
    ],
    shuffled: [
      '  let right = str.length - 1;',
      '  while (left < right) {',
      '    if (str[left] !== str[right]) {',
      '      return false;',
      '    }',
      '    left++;',
      '    right--;',
      '  }',
      '  return true;',
      'function isPalindrome(str) {',
      '  let left = 0;',
      '}',
    ],
    lineNumbers: [2, 3, 4, 5, 6, 7, 8, 9, 10, 0, 1, 11]
  },
  {
    id: 'arrange-4',
    type: 'arrange',
    title: 'Arrange: Sum all even numbers',
    difficulty: 2,
    lines: [
      'function sumEvens(arr) {',
      '  let sum = 0;',
      '  for (let n of arr) {',
      '    if (n % 2 === 0) {',
      '      sum += n;',
      '    }',
      '  }',
      '  return sum;',
      '}',
    ],
    shuffled: [
      '  let sum = 0;',
      '  for (let n of arr) {',
      '    if (n % 2 === 0) {',
      '      sum += n;',
      '    }',
      '  }',
      '  return sum;',
      'function sumEvens(arr) {',
      '}',
    ],
    lineNumbers: [1, 2, 3, 4, 5, 6, 7, 0, 8]
  },
  {
    id: 'arrange-5',
    type: 'arrange',
    title: 'Arrange: Print Fibonacci sequence',
    difficulty: 3,
    lines: [
      'function printFibonacci(n) {',
      '  let a = 0, b = 1;',
      '  for (let i = 0; i < n; i++) {',
      '    console.log(a);',
      '    let next = a + b;',
      '    a = b;',
      '    b = next;',
      '  }',
      '}',
    ],
    shuffled: [
      '  let a = 0, b = 1;',
      '  for (let i = 0; i < n; i++) {',
      '    console.log(a);',
      '    let next = a + b;',
      '    a = b;',
      '    b = next;',
      '  }',
      'function printFibonacci(n) {',
      '}',
    ],
    lineNumbers: [1, 2, 3, 4, 5, 6, 7, 0, 8]
  },
  {
    id: 'arrange-6',
    type: 'arrange',
    title: 'Arrange: Filter positive numbers',
    difficulty: 2,
    lines: [
      'function filterPositives(arr) {',
      '  let result = [];',
      '  for (let n of arr) {',
      '    if (n > 0) {',
      '      result.push(n);',
      '    }',
      '  }',
      '  return result;',
      '}',
    ],
    shuffled: [
      '  let result = [];',
      '  for (let n of arr) {',
      '    if (n > 0) {',
      '      result.push(n);',
      '    }',
      '  }',
      '  return result;',
      'function filterPositives(arr) {',
      '}',
    ],
    lineNumbers: [1, 2, 3, 4, 5, 6, 7, 0, 8]
  },
  // --- ADDITIONAL GENERAL KNOWLEDGE TASKS ---
  {
    id: 'choose-1',
    type: 'multiple-choice',
    category: 'general-knowledge',
    title: 'Choose the correct variable declaration',
    difficulty: 1,
    question: 'Which is the correct way to declare a constant in JavaScript?',
    options: ['let x = 5;', 'const x = 5;', 'var x = 5;', 'constant x = 5;'],
    correctIndex: 1
  },
  {
    id: 'choose-2',
    type: 'multiple-choice',
    category: 'general-knowledge',
    title: 'Choose the correct function call',
    difficulty: 1,
    question: 'How do you call a function named greet?',
    options: ['call greet();', 'greet();', 'greet;', 'call(greet);'],
    correctIndex: 1
  },
  {
    id: 'choose-3',
    type: 'multiple-choice',
    category: 'general-knowledge',
    title: 'Choose the correct array syntax',
    difficulty: 1,
    question: 'How do you create an array of numbers?',
    options: ['let arr = [1,2,3];', 'let arr = (1,2,3);', 'let arr = {1,2,3};', 'let arr = <1,2,3>;'],
    correctIndex: 0
  },
  {
    id: 'choose-4',
    type: 'multiple-choice',
    category: 'general-knowledge',
    title: 'Choose the correct comparison',
    difficulty: 1,
    question: 'Which checks if a is equal to b (value and type)?',
    options: ['a == b', 'a = b', 'a === b', 'a != b'],
    correctIndex: 2
  },
  {
    id: 'choose-5',
    type: 'multiple-choice',
    category: 'general-knowledge',
    title: 'Choose the correct loop',
    difficulty: 1,
    question: 'Which is a valid for loop?',
    options: ['for (let i = 0; i < 5; i++) {}', 'for i = 0 to 5 {}', 'for (i < 5; i++) {}', 'for (let i = 0; i < 5) {}'],
    correctIndex: 0
  },
  {
    id: 'choose-6',
    type: 'multiple-choice',
    category: 'general-knowledge',
    title: 'Choose the correct string concatenation',
    difficulty: 1,
    question: 'How do you concatenate two strings a and b?',
    options: ['a + b', 'a . b', 'a & b', 'a, b'],
    correctIndex: 0
  },
  {
    id: 'choose-7',
    type: 'multiple-choice',
    category: 'general-knowledge',
    title: 'Choose the correct if statement',
    difficulty: 1,
    question: 'Which is a valid if statement?',
    options: ['if x > 5 then {}', 'if (x > 5) {}', 'if x > 5: {}', 'if (x > 5): {}'],
    correctIndex: 1
  },
  {
    id: 'choose-8',
    type: 'multiple-choice',
    category: 'general-knowledge',
    title: 'Choose the correct object syntax',
    difficulty: 1,
    question: 'How do you define an object with a property name?',
    options: ['let obj = {name: "Ana"};', 'let obj = (name: "Ana");', 'let obj = [name: "Ana"];', 'let obj = <name: "Ana">;'],
    correctIndex: 0
  },
  {
    id: 'choose-9',
    type: 'multiple-choice',
    category: 'general-knowledge',
    title: 'Choose the correct return statement',
    difficulty: 1,
    question: 'How do you return a value from a function?',
    options: ['return value;', 'give value;', 'output value;', 'send value;'],
    correctIndex: 0
  },
  {
    id: 'choose-10',
    type: 'multiple-choice',
    category: 'general-knowledge',
    title: 'Choose the correct increment',
    difficulty: 1,
    question: 'How do you increment variable x by 1?',
    options: ['x++;', 'x =+ 1;', 'x = x++;', 'x + 1 = x;'],
    correctIndex: 0
  },
  // --- ADDITIONAL FILL IN THE BLANKS TASKS ---
  {
    id: 'fill-1',
    type: 'fill-in-the-blank',
    title: 'Fill in the blank: variable declaration',
    difficulty: 1,
    question: 'let ___ = 10;',
    options: ['x', 'let', '10', 'const'],
    correctIndex: 0
  },
  {
    id: 'fill-2',
    type: 'fill-in-the-blank',
    title: 'Fill in the blank: function keyword',
    difficulty: 1,
    question: '___ greet() { return "Hi"; }',
    options: ['function', 'def', 'fun', 'method'],
    correctIndex: 0
  },
  {
    id: 'fill-3',
    type: 'fill-in-the-blank',
    title: 'Fill in the blank: array access',
    difficulty: 1,
    question: 'let first = arr[___];',
    options: ['0', '1', 'first', 'arr'],
    correctIndex: 0
  },
  {
    id: 'fill-4',
    type: 'fill-in-the-blank',
    title: 'Fill in the blank: string length',
    difficulty: 1,
    question: 'let len = str.___;',
    options: ['length', 'size', 'count', 'len'],
    correctIndex: 0
  },
  {
    id: 'fill-5',
    type: 'fill-in-the-blank',
    title: 'Fill in the blank: for loop',
    difficulty: 1,
    question: 'for (let i = 0; i < ___; i++) {}',
    options: ['10', 'i', 'arr', '0'],
    correctIndex: 0
  },
  {
    id: 'fill-6',
    type: 'fill-in-the-blank',
    title: 'Fill in the blank: return value',
    difficulty: 1,
    question: 'function f() { ___ 5; }',
    options: ['return', 'output', 'print', 'yield'],
    correctIndex: 0
  },
  {
    id: 'fill-7',
    type: 'fill-in-the-blank',
    title: 'Fill in the blank: object property',
    difficulty: 1,
    question: 'let name = user.___;',
    options: ['name', 'user', 'get', 'set'],
    correctIndex: 0
  },
  {
    id: 'fill-8',
    type: 'fill-in-the-blank',
    title: 'Fill in the blank: function argument',
    difficulty: 1,
    question: 'function double(___) { return x * 2; }',
    options: ['x', 'double', '2', 'return'],
    correctIndex: 0
  },
  {
    id: 'fill-9',
    type: 'fill-in-the-blank',
    title: 'Fill in the blank: comparison',
    difficulty: 1,
    question: 'if (a ___ b) { ... }',
    options: ['===', '=', '=>', '<='],
    correctIndex: 0
  },
  {
    id: 'fill-10',
    type: 'fill-in-the-blank',
    title: 'Fill in the blank: array push',
    difficulty: 1,
    question: 'arr.___(5);',
    options: ['push', 'add', 'append', 'insert'],
    correctIndex: 0
  },
  // --- ADDITIONAL FILL IN THE BLANKS TASKS (NEW) ---
  {
    id: 'fill-11',
    type: 'fill-in-the-blank',
    title: 'Fill in the blank: Math max',
    difficulty: 1,
    question: 'let max = Math.___(a, b);',
    options: ['max', 'maximum', 'bigger', 'largest'],
    correctIndex: 0
  },
  {
    id: 'fill-12',
    type: 'fill-in-the-blank',
    title: 'Fill in the blank: Array length',
    difficulty: 1,
    question: 'let n = arr.___;',
    options: ['length', 'size', 'count', 'number'],
    correctIndex: 0
  },
  {
    id: 'fill-13',
    type: 'fill-in-the-blank',
    title: 'Fill in the blank: Console log',
    difficulty: 1,
    question: 'console.___("Hello");',
    options: ['log', 'print', 'output', 'show'],
    correctIndex: 0
  },
  {
    id: 'fill-14',
    type: 'fill-in-the-blank',
    title: 'Fill in the blank: Array push',
    difficulty: 1,
    question: 'arr.___(x);',
    options: ['push', 'add', 'insert', 'append'],
    correctIndex: 0
  },
  {
    id: 'fill-15',
    type: 'fill-in-the-blank',
    title: 'Fill in the blank: String to uppercase',
    difficulty: 1,
    question: 'let big = str.___();',
    options: ['toUpperCase', 'upper', 'capitalize', 'toCaps'],
    correctIndex: 0
  },
  {
    id: 'fill-16',
    type: 'fill-in-the-blank',
    title: 'Fill in the blank: Parse integer',
    difficulty: 1,
    question: 'let n = parse___("42");',
    options: ['Int', 'int', 'Number', 'Float'],
    correctIndex: 0
  },
  {
    id: 'fill-17',
    type: 'fill-in-the-blank',
    title: 'Fill in the blank: Array includes',
    difficulty: 1,
    question: 'arr.___(5); // true if 5 in arr',
    options: ['includes', 'has', 'contains', 'in'],
    correctIndex: 0
  },
  {
    id: 'fill-18',
    type: 'fill-in-the-blank',
    title: 'Fill in the blank: String replace',
    difficulty: 1,
    question: 'let newStr = str.___("a", "b");',
    options: ['replace', 'substitute', 'switch', 'swap'],
    correctIndex: 0
  },
  {
    id: 'fill-19',
    type: 'fill-in-the-blank',
    title: 'Fill in the blank: Array map',
    difficulty: 1,
    question: 'let doubled = arr.___(x => x * 2);',
    options: ['map', 'forEach', 'filter', 'reduce'],
    correctIndex: 0
  },
  {
    id: 'output-1',
    type: 'output',
    title: 'Predict Output: Variable Scope',
    difficulty: 1,
    question: `var x = 1;\nif (true) {\n  var x = 2;\n}\nconsole.log(x);`,
    expectedOutput: '2',
    options: ['1', '2', 'undefined', 'error'],
    correctIndex: 1
  },
  {
    id: 'output-2',
    type: 'output',
    title: 'Predict Output: Simple Addition',
    difficulty: 1,
    question: 'let a = 2;\nlet b = 3;\nconsole.log(a + b);',
    expectedOutput: '5',
    options: ['5', '23', 'undefined', '2+3'],
    correctIndex: 0
  },
  {
    id: 'output-3',
    type: 'output',
    title: 'Predict Output: String Concatenation',
    difficulty: 1,
    question: 'let a = "2";\nlet b = 3;\nconsole.log(a + b);',
    expectedOutput: '23',
    options: ['5', '23', 'undefined', '2+3'],
    correctIndex: 1
  },
  {
    id: 'output-4',
    type: 'output',
    title: 'Predict Output: Array Length',
    difficulty: 1,
    question: 'let arr = [1,2,3,4];\nconsole.log(arr.length);',
    expectedOutput: '4',
    options: ['3', '4', 'undefined', '1'],
    correctIndex: 1
  },
  {
    id: 'output-5',
    type: 'output',
    title: 'Predict Output: Boolean Comparison',
    difficulty: 1,
    question: 'console.log(2 == "2");',
    expectedOutput: 'true',
    options: ['true', 'false', 'undefined', 'error'],
    correctIndex: 0
  },
  {
    id: 'output-6',
    type: 'output',
    title: 'Predict Output: Strict Comparison',
    difficulty: 2,
    question: 'console.log(2 === "2");',
    expectedOutput: 'false',
    options: ['true', 'false', 'undefined', 'error'],
    correctIndex: 1
  },
  {
    id: 'output-7',
    type: 'output',
    title: 'Predict Output: Undefined Variable',
    difficulty: 2,
    question: 'let x;\nconsole.log(x);',
    expectedOutput: 'undefined',
    options: ['0', 'null', 'undefined', 'error'],
    correctIndex: 2
  },
  {
    id: 'output-8',
    type: 'output',
    title: 'Predict Output: Function Return',
    difficulty: 2,
    question: 'function f() { return 7; }\nconsole.log(f());',
    expectedOutput: '7',
    options: ['undefined', 'null', '7', 'f'],
    correctIndex: 2
  },
  {
    id: 'output-9',
    type: 'output',
    title: 'Predict Output: Array Map',
    difficulty: 2,
    question: 'let arr = [1,2,3];\nconsole.log(arr.map(x => x * 2));',
    expectedOutput: '[2, 4, 6]',
    options: ['[2, 4, 6]', '[1, 2, 3]', '[1, 4, 9]', 'undefined'],
    correctIndex: 0
  },
  {
    id: 'output-10',
    type: 'output',
    title: 'Predict Output: forEach Return',
    difficulty: 2,
    question: 'let arr = [1,2,3];\nconsole.log(arr.forEach(x => x * 2));',
    expectedOutput: 'undefined',
    options: ['[2, 4, 6]', 'undefined', '[1, 2, 3]', 'error'],
    correctIndex: 1
  },
  {
    id: 'output-11',
    type: 'output',
    title: 'Predict Output: typeof null',
    difficulty: 3,
    question: 'console.log(typeof null);',
    expectedOutput: 'object',
    options: ['null', 'object', 'undefined', 'string'],
    correctIndex: 1
  },
  {
    id: 'output-12',
    type: 'output',
    title: 'Predict Output: NaN Comparison',
    difficulty: 3,
    question: 'console.log(NaN === NaN);',
    expectedOutput: 'false',
    options: ['true', 'false', 'undefined', 'error'],
    correctIndex: 1
  },
];
