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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default function CartScreen() {
  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
      <View>
        <Text>dadsad</Text>
      </View>
    </SafeAreaView>
  );
}
