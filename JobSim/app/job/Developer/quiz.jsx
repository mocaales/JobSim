import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { COLORS } from '../../../constants/Colors';

const questions = [
  {
    question: 'Kaj pomeni HTML?',
    answers: ['HyperText Markup Language', 'HighText Machine Language', 'HyperTabular Markup Language'],
    correctAnswer: 0,
  },
  {
    question: 'Kaj je React?',
    answers: ['Programski jezik', 'Knjžnica za JavaScript', 'CSS okvir'],
    correctAnswer: 1,
  },
];

export default function QuizScreen() {
  const [current, setCurrent] = useState(0);
  const [correct, setCorrect] = useState(0);
  const router = useRouter();

  const handleAnswer = (index) => {
    if (index === questions[current].correctAnswer) {
      setCorrect(correct + 1);
    }
    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      alert(`Kviz končan! Število točnih odgovorov: ${correct + (index === questions[current].correctAnswer ? 1 : 0)}.`);
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{questions[current].question}</Text>
      {questions[current].answers.map((answer, i) => (
        <TouchableOpacity key={i} style={styles.answer} onPress={() => handleAnswer(i)}>
          <Text style={styles.answerText}>{answer}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: COLORS.white,
  },
  question: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.black,
  },
  answer: {
    backgroundColor: COLORS.black,
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
  },
  answerText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
