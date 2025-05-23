import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '../../constants/Colors';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{
        headerShown:false,
        tabBarActiveTintColor: COLORS.activeIcon,
      }}
    >
      <Tabs.Screen name="home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen name="explore"
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color }) => <Ionicons name="search" size={24} color={color} />,
        }}
      />
      <Tabs.Screen name="profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
        }}
      />

      {/* Hidden job detail route - uses tabBarItemStyle to drop the slot entirely*/}
      <Tabs.Screen
        name="job/[jobId]/index"
        options={{
          headerShown: false,
          // hide from tab bar
          tabBarItemStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="job/[jobId]/quiz"
        options={{
          headerShown: false,
          tabBarItemStyle: { display: 'none' },
        }}
      />
      {/* Uncomment when ready:
      <Tabs.Screen name="job/[jobId]/game" options={{ headerShown: true, tabBarButton: () => null }} />
      */}

      <Tabs.Screen
        name="job/Developer/index"
        options={{ headerShown: false, tabBarItemStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="job/Developer/quiz"
        options={{ headerShown: false, tabBarItemStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="job/Developer/game"
        options={{ headerShown: false, tabBarItemStyle: { display: 'none' } }}
      />


    </Tabs>
  );
}