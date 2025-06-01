// app/job/SpecUrgMed/quiz.jsx
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '../../../constants/Colors';
import { useUser } from '@clerk/clerk-expo';
import { saveResult } from '../../../hooks/saveResults';

const allQuestions = [
  { question: 'What is the most common cause of syncope in the elderly?', options: ['Cardiac arrhythmia', 'Neurological disorder', 'Hypotension', 'Medication side effects'], correct: 2 },
  { question: 'Which test is most accurate for diagnosing acute pancreatitis?', options: ['Serum amylase', 'Serum lipase', 'Abdominal ultrasound', 'CT scan'], correct: 1 },
  { question: 'Most common cause of acute renal failure in hospitalized patients?', options: ['Hypovolemia', 'Nephrotoxic drugs', 'Urinary obstruction', 'Infection'], correct: 1 },
  { question: 'Most common cause of anterior shoulder dislocation?', options: ['Trauma', 'Seizure', 'Electric shock', 'Overuse'], correct: 0 },
  { question: 'Common location of foreign body aspiration in kids?', options: ['Left bronchus', 'Right bronchus', 'Trachea', 'Esophagus'], correct: 1 },
  { question: 'Cause of primary adrenal insufficiency?', options: ['Autoimmune destruction', 'Infection', 'Cancer', 'Pituitary dysfunction'], correct: 0 },
  { question: 'Most common cause of newborn respiratory failure?', options: ['RDS', 'Meconium aspiration', 'CHD', 'Sepsis'], correct: 0 },
  { question: 'Cause of adult epiglottitis?', options: ['Haemophilus influenzae', 'Strep pneumoniae', 'Group A Strep', 'Staph aureus'], correct: 0 },
  { question: 'Most common cause of aortic aneurysm?', options: ['Atherosclerosis', 'Connective tissue disorders', 'Trauma', 'Infection'], correct: 0 },
  { question: 'Cause of thunderclap headache?', options: ['Subarachnoid haemorrhage', 'Meningitis', 'Venous thrombosis', 'CO poisoning'], correct: 0 },
  { question: 'Best treatment for acute cocaine toxicity?', options: ['Benzodiazepines', 'IV fluids', 'Sodium bicarb', 'Amphetamines'], correct: 2 },
  { question: 'Most common peripheral vertigo cause?', options: ['Vestibular neuritis', 'BPPV', 'Meniere’s', 'Stroke'], correct: 1 },
  { question: 'Best method to assess fluid responsiveness?', options: ['CVP', 'PAC', 'PLR test', 'TTE'], correct: 2 },
  { question: 'Most common cause of pancreatitis in ED?', options: ['Gallstones', 'Alcohol', 'Drugs', 'Virus'], correct: 0 },
  { question: 'Most effective opioid overdose treatment?', options: ['Naloxone', 'IV fluids', 'Benzodiazepines', 'Methadone'], correct: 0 },
  { question: 'Most common posterior ankle pain cause?', options: ['Achilles rupture', 'Plantar fasciitis', 'Posterior tibial tendonitis', 'Stress fracture'], correct: 0 },
  { question: 'Syncope in the ED most often due to?', options: ['Vasovagal', 'Arrhythmia', 'Hypotension', 'Seizure'], correct: 0 },
  { question: 'Cause of SVC syndrome?', options: ['Lung cancer', 'Lymphoma', 'Thymoma', 'Fibrosis'], correct: 0 },
  { question: 'Cause of spontaneous subarachnoid hemorrhage?', options: ['Cerebral aneurysm', 'AVM', 'Venous thrombosis', 'CAA'], correct: 0 },
  { question: 'Most common bacterial meningitis cause in adults?', options: ['Strep pneumoniae', 'Neisseria', 'H. influenzae', 'Listeria'], correct: 0 },
  { question: 'Most common cause of rhabdomyolysis?', options: ['Trauma', 'Drug-induced injury', 'Viral infections', 'Alcohol'], correct: 1 },
  { question: 'Most common cause of acute liver failure in US?', options: ['Hepatitis', 'Acetaminophen', 'Alcoholic liver disease', 'Autoimmune hepatitis'], correct: 1 },
  { question: 'Cause of pulmonary embolism?', options: ['DVT', 'Afib', 'Aortic aneurysm', 'Mitral stenosis'], correct: 0 },
  { question: 'Most common spinal cord injury cause?', options: ['MVAs', 'Falls', 'Violence', 'Sports'], correct: 1 },
  { question: 'Most common acute pericarditis cause?', options: ['Viral infection', 'RA', 'TB', 'Idiopathic'], correct: 0 },
  { question: 'Cause of hypopituitarism?', options: ['Pituitary adenoma', 'Head trauma', 'Radiation', 'Autoimmune'], correct: 0 }
];

export default function SpecUrgMedQuiz() {
  const router = useRouter();
  const { user } = useUser();
  const [quiz, setQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    setQuiz(shuffled.slice(0, 8));
  }, []);

  const handleSelect = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === quiz[index].correct) setScore(score + 1);
  };

  const handleNext = () => {
    if (index < quiz.length - 1) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  useEffect(() => {
    if (finished) {
      const sendData = async () => {
        try {
          await saveResult({
            userId: user?.id || 'guest',
            job: 'Emergency Medicine Specialist',
            score,
          });
          console.log('✅ Result saved to backend');
        } catch (err) {
          console.warn('⚠️ Failed to save result');
        }
      };
      sendData();
    }
  }, [finished]);

  if (!quiz.length) return null;
  const q = quiz[index];

  return (
    <SafeAreaView style={styles.safe}>
      {finished ? (
        <View style={styles.center}>
          <Text style={styles.header}>Quiz Completed</Text>
          <Text style={styles.score}>Score: {score} / {quiz.length}</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.button}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.header}>{index + 1}. {q.question}</Text>
          {q.options.map((opt, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.option,
                selected === i && (i === q.correct ? styles.correct : styles.wrong)
              ]}
              onPress={() => handleSelect(i)}
            >
              <Text>{opt}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={handleNext}
            style={[styles.button, { marginTop: 20 }]}
            disabled={selected === null}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, padding: 16 },
  header: { fontSize: 20, fontWeight: '600', marginBottom: 12 },
  option: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#eee',
    marginBottom: 10,
  },
  correct: { backgroundColor: '#d4edda' },
  wrong: { backgroundColor: '#f8d7da' },
  button: {
    backgroundColor: COLORS.activeIcon,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: COLORS.white, fontWeight: '600' },
  score: { fontSize: 18, fontWeight: '500', marginBottom: 16 },
});
