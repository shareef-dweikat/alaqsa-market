import IntroductionSlider from '../components/introductionSlider/IntroductionSlider';
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Keyboard,
} from 'react-native';
import Colors from '../constants/colors';
import { SafeAreaView } from 'react-navigation';
import DrawerIcon from '../../assets/drawer-icon.svg';
import { ScrollView } from 'react-native-gesture-handler';
import Card from '../components/cart-screen/Card';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  checkoutTxt: {
    fontFamily: 'Tajawal-Medium',
    fontSize: 17,
  },
  btn: {
    backgroundColor: '#F8A912',
    padding: 16,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  btnText: {
    fontFamily: 'Tajawal-Medium',
    color: 'white',
    fontSize: 17,
  },
  checkoutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});
export default function CartScreen({ navigation }) {
  return (
    <View style={{backgroundColor: Colors.WHITE, flex: 1}}>
      <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              // marginTop: 8,
            }}
          >
            <Text
              style={{
                fontFamily: 'Tajawal-Bold',
                fontSize: 17,
                color: Colors.GOLDEN,
              }}
            >
              4 عناصر
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  fontFamily: 'Tajawal-Medium',
                  marginRight: 16,
                  fontSize: 20,
                }}
              >
                السلة
              </Text>
              <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <DrawerIcon />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
        <View style={{ padding: 16 }}>
          <View style={{flex: 1}}>
          <Card />
          <Card />

          <Card />
        </View> 
          <View style={{flex:2}}>
            <View style={styles.checkoutContainer}>
              <Text style={styles.checkoutTxt}>22</Text>
              <Text style={styles.checkoutTxt}>المجموع</Text>
            </View>
            <View style={styles.checkoutContainer}>
              <Text style={styles.checkoutTxt}>22</Text>
              <Text style={styles.checkoutTxt}>التوصيل</Text>
            </View>
            <View style={styles.checkoutContainer}>
              <Text style={styles.checkoutTxt}>22</Text>
              <Text style={styles.checkoutTxt}>المبلغ الكلي</Text>
            </View>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>شراء الآن</Text>
            </TouchableOpacity>
          </View>
          <View style={{height: 4000}}></View>
        </View>
      </ScrollView>
    </View>
  );
}
