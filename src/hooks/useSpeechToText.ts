// src/hooks/useSpeechToText.ts (Android/iOS)

import { useCallback, useEffect, useState, useRef } from 'react';

let reqPerm: any;
let startRec: any;
let stopRec: any;

try {
  const mod = require('@jamsch/expo-speech-recognition');
  reqPerm = mod.requestRecognitionPermission;
  startRec = mod.startSpeechRecognitionAsync;
  stopRec = mod.stopSpeechRecognition;
} catch {}

export const useSpeechToText = () => {
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    if (typeof reqPerm === 'function') {
      reqPerm().catch(() => console.warn('Sin permiso de STT'));
    }
    return () => {
      isMounted.current = false;
      typeof stopRec === 'function' && stopRec();
    };
  }, []);

  const start = useCallback(async () => {
    if (typeof startRec !== 'function') return;
    setListening(true);
    try {
      await startRec({
        onResult: (r: any) => {
          if (isMounted.current) setText(r.bestTranscription.formattedString);
        },
        onError: () => isMounted.current && setListening(false),
      });
    } catch {
      setListening(false);
    }
  }, []);

  const stop = useCallback(() => {
    typeof stopRec === 'function' && stopRec();
    isMounted.current && setListening(false);
  }, []);

  return { text, setText, listening, start, stop };
};
