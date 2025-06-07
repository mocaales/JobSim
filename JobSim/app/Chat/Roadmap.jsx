import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 60;

export default function Roadmap() {
  const router = useRouter();
  const { roadmap_id } = useLocalSearchParams();
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (roadmap_id) {
      setLoading(true);
      fetch(`${process.env.EXPO_PUBLIC_API_URL}/roadmap/${roadmap_id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) throw new Error(data.error);
          setRoadmap(data);
        })
        .catch(() => setError('⚠️ Failed to load roadmap.'))
        .finally(() => setLoading(false));
    }
  }, [roadmap_id]);

  const handleGenerate = async () => {
    if (!role || !email) return;

    setLoading(true);
    setError(null);
    setRoadmap(null);

    try {
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/roadmap/generate?role=${encodeURIComponent(role)}&user_id=${email}`,
        { method: 'POST' }
      );

      const data = await res.json();
      if (data.error || !data.steps) throw new Error(data.error || 'Failed to generate roadmap.');
      setRoadmap(data);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>📍 Career Roadmap</Text>

        {!roadmap && (
          <>
            <TextInput
              placeholder="e.g. Full stack react developer"
              value={role}
              onChangeText={setRole}
              placeholderTextColor="#888"
              style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={handleGenerate}>
              <Text style={styles.buttonText}>Generate</Text>
            </TouchableOpacity>
          </>
        )}

        {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} color="#444" />}
        {error && <Text style={styles.error}>{error}</Text>}

        {roadmap && (
          <>
            <Text style={styles.roadmapTitle}>{roadmap.title}</Text>
            <Text style={styles.description}>{roadmap.description}</Text>
            <Text style={styles.duration}>⏳ Duration: {roadmap.duration}</Text>

            {roadmap.steps.map((step, idx) => (
              <View key={idx} style={styles.flowStep}>
                {idx !== 0 && <View style={styles.verticalLine} />}
                <View style={styles.card}>
                  <Text style={styles.stepTitle}>{`${idx + 1}. ${step.title}`}</Text>
                  <Text style={styles.stepDescription}>{step.description}</Text>
                </View>
              </View>
            ))}
          </>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push('/chat')}>
          <Text style={styles.backText}>← Back to Chat Hub</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: '#111',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 12,
    width: '100%',
    color: '#000',
  },
  button: {
    backgroundColor: '#FBBF24',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#111',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 12,
  },
  roadmapTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
    color: '#000',
  },
  description: {
    fontSize: 15,
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  duration: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  flowStep: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  verticalLine: {
    position: 'absolute',
    top: -20,
    width: 2,
    height: 20,
    backgroundColor: '#e0e0e0',
    zIndex: -1,
  },
  card: {
    backgroundColor: '#FFF8DC',
    padding: 16,
    borderRadius: 14,
    width: CARD_WIDTH,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  stepTitle: {
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 6,
    color: '#111',
  },
  stepDescription: {
    fontSize: 14,
    color: '#333',
  },
  footer: {
    paddingVertical: 16,
    alignItems: 'center',
    borderTopColor: '#eee',
    borderTopWidth: 1,
    backgroundColor: '#fff',
  },
  backText: {
    color: '#111',
    fontSize: 16,
    fontWeight: '500',
  },
});