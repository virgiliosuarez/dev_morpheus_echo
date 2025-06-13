// src/services/dreamApi.ts

const OPENAI_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-4o-mini';

const PROMPT_SYSTEM = `
Eres un psicólogo junguiano experto. Cuando te envíen un sueño, responde con un objeto JSON que incluya:
1) "interpretation": interpretación emocional y simbólica del sueño, redactada como un psicólogo.
2) "tips": reflexiones para aplicar la interpretacion del sueno a la vida diaria.
Devuelve SOLO el JSON, sin texto adicional.
`.trim();

export interface AIResponse {
  interpretation: string;
  story: string;
  images: string[];
  readings: { title: string; author: string; link: string }[];
  videos: { title: string; url: string }[];
}

export async function interpretDream(userDream: string, chatId: string): Promise<AIResponse> {
  if (!userDream.trim() || !chatId) throw new Error('Datos insuficientes');

  const apiKey = process.env.EXPO_PUBLIC_OPENAI_KEY;
  if (!apiKey) throw new Error('Falta la clave EXPO_PUBLIC_OPENAI_KEY');

  const res = await fetch(OPENAI_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: PROMPT_SYSTEM },
        { role: 'user', content: userDream }
      ],
      temperature: 0.7,
      user: chatId
    })
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Error ${res.status}: ${err.slice(0,200)}`);
  }

  const json = await res.json();
  const text = json.choices?.[0]?.message?.content;
  if (!text) throw new Error('Respuesta vacía');

  try {
    return JSON.parse(text) as AIResponse;
  } catch (err) {
    console.error('Error parseando JSON de la API:', text);
    throw new Error('Formato de respuesta inesperado');
  }
}
