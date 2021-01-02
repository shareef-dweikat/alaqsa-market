import IntroductionSlider from '../components/introductionSlider/IntroductionSlider';
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Linking,
  KeyboardAvoidingView,
  TextInput,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Colors from '../constants/colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import RightArrow from '../../assets/right-arrow.svg';

import { StatusBar } from 'expo-status-bar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  txt: { fontFamily: 'Tajawal-Medium', textAlign: 'center' },
  image: {
    // flex: 1,
    // resizeMode: 'cover',
    backgroundColor: Colors.BACKGROUND,
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'flex-end',
    height: Dimensions.get('window').height * 0.1,
    paddingBottom: 32,
  },
});
export default function CustomerService({ navigation }) {
  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
      <View style={styles.image}>
        <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <RightArrow />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 30,
              marginRight: 16,
              fontFamily: 'Tajawal-Medium',
              color: 'white',
            }}
          >
            خدمة العملاء
          </Text>
        </View>
        <View style={{ width: '100%', height: 60 }}>
          {/* <SearchBox search={search} /> */}
        </View>
      </View>
      <StatusBar backgroundColor={Colors.BACKGROUND} barStyle='light-conten' />
      <View style={{ justifyContent: 'center', marginTop: 64 }}>
        <Text style={styles.txt}>شكرا لثقتك بنا</Text>
        <Text style={styles.txt}>للتواصل</Text>
        <Text style={{ ...styles.txt, marginTop: 32 }}>فرع نابلس</Text>
        <Text style={styles.txt}>حسام ملحس </Text>
        <TouchableOpacity onPress={() => Linking.openURL(`tel:0592369440`)}>
          <Text style={styles.txt}>0592369440</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL(`mailto:alaqsamart@gmail.com`)}
        >
          <Text style={styles.txt}>alaqsamart@gmail.com</Text>
        </TouchableOpacity>
        <Text style={{ ...styles.txt, marginTop: 16 }}>فرع نابلس</Text>
        <Text style={styles.txt}>حسام ملحس </Text>
        <TouchableOpacity onPress={() => Linking.openURL(`tel:0592369440`)}>
          <Text style={styles.txt}>0592369440</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL(`mailto:alaqsamart@gmail.com`)}
        >
          <Text style={styles.txt}>alaqsamart@gmail.com</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
