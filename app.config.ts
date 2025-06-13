import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  name: "Morpheus' Echo",
  slug: "morpheusecho",
  scheme: "morpheusecho",
  version: "0.1.0",
  runtimeVersion: { policy: "sdkVersion" },

  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",

  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#1c1b2a"
  },

  updates: {
    url: "https://u.expo.dev/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    fallbackToCacheTimeout: 0
  },

  ios: {
    bundleIdentifier: "com.yourcompany.morpheusecho",
    supportsTablet: true,
    infoPlist: {
      NSMicrophoneUsageDescription:
        "Necesitamos acceso al micrófono para transcribir tus sueños.",
      NSSpeechRecognitionUsageDescription:
        "La app interpreta tu voz para analizar sueños.",
      ITSAppUsesNonExemptEncryption: false
    }
  },

  android: {
    edgeToEdgeEnabled: true,
    package: "com.yourcompany.morpheusecho",
    permissions: [
      "RECORD_AUDIO",
      "android.permission.POST_NOTIFICATIONS",
      "android.permission.SCHEDULE_EXACT_ALARM"
    ],
    adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#1c1b2a"
      }
  },

  plugins: [],

  extra: {
    eas: {
      projectId: '0bb02769-7302-4621-af45-11d3abcc695f',
    },
    expoPublicOpenAiKey: process.env.EXPO_PUBLIC_OPENAI_KEY
  }
});
