// app/job/Developer/game/[type]/index.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { COLORS } from '../../../../../constants/Colors';
import { developerTasks } from '../../../../../data/developerTasks';

export default function TaskListByType() {
  const { type } = useLocalSearchParams();
  const router = useRouter();
  const tasks = developerTasks.filter(t => t.type === type);

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
            <Text style={styles.taskTitle}>{item.title}</Text>
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
