import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

export default function DraggableCoin({ value, keepPosition = false }) {
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = offsetX.value;
      ctx.startY = offsetY.value;
    },
    onActive: (event, ctx) => {
      offsetX.value = ctx.startX + event.translationX;
      offsetY.value = ctx.startY + event.translationY;
    },
    onEnd: (event) => {
      const { absoluteX, absoluteY } = event;
      if (global.dropZoneListener) {
        runOnJS(global.dropZoneListener)({
          nativeEvent: {
            pageX: absoluteX,
            pageY: absoluteY,
            value,
          },
        });
      }

      // Reset position only if NOT keeping position
      if (!keepPosition) {
        offsetX.value = withSpring(0);
        offsetY.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: offsetX.value },
      { translateY: offsetY.value },
    ],
  }));

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.coin, animatedStyle]}>
        <Text style={styles.text}>€{value.toFixed(2)}</Text>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  coin: {
    backgroundColor: '#333',
    borderRadius: 30,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});