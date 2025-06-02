import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Animated } from 'react-native';
import PieChart from 'react-native-pie-chart';

export default function DonutChart({ email, selectedJob }) {
  const [targetPercentage, setTargetPercentage] = useState(0);
  const animatedPercentage = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/quiz/results?email=${email}&job=${selectedJob}`)
      .then(res => res.json())
      .then(data => {
        const validPercentage = data && typeof data.percentage === 'number' ? data.percentage : 0;
        const clamped = Math.max(0, Math.min(validPercentage, 100));
        setTargetPercentage(clamped);

        // 🔥 Animacija grafa od 0 do clamped
        Animated.timing(animatedPercentage, {
          toValue: clamped,
          duration: 1500,
          useNativeDriver: false,
        }).start();
      })
      .catch(err => {
        console.error(err);
        setTargetPercentage(0);
      });
  }, [selectedJob]);

  const widthAndHeight = 180;

  const animatedValue = animatedPercentage.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 100],
  });

  const [animatedValueNumber, setAnimatedValueNumber] = useState(0);
  useEffect(() => {
    const listener = animatedPercentage.addListener(({ value }) => {
      setAnimatedValueNumber(value);
    });
    return () => {
      animatedPercentage.removeListener(listener);
    };
  }, []);

  const series = [
    { value: animatedValueNumber, color: '#FFA500' },
    { value: 100 - animatedValueNumber, color: '#f0f0f0' }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Quiz Performance</Text>
      <View style={styles.chartRow}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          coverRadius={0.7}
          coverFill={'#fff'}
        />
        <View style={styles.percentageSection}>
          <Text style={styles.jobLabel}>{selectedJob === 'all' ? 'All Quizzes' : `${selectedJob} Quiz`}</Text>
          <Text style={styles.percentage}>{Math.round(animatedValueNumber)}%</Text>
          <Text style={styles.subLabel}>Your Success Rate</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  percentageSection: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginLeft: 16,
  },
  jobLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  percentage: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFA500',
  },
  subLabel: {
    fontSize: 14,
    color: '#333',
    marginTop: 2,
  },
});