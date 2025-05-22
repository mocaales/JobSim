import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, UIManager, findNodeHandle } from 'react-native';

export default function DropZone({ total, onLayoutMeasured }) {
  const dropZoneRef = useRef(null);

  const handleLayout = () => {
    const handle = findNodeHandle(dropZoneRef.current);
    if (handle) {
      UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
        onLayoutMeasured({ x: pageX, y: pageY, width, height });
      });
    }
  };

  return (
    <View ref={dropZoneRef} onLayout={handleLayout} style={styles.zone}>
      <Text style={styles.label}>💶 Drop Here</Text>
      <Text style={styles.value}>Returned: €{total.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  zone: {
    height: 100,
    backgroundColor: '#eee',
    margin: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#aaa',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
  },
});