import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, Modal, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import recipes from '../../../data/recipes';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { COLORS } from '../../../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';

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
  const [timer, setTimer] = useState(90);
  const [gameStarted, setGameStarted] = useState(false);
  const [cheatVisible, setCheatVisible] = useState(false);
  const [shuffledSteps, setShuffledSteps] = useState([]);
  const [playTime, setPlayTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
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

  const startGame = () => {
    setShowRecipe(false);
    setGameStarted(true);
    const shuffled = [...recipe.steps].sort(() => Math.random() - 0.5);
    setShuffledSteps(shuffled.map((step, index) => ({ key: String(index), text: step })));
  
    const id = setInterval(() => {
      setPlayTime(prev => prev + 1000);  // 1s vsakih 1000ms
    }, 1000);
    setIntervalId(id);
  };
  
  const toggleCheat = () => {
    setCheatVisible(true);
    setPlayTime(prev => prev + 5000);  // +5s
    setTimeout(() => setCheatVisible(false), 15000);
  };
  
  const submitAnswer = () => {
    const userOrder = shuffledSteps.map(s => s.text);
    const correctOrder = recipe.steps;
    const correct = JSON.stringify(userOrder) === JSON.stringify(correctOrder);
    if (correct) {
      setIsCorrect(true);
      setShowResult(true);
      clearInterval(intervalId);
      setGameStarted(false);
    } else {
      Alert.alert('❌ Wrong!', 'Try again...');
      setPlayTime(prev => prev + 10000);  // +10s
    }
  };

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(Math.floor(minutes / 10))}${String(minutes % 10)}:${String(Math.floor(seconds / 10))}${String(seconds % 10)}`;
  };

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
          <Text style={styles.header}>🎉 Your Time</Text>
          <View style={styles.timeDisplay}>
            <FontAwesome name="clock-o" size={32} color={COLORS.activeIcon} />
            <Text style={styles.timeText}>{formatTime(playTime)}</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/explore')} style={styles.button}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.header}>Arrange Steps</Text>
          <View style={styles.cheatAndTimerRow}>
            <TouchableOpacity onPress={toggleCheat} style={styles.cheatBtn}>
              <FontAwesome name="lightbulb-o" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.timeDisplay}>
              <FontAwesome name="clock-o" size={28} color="#111"/>
              <Text style={styles.timeText}>{formatTime(playTime)}</Text>
            </View>
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

          {/* Modal with outside click to close */}
          <Modal visible={cheatVisible} transparent animationType="fade">
            <TouchableWithoutFeedback onPress={() => setCheatVisible(false)}>
              <View style={styles.modalBackground}>
                <TouchableWithoutFeedback>
                  <View style={styles.modalContent}>
                    <ScrollView>
                      <Text>{recipe.recipe}</Text>
                    </ScrollView>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, backgroundColor: '#fff' },
  recipeContainer: { backgroundColor: '#fffaf0', margin: 16, padding: 20, borderRadius: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5, flex: 1 },
  header: { fontSize: 28, fontWeight: '700', marginBottom: 16, textAlign: 'center', color: COLORS.black },
  recipeDescription: { fontSize: 18, fontStyle: 'italic', marginBottom: 10 },
  recipeBox: { backgroundColor: '#fff7e6', padding: 12, borderRadius: 8, marginBottom: 10, flex: 1 },
  recipeText: { fontSize: 18, lineHeight: 26 },
  timerText: { fontSize: 16, color: 'red', textAlign: 'center', marginTop: 10 },
  startBtn: { backgroundColor: COLORS.activeIcon, padding: 14, borderRadius: 12, marginTop: 20, alignItems: 'center' },
  startBtnText: { color: '#fff', fontWeight: '600', fontSize: 18 },
  listContainer: { width: '100%', padding: 10, backgroundColor: '#fffaf0', borderRadius: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5, marginTop: 10 },
  item: { padding: 12, backgroundColor: '#f0f0f0', marginBottom: 8, borderRadius: 8, alignItems: 'center' },
  button: { backgroundColor: COLORS.activeIcon, padding: 12, borderRadius: 10, marginTop: 20, width: '60%', alignItems: 'center' },
  submitBtn: { backgroundColor: COLORS.activeIcon, padding: 12, borderRadius: 10, marginTop: 12, width: '60%', alignItems: 'center' },
  cheatBtn: { backgroundColor: COLORS.cheatColor, padding: 8, borderRadius: 10, width: '12%', alignItems: 'center', marginLeft: 24 },
  modalBackground: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: width * 0.8, height: height * 0.5, backgroundColor: '#fff7e6', padding: 20, borderRadius: 12 },
  buttonText: { color: '#fff', fontWeight: '600', textAlign: 'center' },
  errorText: { color: 'red', fontSize: 16, marginBottom: 10 },
  backBtn: { backgroundColor: '#4caf50', padding: 10, borderRadius: 6, marginTop: 10 },
  timeDisplay: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 10, borderRadius: 12, marginLeft: 10 },
  timeText: { fontSize: 24, fontWeight: 'bold', color: '#111', marginLeft: 10 },
  score: { fontSize: 24, fontWeight: 'bold', marginVertical: 20 },
  cheatAndTimerRow: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 },
});