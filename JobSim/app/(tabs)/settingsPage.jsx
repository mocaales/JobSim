import React from 'react'
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { useUser } from '@clerk/clerk-expo'
import { COLORS } from '../../constants/Colors'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'

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
          onPress: () => clearEndpoint('/game/clear-all', 'game scores'),
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
          onPress: () => clearEndpoint('/quiz/clear-all', 'quiz scores'),
        },
      ]
    )

  // Show loading screen until Clerk loads user
  if (!isLoaded) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary || '#000'} />
        <Text style={styles.loadingText}>Loading settings...</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.sectionTitle}>Settings</Text>

      <SettingCard
        icon={<FontAwesome5 name="gamepad" size={24} color="#555" />}
        title="Game scores"
        description="Delete all your game results"
        onPress={handleClearGames}
        disabled={!email}
      />
      <SettingCard
        icon={<MaterialIcons name="quiz" size={24} color="#555" />}
        title="Quiz scores"
        description="Delete all your quiz answers"
        onPress={handleClearQuizzes}
        disabled={!email}
      />
    </SafeAreaView>
  )
}

function SettingCard({ icon, title, description, onPress, disabled }) {
  return (
    <TouchableOpacity
      style={[styles.card, disabled && styles.cardDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
    color: COLORS.black,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f7f7f7',
    borderRadius: 99,
    padding: 16,
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  cardDisabled: {
    opacity: 0.5,
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  cardDescription: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.black,
  },
})