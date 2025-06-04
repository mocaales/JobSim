// app/components/Profile/UserInfo.jsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useUserStore } from "../../storage/UserStorrage";
import { AVATAR_IMAGES } from "../../app/utils/avatarMap"; // <-- Adjust path if needed
import { COLORS } from '../../constants/Colors'; 

export default function UserInfo() {
  const { user, isLoaded } = useUser();
  const setUserEmail = useUserStore((state) => state.setUserEmail);

  // Track whether we've done the upsert to our backend
  const [didUpsert, setDidUpsert] = useState(false);
  const [upserting, setUpserting] = useState(false);

  // State to hold the fetched profile data from our DB:
  const [nickname, setNickname] = useState("");
  const [avatarKey, setAvatarKey] = useState("avatar1"); // default key
  const [loadingProfile, setLoadingProfile] = useState(true);

  // ─── 1) First Effect: Upsert Clerk data into our backend ─────────────────────────
  useEffect(() => {
    if (!isLoaded || !user) return;

    const email = user.primaryEmailAddress?.emailAddress ?? "";
    const fullName = user.fullName || "";
    const clerkAvatarUrl = user.imageUrl || "";

    // Store in Zustand for other parts of the app
    if (email) setUserEmail(email);

    // Only upsert once per session
    if (!didUpsert && email) {
      setUpserting(true);
      fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/upsert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          nickname: fullName,
          imageUrl: clerkAvatarUrl, // at first, this is a full URL; we’ll overwrite next
        }),
      })
        .then(async (resp) => {
          if (!resp.ok) {
            const text = await resp.text();
            console.error("Upsert failed:", resp.status, text);
            throw new Error(`Status ${resp.status}`);
          }
          return resp.json();
        })
        .then((data) => {
          console.log("User upsert response:", data);
          setDidUpsert(true);
        })
        .catch((err) => {
          console.error("Error upserting user:", err);
          Alert.alert("Error", "Could not save your profile right now.");
        })
        .finally(() => {
          setUpserting(false);
        });
    }
  }, [isLoaded, user]);

  // ─── 2) Second Effect: Fetch the saved profile (nickname + avatarKey) from DB ────
  useEffect(() => {
    // Only fetch after Clerk is loaded, user exists, and upsert is done
    if (!isLoaded || !user || !didUpsert) return;

    const email = user.primaryEmailAddress?.emailAddress || "";
    setLoadingProfile(true);

    fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/${encodeURIComponent(email)}`)
      .then(async (resp) => {
        if (resp.status === 404) {
          // No document yet (unlikely, since we just upserted) → fallback
          throw new Error("Not found");
        }
        if (!resp.ok) {
          const text = await resp.text();
          console.error("Error fetching /user/{email}:", resp.status, text);
          throw new Error("Fetch failed");
        }
        return resp.json();
      })
      .then((data) => {
        // data = { email, nickname, imageUrl }
        setNickname(data.nickname || user.fullName || "");
        // Here data.imageUrl is either the Clerk URL from first upsert, or an avatar key
        // If it matches one of our avatar keys, use it; otherwise default to "avatar1"
        if (data.imageUrl && AVATAR_IMAGES[data.imageUrl]) {
          setAvatarKey(data.imageUrl);
        } else {
          // If profile.imageUrl is still a full URL, we ignore it and default:
          setAvatarKey("avatar1");
        }
      })
      .catch(() => {
        // On 404 or any error, fall back to Clerk’s fullName and default avatar
        setNickname(user.fullName || "");
        setAvatarKey("avatar1");
      })
      .finally(() => {
        setLoadingProfile(false);
      });
  }, [isLoaded, user, didUpsert]);

  // ─── 3) While upserting or loading profile data, show a spinner ────────────────
  if (upserting || loadingProfile) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.activeIcon} />
        <Text style={{ marginTop: 10 }}>
          {upserting
            ? "Saving your profile…"
            : "Loading your profile…"}
        </Text>
      </View>
    );
  }

  // ─── 4) Render the fetched avatar + nickname ───────────────────────────────────
  return (
    <View style={styles.container}>
      <Image source={AVATAR_IMAGES[avatarKey]} style={styles.UserImage} />
      <Text style={styles.UserNameDisplay}>{nickname}</Text>
      <Text>{user.primaryEmailAddress?.emailAddress}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
