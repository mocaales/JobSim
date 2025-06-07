import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';

export default function ChatHistory() {
  const router = useRouter();
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  const [items, setItems] = useState([]);

  const fetchHistory = () => {
    if (!email) return;
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/history/all?user_id=${email}`)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error("Failed to load history", err));
  };

  useEffect(() => {
    fetchHistory();
  }, [email]);

  const confirmDelete = (type, id) => {
    Alert.alert(
      "Delete Item?",
      "Are you sure you want to delete this item?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteOne(type, id) }
      ]
    );
  };

  const deleteOne = async (type, id) => {
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/history/delete?type=${type}&id=${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      console.log("Deleted:", data);
      setItems(prev => prev.filter(c => getId(c) !== id));
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  const getId = (item) => item.conversation_id || item.resume_id || item.roadmap_id || item._id;

  const getType = (item) => {
    if (item.conversation_id) return 'chat';
    if (item.resume_id) return 'resume';
    if (item.roadmap_id) return 'roadmap';
    return 'unknown';
  };

  const getColor = (type) => {
    switch (type) {
      case 'chat': return '#4C8EFF';
      case 'resume': return '#34D399';
      case 'roadmap': return '#FBBF24';
      default: return '#f4f4f4';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>History</Text>

      <FlatList
        data={items}
        keyExtractor={(item, index) => getId(item) || index.toString()}
        renderItem={({ item }) => {
          const type = getType(item);
          const color = getColor(type);
          const timestamp = item.timestamp;

          return (
            <View style={[styles.card, { backgroundColor: color + '22' }]}>
              <TouchableOpacity
                onPress={() => {
                  if (type === 'chat') {
                    router.push({
                      pathname: '/Chat/Career',
                      params: { conversation_id: item.conversation_id }
                    });
                  } else if (type === 'resume') {
                    router.push({
                      pathname: '/Chat/Resume',
                      params: { resume_id: item.resume_id }
                    });
                  } else if (type === 'roadmap') {
                    router.push({
                      pathname: '/Chat/Roadmap',
                      params: { roadmap_id: item.roadmap_id }
                    });
                  }
                }}
                style={{ flex: 1 }}
              >
                <Text style={styles.question} numberOfLines={1}>
                  {type === 'chat' ? item.question : type === 'resume' ? item.filename : item.title}
                </Text>
                <Text style={styles.time}>
                  {timestamp
                    ? new Date(timestamp).toLocaleString('sl-SI', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : 'Neznan datum'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => confirmDelete(type, getId(item))}>
                <Text style={styles.deleteText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        ListEmptyComponent={<Text style={styles.subtitle}>No history yet.</Text>}
      />

      <TouchableOpacity onPress={() => router.push('/chat')} style={styles.back}>
        <Text style={styles.backText}>← Back to Chat Hub</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12, textAlign: 'center' },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginTop: 20,
    textAlign: 'center',
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: { fontSize: 16, fontWeight: '500', color: '#111' },
  time: { fontSize: 14, color: '#777', marginTop: 4 },
  deleteText: {
    fontSize: 20,
    color: '#c00',
    marginLeft: 10,
  },
  back: { marginTop: 30, alignItems: 'center' },
  backText: { color: '#111', fontSize: 16, fontWeight: '500' },
});