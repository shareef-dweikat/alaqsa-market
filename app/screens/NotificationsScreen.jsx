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
import BottomNav from '../components/BottomNav';
import navigation from '../config/navigation';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default function NotificationsScreen({navigation}) {
  // const image = { uri: '../../assets/signin-screen/background.png' };

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
      <ScrollView>
        <Text>NotificationsScreen</Text>
      </ScrollView>
      <BottomNav navigation={navigation} />
    </SafeAreaView>
  );
}
