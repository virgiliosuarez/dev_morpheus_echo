// src/screens/ChatScreen.tsx
import React, { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { v4 as uuid } from 'uuid';
import * as Speech from 'expo-speech';

import MessageBubble, { Message } from '@/components/MessageBubble';
import { useSpeechToText } from '@/hooks/useSpeechToText';
import { interpretDream } from '@/services/dreamApi';

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [pending, setPending] = useState(false);
  const listRef = useRef<FlatList>(null);

  const {
    text: draft,
    setText: setDraft,
    listening,
    start: startListening,
    stop: stopListening,
  } = useSpeechToText();

  const send = useCallback(async () => {
    const cleaned = draft.trim();
    if (!cleaned) return;

    const userMsg: Message = { id: uuid(), role: 'user', content: cleaned };
    setMessages(prev => [...prev, userMsg]);
    setDraft('');
    listRef.current?.scrollToEnd({ animated: true });

    setPending(true);
    try {
      const aiResp = await interpretDream(cleaned, userMsg.id);

      const aiText = `🧠 Interpretación:\n${aiResp.interpretation}\n\n📖 Reflexiones del sueño:\n${aiResp.tips}`;
      const aiMsg: Message = { id: uuid(), role: 'assistant', content: aiText };
      setMessages(prev => [...prev, aiMsg]);

      Speech.speak(aiResp.interpretation + '. ' + aiResp.tips, { language: 'es', rate: 0.9 });
    } catch (e) {
      console.error(e);
      setMessages(prev => [
        ...prev,
        { id: uuid(), role: 'assistant', content: '⚠️ Ocurrió un error al interpretar el sueño.' },
      ]);
    } finally {
      setPending(false);
    }
  }, [draft]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={listRef}
          data={messages}
          renderItem={({ item }) => <MessageBubble {...item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        />

        {pending && (
          <ActivityIndicator style={styles.spinner} color="#7A5FFF" size="large" />
        )}

        <View style={styles.inputBar}>
          <TouchableOpacity
            style={styles.iconButton}
            onPressIn={startListening}
            onPressOut={stopListening}
            accessibilityLabel="Activar dictado por voz"
          >
            <Ionicons name={listening ? 'mic' : 'mic-outline'} size={26} color="#7A5FFF" />
          </TouchableOpacity>

          <TextInput
            style={styles.textInput}
            value={draft}
            onChangeText={setDraft}
            placeholder="Cuéntame tu sueño..."
            placeholderTextColor="#aaa"
            multiline
            returnKeyType="send"
            onSubmitEditing={send}
            accessibilityLabel="Campo de entrada del sueño"
          />

          <TouchableOpacity
            style={styles.sendButton}
            onPress={send}
            accessibilityLabel="Enviar sueño"
          >
            <Ionicons name="send" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#10101A' },
  container: { flex: 1, backgroundColor: '#10101A' },
  listContent: { padding: 16, paddingBottom: 80 },
  spinner: { position: 'absolute', top: 12, alignSelf: 'center' },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#2c2c3c',
    backgroundColor: '#181828',
  },
  iconButton: { padding: 8 },
  textInput: {
    flex: 1,
    maxHeight: 120,
    color: 'white',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#2a2a3c',
    marginHorizontal: 8,
  },
  sendButton: {
    backgroundColor: '#7A5FFF',
    borderRadius: 50,
    padding: 10,
  },
});
