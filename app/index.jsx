/* eslint-disable react/style-prop-object */
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Navigation from './config/navigation';
import { useFonts } from 'expo-font';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default function App() {
  let [fontsLoaded] = useFonts({
    'Tajawal-Light': require('../assets/fonts/ArbFONTS-Tajawal-Light.ttf'),
    'Tajawal-Bold': require('../assets/fonts/ArbFONTS-Tajawal-Bold-1.ttf'),
    'Tajawal-Medium': require('../assets/fonts/ArbFONTS-Tajawal-Medium.ttf'),
    'Tajawal-Regular': require('../assets/fonts/ArbFONTS-Tajawal-Regular-1.ttf'),
  });

  return fontsLoaded ? <Navigation /> : null;
}
