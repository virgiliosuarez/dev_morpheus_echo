import React from 'react';
import { Image, Linking, ScrollView, StyleSheet, Text, View } from 'react-native';

export interface AIResponse {
  interpretation: string;
  images: string[];
  readings: { title: string; author: string; link: string }[];
  videos: { title: string; url: string }[];
}

const DreamDetailView: React.FC<{ response: AIResponse }> = ({ response }) => (
  <ScrollView style={styles.detailContainer} contentContainerStyle={styles.content}>
    <Text style={styles.heading}>🧠 Interpretación</Text>
    <Text style={styles.text}>{response.interpretation}</Text>

    <Text style={styles.heading}>🖼️ Imágenes evocativas</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {response.images.map((uri, i) => (
        <Image key={i} source={{ uri }} style={styles.image} />
      ))}
    </ScrollView>

    <Text style={styles.heading}>📚 Lecturas sugeridas</Text>
    {response.readings.map((r, i) => (
      <Text
        key={i}
        style={styles.link}
        onPress={() => Linking.openURL(r.link)}
      >
        • {r.title} — {r.author}
      </Text>
    ))}

    <Text style={styles.heading}>🎥 Videos recomendados</Text>
    {response.videos.map((v, i) => (
      <Text
        key={i}
        style={styles.link}
        onPress={() => Linking.openURL(v.url)}
      >
        • {v.title}
      </Text>
    ))}
  </ScrollView>
);

export default DreamDetailView;

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,
    backgroundColor: '#10101A',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#9F86FF',
    marginTop: 20,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#EEE',
    lineHeight: 22,
  },
  image: {
    width: 200,
    height: 200,
    marginRight: 10,
    borderRadius: 12,
  },
  link: {
    fontSize: 16,
    color: '#7A5FFF',
    marginBottom: 8,
  },
});
