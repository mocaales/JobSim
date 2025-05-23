import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { COLORS } from '../../../constants/Colors';

export default function DeveloperScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Junior Developer</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/job/Developer/quiz')}>
        <Text style={styles.buttonText}>Start Quiz</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/job/Developer/game')}>
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: COLORS.black,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
