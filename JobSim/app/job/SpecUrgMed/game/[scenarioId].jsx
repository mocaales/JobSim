// 📄 app/job/SpecUrgMed/game/[scenarioId].jsx

import React, { useContext, useEffect } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { GameContext } from './GameContext';
import scenarios from './scenarios';
import { COLORS } from '../../../../constants/Colors';
import { useUser } from '@clerk/clerk-expo';

export default function ScenarioStep() {
  const router = useRouter();
  const { scenarioId } = useLocalSearchParams();
  const node = scenarios[scenarioId] || scenarios.start;
  const { flags, setFlag, pushVisited, visited } = useContext(GameContext);
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  useEffect(() => {
    pushVisited(node.id);
  }, [node.id]);

  const visible = Array.isArray(node.options)
    ? node.options.filter(
        o => !o.conditions || o.conditions.every(c => !!flags?.[c])
      )
    : [];

  const handleScenarioComplete = async () => {
    if (!email) return;
    let scenarioName = node.id;
    if (scenarioName === 'start') scenarioName = 'Abdomen pain';
    else if (scenarioName === 'chestpain_start') scenarioName = 'Chest pain';
    else if (scenarioName === 'polytrauma_start') scenarioName = 'Polytrauma';

    
    const minStepsMap = {
      'Abdomen pain': 6,
      'Chest pain': 7,   
      'Polytrauma': 7
    };
    let points = 0;
    // node.title če najde Success se shrani 10točk +3, če min koraki
    const isSuccess = node.title?.includes('Success') || node.text?.includes('Appendectomy successful');
    if (isSuccess) {
      points = 10;
      const minSteps = minStepsMap[scenarioName];
      if (minSteps && visited.length === minSteps) {
        points += 3;
      }
    }
    try {
      await fetch(process.env.EXPO_PUBLIC_API_URL + '/game/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          job: 'Emergency Medicine Specialist',
          scenario: scenarioName,
          points,
        }),
      });
      const data = await response.json();
      console.log('✅ Scenario result saved:', data);
    } catch (err) {
      console.warn('⚠️ Failed to save scenario result:', err);
    }
  };

  useEffect(() => {
    if (visible.length === 0) handleScenarioComplete();
  }, [visible]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {node.title && <Text style={styles.title}>{node.title}</Text>}
      {node.image && <Image source={node.image} style={styles.image} />}
      <Text style={styles.text}>{node.text}</Text>

      {visible.map((opt, i) => (
        <TouchableOpacity
          key={i}
          style={styles.option}
          onPress={() => {
            if (opt.set) {
              Object.entries(opt.set).forEach(([k, v]) =>
                setFlag(k, v)
              );
            }
            router.push(`/job/SpecUrgMed/game/${opt.next}`);
          }}
        >
          <Text style={styles.optionText}>{opt.label}</Text>
        </TouchableOpacity>
      ))}

      {visible.length === 0 && (
        <>
          <Text style={styles.endText}>✅ Case Complete</Text>
          <TouchableOpacity
            style={styles.restart}
            onPress={() => router.push('/job/SpecUrgMed/game')}
          >
            <Text style={styles.restartText}>Back to Cases</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    color: COLORS.primary,
  },
  image: {
    width: '100%',
    height: 280, // 40% več kot prej (200 * 1.4 = 280)
    marginBottom: 12,
    borderRadius: 8,
    resizeMode: 'contain',
    backgroundColor: 'transparent', // odstrani sivino/okvir
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    color: COLORS.black,
  },
  option: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  optionText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: '600',
  },
  restart: {
    marginTop: 20,
    padding: 14,
    borderRadius: 8,
    borderColor: COLORS.gray,
    borderWidth: 1,
  },
  restartText: {
    color: COLORS.gray,
    fontSize: 16,
    textAlign: 'center',
  },
  endText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primary,
    textAlign: 'center',
  },
});
