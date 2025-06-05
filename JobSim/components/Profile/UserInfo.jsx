// JobSim/components/profile/UserInfo.jsx

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
import { AVATAR_IMAGES } from "../../app/utils/avatarMap";

export default function UserInfo() {
  const { user, isLoaded } = useUser();
  const setUserEmail = useUserStore((state) => state.setUserEmail);

  // Track whether we've already ensured this user exists in DB:
  const [didEnsure, setDidEnsure] = useState(false);
  const [ensuring, setEnsuring] = useState(false);

  // State to hold the profile we fetch from MongoDB:
  const [nickname, setNickname] = useState("");
  const [avatarKey, setAvatarKey] = useState("avatar1");
  const [loadingProfile, setLoadingProfile] = useState(true);

  // ─── 1) First Effect: ensure user record exists (but do not overwrite existing) ─────
  useEffect(() => {
    if (!isLoaded || !user) return;
    const email = user.primaryEmailAddress?.emailAddress;
    if (!email) return;

    setEnsuring(true);
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/${encodeURIComponent(email)}`)
      .then((resp) => {
        if (resp.status === 404) {
          // Not in DB yet → insert with default avatar1
          return fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/upsert`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              nickname: user.fullName || "",
              imageUrl: "avatar1",
            }),
          });
        } else {
          // Already exists, no need to upsert
          return Promise.resolve(null);
        }
      })
      .then((upsertResp) => {
        if (upsertResp && !upsertResp.ok) {
          const text = upsertResp.text();
          console.error("Initial upsert failed:", upsertResp.status, text);
          throw new Error("Initial upsert failed");
        }
        setDidEnsure(true);
      })
      .catch((err) => {
        console.error("Error ensuring user record:", err);
        Alert.alert("Error", "Could not set up your profile right now.");
      })
      .finally(() => {
        setEnsuring(false);
      });
  }, [isLoaded, user]);

  // ─── 2) Second Effect: once user is ensured, fetch their nickname + avatarKey ─────
  useEffect(() => {
    if (!isLoaded || !user || !didEnsure) return;
    const email = user.primaryEmailAddress?.emailAddress || "";
    setLoadingProfile(true);

    fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/${encodeURIComponent(email)}`)
      .then(async (resp) => {
        if (!resp.ok) {
          const text = await resp.text();
          console.error("Error fetching /user/{email}:", resp.status, text);
          throw new Error("Fetch failed");
        }
        return resp.json();
      })
      .then((data) => {
        setNickname(data.nickname || user.fullName || "");
        if (data.imageUrl && AVATAR_IMAGES[data.imageUrl]) {
          setAvatarKey(data.imageUrl);
        } else {
          setAvatarKey("avatar1");
        }
      })
      .catch((err) => {
        console.error("Error loading profile:", err);
        setNickname(user.fullName || "");
        setAvatarKey("avatar1");
      })
      .finally(() => {
        setLoadingProfile(false);
      });
  }, [isLoaded, user, didEnsure]);

  // ─── 3) While ensuring or loading, show a spinner ───────────────────────────────
  if (ensuring || loadingProfile) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#555" />
        <Text style={{ marginTop: 10 }}>
          {ensuring
            ? "Setting up your profile…"
            : "Loading your profile…"}
        </Text>
      </View>
    );
  }

  // ─── 4) Render the avatar + nickname ─────────────────────────────────────────────
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
