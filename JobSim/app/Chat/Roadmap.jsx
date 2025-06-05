import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function RoadmapGenerator() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🗺️ Career Roadmap Generator</Text>
      <Text style={styles.subtitle}>Tu bo kasneje ustvarjanje kariernih roadmapov.</Text>

      <TouchableOpacity onPress={() => router.push('/chat')} style={styles.back}>
        <Text style={styles.backText}>← Back to Chat Hub</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
  subtitle: { fontSize: 16, color: '#555' },
  back: { marginTop: 40 },
  backText: { color: '#007aff', fontSize: 16 },
});