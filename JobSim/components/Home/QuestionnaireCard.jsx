import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function QuestionnaireCard() {
  const router = useRouter();

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => router.push('/questionnaire/Questionnaire')}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <FontAwesome name="question-circle-o" size={24} color="#111" />
      </View>
      <Text style={styles.title}>Take the Quiz</Text>
      <FontAwesome name="chevron-right" size={18} color="#111" style={styles.chevron} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 16,
    marginTop: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 99,
    padding: 10,
    marginRight: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  chevron: {
    marginLeft: 10,
  },
});