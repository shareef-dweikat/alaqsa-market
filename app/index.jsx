/* eslint-disable react/style-prop-object */
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import { useFonts } from 'expo-font';
import firebase from './config/firebase';
import store from './store'
import Navigation from './config/navigation';
import { I18nManager } from 'react-native';
import * as Updates from 'expo-updates';

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
  useEffect(()=> {
    if (I18nManager.isRTL) {
      I18nManager.forceRTL(false);
      I18nManager.allowRTL(false);
      Updates.reloadAsync();
    }
  },[])
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
