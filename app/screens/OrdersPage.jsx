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
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import Colors from '../constants/colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import RightArrow from '../../assets/right-arrow.svg';
import SearchBox from '../components/SearchBox';
import { StatusBar } from 'expo-status-bar';
import { fetchOrders } from '../store/action/orders';
import VerticalItemCard from '../components/VerticalItemCard';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  image: {
    // flex: 1,
    // resizeMode: 'cover',
    backgroundColor: Colors.BACKGROUND,
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'flex-end',
    height: Dimensions.get('window').height * 0.2,
    // width: Dimensions.get('window').width,
  },
  lookForProductText: {
    fontSize: 30,
    fontFamily: 'Tajawal-Medium',
    color: 'white',
  },
  orderCard: {
    borderRadius: 10,
    backgroundColor: '#F9F9FA',
    padding: 16,
    paddingHorizontal: 32,
  },
  orderCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderTitle: {
    fontSize: 12,
    fontFamily: 'Tajawal-Medium',
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productPrice: {
    marginTop: 16,
    fontFamily: 'Tajawal-Regular',
    color: '#515462',
  },
  productName: {
    marginTop: 16,
    fontFamily: 'Tajawal-Regular',
    color: '#515462',
  },
});
export default function OrdersPage({ navigation }) {
  // const image = { uri: '../../assets/signin-screen/background.png' };
  const dispatch = useDispatch(fetchOrders());
  const order = useSelector((state) => state.orders.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);
  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
      <StatusBar backgroundColor={Colors.BACKGROUND} barStyle='light-conten' />
      <View style={styles.image}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <RightArrow />
        </TouchableOpacity>
        <View style={{ width: '100%' }}>
          <Text style={styles.lookForProductText}>ابحث عن منتج</Text>
          <SearchBox />
        </View>
      </View>

      <ScrollView style={{ padding: 8 }}>
        <View style={styles.orderCard}>
          <View style={styles.orderCardHeader}>
            <Text
              style={{
                color: '#F8A912',
                fontSize: 12,
                fontFamily: 'Tajawal-Medium',
              }}
            >
             1/1/2020  2:00 مساء
            </Text>

            <Text style={styles.orderTitle}>طلبية رقم 1</Text>
          </View>
          {order.map((product) => (
            <View style={styles.productRow}>
              <Text style={styles.productPrice}>{product.price} شيكل</Text>
              <Text style={styles.productName}>عدد 2</Text>
              <Text style={styles.productName}>{product.name}</Text>
            </View>
          ))}

          <View
            style={{
              justifyContent: 'space-between',
              width: '50%',
              flexDirection: 'row',
              marginTop: 32,
            }}
          >
            <View>
              <Text style={{ fontFamily: 'Tajawal-Regular' }}>11 شيكل</Text>
              <Text
                style={{
                  fontFamily: 'Tajawal-Regular',
                  color: '#F8A912',
                  marginTop: 8,
                }}
              >
                22 شيكل
              </Text>
            </View>
            <View>
              <Text style={{ fontFamily: 'Tajawal-Regular', color: 'black' }}>
                التوصيل
              </Text>
              <Text
                style={{
                  fontFamily: 'Tajawal-Regular',
                  color: '#F8A912',
                  marginTop: 8,
                }}
              >
                التوصيل
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
