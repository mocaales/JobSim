// app/(tabs)/SettingsPage.jsx

import React from 'react'
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native'
import { useUser } from '@clerk/clerk-expo'
import { COLORS } from '../../constants/Colors'

export default function SettingsPage() {
  const { user, isLoaded } = useUser()
  const email = user?.primaryEmailAddress?.emailAddress

  const clearEndpoint = async (path, label) => {
    try {
      const resp = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}${path}/${encodeURIComponent(email)}`,
        { method: 'DELETE' }
      )
      if (!resp.ok) {
        const txt = await resp.text()
        throw new Error(txt || resp.status)
      }
      const { deleted_count } = await resp.json()
      Alert.alert('Done', `Deleted ${deleted_count} ${label}`)
    } catch (err) {
      console.error(`Failed to clear ${label.toLowerCase()}:`, err)
      Alert.alert('Error', `Could not clear ${label.toLowerCase()}.`)
    }
  }

  const handleClearGames = () =>
    Alert.alert(
      'Delete All Game Scores?',
      'This will permanently remove all your game results. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () =>
            clearEndpoint('/game/clear-all', 'game scores'),
        },
      ]
    )

  const handleClearQuizzes = () =>
    Alert.alert(
      'Delete All Quiz Scores?',
      'This will permanently remove all your quiz results. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () =>
            clearEndpoint('/quiz/clear-all', 'quiz scores'),
        },
      ]
    )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.heading}>Settings</Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleClearGames}
          disabled={!isLoaded || !email}
        >
          <Text style={styles.buttonText}>Clear All My Game Scores</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleClearQuizzes}
          disabled={!isLoaded || !email}
        >
          <Text style={styles.buttonText}>Clear All My Quiz Scores</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white,
  },
  section: {
    marginVertical: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.black,
  },
  button: {
    backgroundColor: COLORS.activeIcon,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})
