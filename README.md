# 🌙 Morpheus' Echo

**Morpheus' Echo** is a mobile app built with React Native and Expo that allows users to share their dreams and receive a psychological interpretation based on Jungian theory. It uses AI (OpenAI GPT-4o-mini) to analyze dream content and generate empathetic responses, including symbolic analysis, visual inspirations, recommended readings, and videos.

## ✨ Features

- 🎤 Voice or text input to narrate your dream.
- 🤖 AI-generated interpretation with a Jungian perspective.
- 📖 Short evocative story to help remember dream content.
- 🖼️ Thematic imagery inspired by your dream.
- 📚 Curated books and YouTube videos to explore symbols further.
- 📱 Stylish, modern interface optimized for Android and iOS.

## 📲 Screenshots

> _Add preview images here if available._

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/morpheus-echo.git
cd morpheus-echo
````

### 2. Install dependencies

```bash
npm install
```

### 3. Add your OpenAI API key

In your `.env` or `app.config.ts`, add:

```env
EXPO_PUBLIC_OPENAI_KEY=your_openai_api_key
```

> Get your API key at [https://platform.openai.com](https://platform.openai.com)

### 4. Start the project

```bash
npx expo start
```

Scan the QR code with Expo Go or launch in a simulator.

## 📦 Build APK (Android)

```bash
eas build -p android --profile preview
```

This will generate an `.apk` file for testing on Android devices.

## 🧠 Tech Stack

* React Native + Expo
* TypeScript
* OpenAI GPT-4o-mini
* `expo-speech`, `expo-speech-recognition`
* EAS Build & Submit

## 💡 Inspiration

This project merges modern AI technology with deep psychological introspection, offering users a personal space to explore the meaning and symbolism of their dreams.

---

```

¿Quieres que también lo suba automáticamente a tu repositorio de GitHub si me das acceso al mismo?
```
