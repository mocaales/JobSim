import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const insets = useSafeAreaInsets();
  const waveOffset = useSharedValue(0);

  React.useEffect(() => {
    waveOffset.value = withRepeat(
      withTiming(10, {
        duration: 3000,
        easing: Easing.inOut(Easing.sin),
      }),
      -1,
      true
    );
  }, []);

  const animatedWaveStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: waveOffset.value }],
  }));

  return (
    <View style={styles.container}>
      {/* 🌊 Animated Wave Background */}
      <Animated.View style={[styles.waveContainer, animatedWaveStyle]}>
        <Svg height="440" width={width} viewBox={`0 0 ${width} 440`}>
          <Path
            fill="#4C5FCB"
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

      {/* 💡 Main Content below the wave */}
      <View style={[styles.safe, { paddingTop: insets.top + 140 }]}>
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
      </View>
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
  },
  heading: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
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