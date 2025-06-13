import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  Theme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ChatScreen from '@/screens/ChatScreen';

export type RootStackParamList = {
  Chat: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const scheme = useColorScheme();

  const customTheme: Theme = {
    ...(scheme === 'dark' ? DarkTheme : DefaultTheme),
    colors: {
      ...(scheme === 'dark' ? DarkTheme.colors : DefaultTheme.colors),
      primary: scheme === 'dark' ? '#9F86FF' : '#5B2EFF',
      background: scheme === 'dark' ? '#0c0c14' : '#ffffff',
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer theme={customTheme}>
          <StatusBar barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} />
          <Stack.Navigator
            screenOptions={{
              headerTitleAlign: 'center',
              animation: 'fade',
            }}
          >
            <Stack.Screen
              name="Chat"
              component={ChatScreen}
              options={{ title: "Morpheus' Echo" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
