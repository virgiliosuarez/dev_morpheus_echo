import { useState, useRef, useCallback } from 'react';

/**
 * Stub hook para entornos sin STT nativo (Web/Expo Go).
 */
export const useSpeechToText = () => {
  const [text, setText] = useState('');
  const listeningRef = useRef(false);

  const start = useCallback(() => {
    listeningRef.current = true;
  }, []);

  const stop = useCallback(() => {
    listeningRef.current = false;
  }, []);

  return {
    text,
    setText,
    listening: listeningRef.current,
    start,
    stop,
  };
};
