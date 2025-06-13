import '@testing-library/jest-native/extend-expect';

// Mock mínimo para RNGH (ya lo tenías)
jest.mock('react-native-gesture-handler', () => {});

// ➜ Mock para @expo/vector-icons (evita cargar expo-font & EXPO_OS warn)
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const createIcon = (name) => (props) =>
    React.createElement(name, props, props.children);

  return {
    // expón los iconos que uses – aquí basta con Ionicons
    Ionicons: createIcon('Ionicons'),
    // si en el futuro usas MaterialIcons, Feather, etc. añádelos aquí
  };
});

// Opcional: define EXPO_OS para silenciar cualquier otro warning
if (!process.env.EXPO_OS) {
  process.env.EXPO_OS = 'ios';
}
