// app/(tabs)/home.jsx

import React, { useState, useEffect } from 'react';          // ← added useEffect
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  ActivityIndicator,                                        // ← added ActivityIndicator
} from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import DropDownPicker from 'react-native-dropdown-picker';
import QuestionnaireCard from '../../components/Home/QuestionnaireCard';
import Leaderboard from '../../components/Home/Leaderboard';
import DonutChart from '../../components/Home/DonutChart';
import { COLORS } from '../../constants/Colors';
import { AVATAR_IMAGES } from '../utils/avatarMap';

export default function Home() {
  const { user, isLoaded } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  // ── State for nickname + avatarKey from our backend ────────────────────────────
  const [nickname, setNickname] = useState('');
  const [avatarKey, setAvatarKey] = useState('avatar1');
  const [loadingProfile, setLoadingProfile] = useState(true);

  // ── Dropdown state (unchanged) ─────────────────────────────────────────────────
  const [selectedJob, setSelectedJob] = useState('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [jobOptions, setJobOptions] = useState([
    { label: 'All', value: 'all' },
    { label: 'Chef', value: 'Chef' },
    { label: 'Cashier', value: 'Cashier' },
    { label: 'Dispatcher', value: 'Dispatcher' },
    { label: 'Junior Developer', value: 'Junior Developer' },
    { label: 'Emergency Medicine Specialist', value: 'Emergency Medicine Specialist' },
  ]);

  // ── Fetch /user/{email} on mount or whenever email changes ──────────────────────
  useEffect(() => {
    if (!isLoaded || !email) return;
    setLoadingProfile(true);

    fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/${encodeURIComponent(email)}`)
      .then(async (resp) => {
        if (resp.status === 404) {
          // No document yet → fallback to Clerk’s fullName + default avatar
          throw new Error('Not found');
        }
        if (!resp.ok) {
          const text = await resp.text();
          console.error('Error fetching /user/{email}:', resp.status, text);
          throw new Error('Fetch failed');
        }
        return resp.json();
      })
      .then((data) => {
        // data = { email, nickname, imageUrl }  (imageUrl is the avatar key)
        setNickname(data.nickname || user.fullName || '');
        if (data.imageUrl && AVATAR_IMAGES[data.imageUrl]) {
          setAvatarKey(data.imageUrl);
        } else {
          setAvatarKey('avatar1');
        }
      })
      .catch(() => {
        // On 404 or any error, use Clerk’s values + default avatar
        setNickname(user.fullName || '');
        setAvatarKey('avatar1');
      })
      .finally(() => {
        setLoadingProfile(false);
      });
  }, [isLoaded, email]);

  // ── While waiting for Clerk or our fetch, show a spinner ────────────────────────
  if (!isLoaded || loadingProfile) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.activeIcon} />
      </View>
    );
  }

  // ── Now render the header with the user’s nickname + avatar image ───────────────
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#3c3c3c' }}>
      <View style={styles.headerContainer}>
        <View style={styles.bubble}>
          {/*  Avatar from our local assets (no more black circle) */}
          <Image
            source={AVATAR_IMAGES[avatarKey]}
            style={styles.avatarCircle}
          />
          <View style={styles.textContainer}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.userText}>{nickname}</Text>
          </View>
        </View>
      </View>

      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <FlatList
          ListHeaderComponent={
            <>
              <QuestionnaireCard />
              <View style={{ zIndex: 5000, elevation: 1000 }}>
                <Leaderboard game='cashier' />
              </View>

              {email && (
                <View style={styles.chartBox}>
                  <View style={styles.dropdownContainer}>
                    <DropDownPicker
                      open={dropdownOpen}
                      value={selectedJob}
                      items={jobOptions}
                      setOpen={setDropdownOpen}
                      setValue={setSelectedJob}
                      setItems={setJobOptions}
                      placeholder="Select Job"
                      containerStyle={styles.dropdownBox}
                      style={styles.dropdown}
                      dropDownContainerStyle={styles.dropdownList}
                      textStyle={styles.dropdownText}
                      maxHeight={250}
                      zIndex={4000}
                      zIndexInverse={1000}
                    />
                  </View>
                  <DonutChart email={email} selectedJob={selectedJob} />
                </View>
              )}

              <View style={{ height: 20 }} />
            </>
          }
          data={[]}
          renderItem={null}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    backgroundColor: '#3c3c3c',
    padding: 20,
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
  avatarCircle: {
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
  userText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  chartBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  dropdownContainer: {
    position: 'absolute',
    top: 12,
    right: 16,
    width: 150,
    zIndex: 4000,
    elevation: 1000,
  },
  dropdownBox: { height: 40 },
  dropdown: { backgroundColor: '#fff', borderColor: '#ccc', borderRadius: 10 },
  dropdownList: { backgroundColor: '#fff', borderRadius: 10, maxHeight: 250 },
  dropdownText: { fontSize: 16, color: "#111" },
});
