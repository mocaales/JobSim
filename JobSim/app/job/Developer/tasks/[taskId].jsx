import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { COLORS } from '../../../../constants/Colors';

const tasks = [
  {
    id: '1',
    title: 'Fix variable scope',
    difficulty: 1,
    question: `function greet() {
  if (true) {
    var message = "Hello";
  }
  console.log(message);
}`,
    options: [
      `let message = "Hello";`,
      `const message = "Hello";`,
      `var message = "Hello";`, // Correct
      `message := "Hello";`
    ],
    correctIndex: 2
  },
  {
    id: '2',
    title: 'Fix return type',
    difficulty: 1,
    question: `function add(a, b) {
  console.log(a + b);
}`,
    options: [
      `return a + b;`, // Correct
      `console.log(a * b);`,
      `a - b;`,
      `return;`
    ],
    correctIndex: 0
  },
  {
    id: '3',
    title: 'Fix infinite loop',
    difficulty: 2,
    question: `let i = 0;
while (i < 10) {
  // Missing increment
  console.log(i);
}`,
    options: [
      `i++;`, // Correct
      `console.log(i);`,
      `i = 0;`,
      `break;`
    ],
    correctIndex: 0
  },
  {
    id: '4',
    title: 'Fix undefined error',
    difficulty: 2,
    question: `function printName(user) {
  console.log(user.name);
}
printName();`,
    options: [
      `printName({ name: "Ana" });`, // Correct
      `user.name = "Ana";`,
      `console.log("Ana");`,
      `printName("Ana");`
    ],
    correctIndex: 0
  },
  {
    id: '5',
    title: 'Fix array access',
    difficulty: 1,
    question: `const arr = [1, 2, 3];
console.log(arr[3]);`,
    options: [
      `console.log(arr[2]);`, // Correct
      `console.log(arr[4]);`,
      `console.log(arr[-1]);`,
      `console.log(arr);`
    ],
    correctIndex: 0
  },
  {
    id: '6',
    title: 'Fix object mutation',
    difficulty: 2,
    question: `const user = { name: "Luka" };
user = { name: "Ana" };`,
    options: [
      `user.name = "Ana";`, // Correct
      `const user = "Ana";`,
      `let user = "Ana";`,
      `delete user;`
    ],
    correctIndex: 0
  },
  {
    id: '7',
    title: 'Fix async issue',
    difficulty: 3,
    question: `function fetchData() {
  const data = fetch("api/data");
  console.log(data);
}`,
    options: [
      `fetch("api/data").then(res => res.json()).then(data => console.log(data));`, // Correct
      `const data = "api/data";`,
      `console.log("data");`,
      `return null;`
    ],
    correctIndex: 0
  },
  {
    id: '8',
    title: 'Fix missing dependency',
    difficulty: 3,
    question: `useEffect(() => {
  console.log(count);
});`,
    options: [
      `useEffect(() => { console.log(count); }, [count]);`, // Correct
      `useEffect(count);`,
      `console.log(count);`,
      `useEffect();`
    ],
    correctIndex: 0
  },
  {
    id: '9',
    title: 'Fix state update',
    difficulty: 2,
    question: `const [count, setCount] = useState(0);
setCount = 5;`,
    options: [
      `setCount(5);`, // Correct
      `count = 5;`,
      `let count = 5;`,
      `const setCount = 5;`
    ],
    correctIndex: 0
  },
  {
    id: '10',
    title: 'Fix missing import',
    difficulty: 2,
    question: `console.log(moment().format());`,
    options: [
      `import moment from 'moment';`, // Correct
      `import moment();`,
      `console.log(moment);`,
      `require('moment')();`
    ],
    correctIndex: 0
  }
];

export default function TaskDetail() {
  const { taskId } = useLocalSearchParams();
  const task = tasks.find(t => t.id === taskId);

  const handleAnswer = (index) => {
    if (index === task.correctIndex) {
      Alert.alert("✅ Correct!", "Well done.");
    } else {
      Alert.alert("❌ Incorrect", "Try again.");
    }
  };

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Task not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.difficulty}>Difficulty: {task.difficulty}</Text>
      <View style={styles.codeBox}>
        <Text style={styles.code}>{task.question}</Text>
      </View>
      {task.options.map((opt, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionButton}
          onPress={() => handleAnswer(index)}
        >
          <Text style={styles.optionText}>{opt}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.white,
    minHeight: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.black,
  },
  difficulty: {
    marginBottom: 10,
    fontSize: 16,
    color: COLORS.gray,
  },
  codeBox: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  code: {
    fontFamily: 'monospace',
    color: '#333',
  },
  optionButton: {
    backgroundColor: COLORS.black,
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  }
});
