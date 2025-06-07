import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function CareerAgent() {
  const { user } = useUser();
  const router = useRouter();
  const { conversation_id } = useLocalSearchParams();

  const email = user?.primaryEmailAddress?.emailAddress;
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(conversation_id || null);

  useEffect(() => {
    if (conversation_id) {
      fetch(`${process.env.EXPO_PUBLIC_API_URL}/chat/conversation?conversation_id=${conversation_id}`)
        .then(res => res.json())
        .then(data => {
          const mapped = data.map(entry => [
            { from: 'user', text: entry.question },
            { from: 'bot', text: entry.answer },
          ]).flat();
          setMessages(mapped);
        })
        .catch(err => console.error("Failed to load conversation", err));
    }
  }, [conversation_id]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { from: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    Keyboard.dismiss();

    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: email,
          message: userMsg.text,
          conversation_id: conversationId,
        }),
      });

      const data = await res.json();
      const botMsg = { from: 'bot', text: data.answer || 'Sorry, something went wrong.' };
      setMessages(prev => [...prev, botMsg]);
      setConversationId(data.conversation_id);
    } catch (error) {
      setMessages(prev => [...prev, { from: 'bot', text: '⚠️ Failed to fetch response.' }]);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Career Q&A Agent</Text>
      </View>

      <ScrollView contentContainerStyle={styles.messagesWrapper} style={styles.scroll} showsVerticalScrollIndicator={false}>
        {messages.map((msg, i) => (
          <View
            key={i}
            style={[styles.message, msg.from === 'user' ? styles.user : styles.bot]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={90}>
        <View style={styles.inputWrapper}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Ask me anything about your career..."
            placeholderTextColor="#999"
            style={styles.input}
            returnKeyType="send"
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity onPress={handleSend} disabled={loading} style={styles.sendBtn}>
            <Text style={styles.sendText}>{loading ? '...' : 'Send'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <View style={styles.backContainer}>
        <TouchableOpacity onPress={() => router.push('/chat')}>
          <Text style={styles.backText}>← Back to Chat Hub</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 12 },
  title: { fontSize: 22, fontWeight: '700', paddingVertical: 18, textAlign: 'center' },
  scroll: { flex: 1 },
  messagesWrapper: { paddingHorizontal: 16, paddingBottom: 20 },
  message: {
    maxWidth: '85%',
    padding: 12,
    marginVertical: 6,
    borderRadius: 14,
  },
  user: { backgroundColor: '#f0f0f0', alignSelf: 'flex-end' },
  bot: { backgroundColor: '#f8f8f8', alignSelf: 'flex-start' },
  messageText: { fontSize: 16, color: '#222' },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 10,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    color: '#111',
  },
  sendBtn: {
    marginLeft: 8,
    backgroundColor: '#4C8EFF',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  sendText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  backContainer: { paddingHorizontal: 16, paddingBottom: 20, alignItems: 'center' },
  backText: { color: '#111', fontSize: 16, fontWeight: '500', paddingVertical: 12 },
});