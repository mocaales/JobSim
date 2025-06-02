import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '../../../constants/Colors';

export default function ChefScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Chef</Text>
        <Text style={styles.description}>Prepare delicious recipes and challenge your memory and skills!</Text>

        <Text style={styles.subheader}>Requirements</Text>
        <Text style={styles.bullet}>• Good memory and quick hands</Text>
        <Text style={styles.bullet}>• Basic cooking knowledge</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/job/Chef/quiz')}
          >
            <Text style={styles.buttonText}>Take the Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/job/Chef/preGame')}
          >
            <Text style={styles.buttonText}>Start the Game</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => router.push('/explore')} style={styles.backButton}>
          <Text style={styles.backText}>← Back to Explore</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');
const P = 16;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },
  content: { padding: P, paddingBottom: 40 },
  header: { fontSize: 24, fontWeight: '700', marginBottom: 12, color: COLORS.black, textAlign: 'center' },
  description: { fontSize: 16, lineHeight: 22, marginBottom: 16, color: COLORS.black },
  subheader: { fontSize: 20, fontWeight: '600', marginBottom: 8, color: COLORS.black },
  bullet: { fontSize: 16, marginBottom: 4, width: width - P * 2, color: COLORS.black },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 },
  button: { flex: 1, marginHorizontal: 4, backgroundColor: COLORS.activeIcon, borderRadius: 12, padding: 16, alignItems: 'center' },
  buttonText: { fontSize: 16, fontWeight: '600', color: COLORS.white },
  bottomBar: { borderTopWidth: 1, borderTopColor: '#ddd', padding: 16, alignItems: 'center' },
  backButton: { paddingVertical: 12, paddingHorizontal: 24 },
  backText: { color: COLORS.activeIcon, fontSize: 16, fontWeight: '500' },
});