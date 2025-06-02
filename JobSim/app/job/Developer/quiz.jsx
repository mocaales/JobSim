import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '../../../constants/Colors';
import { useUser } from '@clerk/clerk-expo';

const questions = [
  {
    question: 'What is the difference between == and === in JavaScript?',
    options: [
      '== checks only value, === checks value and type',
      '== checks value and type, === checks only value',
      'Both are identical',
      'Neither performs type conversion'
    ],
    correctIndex: 0
  },
  {
    question: 'What is a closure in JavaScript?',
    options: [
      'A function combined with its lexical environment',
      'A method to close database connections',
      'A CSS property',
      'A type of promise'
    ],
    correctIndex: 0
  },
  {
    question: 'Describe how the JavaScript event loop works.',
    options: [
      'It handles asynchronous callbacks via task and microtask queues',
      'It loops through events only once',
      'It is part of the CSS parsing engine',
      'It manages database transactions'
    ],
    correctIndex: 0
  },
  {
    question: 'What does the typeof operator return for arrays?',
    options: [
      'object',
      'array',
      'undefined',
      'list'
    ],
    correctIndex: 0
  },
  {
    question: 'Explain scope in JavaScript.',
    options: [
      'Visibility of variables: global, function, block',
      'A way to compare two values',
      'A security mechanism',
      'A loop construct'
    ],
    correctIndex: 0
  },
  {
    question: 'How do you create a promise?',
    options: [
      'new Promise((resolve, reject) => { })',
      'Promise.create()',
      'async function',
      'setTimeout()'
    ],
    correctIndex: 0
  },
  {
    question: 'What is the difference between var, let, and const?',
    options: [
      'var = function scope, let/const = block scope, const is immutable',
      'var is block scope, let is function scope',
      'All three are identical',
      'Only const can be redeclared'
    ],
    correctIndex: 0
  },
  {
    question: 'What is a callback function?',
    options: [
      'A function passed into another function to be executed later',
      'A function that cancels events',
      'A loop inside a function',
      'A type of array method'
    ],
    correctIndex: 0
  },
  {
    question: 'What is hoisting in JavaScript?',
    options: [
      'Variables and function declarations are moved to the top of their scope',
      'A method for moving HTML elements',
      'An error handling technique',
      'A security feature'
    ],
    correctIndex: 0
  },
  {
    question: 'What is the difference between null and undefined?',
    options: [
      'null is an assigned value; undefined is uninitialized',
      'undefined is a value, null is a type',
      'Both are the same',
      'Neither is used in JavaScript'
    ],
    correctIndex: 0
  },
  {
    question: 'How do you create a shallow copy of an array?',
    options: [
      'Using slice()',
      'Using for loop',
      'Using Object.assign()',
      'Using JSON.stringify()'
    ],
    correctIndex: 0
  },
  {
    question: 'What does the "this" keyword refer to in a regular function?',
    options: [
      'The object that calls the function',
      'The function itself',
      'The window object',
      'A global variable'
    ],
    correctIndex: 0
  },
  {
    question: 'What is the use of the async/await syntax?',
    options: [
      'To handle asynchronous operations',
      'To define CSS styles',
      'To create promises',
      'To block the event loop'
    ],
    correctIndex: 0
  },
  {
    question: 'What are the different data types in JavaScript?',
    options: [
      'Primitive and non-primitive',
      'String and Number only',
      'Boolean and Undefined only',
      'Object and Array only'
    ],
    correctIndex: 0
  },
  {
    question: 'What is the purpose of the setTimeout() function in JavaScript?',
    options: [
      'To execute a function after a specified delay',
      'To set a timeout for HTTP requests',
      'To pause code execution indefinitely',
      'To create synchronous code'
    ],
    correctIndex: 0
  },
  {
    question: 'How can you check if an array includes a certain value?',
    options: [
      'Using includes() method',
      'Using has() method',
      'Using contains() method',
      'Using exists() method'
    ],
    correctIndex: 0
  },
  {
    question: 'How can you remove duplicates in an array?',
    options: [
      'Using Set and spread operator',
      'Using for loop only',
      'Using filter() without any condition',
      'Using map() method'
    ],
    correctIndex: 0
  },
  {
    question: 'What is the purpose of async and await in JavaScript?',
    options: [
      'To handle asynchronous operations more cleanly',
      'To make code synchronous',
      'To delay code execution',
      'To create infinite loops'
    ],
    correctIndex: 0
  },
  {
    question: 'What is the difference between synchronous and asynchronous functions?',
    options: [
      'Synchronous functions block the execution until the task completes; asynchronous functions do not',
      'Asynchronous functions block the execution; synchronous functions do not',
      'Both block the execution',
      'Neither block the execution'
    ],
    correctIndex: 0
  },
  {
    question: 'What is the use of the isNaN function?',
    options: [
      'To determine whether a value is NaN (Not a Number)',
      'To check if a value is a number',
      'To convert a value to a number',
      'To check if a value is undefined'
    ],
    correctIndex: 0
  },
  {
    question: 'What are "truthy" and "falsy" values in JavaScript?',
    options: [
      'Values that evaluate to true or false in a boolean context',
      'Values that are strictly true or false',
      'Values that are numbers only',
      'Values that are strings only'
    ],
    correctIndex: 0
  },
  {
    question: 'What is the difference between let and const?',
    options: [
      'let allows reassignment; const does not',
      'const allows reassignment; let does not',
      'Both allow reassignment',
      'Neither allows reassignment'
    ],
    correctIndex: 0
  },
  {
    question: 'What is the purpose of the map() method in arrays?',
    options: [
      'To create a new array by applying a function to each element',
      'To filter elements in an array',
      'To reduce the array to a single value',
      'To sort the array'
    ],
    correctIndex: 0
  },
  {
    question: 'What is the purpose of the filter() method in arrays?',
    options: [
      'To create a new array with elements that pass a test',
      'To modify each element in the array',
      'To reduce the array to a single value',
      'To sort the array'
    ],
    correctIndex: 0
  },
  {
    question: 'What is the purpose of the reduce() method in arrays?',
    options: [
      'To apply a function against an accumulator and each element to reduce it to a single value',
      'To filter elements in an array',
      'To map elements to new values',
      'To sort the array'
    ],
    correctIndex: 0
  },
  {
    question: 'What is the difference between forEach() and map()?',
    options: [
      'forEach() executes a function for each element; map() returns a new array',
      'map() executes a function for each element; forEach() returns a new array',
      'Both return new arrays',
      'Both do not return anything'
    ],
    correctIndex: 0
  },
  {
    question: 'What is the purpose of the find() method in arrays?',
    options: [
      'To return the first element that satisfies a condition',
      'To return all elements that satisfy a condition',
      'To return the index of the first element that satisfies a condition',
      'To remove elements that satisfy a condition'
    ],
    correctIndex: 0
  },
  {
    question: 'What is the purpose of the includes() method in arrays?',
    options: [
      'To determine whether an array includes a certain value',
      'To add a new element to the array',
      'To remove an element from the array',
      'To sort the array'
    ],
    correctIndex: 0
  },
  {
    question: 'What is the purpose of the some() method in arrays?',
    options: [
      'To test whether at least one element passes a test',
      'To test whether all elements pass a test',
      'To remove elements that pass a test',
      'To add elements that pass a test'
    ],
    correctIndex: 0
  },
  {
    question: 'What is the purpose of the every() method in arrays?',
    options: [
      'To test whether all elements pass a test',
      'To test whether at least one element passes a test',
      'To remove elements that pass a test',
      'To add elements that pass a test'
    ],
    correctIndex: 0
  },
  {
    question: 'What is the purpose of the sort() method in arrays?',
    options: [
      'To sort the elements of an array in place',
      'To create a new sorted array',
      'To reverse the array',
      'To shuffle the array'
    ],
    correctIndex: 0
  },
  {
    question: 'What is the purpose of the splice() method in arrays?',
    options: [
      'To add/remove elements from an array',
      'To create a new array',
      'To sort the array',
      'To reverse the array'
    ],
    correctIndex: 0
  },
  {
    question: 'What does the push() method do in JavaScript arrays?',
    options: [
      'Adds one or more elements to the end of an array',
      'Removes the last element of an array',
      'Reverses the array',
      'Sorts the array in place'
    ],
    correctIndex: 0
  },
  {
    question: 'What is the difference between Object.freeze() and Object.seal()?',
    options: [
      'freeze prevents adding, removing, and changing properties; seal allows changing but not adding/removing',
      'seal prevents adding properties but allows removal',
      'freeze and seal do the same thing',
      'seal allows changing object prototypes'
    ],
    correctIndex: 0
  },
  {
    question: 'What is the purpose of the Object.assign() method?',
    options: [
      'To copy the values of all properties from one or more source objects to a target object',
      'To delete properties from an object',
      'To create a deep copy of an object',
      'To compare two objects'
    ],
    correctIndex: 0
  },
  {
    question: 'What is JSON?',
    options: [
      'A lightweight data-interchange format',
      'A programming language',
      'A database',
      'A CSS framework'
    ],
    correctIndex: 0
  },
  {
    question: 'What is the default value of uninitialized variables in JavaScript?',
    options: [
      'undefined',
      'null',
      '0',
      'NaN'
    ],
    correctIndex: 0
  },
  {
    question: 'What is event bubbling in JavaScript?',
    options: [
      'When an event propagates from child to parent elements',
      'When an event starts at the top and propagates down',
      'When an event is canceled',
      'When multiple events occur simultaneously'
    ],
    correctIndex: 0
  },
  {
    question: 'How do you stop event propagation in JavaScript?',
    options: [
      'event.stopPropagation()',
      'event.preventDefault()',
      'event.cancelBubble()',
      'event.halt()'
    ],
    correctIndex: 0
  },
  {
    question: 'What is the difference between localStorage and sessionStorage?',
    options: [
      'localStorage persists data with no expiration, sessionStorage expires when the session ends',
      'sessionStorage persists data with no expiration, localStorage expires',
      'Both store data only temporarily',
      'Neither can store data in the browser'
    ],
    correctIndex: 0
  },
  {
    question: 'What is the purpose of the fetch() API?',
    options: [
      'To make HTTP requests',
      'To read local files',
      'To create timers',
      'To log errors'
    ],
    correctIndex: 0
  },
  {
    question: 'What does CORS stand for?',
    options: [
      'Cross-Origin Resource Sharing',
      'Cross-Origin Request System',
      'Client-Only Resource Sharing',
      'Conditional Origin Resource Sharing'
    ],
    correctIndex: 0
  },
  {
    question: 'What is the purpose of the await keyword?',
    options: [
      'To wait for a promise to resolve before continuing',
      'To delay code execution',
      'To create an infinite loop',
      'To catch errors'
    ],
    correctIndex: 0
  },
  {
    question: 'What is the purpose of try...catch in JavaScript?',
    options: [
      'To handle errors gracefully',
      'To execute code repeatedly',
      'To declare variables',
      'To catch events'
    ],
    correctIndex: 0
  },
  {
    question: 'How do you check if a variable is an array?',
    options: [
      'Array.isArray(variable)',
      'typeof variable === "array"',
      'variable instanceof Object',
      'variable.hasOwnProperty("length")'
    ],
    correctIndex: 0
  },
  {
    question: 'What is the use of the call() method?',
    options: [
      'To call a function with a given this value and arguments',
      'To stop a function',
      'To delay a function',
      'To create an event listener'
    ],
    correctIndex: 0
  },
  {
    question: 'What is the difference between call() and apply()?',
    options: [
      'call() passes arguments individually; apply() passes an array of arguments',
      'apply() passes arguments individually; call() passes an array',
      'They do the same thing',
      'Only apply() can set this'
    ],
    correctIndex: 0
  },
  {
    question: 'What does bind() do in JavaScript?',
    options: [
      'Creates a new function with a specified this value and arguments',
      'Stops a function',
      'Delays a function',
      'Creates a deep copy of a function'
    ],
    correctIndex: 0
  },
  {
    question: 'What is the difference between innerHTML and textContent?',
    options: [
      'innerHTML parses HTML; textContent sets plain text',
      'textContent parses HTML; innerHTML sets plain text',
      'Both do the same',
      'Neither can set content'
    ],
    correctIndex: 0
  },
  {
    question: 'What is debouncing in JavaScript?',
    options: [
      'Limiting the rate at which a function is called',
      'Repeating a function call',
      'Cancelling a function',
      'Changing function context'
    ],
    correctIndex: 0
  },
  {
    question: 'What is throttling in JavaScript?',
    options: [
      'Ensuring a function is called at most once in a specified time period',
      'Preventing a function from running',
      'Running a function multiple times',
      'Delaying a function indefinitely'
    ],
    correctIndex: 0
  },
  {
    question: 'What is the purpose of the new keyword in JavaScript?',
    options: [
      'To create an instance of an object',
      'To declare a new variable',
      'To import a module',
      'To define a function'
    ],
    correctIndex: 0
  },
  {
    question: 'What is the difference between shallow copy and deep copy?',
    options: [
      'Shallow copy copies references, deep copy duplicates values',
      'Deep copy copies references, shallow copy duplicates values',
      'Both are the same',
      'Neither copies anything'
    ],
    correctIndex: 0
  },
  {
    question: 'What is the main difference between ES5 and ES6?',
    options: [
      'ES6 introduced let, const, arrow functions, classes, promises',
      'ES5 has more modern features',
      'ES5 supports modules',
      'ES6 removes var keyword'
    ],
    correctIndex: 0
  },
  {
    question: 'What is a promise in JavaScript?',
    options: [
      'An object representing the eventual completion or failure of an asynchronous operation',
      'A synchronous function',
      'A CSS property',
      'A type of loop'
    ],
    correctIndex: 0
  },
{
  question: 'What is a React hook?',
  options: [
    'A special function that lets you use state and lifecycle methods in functional components',
    'A JavaScript loop',
    'A CSS property',
    'A type of promise'
  ],
  correctIndex: 0
},
{
  question: 'Which hook is used to perform side effects in React?',
  options: [
    'useEffect',
    'useState',
    'useContext',
    'useReducer'
  ],
  correctIndex: 0
},
{
  question: 'How do you create a functional component in React?',
  options: [
    'By writing a JavaScript function that returns JSX',
    'By creating a class that extends React.Component',
    'By using a promise',
    'By writing HTML'
  ],
  correctIndex: 0
},
{
  question: 'What does JSX stand for?',
  options: [
    'JavaScript XML',
    'Java Syntax Extension',
    'JSON XML',
    'Java Standard eXtension'
  ],
  correctIndex: 0
},
{
  question: 'Which hook allows you to use state in React functional components?',
  options: [
    'useState',
    'useEffect',
    'useContext',
    'useReducer'
  ],
  correctIndex: 0
},
{
  question: 'What is the purpose of the useContext hook?',
  options: [
    'To access context data in components',
    'To fetch data from APIs',
    'To manage local state',
    'To create a new context'
  ],
  correctIndex: 0
},
{
  question: 'How do you pass props to a React component?',
  options: [
    'By adding attributes to the component tag',
    'By using setProps()',
    'By using the state object',
    'By using context'
  ],
  correctIndex: 0
},
{
  question: 'What is prop drilling in React?',
  options: [
    'Passing props through multiple levels of components',
    'Removing props from components',
    'Adding default props',
    'Creating new props'
  ],
  correctIndex: 0
},
{
  question: 'What is the purpose of React Router?',
  options: [
    'To enable navigation between components',
    'To style components',
    'To handle state',
    'To connect to databases'
  ],
  correctIndex: 0
},
{
  question: 'How do you conditionally render elements in React?',
  options: [
    'Using ternary operators or &&',
    'Using if statements directly in JSX',
    'Using switch cases in JSX',
    'You cannot conditionally render'
  ],
  correctIndex: 0
},
{
  question: 'What is the virtual DOM in React?',
  options: [
    'A lightweight copy of the real DOM',
    'The actual browser DOM',
    'A JavaScript object for routing',
    'A database'
  ],
  correctIndex: 0
},
{
  question: 'What is the key prop used for in React lists?',
  options: [
    'To identify elements uniquely',
    'To set list styles',
    'To pass values',
    'To manage context'
  ],
  correctIndex: 0
},
{
  question: 'How do you handle forms in React?',
  options: [
    'By using controlled components with state',
    'By using uncontrolled components only',
    'By writing HTML forms',
    'By using Redux'
  ],
  correctIndex: 0
},
{
  question: 'Which hook would you use to optimize performance in a component?',
  options: [
    'useMemo',
    'useState',
    'useEffect',
    'useContext'
  ],
  correctIndex: 0
},
{
  question: 'What is the default port for a React development server?',
  options: [
    '3000',
    '8000',
    '5000',
    '8080'
  ],
  correctIndex: 0
},
{
  question: 'What is Node.js?',
  options: [
    'A JavaScript runtime built on Chrome’s V8 engine',
    'A database system',
    'A front-end framework',
    'A CSS framework'
  ],
  correctIndex: 0
},
{
  question: 'Which module is used to create a server in Node.js?',
  options: [
    'http',
    'fs',
    'path',
    'os'
  ],
  correctIndex: 0
},
{
  question: 'What is npm?',
  options: [
    'Node Package Manager',
    'New Programming Module',
    'Network Protocol Module',
    'Node Processing Manager'
  ],
  correctIndex: 0
},
{
  question: 'How do you import modules in Node.js?',
  options: [
    'require() function',
    'import keyword only',
    'include() function',
    'load() function'
  ],
  correctIndex: 0
},
{
  question: 'Which method is used to read files asynchronously in Node.js?',
  options: [
    'fs.readFile()',
    'fs.read()',
    'fs.open()',
    'fs.writeFile()'
  ],
  correctIndex: 0
},
{
  question: 'What is the purpose of the package.json file?',
  options: [
    'To manage project dependencies and metadata',
    'To write JavaScript code',
    'To define CSS rules',
    'To create HTML templates'
  ],
  correctIndex: 0
},
{
  question: 'Which command initializes a new Node.js project?',
  options: [
    'npm init',
    'node init',
    'npx create-app',
    'node start'
  ],
  correctIndex: 0
},
{
  question: 'What is middleware in Express.js?',
  options: [
    'Functions that handle requests before the final handler',
    'HTML templates',
    'CSS frameworks',
    'Database connections'
  ],
  correctIndex: 0
},
{
  question: 'Which command installs a package globally?',
  options: [
    'npm install -g',
    'npm install --save',
    'npm install --dev',
    'npm global add'
  ],
  correctIndex: 0
},
{
  question: 'Which HTTP status code indicates "Not Found"?',
  options: [
    '404',
    '500',
    '200',
    '302'
  ],
  correctIndex: 0
},
{
  question: 'How do you handle errors in asynchronous code in Node.js?',
  options: [
    'Using try/catch with async/await',
    'Using only catch()',
    'Ignoring errors',
    'Using console.log'
  ],
  correctIndex: 0
},
{
  question: 'Which command starts a Node.js application?',
  options: [
    'node app.js',
    'start node',
    'npm run start',
    'npm open'
  ],
  correctIndex: 0
},
{
  question: 'What is the purpose of the express.json() middleware?',
  options: [
    'To parse incoming JSON requests',
    'To create JSON objects',
    'To send JSON responses',
    'To log JSON data'
  ],
  correctIndex: 0
},
{
  question: 'Which database is commonly used with Node.js?',
  options: [
    'MongoDB',
    'PostgreSQL',
    'MySQL',
    'All of the above'
  ],
  correctIndex: 3
}];

export default function DeveloperQuiz() {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  const router = useRouter();

  const [quiz, setQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    const numQuestions = Math.floor(Math.random() * 5) + 8;
    setQuiz(shuffled.slice(0, numQuestions));
  }, []);

  const handleSelect = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === quiz[index].correctIndex) setScore(score + 1);
  };

  const handleNext = () => {
    if (index < quiz.length - 1) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  useEffect(() => {
    if (finished && email) {
      const sendData = async () => {
        try {
          const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/quiz/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email,
              job: 'Junior Developer', 
              score,
              total: quiz.length
            }),
          });
          const data = await response.json();
          console.log('✅ Result saved:', data);
        } catch (err) {
          console.warn('⚠️ Failed to save result:', err);
        }
      };
      sendData();
    }
  }, [finished]);

  if (!quiz.length) return null; 

  const q = quiz[index];

  return (
    <SafeAreaView style={styles.container}>
      {finished ? (
        <View style={styles.center}>
          <Text style={styles.header}>Quiz Completed</Text>
          <Text style={styles.score}>Score: {score} / {quiz.length}</Text>
          <Text style={styles.score}>Percentage: {Math.round((score / quiz.length) * 100)}%</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.button}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.header}>{index + 1}. {q.question}</Text>
          {q.options.map((opt, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.option,
                selected === i && (i === q.correctIndex ? styles.correct : styles.wrong)
              ]}
              onPress={() => handleSelect(i)}
            >
              <Text style={styles.optionText}>{opt}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={handleNext}
            style={[styles.button, { marginTop: 20 }]}
            disabled={selected === null}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
          <Text style={styles.progress}>Question {index + 1} of {quiz.length}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: { flex: 1, padding: 16 },
  header: { fontSize: 20, fontWeight: '600', marginBottom: 12 },
  option: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#eee',
    marginBottom: 10,
  },
  correct: { backgroundColor: '#d4edda' },
  wrong: { backgroundColor: '#f8d7da' },
  button: {
    backgroundColor: COLORS.activeIcon,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: COLORS.white, fontWeight: '600' },
  score: { fontSize: 18, fontWeight: '500', marginBottom: 8 },
  optionText: { fontSize: 16, color: COLORS.black },
  progress: { marginTop: 10, color: COLORS.gray },
});