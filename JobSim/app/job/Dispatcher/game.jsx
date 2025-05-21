import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/Colors';

export default function DispatcherGame() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.header}>Dispatcher Game</Text>
        <Text style={styles.description}>
          Tukaj bo interaktivna simulacija za dispatcherja.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    color: COLORS.black,
  },
  description: {
    fontSize: 16,
    color: COLORS.black,
    textAlign: 'center',
  },
});