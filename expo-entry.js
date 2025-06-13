// expo-entry.js  (o index.js si cambiaste el main)
import { registerRootComponent } from 'expo';
import App from './App';    // ajusta la ruta si moviste App

// Esto registra el componente raíz para Expo Go y builds nativos
registerRootComponent(App);
