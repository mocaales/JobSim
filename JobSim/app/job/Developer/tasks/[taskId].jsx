// app/job/Developer/tasks/[taskId].jsx or appropriate path
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { useLocalSearchParams } from 'expo-router';
import { COLORS } from '../../../../constants/Colors';
import { developerTasks } from '../../../../data/developerTasks';
import { useUser } from '@clerk/clerk-expo'; 
import CodeBlock from '../../../../components/CodeBlock';
import { FontAwesome } from '@expo/vector-icons';

export default function TaskDetail() {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  const { taskId } = useLocalSearchParams();
  const task = developerTasks.find((t) => t.id === taskId);

  const [startTime] = useState(Date.now());

  const submitDeveloperGameResult = async () => {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const score = task?.difficulty || 1;
    try {
      await fetch(`${process.env.EXPO_PUBLIC_API_URL}/game/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          game: 'junior_developer',
          time: timeTaken,
          score
        })
      });
    } catch (err) {
      console.error("Failed to submit result", err);
    }
  };


  const handleAnswer = async (index) => {
    const isCorrect = index === task.correctIndex;
    if (isCorrect) {
      Alert.alert('✅ Correct!', 'Well done.');
      await submitDeveloperGameResult();
    } else {
      Alert.alert('❌ Incorrect', 'Try again.');
    }
  };



  // Arrange mode
  const [order, setOrder] = useState(task?.shuffled ?? []);
  const [hintVisible, setHintVisible] = useState(false);
  const [checkingOrder, setCheckingOrder] = useState(false);
  const [hintStates, setHintStates] = useState([]); // shrani pravilnost posamezne vrstice
  if (task?.type === 'arrange') {
    // Helper: for each line in order, find its nth occurrence in shuffled
    function getShuffledIndex(line, orderIdx, orderArr, shuffledArr) {
      let countInOrder = 0;
      for (let i = 0; i <= orderIdx; i++) {
        if (orderArr[i] === line) countInOrder++;
      }
      // Now find the nth occurrence in shuffled
      let countInShuffled = 0;
      for (let j = 0; j < shuffledArr.length; j++) {
        if (shuffledArr[j] === line) {
          countInShuffled++;
          if (countInShuffled === countInOrder) {
            return j;
          }
        }
      }
      return -1; // Should not happen
    }

    const checkOrder = async () => {
      if (checkingOrder) return;
      setCheckingOrder(true);
      const allCorrect = order.every((line, i) => line === task.lines[i]);
      Alert.alert(allCorrect ? '✅ Correct!' : '❌ Incorrect');
      submitDeveloperGameResult();
      setCheckingOrder(false);
    };

    const showHint = () => {
      // Per-line correctness: green if correct, red if not
      const states = order.map((line, i) => line === task.lines[i]);
      setHintStates(states);
      setHintVisible(true);
      setTimeout(() => {
        setHintVisible(false);
        setHintStates([]);
      }, 2000);
    };
    return (
      <View style={styles.arrangeContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.title}>{task.title}</Text>
          <TouchableOpacity onPress={showHint} style={styles.hintIcon} accessibilityLabel="Namig">
            <FontAwesome name="lightbulb-o" size={26} color={hintVisible ? '#ffe066' : '#bbb'} />
          </TouchableOpacity>
        </View>
        <CodeBlock code={order.join('\n')} style={{marginBottom: 8}} scrollable={false} />
        <View style={styles.arrangeScrollArea}>
          <DraggableFlatList
            data={order}
            keyExtractor={(item) => item}
            onDragEnd={({ data }) => setOrder(data)}
            activationDistance={10}
            renderItem={({ item, index, drag, isActive }) => {
              let itemStyle = styles.arrangeItem;
              if (hintVisible && Array.isArray(hintStates) && hintStates.length === order.length) {
                if (hintStates[index]) {
                  itemStyle = [styles.arrangeItem, styles.correctItem];
                } else {
                  itemStyle = [styles.arrangeItem, styles.wrongItem];
                }
              } else if (isActive) {
                itemStyle = [styles.arrangeItem, { backgroundColor: '#ddd' }];
              }
              return (
                <TouchableOpacity
                  style={itemStyle}
                  onLongPress={drag}
                >
                  <Text style={styles.arrangeText}>{item}</Text>
                </TouchableOpacity>
              );
            }}
          />
          <TouchableOpacity style={[styles.checkButton, checkingOrder && { opacity: 0.5 }]} onPress={checkOrder} disabled={checkingOrder}>
            <Text style={styles.checkText}>Preveri vrstni red</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Task not found.</Text>
      </View>
    );
  }

  // Default modes: multiple-choice, output, completion
  const { width } = Dimensions.get('window');
  const codeBoxHeight = 200;
  return (
    <View style={styles.defaultContainer}>
      <Text style={styles.title}>{task.title}</Text>
      {task.difficulty != null && (
        <Text style={styles.difficulty}>Difficulty: {task.difficulty}</Text>
      )}
      {/* Group code and options together so options are always directly under code */}
      <View style={{ width: width - 40, alignSelf: 'center' }}>
        <CodeBlock code={task.question} style={{ minHeight: codeBoxHeight }} />
        {task.options?.map((opt, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => handleAnswer(index)}
          >
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  arrangeContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white
  },
  arrangeScrollArea: {
    flex: 1,
    minHeight: 200,
    maxHeight: 420,
    // Optionally add padding or margin if needed
  },
  defaultContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.black
  },
  difficulty: {
    marginBottom: 10,
    fontSize: 16,
    color: COLORS.gray
  },
  codeBox: {
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden'
  },
  optionButton: {
    backgroundColor: COLORS.black,
    padding: 12,
    borderRadius: 8,
    marginVertical: 6
  },
  optionText: {
    color: 'white',
    fontSize: 16
  },
  arrangeItem: {
    padding: 16,
    marginVertical: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 6
  },
  correctItem: {
    backgroundColor: '#b6f5c6',
  },
  wrongItem: {
    backgroundColor: '#ffd6d6',
  },
  hintIcon: {
    marginLeft: 10,
    padding: 4,
  },
  arrangeText: {
    fontFamily: 'monospace'
  },
  checkButton: {
    marginTop: 20,
    padding: 14,
    backgroundColor: COLORS.black,
    borderRadius: 8,
    alignItems: 'center'
  },
  checkText: {
    color: 'white',
    fontWeight: '600'
  }
});
