import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import { useLocalSearchParams } from 'expo-router';

export default function ResumeAnalyzer() {
  const router = useRouter();
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [evaluation, setEvaluation] = useState(null);
  const { resume_id } = useLocalSearchParams();

  useEffect(() => {
    if (resume_id) {
      fetch(`${process.env.EXPO_PUBLIC_API_URL}/resume/result/${resume_id}`)
        .then(res => res.json())
        .then(data => {
          setEvaluation({
            score: data.overall_score,
            sections: data.sections,
            tips: data.tips,
            good: data.good,
            improvements: data.improvements,
          });
          setResumeFile({ name: data.filename });
        })
        .catch(err => setError("Failed to load resume result"));
    }
  }, [resume_id]);

  const handlePickDocument = async () => {
    setError(null);
    setEvaluation(null);
    setResumeFile(null);

    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: true,
    });

    if (result?.assets?.length > 0) {
      const file = result.assets[0];
      setResumeFile({
        uri: file.uri,
        name: file.name || 'resume.pdf',
        type: file.mimeType || 'application/pdf',
      });
    }
  };

  const handleAnalyze = async () => {
    if (!resumeFile || !email) {
      setError('Missing file or user info');
      return;
    }

    setLoading(true);
    setError(null);
    setEvaluation(null);

    try {
      const formData = new FormData();
      formData.append('file', resumeFile);
      formData.append('user_id', email);

      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/resume/analyze?user_id=${email}`, {
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setEvaluation({
        score: data.overall_score,
        sections: data.sections,
        tips: data.tips,
        good: data.good,
        improvements: data.improvements,
      });
    } catch (e) {
      setError(e.message || '❌ Analysis failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Resume Analyzer</Text>

        <TouchableOpacity style={styles.uploadButton} onPress={handlePickDocument}>
          <Text style={styles.uploadText}>Upload Resume (PDF)</Text>
        </TouchableOpacity>

        {resumeFile && <Text style={styles.fileName}>Selected: {resumeFile.name}</Text>}

        {resumeFile && !loading && (
          <TouchableOpacity style={styles.analyzeButton} onPress={handleAnalyze}>
            <Text style={styles.analyzeText}>Generate</Text>
          </TouchableOpacity>
        )}

        {loading && <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#111" />}

        {error && <Text style={styles.error}>{error}</Text>}

        {evaluation && (
          <View style={styles.resultBox}>
            <Text style={styles.resultTitle}>Overall Score: {evaluation.score}/100</Text>

            <Text style={styles.sectionHeader}>Breakdown:</Text>
            {Object.entries(evaluation.sections).map(([key, val]) => (
              <View key={key} style={styles.sectionCard}>
                <Text style={styles.sectionLabel}>{key}</Text>
                <Text style={styles.sectionScore}>{val}%</Text>
              </View>
            ))}

            <Text style={styles.sectionHeader}>Tips for Improvement:</Text>
            {evaluation.tips.map((tip, i) => (
              <Text key={i} style={styles.tip}>- {tip}</Text>
            ))}

            <Text style={styles.sectionHeader}>What's Good:</Text>
            {evaluation.good.map((g, i) => (
              <Text key={i} style={styles.good}>• {g}</Text>
            ))}

            <Text style={styles.sectionHeader}>Needs Improvement:</Text>
            {evaluation.improvements.map((imp, i) => (
              <Text key={i} style={styles.improvement}>• {imp}</Text>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push('/chat')}>
          <Text style={styles.backText}>← Back to Chat Hub</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  uploadButton: {
    backgroundColor: '#34D399',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  uploadText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  fileName: {
    marginTop: 12,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  analyzeButton: {
    backgroundColor: '#111',
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignSelf: 'center',
  },
  analyzeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultBox: {
    marginTop: 20,
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 10,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 14,
    marginBottom: 6,
  },
  sectionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  sectionScore: {
    fontSize: 15,
    fontWeight: '600',
    color: '#444',
  },
  tip: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  good: {
    fontSize: 14,
    color: 'green',
    marginBottom: 4,
  },
  improvement: {
    fontSize: 14,
    color: '#c00',
    marginBottom: 4,
  },
  error: {
    marginTop: 16,
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },
  footer: {
    paddingVertical: 16,
    alignItems: 'center',
    borderTopColor: '#eee',
    borderTopWidth: 1,
    backgroundColor: '#fff',
  },
  backText: {
    color: '#111',
    fontSize: 16,
    fontWeight: '500',
  },
});