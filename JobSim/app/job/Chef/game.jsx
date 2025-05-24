import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, Modal, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import recipes from '../../../data/recipes';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { COLORS } from '../../../constants/Colors';

const { width, height } = Dimensions.get('window');

export default function ChefGame() {
  const { recipeId } = useLocalSearchParams();
  const router = useRouter();

  if (!recipeId) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.errorText}>❌ No recipe selected.</Text>
        <TouchableOpacity onPress={() => router.push('/job/Chef/preGame')} style={styles.backBtn}>
          <Text style={styles.buttonText}>← Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const recipe = recipes.find(r => r.id === Number(recipeId));
  const [showRecipe, setShowRecipe] = useState(true);
  const [timer, setTimer] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(100);
  const [cheatVisible, setCheatVisible] = useState(false);
  const [shuffledSteps, setShuffledSteps] = useState([]);
  const [playTimer, setPlayTimer] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (!showRecipe) return;
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          startGame();
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [showRecipe]);

  useEffect(() => {
    if (gameStarted) {
      const interval = setInterval(() => {
        setPlayTimer(prev => {
          if ((prev + 1) % 10 === 0) setScore(s => Math.max(0, s - 3));
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameStarted]);

  const startGame = () => {
    setShowRecipe(false);
    setGameStarted(true);
    const shuffled = [...recipe.steps].sort(() => Math.random() - 0.5);
    setShuffledSteps(shuffled.map((step, index) => ({ key: String(index), text: step })));
  };

  const toggleCheat = () => {
    setCheatVisible(true);
    setScore(s => Math.max(0, s - 5));
    setTimeout(() => setCheatVisible(false), 5000);
  };

  const submitAnswer = () => {
    const userOrder = shuffledSteps.map(s => s.text);
    const correctOrder = recipe.steps;
    const correct = JSON.stringify(userOrder) === JSON.stringify(correctOrder);
    if (correct) {
      setIsCorrect(true);
      setShowResult(true);
      setGameStarted(false);
    } else {
      Alert.alert('❌ Wrong!', 'Try again...');
      setScore(s => Math.max(0, s - 8));
    }
  };

  const finalScore = score - Math.floor(playTimer / 10) * 2;

  return (
    <SafeAreaView style={styles.safe}>
      {showRecipe ? (
        <View style={styles.recipeContainer}>
          <Text style={styles.header}>{recipe.title}</Text>
          <Text style={styles.recipeDescription}>{recipe.description}</Text>
          <View style={styles.recipeBox}>
            <ScrollView>
              <Text style={styles.recipeText}>{recipe.recipe}</Text>
            </ScrollView>
          </View>
          <Text style={styles.timerText}>⏳ {timer}s</Text>
          <TouchableOpacity onPress={startGame} style={styles.startBtn}>
            <Text style={styles.startBtnText}>Start Game</Text>
          </TouchableOpacity>
        </View>
      ) : showResult ? (
        <View style={styles.container}>
          <Text style={styles.header}>🎉 Your Score</Text>
          <Text style={styles.score}>{finalScore}</Text>
          <TouchableOpacity onPress={() => router.push('/explore')} style={styles.button}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.header}>Arrange Steps</Text>
          <View style={styles.scoreRow}>
            <Text style={styles.score}> Score: {score}</Text>
            <Text style={styles.timer}>⏳ {playTimer}s</Text>
          </View>
          <View style={styles.listContainer}>
            <DraggableFlatList
              data={shuffledSteps}
              renderItem={({ item, drag, isActive }) => (
                <TouchableOpacity
                  style={[styles.item, isActive && { backgroundColor: '#e0e0e0' }]}
                  onLongPress={drag}
                >
                  <Text>{item.text}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.key}
              onDragEnd={({ data }) => setShuffledSteps(data)}
            />
          </View>
          <TouchableOpacity onPress={submitAnswer} style={styles.submitBtn}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleCheat} style={styles.cheatBtn}>
            <Text style={styles.buttonText}>📜 Cheat Sheet (-5t)</Text>
          </TouchableOpacity>

          <Modal visible={cheatVisible} transparent animationType="fade">
            <View style={styles.modalBackground}>
              <View style={styles.modalContent}>
                <ScrollView>
                  <Text>{recipe.recipe}</Text>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  recipeContainer: {
    backgroundColor: '#fffaf0',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    flex: 1,
  },
  header: { fontSize: 28, fontWeight: '700', marginBottom: 16, textAlign: 'center', color: COLORS.black },
  recipeDescription: { fontSize: 18, fontStyle: 'italic', marginBottom: 10 },
  recipeBox: { backgroundColor: '#fff7e6', padding: 12, borderRadius: 8, marginBottom: 10, flex: 1 },
  recipeText: { fontSize: 18, lineHeight: 26 },
  timerText: { fontSize: 16, color: 'red', textAlign: 'center', marginTop: 10 },
  startBtn: { backgroundColor: COLORS.activeIcon, padding: 14, borderRadius: 12, marginTop: 20, alignItems: 'center' },
  startBtnText: { color: '#fff', fontWeight: '600', fontSize: 18 },
  scoreRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: 20 },
  score: { fontSize: 20, fontWeight: 'bold', color: '#f44336' },
  timer: { fontSize: 20, fontWeight: 'bold', color: '#4caf50' },
  listContainer: { width: '100%', padding: 10, backgroundColor: '#fffaf0', borderRadius: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5, marginTop: 10 },
  item: { padding: 12, backgroundColor: '#f0f0f0', marginBottom: 8, borderRadius: 8, alignItems: 'center' },
  button: { backgroundColor: '#4caf50', padding: 12, borderRadius: 10, marginTop: 20, width: '60%', alignItems: 'center' },
  submitBtn: { backgroundColor: '#2196f3', padding: 12, borderRadius: 10, marginTop: 12, width: '60%', alignItems: 'center' },
  cheatBtn: { backgroundColor: '#f57c00', padding: 12, borderRadius: 10, marginTop: 12, width: '60%', alignItems: 'center' },
  modalBackground: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: width * 0.8, height: height * 0.5, backgroundColor: '#fff7e6', padding: 20, borderRadius: 12 },
  buttonText: { color: '#fff', fontWeight: '600', textAlign: 'center' },
  errorText: { color: 'red', fontSize: 16, marginBottom: 10 },
  backBtn: { backgroundColor: '#4caf50', padding: 10, borderRadius: 6, marginTop: 10 },
});