// app/(tabs)/_layout.jsx
import React from 'react';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '../../constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.activeIcon,
      }}
    >
      {/* Main tabs */}
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color }) => <Ionicons name="search" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
        }}
      />

      {/* Developer routes (hidden) */}
      <Tabs.Screen
        name="job/Developer/index"
        options={{ tabBarItemStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="job/Developer/quiz"
        options={{ tabBarItemStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="job/Developer/game/index"
        options={{ tabBarItemStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="job/Developer/game/[taskId]"
        options={{ tabBarItemStyle: { display: 'none' } }}
      />

      {/* Emergency Medicine Specialist (SpecUrgMed) routes (hidden) */}
      <Tabs.Screen
        name="job/SpecUrgMed/index"
        options={{ tabBarItemStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="job/SpecUrgMed/quiz"
        options={{ tabBarItemStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="job/SpecUrgMed/game/index"
        options={{ tabBarItemStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="job/SpecUrgMed/game/[scenarioId]"
        options={{ tabBarItemStyle: { display: 'none' } }}
      />

      {/* Catch-all generic job/[jobId] routes (hidden), if you still need them */}
      <Tabs.Screen
        name="job/[jobId]/index"
        options={{ tabBarItemStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="job/[jobId]/quiz"
        options={{ tabBarItemStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="job/[jobId]/game/index"
        options={{ tabBarItemStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="job/[jobId]/game/[…]"
        options={{ tabBarItemStyle: { display: 'none' } }}
      />
    </Tabs>
  );
}
