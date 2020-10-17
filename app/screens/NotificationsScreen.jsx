import IntroductionSlider from '../components/introductionSlider/IntroductionSlider';
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default function NotificationsScreen() {
  // const image = { uri: '../../assets/signin-screen/background.png' };

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
      <ScrollView>
        <Text>NotificationsScreen</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
