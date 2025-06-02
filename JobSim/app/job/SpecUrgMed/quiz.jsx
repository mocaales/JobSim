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
  { question: 'What is the first-line treatment for anaphylaxis?', options: ['Antihistamines', 'Epinephrine', 'Steroids', 'Oxygen therapy'], correct: 1 },
  { question: 'Which ECG finding is most indicative of hyperkalemia?', options: ['Peaked T waves', 'ST depression', 'Prolonged QT interval', 'U waves'], correct: 0 },
  { question: 'What is the most common cause of upper gastrointestinal bleeding?', options: ['Peptic ulcer disease', 'Esophageal varices', 'Gastric cancer', 'Mallory-Weiss tear'], correct: 0 },
  { question: 'Which of the following is a contraindication for thrombolytic therapy in stroke?', options: ['Onset of symptoms 2 hours ago', 'Blood pressure 180/100 mmHg', 'Recent intracranial hemorrhage', 'Age over 80'], correct: 2 },
  { question: 'What is the preferred imaging modality for suspected pulmonary embolism?', options: ['Chest X-ray', 'CT pulmonary angiography', 'Ventilation-perfusion scan', 'MRI'], correct: 1 },
  { question: 'Which of the following is a classic sign of cardiac tamponade?', options: ['Pulsus paradoxus', 'Bradycardia', 'Hypertension', 'Bounding pulses'], correct: 0 },
  { question: 'In trauma patients, what does the "lethal triad" consist of?', options: ['Hypothermia, acidosis, coagulopathy', 'Hypotension, tachycardia, anemia', 'Hypoxia, hypercapnia, alkalosis', 'Bradycardia, hypothermia, hypoglycemia'], correct: 0 },
  { question: 'What is the most common cause of community-acquired pneumonia?', options: ['Streptococcus pneumoniae', 'Mycoplasma pneumoniae', 'Haemophilus influenzae', 'Legionella pneumophila'], correct: 0 },
  { question: 'Which of the following is the antidote for acetaminophen overdose?', options: ['N-acetylcysteine', 'Atropine', 'Flumazenil', 'Naloxone'], correct: 0 },
  { question: 'What is the initial management step for a tension pneumothorax?', options: ['Needle decompression', 'Chest tube placement', 'Intubation', 'High-flow oxygen'], correct: 0 },
  { question: 'Which electrolyte imbalance is commonly seen in tumor lysis syndrome?', options: ['Hyperkalemia', 'Hypocalcemia', 'Hyperphosphatemia', 'All of the above'], correct: 3 },
  { question: 'What is the most appropriate initial fluid for resuscitation in hypovolemic shock?', options: ['Normal saline', 'Dextrose 5%', 'Lactated Ringer’s', 'Half-normal saline'], correct: 0 },
  { question: 'Which of the following is a sign of basilar skull fracture?', options: ['Battle’s sign', 'Hoffman’s sign', 'Babinski sign', 'Kernig’s sign'], correct: 0 },
  { question: 'What is the Glasgow Coma Scale (GCS) score for a patient who opens eyes to pain, makes incomprehensible sounds, and withdraws from pain?', options: ['6', '7', '8', '9'], correct: 2 },
  { question: 'Which of the following is the most common cause of urinary tract infections?', options: ['Escherichia coli', 'Klebsiella pneumoniae', 'Proteus mirabilis', 'Enterococcus faecalis'], correct: 0 },
  { question: 'What is the first-line treatment for status epilepticus?', options: ['Lorazepam', 'Phenytoin', 'Valproic acid', 'Phenobarbital'], correct: 0 },
  { question: 'Which of the following is a contraindication for lumbar puncture?', options: ['Increased intracranial pressure', 'Fever', 'Headache', 'Neck stiffness'], correct: 0 },
  { question: 'What is the most common cause of acute pancreatitis?', options: ['Gallstones', 'Alcohol', 'Hypertriglyceridemia', 'Medications'], correct: 0 },
  { question: 'Which of the following is the most sensitive marker for myocardial infarction?', options: ['Troponin I', 'CK-MB', 'Myoglobin', 'LDH'], correct: 0 },
  { question: 'What is the antidote for benzodiazepine overdose?', options: ['Flumazenil', 'Naloxone', 'Atropine', 'Physostigmine'], correct: 0 },
  { question: 'Which of the following is a sign of peritonitis?', options: ['Rebound tenderness', 'Bradycardia', 'Hypotension', 'Jaundice'], correct: 0 },
  { question: 'What is the most common cause of lower gastrointestinal bleeding in adults?', options: ['Diverticulosis', 'Hemorrhoids', 'Colon cancer', 'Ulcerative colitis'], correct: 0 },
  { question: 'Which of the following is the best initial test for suspected deep vein thrombosis?', options: ['Doppler ultrasound', 'D-dimer', 'Venography', 'MRI'], correct: 0 },
  { question: 'What is the most appropriate treatment for a patient with symptomatic bradycardia?', options: ['Atropine', 'Epinephrine', 'Amiodarone', 'Lidocaine'], correct: 0 },
  { question: 'Which of the following is the first-line treatment for symptomatic bradycardia?', options: ['Atropine', 'Epinephrine', 'Dopamine', 'Amiodarone'], correct: 0 },
  { question: 'Which test is most useful for diagnosing pulmonary embolism?', options: ['CT Pulmonary Angiography', 'V/Q Scan', 'Chest X-ray', 'EKG'], correct: 0 },
  { question: 'Which electrolyte abnormality is associated with QT prolongation?', options: ['Hypokalemia', 'Hypernatremia', 'Hypomagnesemia', 'Hypercalcemia'], correct: 0 },
  { question: 'Most common cause of hospital-acquired pneumonia?', options: ['Pseudomonas aeruginosa', 'Klebsiella pneumoniae', 'MRSA', 'E. coli'], correct: 0 },
  { question: 'What is Beck’s triad in cardiac tamponade?', options: ['Hypotension, muffled heart sounds, JVD', 'Bradycardia, hypertension, irregular pulse', 'Chest pain, palpitations, syncope', 'Shortness of breath, chest pain, wheezing'], correct: 0 },
  { question: 'What is the initial management of a suspected stroke?', options: ['CT Head', 'MRI Brain', 'ECG', 'EEG'], correct: 0 },
  { question: 'What is the most common cause of aortic dissection?', options: ['Hypertension', 'Marfan syndrome', 'Trauma', 'Atherosclerosis'], correct: 0 },
  { question: 'What is the antidote for warfarin overdose?', options: ['Vitamin K', 'Protamine sulfate', 'FFP', 'Atropine'], correct: 0 },
  { question: 'Which of the following is a typical finding in DKA?', options: ['Hyperglycemia', 'Hypokalemia', 'Alkalosis', 'Bradycardia'], correct: 0 },
  { question: 'What is the hallmark ECG finding in hyperkalemia?', options: ['Peaked T waves', 'ST depression', 'Prolonged QT', 'PR prolongation'], correct: 0 },
  { question: 'What is the most common site of nosebleeds?', options: ['Kiesselbach’s plexus', 'Woodruff’s plexus', 'Posterior ethmoid artery', 'Sphenopalatine artery'], correct: 0 },
  { question: 'First-line treatment for hypertensive emergency?', options: ['Nicardipine', 'Lisinopril', 'Furosemide', 'Atenolol'], correct: 0 },
  { question: 'Which organism causes gas gangrene?', options: ['Clostridium perfringens', 'Staphylococcus aureus', 'E. coli', 'Pseudomonas aeruginosa'], correct: 0 },
  { question: 'Which of the following is the antidote for methanol poisoning?', options: ['Fomepizole', 'Ethanol', 'Sodium bicarb', 'Flumazenil'], correct: 0 },
  { question: 'Which clinical sign is classic for meningitis?', options: ['Kernig’s sign', 'Babinski sign', 'Hoffman’s sign', 'Brudzinski’s sign'], correct: 3 },
  { question: 'What is the most common cause of secondary hypertension?', options: ['Renal artery stenosis', 'Pheochromocytoma', 'Hyperaldosteronism', 'Cushing’s syndrome'], correct: 0 },
  { question: 'Which of the following is a contraindication to thrombolysis in stroke?', options: ['Uncontrolled hypertension', 'Diabetes', 'Age over 80', 'Atrial fibrillation'], correct: 0 },
  { question: 'What is the most common site of ischemic stroke?', options: ['Middle cerebral artery', 'Posterior cerebral artery', 'Basilar artery', 'Anterior cerebral artery'], correct: 0 },
  { question: 'Which of the following is the first-line agent for anaphylaxis?', options: ['Epinephrine', 'Antihistamines', 'Steroids', 'Beta-blockers'], correct: 0 },
  { question: 'Which of the following is most associated with Wernicke’s encephalopathy?', options: ['Thiamine deficiency', 'Niacin deficiency', 'Vitamin B12 deficiency', 'Folate deficiency'], correct: 0 },
  { question: 'What is the initial treatment for hypercalcemia?', options: ['IV fluids', 'Bisphosphonates', 'Calcitonin', 'Loop diuretics'], correct: 0 },
  { question: 'Which arrhythmia is associated with a delta wave on ECG?', options: ['Wolff-Parkinson-White', 'Atrial flutter', 'Ventricular tachycardia', 'Brugada syndrome'], correct: 0 },
  { question: 'What is the most common cause of epidural hematoma?', options: ['Rupture of middle meningeal artery', 'Rupture of bridging veins', 'Hypertensive hemorrhage', 'AVM'], correct: 0 },
  { question: 'Which sign is suggestive of peritonitis?', options: ['Rebound tenderness', 'Homan’s sign', 'Murphy’s sign', 'Tinel’s sign'], correct: 0 },
  { question: 'Most common cause of lower GI bleeding in adults?', options: ['Diverticulosis', 'Hemorrhoids', 'Colon cancer', 'IBD'], correct: 0 },
  { question: 'What is the initial imaging of choice for kidney stones?', options: ['Non-contrast CT', 'Ultrasound', 'KUB X-ray', 'MRI'], correct: 0 },
  { question: 'Which nerve is most commonly injured in humeral shaft fractures?', options: ['Radial nerve', 'Median nerve', 'Ulnar nerve', 'Axillary nerve'], correct: 0 },
  { question: 'First-line management of hyperkalemia with ECG changes?', options: ['Calcium gluconate', 'Insulin with glucose', 'Kayexalate', 'Loop diuretics'], correct: 0 },
  { question: 'What is the classic finding of Brown-Sequard syndrome?', options: ['Ipsilateral motor loss, contralateral pain and temperature loss', 'Bilateral motor loss', 'Contralateral motor loss', 'Ipsilateral pain and temperature loss'], correct: 0 },
  { question: 'Which of the following is the most common cause of community-acquired pneumonia?', options: ['Streptococcus pneumoniae', 'Klebsiella pneumoniae', 'Mycoplasma pneumoniae', 'Legionella'], correct: 0 },
  { question: 'What is the most common cause of spontaneous bacterial peritonitis?', options: ['E. coli', 'Klebsiella', 'Streptococcus', 'Pseudomonas'], correct: 0 },
  { question: 'Which of the following is the antidote for organophosphate poisoning?', options: ['Atropine', 'Pralidoxime', 'Both', 'Naloxone'], correct: 2 },
  { question: 'Most common fracture in children?', options: ['Clavicle', 'Radius', 'Tibia', 'Femur'], correct: 0 },
  { question: 'Which is the most common cause of acute kidney injury in hospitalized patients?', options: ['Acute tubular necrosis', 'Glomerulonephritis', 'Interstitial nephritis', 'Prerenal azotemia'], correct: 0 }
];

export default function SpecUrgMedQuiz() {
  const router = useRouter();
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  const [quiz] = useState(() => {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 5) + 8);
  });

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

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
    if (finished && email) {
      const sendData = async () => {
        try {
          const response = await fetch(process.env.EXPO_PUBLIC_API_URL + '/quiz/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email,
              job: 'Emergency Medicine Specialist', 
              score,
              total: quiz.length 
            }),
          });
          const data = await response.json();
          console.log('✅ Result saved:', data);
        } catch (err) {
          console.warn('⚠️ Failed to save result:', err);
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
          <Text style={styles.score}>Percentage: {Math.round((score / quiz.length) * 100)}%</Text>
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