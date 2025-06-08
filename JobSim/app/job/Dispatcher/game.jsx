import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Dimensions, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as turf from '@turf/turf';
import { useRouter } from 'expo-router';
import { COLORS } from '../../../constants/Colors';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useUser } from "@clerk/clerk-expo";

const HOSPITAL = [15.64869, 46.55175]; // lon,lat for Maribor hospital

export default function DispatcherGame() {

  const { user, isLoaded } = useUser();

  const [showIntro, setShowIntro] = useState(true);
  
  const router = useRouter();
  const mapRef = useRef(null);

  const [call, setCall] = useState(null);               // [lon,lat]
  const [optimalRoute, setOptimalRoute] = useState([]);  // for scoring
  const [userRoute, setUserRoute] = useState([]);        // drawn by user
  const [loading, setLoading] = useState(true);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [drawMode, setDrawMode] = useState(false);

  const ORS_KEY = process.env.EXPO_PUBLIC_ORS_API_KEY;

  // Timer
  useEffect(() => {
    const interval = setInterval(() => setSecondsElapsed(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // Place single call
  useEffect(() => {
    async function placeCall() {
      const resp = await fetch(
        'https://nominatim.openstreetmap.org/search?format=json&polygon_geojson=1&q=Maribor,Slovenia'
      );
      const data = await resp.json();
      const cityPoly = turf.feature(data[0].geojson);
      const pts = turf.randomPoint(1, {
        bbox: turf.bbox(cityPoly),
        mask: cityPoly
      });
      setCall(pts.features[0].geometry.coordinates);
    }
    placeCall();
  }, []);

  // Fetch optimal route once call placed
  useEffect(() => {
    if (!call) return;
    async function fetchRoute() {
      setLoading(true);
      const coords = [HOSPITAL, call];
      const res = await fetch(
        'https://api.openrouteservice.org/v2/directions/driving-car/geojson', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: ORS_KEY
          },
          body: JSON.stringify({ coordinates: coords })
        }
      );
      const json = await res.json();
      const line = json.features[0].geometry.coordinates.map(([lon, lat]) => ({ latitude: lat, longitude: lon }));
      setOptimalRoute(line);
      setLoading(false);
    }
    fetchRoute();
  }, [call]);

  // Submit user route for scoring
    const submitRoute = async () => {
    if (!userRoute.length) {
      return Alert.alert('Draw route first');
    }
    if (!isLoaded || !user || !user.primaryEmailAddress) {
      return Alert.alert('Error', 'You must be signed in to submit your score.');
    }

    const email = user.primaryEmailAddress.emailAddress;
    // calculate your time
    const time = secondsElapsed;

    const optLine  = turf.lineString(optimalRoute.map(p => [p.longitude, p.latitude]));
    const userLine = turf.lineString(userRoute.map(p => [p.longitude, p.latitude]));
    const optDist  = turf.length(optLine,  { units: 'kilometers' });
    const userDist = turf.length(userLine, { units: 'kilometers' });
    const efficiency = (optDist / userDist * 100).toFixed(1);
    const score      = (efficiency - (time / 2)).toFixed(1);

    // 2) show it before posting
    Alert.alert(
      'Route Complete',
      `Your: ${userDist.toFixed(2)} km\n` +
      `Optimal: ${optDist.toFixed(2)} km\n\n` +
      `Efficiency: ${efficiency}%\n` +
      `Score: ${score}`
    );

    // (optional) include score in your payload if you want to store it:

    try {
      const resp = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/game/submit`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            time,
            game: 'dispatcher',
            score
          }),
        }
      );
      const body = await resp.json();

      if (!resp.ok) {
        console.error('Failed to submit dispatcher score:', body);
        return Alert.alert('Error', 'Could not save your dispatcher score.');
      }

      Alert.alert('Submitted!', body.message);
      // navigate back so they can view the leaderboard
      router.push('/home');
    } catch (err) {
      console.error('Network error submitting dispatcher:', err);
      Alert.alert('Network error', 'Please try again in a moment.');
    }
  };

  if (showIntro) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.introOverlay}>
          <Text style={styles.introTitle}>How to Play</Text>
          <Text style={styles.introText}>
            Draw a line from the hospital to the caller in need. Stay on roads and find the most optimal route in the shortest time!
          </Text>
          <View style={styles.tipItem}>
            <Text style={styles.introText}>
              Tap Move Map/Drawing to switch modes
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.introText}>
              Clear Last removes your most recent drawn segment
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.introText}>
              Clear All removes all drawn lines
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.introText}>
              Score is calculated with the following formula:
              efficiency - (time/2)
            </Text>
          </View>
          <TouchableOpacity
            style={styles.beginBtn}
            onPress={() => setShowIntro(false)}
          >
            <Text style={styles.beginText}>Begin</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (loading || !call) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.activeIcon} />
      </SafeAreaView>
    );
  }

  const minutes = Math.floor(secondsElapsed / 60);
  const seconds = secondsElapsed % 60;

  return (
    <SafeAreaView style={styles.safe}>
      {/* Map area */}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          scrollEnabled={!drawMode}
          zoomEnabled={!drawMode}
          initialRegion={{ latitude: HOSPITAL[1], longitude: HOSPITAL[0], latitudeDelta: 0.1, longitudeDelta: 0.1 }}
          onPanDrag={e => {
            if (!drawMode) return;
            const { latitude, longitude } = e.nativeEvent.coordinate;
            setUserRoute(route => [...route, { latitude, longitude }]);
          }}
        >
          <Marker coordinate={{ latitude: HOSPITAL[1], longitude: HOSPITAL[0] }} title="Hospital" />
          <Marker coordinate={{ latitude: call[1], longitude: call[0] }} pinColor="red" title="Patient" />
          {userRoute.length > 0 && (
            <Polyline coordinates={userRoute} strokeColor="red" strokeWidth={4} />
          )}
        </MapView>

        {/* Mode toggle button */}
        <TouchableOpacity
          style={[styles.modeBtn, drawMode ? styles.modeBtnOn : styles.modeBtnOff]}
          onPress={() => setDrawMode(m => !m)}
        >
          <Text style={styles.modeText}>{drawMode ? 'Drawing' : 'Move Map'}</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom bar */}
      <View style={styles.bottomBar}>
        <View style={styles.timerContainer}>
          <FontAwesome5 name="clock" size={20} color={COLORS.black} />
          <Text style={styles.timerText}>{minutes}:{String(seconds).padStart(2,'0')}</Text>
        </View>
        <View style={styles.controls}>
         {/* <TouchableOpacity onPress={() => setUserRoute([])} style={styles.smallBtn}>
            <Text style={styles.smallText}>Clear</Text>
          </TouchableOpacity>
          */}
          <TouchableOpacity onPress={() => setUserRoute(r => r.slice(0, -1))} style={styles.smallBtn}>
            <Text style={styles.smallText}>Clear Last</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setUserRoute([])} style={styles.smallBtn}>
            <Text style={styles.smallText}>Clear All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={submitRoute} style={styles.smallBtn}>
            <Text style={styles.smallText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.back()} style={styles.exitBtn}>
            <Text style={styles.exitText}>Exit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  safe: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  mapContainer: { flex: 3 },
  map: { flex: 1 },
  modeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    zIndex: 100
  },
  modeBtnOn: { backgroundColor: '#d33' },
  modeBtnOff: { backgroundColor: '#3b5' },
  modeText: { color: '#fff', fontWeight: '600' },
  bottomBar: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  timerContainer: { flexDirection: 'row', alignItems: 'center' },
  timerText: { marginLeft: 8, fontSize: 18, fontWeight: '600', color: COLORS.black },
  controls: { flexDirection: 'row', alignItems: 'center' },
  smallBtn: {
    backgroundColor: COLORS.gray,
    padding: 8,
    borderRadius: 6,
    marginHorizontal: 4
  },
  smallText: { color: COLORS.black, fontWeight: '600' },
  exitBtn: {
    backgroundColor: COLORS.activeIcon,
    padding: 8,
    borderRadius: 6,
    marginLeft: 8
  },
  exitText: { color: '#fff', fontWeight: '600' },

    // ----- NEW STYLES for intro popup -----
  introOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16
  },
  introText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  bullet: {
    fontSize: 20,
    color: '#fff',
    marginRight: 8
  },
  beginBtn: {
    backgroundColor: COLORS.activeIcon,
    padding: 12,
    borderRadius: 8,
    marginTop: 16
  },
  beginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  }
});
