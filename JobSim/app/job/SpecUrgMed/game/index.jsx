// app/job/SpecUrgMed/game/index.jsx
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '../../../../constants/Colors';

export default function GameIndex() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/job/SpecUrgMed/game/start')}
        >
          <Text style={styles.buttonText}>Begin Appendicitis Case</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  button: {
    backgroundColor: COLORS.activeIcon,
    padding: 16,
    borderRadius: 12
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600'
  }
});

