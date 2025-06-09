// app/(tabs)/HelpPage.jsx

import React from 'react';
import { SafeAreaView, ScrollView, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/Colors';

export default function HelpPage() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>How JobSim Works</Text>

        <Text style={styles.sectionTitle}>1. Explore Careers</Text>
        <Text style={styles.paragraph}>
          Tap “Explore” in the bottom menu to see a searchable list of available jobs. Each card shows a job icon and title.  
          You can filter by category or keywords, then tap any job to view its details.
        </Text>

        <Text style={styles.sectionTitle}>2. Take Quizzes</Text>
        <Text style={styles.paragraph}>
          On any job’s detail screen, press “Take the Quiz.”  
          Each quiz has multiple choice questions specific to that profession.  
          Your score is saved to your account, and you can see your percentage back on the Home screen’s donut chart.
        </Text>

        <Text style={styles.sectionTitle}>3. Play Games</Text>
        <Text style={styles.paragraph}>
          Below the quiz button, tap “Start the Game.”  
          In dispatcher, for example, you draw a path from the hospital to the caller on a map.  
          The app measures your route length against the optimal route and shows your efficiency.
        </Text>

        <Text style={styles.sectionTitle}>4. Track Your Progress</Text>
        <Text style={styles.paragraph}>
          On the Home tab, your quiz results appear as a donut chart.  
          The percentage represents your average across all quizzes taken (or filtered by job).  
          In the Games Leaderboard section, you can see top times for each game/difficulty or recipe.
        </Text>

        <Text style={styles.sectionTitle}>5. Profile & Settings</Text>
        <Text style={styles.paragraph}>
          Tap “Profile” to view your avatar, name, and email.  
          To update them, select “Profile” again and use the Edit form.  
          “Settings” (coming soon) will let you adjust preferences.  
          “Help” (this page) explains these features, and “Logout” signs you out.
        </Text>

        <Text style={styles.footer}>
          We hope JobSim helps you explore careers, practice job-specific quizzes, and enjoy interactive simulations.  
          If you have further questions, reach out via our support email.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  content: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: COLORS.black,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    color: COLORS.activeIcon,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    color: COLORS.black,
  },
  footer: {
    marginTop: 24,
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
});
