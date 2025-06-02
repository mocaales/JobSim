// app/(tabs)/SettingsPage.jsx

import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Switch, StyleSheet, Appearance } from 'react-native';
import { COLORS, setTheme } from '../../constants/Colors';

export default function SettingsPage() {
  // 1) Initialize `isDark` according to current device appearance.
  const systemDark = Appearance.getColorScheme() === 'dark';
  const [isDark, setIsDark] = useState(systemDark);

  // 2) Whenever `isDark` changes, call setTheme(...) so COLORS getters flip.
  useEffect(() => {
    setTheme(isDark ? 'dark' : 'light');
    // any component that references COLORS.xxx will re-render with new values
  }, [isDark]);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: COLORS.white }]}>
      <View style={styles.row}>
        <Text style={[styles.label, { color: COLORS.black }]}>Dark Mode</Text>
        <Switch
          value={isDark}
          onValueChange={setIsDark}
          thumbColor={isDark ? '#fff' : '#000'}
          trackColor={{ false: '#ccc', true: '#666' }}
        />
      </View>
      <Text style={[styles.description, { color: COLORS.gray }]}>
        Toggle between Light and Dark themes to change the app’s appearance globally.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    marginTop: 20,
    fontSize: 14,
    lineHeight: 20,
  },
});
