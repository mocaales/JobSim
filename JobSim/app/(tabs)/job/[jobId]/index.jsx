import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { COLORS } from '../../../../constants/Colors';
import jobs from '../../../../data/jobs';

export default function JobDetail() {
  const { jobId } = useLocalSearchParams();
  const router = useRouter();
  const data = jobs[jobId] || {};

  if (!data.title) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Job “{jobId}” not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>{data.title}</Text>
        <Text style={styles.description}>{data.description}</Text>

        <Text style={styles.subheader}>Requirements</Text>
        {data.requirements.map((req, i) => (
          <Text key={i} style={styles.bullet}>
            • {req}
          </Text>
        ))}

        {/* Button row */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push(`/job/${jobId}/quiz`)}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Take the Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push(`/job/${jobId}/game`)}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Start the Game</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');
const P = 16;
const BUTTON_HEIGHT = 60;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    padding: P,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
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
    textAlign: 'justify',
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
    height: BUTTON_HEIGHT,
    marginHorizontal: 4,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    // shadows for iOS
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    // elevation for Android
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.activeIcon,
  },
});
