import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Alert,
  SafeAreaView,
  Modal,
  StyleSheet,
  UIManager,
  findNodeHandle,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '../../../constants/Colors';
import DraggableCoin from '../../../components/DraggableCoin';

const CUSTOMERS = [
  { name: 'Granny May', mood: 'angry' },
  { name: 'Happy Joe', mood: 'happy' },
  { name: 'Neutral Nina', mood: 'neutral' },
];

const COINS = [0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2];
const BILLS = [5, 10, 20];

const ITEMS = [
  { name: 'Steak', price: 5.8 },
  { name: 'Apple', price: 1 },
  { name: 'Broccoli', price: 1.3 },
  { name: 'Lettuce', price: 1.1 },
  { name: 'Bread', price: 2.5 },
  { name: 'Milk', price: 1.2 },
  { name: 'Cheese', price: 3.4 },
  { name: 'Tomato', price: 0.9 },
];

export default function CashierGame() {
  const router = useRouter();
  const dropZoneRef = useRef(null);

  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(15);
  const [customer, setCustomer] = useState(CUSTOMERS[0]);
  const [bill, setBill] = useState([]);
  const [total, setTotal] = useState(0);
  const [paid, setPaid] = useState(0);
  const [dropTotal, setDropTotal] = useState(0);
  const [dropZoneLayout, setDropZoneLayout] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (round > 10) return;
    generateNewRound();
  }, [round]);

  useEffect(() => {
    if (time <= 0) {
      checkResult();
      return;
    }
    const timer = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(timer);
  }, [time]);

  const generateNewRound = () => {
    const newCustomer = CUSTOMERS[Math.floor(Math.random() * CUSTOMERS.length)];
    const billItems = Array.from({ length: 3 }, () => ITEMS[Math.floor(Math.random() * ITEMS.length)]);
    const sum = billItems.reduce((acc, item) => acc + item.price, 0);
    const payOptions = [5, 10, 20].filter((val) => val > sum);
    const paidAmount = payOptions[Math.floor(Math.random() * payOptions.length)];

    setCustomer(newCustomer);
    setBill(billItems);
    setTotal(parseFloat(sum.toFixed(2)));
    setPaid(paidAmount);
    setDropTotal(0);

    const moodTime = newCustomer.mood === 'angry' ? 7 : newCustomer.mood === 'happy' ? 15 : 12;
    setTime(moodTime);
  };

  const measureDropZone = () => {
    const handle = findNodeHandle(dropZoneRef.current);
    if (handle) {
      UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
        setDropZoneLayout({ x: pageX, y: pageY, width, height });
      });
    }
  };

  const handleDrop = (value) => {
    const newTotal = parseFloat((dropTotal + value).toFixed(2));
    setDropTotal(newTotal);
    const correctChange = parseFloat((paid - total).toFixed(2));
    if (Math.abs(newTotal - correctChange) < 0.01) {
      checkResult(true);
    }
  };

  const checkResult = () => {
    const correctChange = parseFloat((paid - total).toFixed(2));
    const success = Math.abs(dropTotal - correctChange) < 0.01;
    setIsCorrect(success);
    setShowResult(true);
    if (success) setScore((s) => s + 1);
    setTimeout(() => {
      setShowResult(false);
      if (round < 10) setRound((r) => r + 1);
    }, 1500);
  };

  const finishGame = () => {
    Alert.alert('Game Over', `Your score: ${score} / 10`, [
      { text: 'Back to Explore', onPress: () => router.push('/explore') },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.name}>🧑 {customer.name}</Text>
        <View style={styles.timerCircle}>
          <Text style={[styles.timerText, time <= 3 && styles.timerTextUrgent]}>{time}s</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>🛒 Items:</Text>
        {bill.map((item, index) => (
          <Text key={index}>• {item.name} — €{item.price.toFixed(2)}</Text>
        ))}
        <Text style={{ marginTop: 10 }}>💰 Paid: €{paid}</Text>
      </View>

      <View
        ref={dropZoneRef}
        onLayout={measureDropZone}
        style={styles.dropZone}
      >
        <Text style={styles.label}>Drop Here</Text>
        <Text style={styles.value}>€{dropTotal.toFixed(2)}</Text>
      </View>

      <View style={styles.coinGrid}>
        {[...COINS, ...BILLS].map((value, index) => (
          <DraggableCoin
            key={index}
            value={value}
            dropZoneLayout={dropZoneLayout}
            onDrop={handleDrop}
          />
        ))}
      </View>

      <Modal visible={showResult} transparent animationType="fade">
        <View style={styles.popup}>
          <Text style={isCorrect ? styles.correct : styles.wrong}>
            {isCorrect ? '✅ Correct' : '❌ Wrong'}
          </Text>
        </View>
      </Modal>

      {round > 10 && (
        <View style={styles.centered}>
          <TouchableOpacity style={styles.button} onPress={finishGame}>
            <Text style={styles.buttonText}>See Results</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    alignItems: 'center',
  },
  name: { fontSize: 18, fontWeight: '600' },
  timerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  timerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  timerTextUrgent: {
    color: 'red',
  },
  section: { marginBottom: 16 },
  title: { fontWeight: 'bold', marginBottom: 4 },
  dropZone: {
    height: 100,
    backgroundColor: '#eee',
    margin: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#aaa',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
  },
  coinGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 16,
  },
  popup: {
    position: 'absolute',
    top: '45%',
    left: '20%',
    right: '20%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
  },
  correct: {
    fontSize: 22,
    color: 'green',
    fontWeight: 'bold',
  },
  wrong: {
    fontSize: 22,
    color: 'red',
    fontWeight: 'bold',
  },
  centered: {
    marginTop: 30,
    alignItems: 'center',
  },
  button: {
    backgroundColor: COLORS.activeIcon,
    padding: 14,
    borderRadius: 10,
  },
  buttonText: { color: COLORS.white, fontWeight: 'bold' },
});