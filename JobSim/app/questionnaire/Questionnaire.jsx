import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '../../constants/Colors';
import { useUser } from '@clerk/clerk-expo';

export default function Questionnaire() {
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [skipCheck, setSkipCheck] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  const questions = [
    { id: 1, text: 'I enjoy solving complex technical problems.' },
    { id: 2, text: 'I find satisfaction in helping others improve their well-being.' },
    { id: 3, text: 'I enjoy creating or working with visual designs and aesthetics.' },
    { id: 4, text: 'I enjoy leading projects or organizing teams.' },
    { id: 5, text: 'I prefer hands-on tasks over theoretical thinking.' },
    { id: 6, text: 'I feel comfortable using or learning digital tools and technologies.' },
    { id: 7, text: 'I enjoy working in fast-paced environments like restaurants or hotels.' },
    { id: 8, text: 'Teaching or mentoring others is something I find fulfilling.' },
    { id: 9, text: 'I prefer stable and predictable work over frequent changes.' },
    { id: 10, text: 'I enjoy working with numbers, data, or analytics.' },
    { id: 11, text: 'I value precision and accuracy in my work.' },
    { id: 12, text: 'I enjoy designing or constructing physical objects or systems.' },
    { id: 13, text: 'Helping others in healthcare or social settings gives me purpose.' },
    { id: 14, text: 'I prefer creative freedom over structured rules.' },
    { id: 15, text: 'I enjoy administrative or organizational tasks.' },
    { id: 16, text: 'I find working under pressure exciting and motivating.' },
    { id: 17, text: 'I enjoy collaborating with others in a team setting.' },
    { id: 18, text: 'I enjoy analyzing systems and improving how they work.' },
    { id: 19, text: 'I prefer working independently and managing my own time.' },
    { id: 20, text: 'I find it easy to adapt to new situations or environments.' },
    { id: 21, text: 'I enjoy preparing food or serving customers.' },
    { id: 22, text: 'I feel fulfilled when I see my work have a practical impact.' },
    { id: 23, text: 'I am detail-oriented and double-check my work.' },
    { id: 24, text: 'I enjoy exploring scientific theories or research topics.' },
    { id: 25, text: 'I value aesthetics, color, and visual harmony in my surroundings.' }
  ];

  const likertOptions = [
    { value: 5, label: 'Strongly Agree' },
    { value: 4, label: 'Somewhat Agree' },
    { value: 3, label: 'Neutral' },
    { value: 2, label: 'Somewhat Disagree' },
    { value: 1, label: 'Strongly Disagree' }
  ];

  useEffect(() => {
    const checkExisting = async () => {
      if (!email) {
        Alert.alert("Error", "Email not found.");
        router.push('/home');
        return;
      }

      try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/check_existing`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const data = await response.json();
        if (data.exists) {
          Alert.alert(
            "You already submitted the questionnaire",
            `Your previous result was: ${data.result}\nDo you want to submit new answers?`,
            [
              { text: "Cancel", onPress: () => router.push('/home'), style: 'cancel' },
              { text: "Yes", onPress: () => { setSkipCheck(true); setLoading(false); } }
            ]
          );
        } else {
          setLoading(false);
        }
      } catch (err) {
        Alert.alert("Error", "Failed to check previous result.");
        router.push('/home');
      }
    };

    checkExisting();
  }, []);

  const handleAnswer = (value) => {
    const question = questions[current];
    setAnswers(prev => ({ ...prev, [question.id]: value }));
  };

  const validateInput = (question, ans) => {
    const num = parseInt(ans, 10);
    return !isNaN(num) && num >= 1 && num <= 5;
  };

  const submitAnswers = async () => {
    const mappedAnswers = questions.map(q => answers[q.id] || 0);

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: mappedAnswers,
          email: email,
          force: skipCheck
        })
      });
      const data = await response.json();

      if (data.message) {
        Alert.alert(
          "Questionnaire Already Submitted",
          `${data.message}\nPrevious result: ${data.result}\n\nDo you want to submit new answers?`,
          [
            { text: "Cancel", style: "cancel" },
            { text: "Yes", onPress: () => { setSkipCheck(true); submitAnswers(); } }
          ]
        );
      } else {
        Alert.alert("Prediction Result", `Suggested Profession: ${data.predicted_profession}`);
        setSubmitted(true);
      }

    } catch (error) {
      Alert.alert("Error", "Failed to submit answers.");
    }
  };

  const nextQuestion = () => {
    const ans = answers[questions[current].id];
    if (!ans) {
      Alert.alert('Please answer the question.');
      return;
    }
    if (!validateInput(questions[current], ans)) {
      Alert.alert('Invalid Input', 'Please select a valid option.');
      return;
    }
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      submitAnswers();
    }
  };

  const prevQuestion = () => {
    if (current > 0) setCurrent(current - 1);
  };

  if (loading) {
    return <View style={styles.safe}><ActivityIndicator size="large" color={COLORS.activeIcon} /></View>;
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        {!submitted && <Text style={styles.title}>Discover Your Ideal Career! 🚀</Text>}
        {!submitted ? (
          <View style={styles.questionBox}>
            <Text style={styles.progress}>{`Question ${current + 1} of ${questions.length}`}</Text>
            <Text style={styles.questionText}>{questions[current].text}</Text>
              <View style={styles.optionsContainer}>
                {likertOptions.map(option => {
                  const selected = answers[questions[current].id] === option.value;
                  return (
                    <TouchableOpacity
                      key={option.value}
                      style={styles.optionWrapper}
                      onPress={() => handleAnswer(option.value)}
                    >
                      <View style={[styles.radioCircle, selected && styles.radioCircleSelected]} />
                      <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
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
  safe: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  progress: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 5,
    color: '#555'
  },
  questionBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3
  },
  questionText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    color: '#222'
  },
  optionsContainer: {
    marginTop: 10,
    width: '100%'
  },
  optionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#999',
    marginRight: 12,
    backgroundColor: 'transparent'
  },
  radioCircleSelected: {
    backgroundColor: '#2196f3',
    borderColor: '#2196f3'
  },
  optionLabel: {
    fontSize: 15,
    color: '#333'
  },
  optionLabelSelected: {
    fontWeight: '600',
    color: '#000'
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25
  },
  navButton: {
    backgroundColor: '#2196f3',
    padding: 12,
    borderRadius: 6,
    width: '45%',
    alignItems: 'center'
  },
  disabledButton: {
    backgroundColor: '#ccc'
  },
  navText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15
  },
  resultBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    alignSelf: 'center'
  },
  resultText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center'
  },
  backBtn: {
    padding: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc'
  },
  backText: {
    color: COLORS.activeIcon,
    fontWeight: '500'
  }
});