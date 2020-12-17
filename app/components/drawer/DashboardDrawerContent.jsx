import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import Colors from '../../constants/colors';
import { SafeAreaView } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';

import CategoriesIcon from '../../../assets/dashboard-drawer/cat-icon.svg';
import SmallHeart from '../../../assets/small-heart-icon.svg';
import BuyHistory from '../../../assets/drawer/history.svg';
import Tap from './Tap';
import Report from '../../../assets/drawer/report';
import Rate from '../../../assets/drawer/rate.svg';
import Share from '../../../assets/drawer/share.svg';
import FbIcon from '../../../assets/drawer/fb.svg';
import ProductsIcon from '../../../assets/dashboard-drawer/product.svg';
import SignOut from '../../../assets/drawer/logout.svg';
import navigation from '../../config/navigation';
import { setUserType } from '../../store/action/auth';
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
export default function DashboardDrawerContent({ value, navigation }) {
  const dispatch = useDispatch();

  return (
    <View style={{ backgroundColor: Colors.BACKGROUND, flex: 1 }}>
      <View
        style={{
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
        title='نظرة عامة'
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
      {/*   <Tap
        title='إدارة المستخدمين'
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
        title='السلايدر الإعلاني'
        tapIcon={
          <Share
            // color={Colors.BACKGROUND}
            color={Colors.WHITE}
          />
        }
      />*/}
      <Tap
        title='الطلبات'
        onPress={() => navigation.push('DashboardOrdersPage')}
        tapIcon={
          <Rate
            // color={Colors.BACKGROUND}
            color={Colors.WHITE}
          />
        }
      />
      <Tap
        title='التصنيفات'
        onPress={() => navigation.push('DashboardCategoriesScreen')}
        tapIcon={
          <CategoriesIcon
            // color={Colors.BACKGROUND}
            color={Colors.WHITE}
          />
        }
      />
      <Tap
        title='المنتجات'
        onPress={() => navigation.push('DashboardProductsScreen')}
        tapIcon={
          <ProductsIcon
            // color={Colors.BACKGROUND}
            color={Colors.WHITE}
          />
        }
      />
      {/* <Tap
        title='الزبائن'
        tapIcon={
          <SignOut
            // color={Colors.BACKGROUND}
            color={Colors.WHITE}
          />
        }
      />
       <Tap
        title='الرئائل والإبلاغات'
        tapIcon={
          <SignOut
            // color={Colors.BACKGROUND}
            color={Colors.WHITE}
          />
        }
      />*/}
      <Tap
        title='تسجيل خروج'
        onPress={() => {
          AsyncStorage.clear();
          dispatch(setUserType(null, null));
        }}
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
