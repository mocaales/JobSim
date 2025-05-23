import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '../../../constants/Colors';

export default function DeveloperScreen() {
  const router = useRouter();

  const job = {
    title: 'Junior Developer',
    description:
      'A junior developer writes and maintains code, fixes bugs, and collaborates with teams to build and improve software. They often work under the supervision of senior developers and are responsible for implementing basic features and learning development workflows.',
    requirements: [
      'Basic knowledge of HTML, CSS, and JavaScript',
      'Understanding of version control (Git)',
      'Problem-solving mindset',
      'Ability to work in a team environment',
    ],
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>{job.title}</Text>
        <Text style={styles.description}>{job.description}</Text>

        <Text style={styles.subheader}>Requirements</Text>
        {job.requirements.map((req, i) => (
          <Text key={i} style={styles.bullet}>• {req}</Text>
        ))}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/job/Developer/quiz')}
          >
            <Text style={styles.buttonText}>Take the Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/job/Developer/game')}
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
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    padding: P,
    paddingBottom: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    color: COLORS.black,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 16,
    color: COLORS.black,
  },
  subheader: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    color: COLORS.black,
  },
  bullet: {
    fontSize: 16,
    marginBottom: 4,
    width: width - P * 2,
    color: COLORS.black,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: COLORS.activeIcon,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
  bottomBar: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    padding: 16,
    alignItems: 'center',
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  backText: {
    color: COLORS.activeIcon,
    fontSize: 16,
    fontWeight: '500',
  },
});
