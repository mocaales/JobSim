import React, { useState, useEffect } from 'react';
import {
  View, Text, SafeAreaView, TouchableOpacity, Modal, StyleSheet, Platform, Animated, Easing,
} from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '../../../constants/Colors';

const CUSTOMERS = [
  { name: 'Granny May', mood: 'angry' },
  { name: 'Joe', mood: 'happy' },
  { name: 'Nina', mood: 'neutral' },
  { name: 'Marta', mood: 'happy' },
  { name: 'Leo', mood: 'angry' },
  { name: 'Sara', mood: 'neutral' },
  { name: 'Tom', mood: 'happy' },
  { name: 'Anna', mood: 'neutral' },
  { name: 'Mike', mood: 'neutral' },
];

const ITEMS = [
  { name: 'Steak', price: 5.8 },
  { name: 'Apple', price: 1 },
  { name: 'Broccoli', price: 1.3 },
  { name: 'Lettuce', price: 1.1 },
  { name: 'Bread', price: 2.5 },
  { name: 'Milk', price: 1.2 },
  { name: 'Cheese', price: 3.4 },
  { name: 'Tomato', price: 0.9 },
  { name: 'Butter', price: 2 },
  { name: 'Juice', price: 1.8 },
  { name: 'Eggs', price: 3 },
  { name: 'Chicken', price: 4.5 },
  { name: 'Fish', price: 6.2 },
  { name: 'Rice', price: 1.5 },
  { name: 'Pasta', price: 1.7 },
  { name: 'Yogurt', price: 0.8 },
  { name: 'Chocolate', price: 2.2 },
  { name: 'Cookies', price: 1.6 },
  { name: 'Ice Cream', price: 3.5 },
  { name: 'Soda', price: 1.4 },
  { name: 'Tea', price: 1.1 },
  { name: 'Coffee', price: 2.3 },
  { name: 'Cereal', price: 2.8 },
  { name: 'Chips', price: 1.9 },
  { name: 'Candy', price: 0.5 },
  { name: 'Nuts', price: 3.2 },
  { name: 'Popcorn', price: 1.4 },
  { name: 'Sauce', price: 1.5 },
  { name: 'Spices', price: 2.1 },
  { name: 'Vegetables', price: 1.0 },
  { name: 'Fruits', price: 1.2 },
  { name: 'Salad', price: 2.0 },
  { name: 'Soup', price: 3.0 },
  { name: 'Pizza', price: 4.0 },
  { name: 'Burger', price: 5.0 },
  { name: 'Sandwich', price: 3.5 },
  { name: 'Wrap', price: 4.5 },
  { name: 'Taco', price: 3.0 },
  { name: 'Pancakes', price: 2.5 },
  { name: 'Waffles', price: 3.2 },
  { name: 'Bagel', price: 1.8 },
  { name: 'Donut', price: 1.0 },
  { name: 'Muffin', price: 1.5 },
  { name: 'Croissant', price: 2.0 },
];

const COINS = [0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20];

export default function CashierGame() {
  const router = useRouter();
  const [showIntro, setShowIntro] = useState(true);
  const [difficulty, setDifficulty] = useState('medium');
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(15);
  const [customer, setCustomer] = useState(CUSTOMERS[0]);
  const [bill, setBill] = useState([]);
  const [paid, setPaid] = useState(0);
  const [returnAmount, setReturnAmount] = useState(0);
  const [collected, setCollected] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const scaleAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    if (!showIntro && round <= 10) generateNewRound();
  }, [round, showIntro]);

  useEffect(() => {
    if (showIntro || time <= 0) {
      if (time <= 0) checkResult(false);
      return;
    }

    if (time <= 3) {
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.5, duration: 200, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 200, easing: Easing.linear, useNativeDriver: true }),
      ]).start();
    }

    const timer = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(timer);
  }, [time, showIntro]);

  const generateNewRound = () => {
    const newCustomer = CUSTOMERS[Math.floor(Math.random() * CUSTOMERS.length)];
    const billItems = Array.from({ length: 3 }, () => ITEMS[Math.floor(Math.random() * ITEMS.length)]);
    const sum = billItems.reduce((acc, item) => acc + item.price, 0);
    const payOptions = [5, 10, 20].filter((val) => val > sum);
    const paidAmount = payOptions[Math.floor(Math.random() * payOptions.length)];
    const returnAmount = parseFloat((paidAmount - sum).toFixed(2));
    const baseTime = newCustomer.mood === 'angry' ? 8 : newCustomer.mood === 'happy' ? 15 : 12;
    const diffMultiplier = difficulty === 'easy' ? 1.5 : difficulty === 'hard' ? 0.7 : 1;

    setCustomer(newCustomer);
    setBill(billItems);
    setPaid(paidAmount);
    setReturnAmount(returnAmount);
    setCollected(0);
    setTime(Math.floor(baseTime * diffMultiplier));
  };

  const handleAddCoin = (value) => {
    const newTotal = parseFloat((collected + value).toFixed(2));
    if (newTotal > returnAmount) {
      checkResult(false);
      return;
    }
    if (newTotal === returnAmount) {
      setCollected(newTotal);
      checkResult(true);
      return;
    }
    setCollected(newTotal);
  };

  const checkResult = (success) => {
    setIsCorrect(success);
    setShowResult(true);
    if (success) setScore((s) => s + 1);
    setTimeout(() => {
      setShowResult(false);
      if (round < 10) setRound((r) => r + 1);
      else setGameOver(true);
    }, 1500);
  };

  const finishGame = () => {
    setGameOver(false);
    router.push('/explore');
  };

  const getMoodEmoji = (mood) => mood === 'angry' ? '😡' : mood === 'happy' ? '🙂' : '😐';
  const getCoinStyle = (value) => value <= 0.05 ? { ...styles.coin, ...styles.bronzeCoin } :
                                   value <= 2 ? { ...styles.coin, ...styles.goldCoin } : { ...styles.coin, ...styles.bill };

  if (showIntro) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.introOverlay}>
          <Text style={styles.introTitle}>How to Play</Text>
          <Text style={styles.introText}>
            Calculate the correct change to give back! Read the receipt, see what the customer paid, and use coins to return the correct amount.
          </Text>
          <Text style={styles.introText}>Select a difficulty to start:</Text>
          <View style={styles.diffContainer}>
            <TouchableOpacity style={styles.diffButton} onPress={() => { setDifficulty('easy'); setShowIntro(false); }}>
              <Text style={styles.diffText}>Easy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.diffButton} onPress={() => { setDifficulty('medium'); setShowIntro(false); }}>
              <Text style={styles.diffText}>Medium</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.diffButton} onPress={() => { setDifficulty('hard'); setShowIntro(false); }}>
              <Text style={styles.diffText}>Hard</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      {!gameOver && (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.name}>{customer.name} {getMoodEmoji(customer.mood)}</Text>
            <Animated.View style={[styles.timerCircle, time <= 3 && { transform: [{ scale: scaleAnim }] }]}>
              <Text style={[styles.timerText, time <= 3 && styles.timerTextUrgent]}>{time}s</Text>
            </Animated.View>
          </View>
          <View style={styles.receiptContainer}>
            <Text style={styles.receiptTitle}>🧾 Receipt</Text>
            <View style={styles.separator} />
            {bill.map((item, index) => (
              <Text key={index} style={styles.receiptText}>{item.name.padEnd(15)} €{item.price.toFixed(2)}</Text>
            ))}
            <View style={styles.separator} />
            <Text style={[styles.receiptText, { fontWeight: 'bold' }]}>Paid:{' '.repeat(10)}€{paid}</Text>
          </View>
          <Text style={styles.collectedText}>Your Collected: €{collected.toFixed(2)}</Text>
          <View style={styles.coinGrid}>
            {COINS.map((coin, index) => (
              <TouchableOpacity key={index} style={getCoinStyle(coin)} onPress={() => handleAddCoin(coin)}>
                <Text style={styles.coinText}>€{coin.toFixed(2)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
      <Modal visible={showResult || gameOver} transparent animationType="fade">
        <View style={styles.popup}>
          {gameOver ? (
            <>
              <Text style={styles.popupHeader}>🎉 Your Score</Text>
              <Text style={styles.score}>{score}/10</Text>
              <Text style={styles.percentage}>{Math.round((score / 10) * 100)}%</Text>
              <Text style={styles.difficulty}>Your difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</Text>
              <TouchableOpacity style={styles.button} onPress={finishGame}>
                <Text style={styles.buttonText}>Back to Cashier</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={isCorrect ? styles.correct : styles.wrong}>
              {isCorrect ? '✅ Correct' : '❌ Wrong'}
            </Text>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f5f5f5' },
  container: { flex: 1, paddingHorizontal: 32 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, alignItems: 'center' },
  name: { fontSize: 18, fontWeight: '600' },
  timerCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 4, elevation: 4 },
  timerText: { fontSize: 18, fontWeight: '600', color: '#333' },
  timerTextUrgent: { color: 'red' },
  receiptContainer: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginVertical: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, elevation: 4 },
  receiptTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  separator: { borderBottomWidth: 1, borderBottomColor: '#ccc', marginVertical: 6 },
  receiptText: { fontSize: 16, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', marginBottom: 2 },
  collectedText: { fontSize: 16, fontWeight: '500', textAlign: 'center', marginBottom: 8 },
  coinGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 16 },
  coin: { padding: 10, margin: 6, justifyContent: 'center', alignItems: 'center' },
  bronzeCoin: { backgroundColor: '#b87333', borderRadius: 50, width: 60, height: 60, borderWidth: 2, borderColor: '#8b5c2e', shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 4, elevation: 5 },
  goldCoin: { backgroundColor: '#fdd835', borderRadius: 50, width: 70, height: 70, borderWidth: 3, borderColor: '#c0a000', shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 4, elevation: 5 },
  bill: { backgroundColor: '#4caf50', borderRadius: 8, width: 100, height: 60, borderWidth: 2, borderColor: '#388e3c', shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 4, elevation: 5 },
  coinText: { color: '#fff', fontWeight: '600', fontSize: 12, textAlign: 'center' },
  popup: { position: 'absolute', top: '40%', left: '20%', right: '20%', backgroundColor: '#fff', padding: 20, borderRadius: 10, alignItems: 'center', elevation: 6, shadowColor: '#000', shadowOpacity: 0.2 },
  popupHeader: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  correct: { fontSize: 22, color: 'green', fontWeight: 'bold' },
  wrong: { fontSize: 22, color: 'red', fontWeight: 'bold' },
  score: { fontSize: 20, fontWeight: '600', marginBottom: 4 },
  percentage: { fontSize: 18, fontWeight: '500', marginBottom: 12 },
  button: { backgroundColor: COLORS.activeIcon, padding: 12, borderRadius: 10 },
  buttonText: { color: COLORS.white, fontWeight: '600' },
  introOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  introTitle: { fontSize: 24, fontWeight: '700', color: '#fff', marginBottom: 16 },
  introText: { fontSize: 16, color: '#fff', textAlign: 'center', marginBottom: 12 },
  diffContainer: { flexDirection: 'row', marginTop: 16 },
  diffButton: { backgroundColor: COLORS.activeIcon, padding: 12, borderRadius: 8, marginHorizontal: 8 },
  diffText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  difficulty: { fontSize: 16, fontWeight: '500', marginBottom: 8, color: '#333' },
});