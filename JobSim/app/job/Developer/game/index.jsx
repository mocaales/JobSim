// app/job/Developer/game/index.jsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '../../../../constants/Colors';

// Define modes with positions, sizes and labels
const MODES = [
  {
    key: 'multiple-choice',
    label: 'Debug\nCode',
    color: COLORS.primary,
    size: 100,
    position: { top: 40, left: 30 }
  },
  {
    key: 'output',
    label: 'Predict\nOutput',
    color: COLORS.success,
    size: 120,
    position: { top: 200, right: 40 }
  },
  {
    key: 'completion',
    label: 'Fill in\nBlanks',
    color: COLORS.accent,
    size: 90,
    position: { top: 350, left: 60 }
  },
  {
    key: 'arrange',
    label: 'Arrange\nLines',
    color: COLORS.secondary,
    size: 110,
    position: { top: 500, right: 80 }
  }
];

export default function GameModes() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {MODES.map((mode) => (
        <TouchableOpacity
          key={mode.key}
          activeOpacity={0.8}
          style={[
            styles.circle,
            {
              backgroundColor: mode.color,
              width: mode.size,
              height: mode.size,
              borderRadius: mode.size / 2,
              ...mode.position
            }
          ]}
          onPress={() => router.push(`/job/Developer/game/${mode.key}`)}
        >
          <Text style={[styles.text, { fontSize: mode.size / 6 }]}>
            {mode.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  circle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: COLORS.black,
    fontWeight: '600',
    textAlign: 'center'
  }
});
