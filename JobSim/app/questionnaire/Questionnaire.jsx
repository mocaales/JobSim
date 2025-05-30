import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '../../constants/Colors';

export default function Questionnaire() {
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const questions = [
    { id: 1, text: 'Do you enjoy solving technical problems?', type: 'scale' },
    { id: 2, text: 'Do you enjoy working with people?', type: 'scale' },
    { id: 3, text: 'Is job stability important to you?', type: 'scale' },
    { id: 4, text: 'Do you enjoy creativity and innovation?', type: 'scale' },
    { id: 5, text: 'Do you prefer working in the field rather than in an office?', type: 'yesno' },
    { id: 6, text: 'Do you enjoy analyzing data and identifying patterns?', type: 'yesno' },
    { id: 7, text: 'Do you have experience with digital tools or programming?', type: 'yesno' },
    { id: 8, text: 'Are you skilled at communication and understanding others?', type: 'scale' },
    { id: 9, text: 'Are you good with hands-on tasks (e.g., repairs, construction)?', type: 'scale' },
    { id: 10, text: 'Are you capable of quick decision-making and problem-solving?', type: 'scale' },
    { id: 11, text: 'Do you have experience in serving or preparing food?', type: 'yesno' },
    { id: 12, text: 'Do you enjoy working with documents and administration?', type: 'yesno' },
    { id: 13, text: 'Career advancement opportunities are important to me.', type: 'scale' },
    { id: 14, text: 'I value helping others and caring for people.', type: 'scale' },
    { id: 15, text: 'Technical precision and safety are important to me.', type: 'scale' },
    { id: 16, text: 'I prefer practical work over theory.', type: 'scale' },
    { id: 17, text: 'I would enjoy teaching or educating others.', type: 'yesno' },
    { id: 18, text: 'Aesthetics and design are important to me.', type: 'scale' },
    { id: 19, text: 'I adapt quickly to new situations.', type: 'scale' },
    { id: 20, text: 'I would enjoy working under pressure.', type: 'scale' },
    { id: 21, text: 'I prefer working independently rather than in a team.', type: 'scale' },
    { id: 22, text: 'Accuracy and consistency are important to me.', type: 'scale' },
    { id: 23, text: 'I prefer making decisions rather than following instructions.', type: 'scale' },
  ];

  const handleAnswer = (value) => {
    setAnswers(prev => ({ ...prev, [questions[current].id]: value }));
  };

  const handleSubmit = () => {
    console.log('Answers:', answers);
    setSubmitted(true);
  };

  const nextQuestion = () => {
    if (!answers[questions[current].id]) {
      Alert.alert('Please answer the question before proceeding.');
      return;
    }
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      handleSubmit();
    }
  };

  const prevQuestion = () => {
    if (current > 0) setCurrent(current - 1);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        {!submitted && <Text style={styles.title}>Discover Your Ideal Career! 🚀</Text>}
        {!submitted ? (
          <View style={styles.questionBox}>
            <Text style={styles.progress}>{`Question ${current + 1} of ${questions.length}`}</Text>
            <Text style={styles.questionText}>{questions[current].text}</Text>
            {questions[current].type === 'scale' ? (
              <TextInput
                placeholder="1-10"
                keyboardType="numeric"
                value={answers[questions[current].id] || ''}
                onChangeText={text => handleAnswer(text)}
                style={styles.input}
              />
            ) : (
              <View style={styles.yesnoRow}>
                <TouchableOpacity 
                  style={[
                    styles.yesnoButton, 
                    answers[questions[current].id] === 'Yes' && styles.selectedButton
                  ]}
                  onPress={() => handleAnswer('Yes')}
                >
                  <Text style={styles.yesnoText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[
                    styles.yesnoButton, 
                    answers[questions[current].id] === 'No' && styles.selectedButton
                  ]}
                  onPress={() => handleAnswer('No')}
                >
                  <Text style={styles.yesnoText}>No</Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.navRow}>
              <TouchableOpacity 
                style={[styles.navButton, current === 0 && styles.disabledButton]} 
                onPress={prevQuestion}
                disabled={current === 0}
              >
                <Text style={styles.navText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButton} onPress={nextQuestion}>
                <Text style={styles.navText}>{current < questions.length - 1 ? 'Next' : 'Submit'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>🎉 Thank you for completing the questionnaire!</Text>
            <Text style={styles.resultText}>Your answers have been saved for processing.</Text>
          </View>
        )}
      </View>
      {submitted && (
        <TouchableOpacity style={styles.backBtn} onPress={() => router.push('/home')}>
          <Text style={styles.backText}>← Back to Homepage</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  progress: { fontSize: 16, fontWeight: '500', textAlign: 'center', marginBottom: 5, color: '#555' },
  questionBox: { backgroundColor: '#fff', borderRadius: 12, padding: 20, width: '90%', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
  questionText: { fontSize: 16, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, marginTop: 5 },
  yesnoRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 },
  yesnoButton: { padding: 10, backgroundColor: '#e0e0e0', borderRadius: 6, width: '40%', alignItems: 'center' },
  selectedButton: { backgroundColor: '#4caf50' },
  yesnoText: { color: '#fff', fontWeight: '600' },
  navRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  navButton: { backgroundColor: '#2196f3', padding: 10, borderRadius: 6, width: '45%', alignItems: 'center' },
  disabledButton: { backgroundColor: '#ccc' },
  navText: { color: '#fff', fontWeight: '600' },
  resultBox: { justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 20, width: '90%', alignSelf: 'center' },
  resultText: { fontSize: 16, marginBottom: 10, textAlign: 'center' },
  backBtn: { padding: 12, alignItems: 'center', borderTopWidth: 1, borderColor: '#ccc' },
  backText: { color: COLORS.activeIcon, fontWeight: '500' },
});