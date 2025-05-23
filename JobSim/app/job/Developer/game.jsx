import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { COLORS } from '../../../constants/Colors';

const TASKS = [
  { id: '1', title: 'Popravi funkcijo seštevanja', difficulty: 1 },
  { id: '2', title: 'Uredi pogojni stavek', difficulty: 2 },
  { id: '3', title: 'Popravi zanko', difficulty: 3 },
  { id: '4', title: 'Popravi format JSON', difficulty: 2 },
  { id: '5', title: 'Fix array destructuring', difficulty: 1 },
  { id: '6', title: 'Napaka v API klicu', difficulty: 3 },
  { id: '7', title: 'Zamenjan operator', difficulty: 1 },
  { id: '8', title: 'Neveljaven import', difficulty: 2 },
  { id: '9', title: 'Manjkajoča ključna beseda', difficulty: 3 },
  { id: '10', title: 'Neveljaven return', difficulty: 2 },
];

export default function Game() {
  const router = useRouter();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.taskItem}
      onPress={() => router.push(`/job/Developer/tasks/${item.id}`)}
    >
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.difficulty}>Zahtevnost: {item.difficulty}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Izberi nalogo za odpravljanje napake:</Text>
      <FlatList
        data={TASKS}
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
