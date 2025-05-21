import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { COLORS } from '../../../../constants/Colors';
import jobs from '../../../../data/jobs';

export default function JobQuiz() {
  const { jobId } = useLocalSearchParams();
  const router = useRouter();
  const questions = jobs[jobId]?.quizQuestions || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResults, setShowResults] = useState(false);

  //reset quiz state whenever this screen gains focus
  useFocusEffect(
    React.useCallback(() => {
        setCurrentIndex(0);
        setSelectedIndex(null);
        setCorrectCount(0);
        setShowResults(false);
    }, [jobId])
  );

  if (!questions.length) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.notFound}>No quiz available for {jobId}</Text>
      </SafeAreaView>
    );
  }

  const currentQ = questions[currentIndex];

  const handleOptionPress = (i) => {
    if (selectedIndex !== null) return;
    setSelectedIndex(i);
    if (i === currentQ.correctIndex) {
      setCorrectCount((c) => c + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((idx) => idx - 1);
      setSelectedIndex(null);
    }
  };
  const goNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((idx) => idx + 1);
      setSelectedIndex(null);
    }
  };

  const finishQuiz = () => {
    setShowResults(true);
  };

  if (showResults) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.resultsWrapper}>
          <View style={styles.resultsCard}>
            <Text style={styles.resultsHeader}>Quiz Complete!</Text>
            <Text style={styles.resultsScore}>
              Score {correctCount} of {questions.length}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.finishButton, { width: styles.resultsCard.width }]}
            onPress={() => router.push(`/job/${jobId}`)}
            activeOpacity={0.7}
          >
            <Text style={styles.finishText}>Back to Job</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.questionHeader}>
          {currentIndex + 1}. {currentQ.question}
        </Text>
        <View style={styles.optionsGrid}>
          {currentQ.options.map((opt, i) => {
            const isCorrect = i === currentQ.correctIndex;
            const isSelected = i === selectedIndex;
            return (
              <TouchableOpacity
                key={i}
                style={[
                  styles.optionCard,
                  selectedIndex !== null && isCorrect && styles.correctOption,
                  selectedIndex !== null && isSelected && !isCorrect && styles.incorrectOption,
                ]}
                onPress={() => handleOptionPress(i)}
                activeOpacity={0.7}
              >
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <Text style={styles.counter}>
          Correct: {correctCount} / {questions.length}
        </Text>
        <View style={styles.navContainer}>
          <TouchableOpacity onPress={goPrev} disabled={currentIndex === 0}>
            <AntDesign
              name="caretleft"
              size={32}
              color={currentIndex === 0 ? COLORS.gray : COLORS.activeIcon}
            />
          </TouchableOpacity>
          {currentIndex === questions.length - 1 ? (
            <TouchableOpacity onPress={finishQuiz}>
              <Text style={styles.finishQuizButton}>Finish Quiz</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={goNext} disabled={selectedIndex === null}>
              <AntDesign
                name="caretright"
                size={32}
                color={selectedIndex === null ? COLORS.gray : COLORS.activeIcon}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');
const P = 16;
const CARD_SIZE = (width - P * 3) / 2;
const CARD_WIDTH = CARD_SIZE; // use same width for results container

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },
  container: { flex: 1, padding: P },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  notFound: { fontSize: 18, color: COLORS.black },
  questionHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: P,
    color: COLORS.black,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionCard: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: P,
    marginBottom: P,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
    textAlign: 'center',
  },
  correctOption: {
    borderWidth: 3,
    borderColor: '#4CAF50',
  },
  incorrectOption: {
    borderWidth: 3,
    borderColor: '#F44336',
  },
  counter: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: COLORS.black,
    marginVertical: P,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: P * 2,
  },
  finishQuizButton: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.activeIcon,
  },
  finishButton: {
    marginTop: P,
    borderRadius: 12,
    backgroundColor: COLORS.activeIcon,
    alignItems: 'center',
    justifyContent: 'center',
    width: CARD_WIDTH,
    height: 48,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  finishText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  resultsWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: P,
  },
  resultsCard: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: P,
    marginBottom: P,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  resultsHeader: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    color: COLORS.black,
  },
  resultsScore: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
  },
});
