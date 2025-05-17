import { Stack } from "expo-router";
import { ClerkProvider , SignedIn, SignedOut} from '@clerk/clerk-expo'
import LoginScreen from "./../components/LoginScreen";
import * as SecureStore from "expo-secure-store";
// import { tokenCache } from '@clerk/clerk-expo/token-cache'

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (error) {
      return null;
    }
  },
  async saveToken(key, token) {
    try {
      return SecureStore.setItemAsync(key, token);
    } catch (error) {
      return;
    }
  },
};

export default function RootLayout() {
  return (
    <ClerkProvider 
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}>
      <SignedIn>
        <Stack screenOptions={{headerShown:false}}>
          <Stack.Screen name="(tabs)"/>
        </Stack>
      </SignedIn>
      <SignedOut>
        <LoginScreen />
      </SignedOut>
    </ClerkProvider>
  );
}
