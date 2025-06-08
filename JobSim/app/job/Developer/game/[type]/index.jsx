// app/job/Developer/game/[type]/index.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { COLORS } from '../../../../../constants/Colors';
import { developerTasks } from '../../../../../data/developerTasks';

export default function TaskListByType() {
  const { type } = useLocalSearchParams();
  const router = useRouter();
  // Popravek: prikaži vse fill-in-the-blank in completion igre pod 'Fill in Blanks'
  const tasks = type === 'completion'
    ? developerTasks.filter(t => t.type === 'completion' || t.type === 'fill-in-the-blank')
    : type === 'general-knowledge'
      ? developerTasks.filter(t => t.category === 'general-knowledge')
      : developerTasks.filter(t => t.type === type);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose a Task</Text>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.taskItem}
            onPress={() => router.push(`/job/Developer/tasks/${item.id}`)}
          >
            <Text style={styles.taskTitle}>{item.title.replace(/^Predict Output: /i, '').replace(/^Fill in the blank: /i, '').replace(/\b\w/g, l => l.toUpperCase())}</Text>
            <Text style={styles.taskDifficulty}>Difficulty: {item.difficulty}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: COLORS.white },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: COLORS.black },
  taskItem: { padding: 16, borderRadius: 10, backgroundColor: '#f2f2f2', marginBottom: 12 },
  taskTitle: { fontSize: 16, fontWeight: '600', color: COLORS.black },
  difficulty: { fontSize: 14, color: COLORS.black },
});
