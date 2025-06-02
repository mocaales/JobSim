
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import { COLORS } from '../../constants/Colors';

export default function ProfileEdit() {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [updating, setUpdating] = useState(false);

  // Once Clerk’s user object is ready, prefill the inputs:
  useEffect(() => {
    if (isLoaded && user) {
      setFullName(user.fullName || '');
      setAvatarUrl(user.imageUrl || '');
    }
  }, [isLoaded, user]);

  const handleSave = async () => {
    if (!fullName.trim()) {
      Alert.alert('Validation', 'Full name cannot be empty.');
      return;
    }
    setUpdating(true);

    try {
      await user.update({
        fullName: fullName.trim(),
        profileImageUrl: avatarUrl.trim(),
      });
      Alert.alert('Success', 'Profile updated successfully.');
      router.back();
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  if (!isLoaded) {
    // Still waiting on Clerk to load the user
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.activeIcon} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.safe}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        {/* Avatar Preview */}
        <Image
          source={{
            uri: avatarUrl || 'https://placehold.co/100x100?text=Avatar',
          }}
          style={styles.avatar}
        />

        {/* Full Name input */}
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter your full name"
        />

        {/* Avatar URL input */}
        <Text style={[styles.label, { marginTop: 20 }]}>Avatar URL</Text>
        <TextInput
          style={styles.input}
          value={avatarUrl}
          onChangeText={setAvatarUrl}
          placeholder="https://example.com/avatar.jpg"
          autoCapitalize="none"
          keyboardType="url"
        />

        {/* Save Changes button */}
        <TouchableOpacity
          style={[styles.button, updating && styles.buttonDisabled]}
          onPress={handleSave}
          disabled={updating}
        >
          {updating ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Save Changes</Text>
          )}
        </TouchableOpacity>

        {/* Cancel button */}
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 24,
    backgroundColor: COLORS.gray,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: COLORS.black,
  },
  button: {
    marginTop: 30,
    backgroundColor: COLORS.activeIcon,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  cancelButton: {
    backgroundColor: '#777',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
