/* eslint-disable react/style-prop-object */
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import { useFonts } from 'expo-font';
import firebase from './config/firebase';
import store from './store'
import Navigation from './config/navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default function App() {
  // firebase.database().ref('users/').set({
  //   highscore: 2
  // });

  let [fontsLoaded] = useFonts({
    'Tajawal-Light': require('../assets/fonts/ArbFONTS-Tajawal-Light.ttf'),
    'Tajawal-Bold': require('../assets/fonts/ArbFONTS-Tajawal-Bold-1.ttf'),
    'Tajawal-Medium': require('../assets/fonts/ArbFONTS-Tajawal-Medium.ttf'),
    'Tajawal-Regular': require('../assets/fonts/ArbFONTS-Tajawal-Regular-1.ttf'),
  });

  return fontsLoaded ? (
    <Provider store={store}>
      <Navigation />
    </Provider>
  ) : null;
}
