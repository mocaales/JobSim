import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import { COLORS } from './../../constants/Colors';

export default function Header() {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Image source={{ uri: user?.imageUrl }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.UserText}>{user?.fullName}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    backgroundColor: "#3c3c3c",
  },
  bubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  textContainer: {
    flexDirection: 'column',
  },
  welcomeText: {
    fontSize: 14,
    color: '#3c3c3c',
  },
  UserText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
  },
});