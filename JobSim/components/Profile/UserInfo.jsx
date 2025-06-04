// app/components/Profile/UserInfo.jsx

import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useUserStore } from "../../storage/UserStorrage";

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

export default function UserInfo() {
  const { user, isLoaded } = useUser();
  const setUserEmail = useUserStore((state) => state.setUserEmail);

  // Track whether we've already done the upsert in this session:
  const [didUpsert, setDidUpsert] = useState(false);
  const [upserting, setUpserting] = useState(false);

  useEffect(() => {
    // 1) Wait until Clerk is loaded
    if (!isLoaded) return;
    // 2) If there's no user (signed out), do nothing
    if (!user) return;

    // 3) Extract the fields we need:
    const email = user.primaryEmailAddress?.emailAddress ?? "";
    const fullName = user.fullName || "";
    const avatarUrl = user.imageUrl || "";

    // 4) Store the email in Zustand
    if (email) {
      setUserEmail(email);
    }

    // 5) If we haven't upserted yet and we do have an email, do it now:
    if (!didUpsert && email) {
      setUpserting(true);
      fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/upsert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          nickname: fullName,
          imageUrl: avatarUrl,
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
        })
        .catch((err) => {
          console.error("Error upserting user:", err);
          Alert.alert("Error", "Could not save your profile right now.");
        })
        .finally(() => {
          setUpserting(false);
          setDidUpsert(true);
        });
    }
  }, [isLoaded, user]);

  // 6) While we’re in the middle of doing a “POST /user/upsert”, show a spinner
  if (upserting) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Saving your profile…</Text>
      </View>
    );
  }

  // 7) Once done (or if no upsert needed), render avatar + name as before
  return (
    <View style={styles.container}>
      {user?.imageUrl ? (
        <Image source={{ uri: user.imageUrl }} style={styles.UserImage} />
      ) : null}
      <Text style={styles.UserNameDisplay}>{user?.fullName}</Text>
      <Text>{user?.primaryEmailAddress?.emailAddress}</Text>
    </View>
  );
}
