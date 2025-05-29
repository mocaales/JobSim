// app/_layout.jsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import LoginScreen from '../components/LoginScreen';
import * as SecureStore from 'expo-secure-store';

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },
  async saveToken(key, token) {
    try {
      return SecureStore.setItemAsync(key, token);
    } catch {
      // ignore
    }
  },
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkProvider
        publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
        tokenCache={tokenCache}
      >
        <SignedIn>
          <Stack screenOptions={{ headerShown: false }}>
            {/*
              This single entry hooks up your (tabs) group—
              i.e. everything under app/(tabs)
            */}
            <Stack.Screen name="(tabs)" />
          </Stack>
        </SignedIn>

        <SignedOut>
          <LoginScreen />
        </SignedOut>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
}
