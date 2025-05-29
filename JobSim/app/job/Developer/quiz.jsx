// app/job/Developer/quiz.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '../../../constants/Colors';

// 8 questions from FullStack.cafe list
const questions = [
  {
    question: 'Explain the difference between == and === in JavaScript.',
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
  }
];

export default function DeveloperQuiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const router = useRouter();

  const handleAnswer = (idx) => {
    if (selected !== null) return; // prevent multiple taps
    const isCorrect = idx === questions[current].correctIndex;
    setSelected(idx);
    setFeedback(isCorrect);
    if (isCorrect) setScore((s) => s + 1);

    setTimeout(() => {
      const next = current + 1;
      if (next < questions.length) {
        setCurrent(next);
        setSelected(null);
        setFeedback(null);
      } else {
        Alert.alert(
          'Quiz Completed',
          `Your score: ${score + (isCorrect ? 1 : 0)} / ${questions.length}`
        );
        router.back();
      }
    }, 1000);
  };

  const q = questions[current];

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{q.question}</Text>
      {q.options.map((opt, i) => {
        const isSelected = i === selected;
        const borderColor =
          isSelected && feedback === true
            ? 'green'
            : isSelected && feedback === false
            ? 'red'
            : 'transparent';
        return (
          <TouchableOpacity
            key={i}
            style={[
              styles.option,
              { borderColor, borderWidth: isSelected ? 2 : 0 }
            ]}
            onPress={() => handleAnswer(i)}
          >
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        );
      })}
      <Text style={styles.progress}>
        Question {current + 1} of {questions.length}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
    justifyContent: 'center'
  },
  question: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    color: COLORS.black
  },
  option: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: COLORS.activeIcon
  },
  optionText: {
    color: COLORS.white,
    fontSize: 16
  },
  progress: {
    marginTop: 20,
    textAlign: 'center',
    color: COLORS.gray
  }
});
