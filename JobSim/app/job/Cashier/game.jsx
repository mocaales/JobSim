import React, { useState, useEffect } from 'react';
import {
  View, Text, SafeAreaView, TouchableOpacity, Modal, StyleSheet, Platform, Animated, Easing,
} from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '../../../constants/Colors';

const regularItems = [
  { name: 'Steak', price: 5.8 }, { name: 'Apple', price: 1 }, { name: 'Broccoli', price: 1.3 },
  { name: 'Lettuce', price: 1.1 }, { name: 'Bread', price: 2.5 }, { name: 'Milk', price: 1.2 },
  { name: 'Eggs', price: 3 }, { name: 'Chicken', price: 4.5 }, { name: 'Pizza', price: 15 },
  { name: 'Burger', price: 12 }, { name: 'Sandwich', price: 5 }, { name: 'Wrap', price: 6 },
  { name: 'Taco', price: 7 }, { name: 'Pancakes', price: 8 }, { name: 'Salmon', price: 20 },
  { name: 'Lamb Chops', price: 30 }, { name: 'Pork Roast', price: 25 }, { name: 'Cheddar Cheese', price: 4 },
  { name: 'Yogurt', price: 2 }, { name: 'Olives', price: 3 }, { name: 'Breadsticks', price: 2 },
  { name: 'Chocolate Cake', price: 10 }, { name: 'Baguette', price: 2 }, { name: 'Butter', price: 2 },
  { name: 'Ice Cream', price: 5 }, { name: 'Fruits', price: 6 }, { name: 'Juice', price: 3 },
  { name: 'Ham', price: 15 }, { name: 'Salad', price: 4 }, { name: 'Soup', price: 8 },
  { name: 'Cheese Platter', price: 25 }, { name: 'Bottle of Wine', price: 40 }, { name: 'Shrimp', price: 30 },
  { name: 'Crab Legs', price: 50 }, { name: 'Whole Turkey', price: 60 }, { name: 'Vegetable Mix', price: 1.3 },
  { name: 'Fruit Salad', price: 4.6 }, { name: 'Bread Loaf', price: 2.4 }, { name: 'Pastry', price: 3.2 },
  { name: 'Cereal', price: 2.8 }, { name: 'Granola Bar', price: 2 }, { name: 'Rice', price: 1.9 },
  { name: 'Pasta', price: 2.2 }, { name: 'Sauce', price: 2 }, { name: 'Spices', price: 1.4 },
  { name: 'Herbs', price: 1.6 }, { name: 'Nuts', price: 3 }, { name: 'Seeds', price: 2.3 },
  { name: 'Beans', price: 1.7 }, { name: 'Lentils', price: 1.9 }, { name: 'Chickpeas', price: 2.1 },
  { name: 'Tofu', price: 3.2 }, { name: 'Tempeh', price: 4.5 }, { name: 'Quinoa', price: 3.8 },
  { name: 'Couscous', price: 2.5 }, { name: 'Polenta', price: 2.0 }, { name: 'Oats', price: 1.6 },
];

const nonRoundedItems = [
  { name: 'Chili', price: 1.99 }, { name: 'Avocado', price: 2.79 }, { name: 'Mango', price: 3.49 },
  { name: 'Blueberry', price: 1.89 }, { name: 'Olive Oil', price: 4.99 }, { name: 'Pineapple', price: 2.69 },
  { name: 'Special Cheese', price: 15.49 }, { name: 'Organic Salmon', price: 28.79 }, { name: 'Prosciutto', price: 22.59 },
  { name: 'Black Truffle', price: 55.99 }, { name: 'Premium Wine', price: 59.49 }, { name: 'Exotic Fruit Basket', price: 45.79 },
  { name: 'Seafood Platter', price: 39.29 }, { name: 'Imported Spices', price: 8.19 }, { name: 'Fancy Chocolate', price: 12.69 },
  { name: 'Barley', price: 1.82 }, { name: 'Buckwheat', price: 2.41 }, { name: 'Millet', price: 2.16 },
  { name: 'Farro', price: 3.04 }, { name: 'Rye Bread', price: 2.69 }, { name: 'Sourdough Bread', price: 3.58 },
  { name: 'Bagel', price: 1.97 }, { name: 'Croissant', price: 2.79 }, { name: 'Danish Pastry', price: 3.38 },
  { name: 'Cinnamon Roll', price: 2.89 }, { name: 'Biscotti', price: 1.59 }, { name: 'Granola', price: 4.26 },
  { name: 'Muesli', price: 3.81 }, { name: 'Rice Cakes', price: 1.63 }, { name: 'Pita Bread', price: 1.44 },
  { name: 'Naan Bread', price: 2.24 }, { name: 'Tortilla', price: 1.73 }, { name: 'Polish Sausage', price: 3.92 },
  { name: 'Chorizo', price: 4.55 }, { name: 'Salami', price: 3.66 }, { name: 'Pepperoni', price: 2.89 },
  { name: 'Bacon', price: 5.02 }, { name: 'Prosciutto Ham', price: 6.51 }, { name: 'Serrano Ham', price: 7.26 },
  { name: 'Capicola', price: 4.81 }, { name: 'Pastrami', price: 5.53 }, { name: 'Corned Beef', price: 6.02 },
  { name: 'Duck Breast', price: 8.02 }, { name: 'Lamb Shank', price: 9.56 }, { name: 'Beef Tenderloin', price: 12.08 },
  { name: 'Pork Belly', price: 7.56 }, { name: 'Rabbit', price: 10.02 }, { name: 'Venison Steak', price: 15.03 },
  { name: 'Wild Boar Sausage', price: 11.02 }, { name: 'Bison Burger', price: 13.01 }, { name: 'Elk Steak', price: 14.07 },
];

const COINS = [0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50];

export default function CashierGame() {
  const router = useRouter();
  const [showIntro, setShowIntro] = useState(true);
  const [difficulty, setDifficulty] = useState('medium');
  const [round, setRound] = useState(1);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [bill, setBill] = useState([]);
  const [paid, setPaid] = useState(0);
  const [returnAmount, setReturnAmount] = useState(0);
  const [collected, setCollected] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!showIntro && !gameOver) {
      const timer = setInterval(() => setElapsedTime((t) => t + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [showIntro, gameOver]);

  useEffect(() => {
    if (!showIntro && round <= 10) generateNewRound();
  }, [round, showIntro]);

  const generateBillItems = () => {
    let selected = [];

    if (difficulty === 'easy') {
      selected = Array.from({ length: 3 }, () => regularItems[Math.floor(Math.random() * regularItems.length)]);
    } else if (difficulty === 'medium') {
      selected.push(nonRoundedItems[Math.floor(Math.random() * nonRoundedItems.length)]);
      while (selected.length < 3) selected.push(regularItems[Math.floor(Math.random() * regularItems.length)]);
    } else if (difficulty === 'hard') {
      selected.push(nonRoundedItems[Math.floor(Math.random() * nonRoundedItems.length)]);
      selected.push(nonRoundedItems[Math.floor(Math.random() * nonRoundedItems.length)]);
      while (selected.length < 3) selected.push(regularItems[Math.floor(Math.random() * regularItems.length)]);
    }

    return selected;
  };

  const generateNewRound = () => {
    const billItems = generateBillItems();
    const sum = billItems.reduce((acc, item) => acc + item.price, 0);
    const payOptions = COINS.filter((val) => val > sum);
    const paidAmount = payOptions.length > 0 ? payOptions[Math.floor(Math.random() * payOptions.length)] : Math.ceil(sum + 10);
    const returnAmount = parseFloat((paidAmount - sum).toFixed(2));

    setBill(billItems);
    setPaid(paidAmount);
    setReturnAmount(returnAmount);
    setCollected(0);
    setErrorMsg('');
  };

  const handleAddCoin = (value) => {
    const newTotal = parseFloat((collected + value).toFixed(2));
    if (newTotal > returnAmount) {
      setCollected(0);
      setErrorMsg('❌ Too much! Try again!');
      setTimeout(() => setErrorMsg(''), 1500);
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
    if (success) setCorrectCount((c) => c + 1);
    setTimeout(() => {
      setShowResult(false);
      if (success && correctCount + 1 >= 10) {
        setGameOver(true);
      } else if (success) {
        setRound((r) => r + 1);
      }
    }, 1500);
  };

  const finishGame = () => {
    setGameOver(false);
    router.push('/explore');
  };

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
            <Text style={styles.name}> {difficulty.toUpperCase()}</Text>
            <Text style={styles.timerText}>Time: {elapsedTime}s</Text>
          </View>
          <View style={styles.receiptContainer}>
            <Text style={styles.receiptTitle}>🧾 Receipt</Text>
            <View style={styles.separator} />
            {bill.map((item, index) => (
              <Text key={index} style={styles.receiptText}>{item.name.padEnd(15)} €{item.price.toFixed(2)}</Text>
            ))}
            <View style={styles.separator} />
            <Text style={[styles.receiptText, { fontWeight: 'bold' }]}>Paid:{' '.repeat(10)}€{paid.toFixed(2)}</Text>
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
      <Modal visible={showResult || gameOver || errorMsg !== ''} transparent animationType="fade">
        <View style={styles.popup}>
          {gameOver ? (
            <>
              <Text style={styles.popupHeader}>🎉 Your Time</Text>
              <Text style={styles.score}>{elapsedTime} seconds</Text>
              <Text style={styles.difficulty}>Difficulty: {difficulty}</Text>
              <TouchableOpacity style={styles.button} onPress={finishGame}>
                <Text style={styles.buttonText}>Back to Menu</Text>
              </TouchableOpacity>
            </>
          ) : errorMsg !== '' ? (
            <Text style={styles.wrong}>{errorMsg}</Text>
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