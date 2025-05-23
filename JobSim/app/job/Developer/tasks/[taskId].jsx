import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { COLORS } from '../../../../constants/Colors';
import { developerTasks } from '../../../../data/developerTasks';

export default function TaskDetail() {
  const { taskId } = useLocalSearchParams();
  const task = developerTasks.find(t => t.id === taskId);

  const handleAnswer = (index) => {
    if (index === task.correctIndex) {
      Alert.alert("✅ Correct!", "Well done.");
    } else {
      Alert.alert("❌ Incorrect", "Try again.");
    }
  };

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Task not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.difficulty}>Difficulty: {task.difficulty}</Text>
      <View style={styles.codeBox}>
        <Text style={styles.code}>{task.question}</Text>
      </View>
      {task.options.map((opt, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionButton}
          onPress={() => handleAnswer(index)}
        >
          <Text style={styles.optionText}>{opt}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.white,
    minHeight: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.black,
  },
  difficulty: {
    marginBottom: 10,
    fontSize: 16,
    color: COLORS.gray,
  },
  codeBox: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  code: {
    fontFamily: 'monospace',
    color: '#333',
  },
  optionButton: {
    backgroundColor: COLORS.black,
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  }
});
