import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');
const GAP = 20;
const CARD_SIZE = (width - GAP * 3) / 2;

const features = [
  { title: 'Career Q&A', icon: 'chatbubble-ellipses-outline', color: '#4C8EFF', route: '/Chat/Career' },
  { title: 'Resume', icon: 'document-text-outline', color: '#34D399', route: '/Chat/Resume' },
  { title: 'Roadmap', icon: 'map-outline', color: '#FBBF24', route: '/Chat/Roadmap' },
  { title: 'History', icon: 'time-outline', color: '#9CA3AF', route: '/Chat/History' },
];

export default function ChatHub() {
  const router = useRouter();
  const waveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim, {
          toValue: -10,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim, {
          toValue: 10,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.waveContainer, { transform: [{ translateY: waveAnim }] }]}>
        <Svg height="440" width={width} viewBox={`0 0 ${width} 440`}>
          <Path
            fill="#4C5FCB"
            // 2C3E50, 

            d={`
              M0,160 
              Q${width * 0.25},260 ${width * 0.5},240 
              T${width},270 
              L${width},0 
              L0,0 
              Z
            `}
          />
        </Svg>
      </Animated.View>

      <SafeAreaView style={styles.safe}>
        <Text style={styles.heading}>AI Career Tools</Text>

        <View style={styles.grid}>
          {features.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.9}
              onPress={() => router.push(item.route)}
              style={styles.card}
            >
              <View style={[styles.iconContainer, { backgroundColor: item.color + '22' }]}>
                <Ionicons name={item.icon} size={26} color={item.color} />
              </View>
              <Text style={styles.cardText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  waveContainer: {
    position: 'absolute',
    top: -60,
    left: 0,
    width: width,
    height: 440,
  },
  safe: {
    flex: 1,
    paddingTop: 180,
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: GAP,
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E5E7EB',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
});