import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../constants/colors';
import { SafeAreaView } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setUserType } from '../../store/action/auth';

import SIcon from '../../../assets/small-search-icon.svg';
import SmallHeart from '../../../assets/small-heart-icon.svg';
import BuyHistory from '../../../assets/drawer/history.svg';
import Tap from './Tap';
import Report from '../../../assets/drawer/report';
import Rate from '../../../assets/drawer/rate.svg';
import Share from '../../../assets/drawer/share.svg';
import FbIcon from '../../../assets/drawer/fb.svg';
import InstaIcon from '../../../assets/drawer/insta.svg';
import SignOut from '../../../assets/drawer/logout.svg';
import navigation from '../../config/navigation';
import { AsyncStorage } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    backgroundColor: 'white',
    width: '100%',
    height: 45,
    justifyContent: 'flex-end',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  input: {
    backgroundColor: 'white',
    height: '100%',
    borderRadius: 10,
    marginRight: 8,
  },
});
export default function DrawerContent({ value, navigation }) {
  const dispatch = useDispatch();

  return (
    <View>
      <View
        style={{
          backgroundColor: Colors.BACKGROUND,
          height: Dimensions.get('window').height * 0.25,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image source={require('../../../assets/person-drawer.png')} />
        <Text
          style={{ color: 'white', marginTop: 8, fontFamily: 'Tajawal-Medium' }}
        >
          أحمد محمد
        </Text>
      </View>
      <Tap
        title='المفضلة'
        onPress={() => {
          navigation.toggleDrawer();
          navigation.push('FavScreen');
        }}
        tapIcon={
          <SmallHeart
            // color={Colors.BACKGROUND}
            color={Colors.WHITE}
          />
        }
      />
      <Tap
        title='سجل المشتريات'
        onPress={() => {
          navigation.push('OrdersPage');
          navigation.toggleDrawer();
        }}
        tapIcon={
          <BuyHistory
            // color={Colors.BACKGROUND}
            color={Colors.WHITE}
          />
        }
      />
      <Tap
        title='إبلاغ'
        tapIcon={
          <Report
            // color={Colors.BACKGROUND}
            color={Colors.WHITE}
          />
        }
      />
      <Tap
        title='مشاركة التطبيق'
        tapIcon={
          <Share
            // color={Colors.BACKGROUND}
            color={Colors.WHITE}
          />
        }
      />
      <Tap
        title='تقييم التطبيق'
        tapIcon={
          <Rate
            // color={Colors.BACKGROUND}
            color={Colors.WHITE}
          />
        }
      />
      <Tap
        title='تابعنا على الفيسبوك'
        tapIcon={
          <FbIcon
            // color={Colors.BACKGROUND}
            color={Colors.WHITE}
          />
        }
      />
      <Tap
        title='تابعنا على الانستغرام'
        tapIcon={
          <InstaIcon
            // color={Colors.BACKGROUND}
            color={Colors.WHITE}
          />
        }
      />
      <Tap
        onPress={() => {
          AsyncStorage.clear();
          dispatch(setUserType(null, null));
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
