// app/(tabs)/profileEdit.jsx

import React, { useState, useEffect } from "react";
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
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { COLORS } from "../../constants/Colors";

// 1) List of all avatar image files under assets/profileImg.
//    The `key` is the string we will store in Mongo (in `imageUrl`).
//    The `source` is the `require(...)` to actually render it.
//    Feel free to add/remove lines here if you add more images.
const AVATAR_IMAGES = [
  { key: "avatar1", source: require("../../assets/profileImg/avatar1.jpg") },
  { key: "avatar2", source: require("../../assets/profileImg/avatar2.jpg") },
  { key: "avatar3", source: require("../../assets/profileImg/avatar3.jpg") },
  { key: "avatar4", source: require("../../assets/profileImg/avatar4.jpg") },
  { key: "avatar5", source: require("../../assets/profileImg/avatar5.jpg") },
  { key: "avatar6", source: require("../../assets/profileImg/avatar6.jpg") },
  { key: "avatar7", source: require("../../assets/profileImg/avatar7.jpg") },
  { key: "avatar8", source: require("../../assets/profileImg/avatar8.jpg") },
];

export default function ProfileEdit() {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  const [nickname, setNickname] = useState("");
  // Instead of a free‐form URL, we track a “key” like "avatar2"
  const [selectedAvatar, setSelectedAvatar] = useState(""); 
  const [updating, setUpdating] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // 2) When Clerk’s user object is ready, fetch our own backend’s profile:
  useEffect(() => {
    if (!isLoaded || !user) return;

    const email = user.primaryEmailAddress?.emailAddress;
    if (!email) {
      // If no email from Clerk (unlikely), fall back to Clerk’s data
      setNickname(user.fullName || "");
      // default to first avatar in the list if you want
      setSelectedAvatar(AVATAR_IMAGES[0].key);
      setLoadingProfile(false);
      return;
    }

    // Try GET /user/{email} to see if we already have a saved nickname + avatar‐key.
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/${encodeURIComponent(email)}`)
      .then(async (resp) => {
        if (resp.status === 404) {
          // No existing document → fallback to Clerk’s fullName + local default avatar
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
        // data looks like { email, nickname, imageUrl }
        setNickname(data.nickname);
        // Here, data.imageUrl is actually the “avatar key” (e.g. "avatar2")
        if (data.imageUrl) {
          setSelectedAvatar(data.imageUrl);
        } else {
          // If for some reason no imageUrl is stored, default to first in AVATAR_IMAGES:
          setSelectedAvatar(AVATAR_IMAGES[0].key);
        }
      })
      .catch(() => {
        // Either 404 or some other error → use Clerk’s data as fallback
        setNickname(user.fullName || "");
        // We could try to parse a Clerk‐provided profileImageUrl, 
        // but since we’re now choosing from local assets, just default:
        setSelectedAvatar(AVATAR_IMAGES[0].key);
      })
      .finally(() => {
        setLoadingProfile(false);
      });
  }, [isLoaded, user]);

  // 3) Handle “Save Changes” → just POST to /user/upsert with the chosen avatar‐key
  const handleSave = async () => {
    if (!nickname.trim()) {
      Alert.alert("Validation", "Nickname cannot be empty.");
      return;
    }
    setUpdating(true);

    try {
      // No longer updating Clerk’s `profileImageUrl`—we only update our own DB.
      // await user.update({ profileImageUrl: … })  ← remove this

      const email = user.primaryEmailAddress?.emailAddress;
      if (email) {
        const resp = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/upsert`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            nickname: nickname.trim(),
            imageUrl: selectedAvatar, // store the avatar “key” in Mongo
          }),
        });
        if (!resp.ok) {
          const text = await resp.text();
          console.error("Error upserting user:", resp.status, text);
          throw new Error("Upsert failed");
        }
      }

      Alert.alert("Success", "Profile updated successfully.");
      router.back();
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  // 4) Show spinner while loading existing profile or waiting on Clerk
  if (loadingProfile || !isLoaded) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.activeIcon} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.safe}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* 5) Avatar Preview */}
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Image
            source={
              AVATAR_IMAGES.find((a) => a.key === selectedAvatar)?.source ||
              AVATAR_IMAGES[0].source
            }
            style={styles.avatar}
          />
          <Text style={{ marginTop: 8, fontStyle: "italic" }}>
            Tap below to change avatar
          </Text>
        </View>

        {/* 6) Grid of selectable avatars */}
        <View style={styles.avatarGrid}>
          {AVATAR_IMAGES.map((av) => (
            <TouchableOpacity
              key={av.key}
              onPress={() => setSelectedAvatar(av.key)}
              style={[
                styles.avatarOption,
                av.key === selectedAvatar && styles.avatarOptionSelected,
              ]}
            >
              <Image source={av.source} style={styles.avatarThumbnail} />
            </TouchableOpacity>
          ))}
        </View>

        {/* 7) Nickname input */}
        <Text style={[styles.label, { marginTop: 24 }]}>Nickname (for leaderboards)</Text>
        <TextInput
          style={styles.input}
          value={nickname}
          onChangeText={setNickname}
          placeholder="Enter your nickname"
        />

        {/* 8) Save / Cancel buttons */}
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

        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  avatarOption: {
    margin: 8,
    borderRadius: 8,
    padding: 4,
    borderWidth: 2,
    borderColor: "transparent",
  },
  avatarOptionSelected: {
    borderColor: COLORS.activeIcon,
  },
  avatarThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.black,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
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
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#aaa",
  },
  cancelButton: {
    backgroundColor: "#777",
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
