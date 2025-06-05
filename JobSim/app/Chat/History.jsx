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
  const [conversations, setConversations] = useState([]);

  const fetchHistory = () => {
    if (!email) return;
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/chat/history?user_id=${email}`)
      .then(res => res.json())
      .then(data => setConversations(data))
      .catch(err => console.error("Failed to load history", err));
  };

  useEffect(() => {
    fetchHistory();
  }, [email]);

  const confirmDelete = (conversationId) => {
    Alert.alert(
      "Delete Conversation?",
      "Are you sure you want to delete this conversation?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteOne(conversationId) }
      ]
    );
  };

  const deleteOne = async (conversationId) => {
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/chat/conversation/${conversationId}`, {
        method: "DELETE"
      });
      const data = await res.json();
      console.log("Deleted:", data);
      setConversations(prev => prev.filter(c => c.conversation_id !== conversationId));
    } catch (err) {
      console.error("Failed to delete conversation", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chat History</Text>

      <FlatList
        data={conversations}
        keyExtractor={(item) => item.conversation_id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: '/Chat/Career',
                  params: { conversation_id: item.conversation_id },
                })
              }
              style={{ flex: 1 }}
            >
              <Text style={styles.question}>{item.question}</Text>
              <Text style={styles.time}>
                {item.timestamp?.$date
                  ? new Date(item.timestamp.$date).toLocaleString('sl-SI', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : 'Neznan datum'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => confirmDelete(item.conversation_id)}>
              <Text style={styles.deleteText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.subtitle}>No chats yet.</Text>
        }
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
    backgroundColor: '#f4f4f4',
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