import React, { useEffect, useState } from 'react';
import {SafeAreaView,View,Text,TouchableOpacity,StyleSheet,Dimensions,} from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import { COLORS } from '../../../constants/Colors';
import job from '../../../data/jobs/cashier';  

export default function CashierQuiz() {
  const router = useRouter();
  const { user } = useUser();

  const [questions] = useState(() => {
    const shuffled = [...job.quizQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 5) + 8);
  });

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

  const current = questions[index];

  const handleSelect = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === current.correctIndex) setScore(score + 1);
  };

  const handleNext = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  useEffect(() => {
    if (finished && user?.primaryEmailAddress?.emailAddress) {
      const sendData = async () => {
        try {
          const response = await fetch(process.env.EXPO_PUBLIC_API_URL + '/quiz/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: user.primaryEmailAddress.emailAddress,
              job: 'Cashier',  
              score,
              total: questions.length
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

  return (
    <SafeAreaView style={styles.safe}>
      {finished ? (
        <View style={styles.center}>
          <Text style={styles.header}>Quiz Completed</Text>
          <Text style={styles.score}>Score: {score} / {questions.length}</Text>
          <Text style={styles.score}>Percentage: {Math.round((score / questions.length) * 100)}%</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.button}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.header}>{index + 1}. {current.question}</Text>
          {current.options.map((opt, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.option,
                selected === i && (i === current.correctIndex ? styles.correct : styles.wrong)
              ]}
              onPress={() => handleSelect(i)}
            >
              <Text>{opt}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={handleNext}
            style={[styles.button, { marginTop: 20 }]}
            disabled={selected === null}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, padding: 16 },
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
  score: { fontSize: 18, fontWeight: '500', marginBottom: 16 },
});