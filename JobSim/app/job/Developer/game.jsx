import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { COLORS } from '../../../constants/Colors';
import { developerTasks } from '../../../data/developerTasks';

export default function Game() {
  const router = useRouter();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.taskItem}
      onPress={() => router.push(`/job/Developer/tasks/${item.id}`)}
    >
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.difficulty}>Difficulty: {item.difficulty}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose a debugging task:</Text>
      <FlatList
        data={developerTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
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
