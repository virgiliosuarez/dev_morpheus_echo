import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  ViewStyle,
  Image,
} from 'react-native';
import { Role } from '@/screens/ChatScreen';

interface Props {
  role: Role;
  content: string;
  timestamp?: string; // ISO string o formato legible
}


const MessageBubble: React.FC<Props> = ({ role, content, timestamp }) => {
  const isUser = role === 'user';
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.wrapper,
        { opacity: fadeAnim },
        isUser ? styles.alignRight : styles.alignLeft,
      ]}
    >
      <View
        style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.aiBubble,
        ]}
      >
        <Text style={styles.text}>{content}</Text>
        {timestamp && <Text style={styles.time}>{formatTime(timestamp)}</Text>}
      </View>
    </Animated.View>
  );
};

function formatTime(iso: string) {
  const d = new Date(iso);
  const h = d.getHours().toString().padStart(2, '0');
  const m = d.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
}

export default MessageBubble;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'flex-end',
  } as ViewStyle,

  alignRight: { justifyContent: 'flex-end' },
  alignLeft: { justifyContent: 'flex-start' },

  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginHorizontal: 4,
  },

  bubble: {
    maxWidth: '70%',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  } as ViewStyle,

  userBubble: {
    backgroundColor: '#7A5FFF',
    borderTopRightRadius: 4,
  },

  aiBubble: {
    backgroundColor: '#1f1f2f',
    borderTopLeftRadius: 4,
  },

  text: {
    color: '#f1f1f1',
    fontSize: 15.5,
    lineHeight: 22,
  },

  time: {
    marginTop: 4,
    fontSize: 12,
    color: '#ccc',
    alignSelf: 'flex-end',
  },
});
