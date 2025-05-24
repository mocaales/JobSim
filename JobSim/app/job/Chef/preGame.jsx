import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import recipes from '../../../data/recipes';
import { COLORS } from '../../../constants/Colors';

export default function PreGame() {
  const router = useRouter();
  const [randomRecipes, setRandomRecipes] = useState([]);

  useEffect(() => {
    const shuffled = [...recipes].sort(() => 0.5 - Math.random());
    setRandomRecipes(shuffled.slice(0, 3));
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.header}>Choose a Recipe</Text>
      {randomRecipes.map((rec) => (
        <TouchableOpacity key={rec.id} style={styles.recipeButton} onPress={() => router.push(`/job/Chef/game?recipeId=${rec.id}`)}>
          <Text style={styles.recipeText}>{rec.title}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.push('/explore')}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 32, fontWeight: 'bold', marginBottom: 30, color: COLORS.black },
  recipeButton: {
    backgroundColor: '#fdd835',
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,
    width: 200,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  recipeText: { fontSize: 18, fontWeight: '600', color: '#000' },
  backBtn: { marginTop: 20 },
  backText: { color: COLORS.activeIcon, fontWeight: '500' },
});