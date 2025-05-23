import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-expo';
import axios from 'axios';
import { useUserStore } from '../../storage/UserStorrage';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
  },
  UserImage: {
    width: 100,
    height: 100,
    borderRadius: 99,
  },
  UserNameDisplay: {
    fontSize: 20,
    marginTop: 6,
    marginBottom: 6,
  },
});

export default function UserInfo() {
  const { user } = useUser();
  const setUserEmail = useUserStore((state) => state.setUserEmail);
  console.log('📡 API URL:', process.env.EXPO_PUBLIC_API_URL);

  useEffect(() => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (email) {
      setUserEmail(email);

      const saveUser = async () => {
        try {
          await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/users`, {
            email,
          });
        } catch (err) {
          console.error('❌ Error saving user:', err);
        }
      };
      saveUser();
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: user?.imageUrl }} style={styles.UserImage} />
      <Text style={styles.UserNameDisplay}>{user?.fullName}</Text>
      <Text>{user?.primaryEmailAddress?.emailAddress}</Text>
    </View>
  );
}