import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import * as Updates from 'expo-updates';
import Colors from '../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { setUserType } from '../../store/action/auth';
import firebase from '../../config/firebase';
import SmallHeart from '../../../assets/small-heart-icon.svg';
import BuyHistory from '../../../assets/drawer/history.svg';
import Tap from './Tap';
import Report from '../../../assets/drawer/report';
import SignOut from '../../../assets/drawer/logout.svg';
import { AsyncStorage } from 'react-native';

export default function DrawerContent({ value, navigation }) {
  const dispatch = useDispatch();
  const phone = useSelector((state) => state.auth.phone);
  return (
    <View style={{ backgroundColor: Colors.BACKGROUND, flex: 1 }}>
      <View
        style={{
          backgroundColor: Colors.BACKGROUND,
          height: Dimensions.get('window').height * 0.25,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: Colors.WHITE,
            width: 100,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
          }}
        >
          <Image
            resizeMode='contain'
            style={{ width: 80, height: 80 }}
            source={require('../../../assets/logo.png')}
          />
        </View>
      </View>
      <Tap
        title='المفضلة'
        onPress={() => {
          navigation.toggleDrawer();
          navigation.push('FavScreen');
        }}
        tapIcon={<SmallHeart color={Colors.WHITE} />}
      />
      <Tap
        title='سجل المشتريات'
        onPress={() => {
          navigation.push('OrdersPage');
          navigation.toggleDrawer();
        }}
        tapIcon={
          <BuyHistory
            color={Colors.WHITE}
          />
        }
      />
     
      <Tap
        title='خدمة العملاء'
        onPress={() => navigation.push('CustomerService')}
        tapIcon={
          <Report
            // color={Colors.BACKGROUND}
            color={Colors.WHITE}
          />
        }
      />
      <Tap
        // onPress={() => {
        //   AsyncStorage.clear();
        //   dispatch(setUserType(null, null));
        // }}
        onPress={() => {
          firebase
            .database()
            .ref(`fav/${phone}`)
            .remove()
            .then(() => {
              AsyncStorage.clear();
              dispatch(setUserType(null, null));
              Updates.reloadAsync();
            });
          // AsyncStorage.clear();
          //  dispatch(setUserType(null, null));
        }}
        title='تسجيل خروج'
        tapIcon={
          <SignOut
            // color={Colors.BACKGROUND}
            color={Colors.WHITE}
          />
        }
      />
    </View>
  );
}
