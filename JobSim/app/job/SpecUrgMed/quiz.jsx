// app/job/SpecUrgMed/quiz.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '../../../constants/Colors';

const questions = [
  {
    question: 'What is the first step in the ABCDE approach?',
    options: ['Airway assessment', 'Breathing support', 'Circulation check', 'Disability evaluation'],
    correct: 0
  },
  {
    question: 'A patient presents with a tension pneumothorax. Which sign is expected?',
    options: ['Tracheal deviation away', 'Decreased jugular venous pressure', 'Bilateral hyperresonance', 'Bradycardia'],
    correct: 0
  },
  {
    question: 'What is the antidote for acetaminophen overdose?',
    options: ['Naloxone', 'Atropine', 'N-acetylcysteine', 'Flumazenil'],
    correct: 2
  }
];

export default function SpecUrgMedQuiz() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (i) => {
    if (i === questions[index].correct) setScore(score + 1);
    const next = index + 1;
    if (next < questions.length) {
      setIndex(next);
    } else {
      Alert.alert('Quiz Complete', `Your score: ${score + (i === questions[index].correct ? 1 : 0)}/${questions.length}`);
      router.back();
    }
  };

  const q = questions[index];

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{q.question}</Text>
      {q.options.map((opt, i) => (
        <TouchableOpacity
          key={i}
          style={styles.option}
          onPress={() => handleAnswer(i)}
        >
          <Text style={styles.optionText}>{opt}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', padding:20, backgroundColor: COLORS.white },
  question: { fontSize:22, fontWeight:'700', color: COLORS.primary, marginBottom:20, textAlign:'center' },
  option: { backgroundColor: COLORS.activeIcon, padding:12, borderRadius:8, marginVertical:6, width:'100%' },
  optionText: { color: COLORS.white, fontSize:16, textAlign:'center' }
});

