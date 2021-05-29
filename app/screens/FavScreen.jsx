import React, { useEffect, useState } from 'react';

import HeartIcon from '../../assets/small-heart-icon.svg';
import HeartEmptyIcon from '../../assets/small-heart-empty-icon.svg';
import PlusIcon from '../../assets/plus-icon.svg';
import { setFav, deleteFav } from '../store/action/product';
import {
  Text,
  View,
  Image,
  AsyncStorage,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import RightArrow from '../../assets/right-arrow.svg';

import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFav } from '../store/action/product';

import { addProductToCart } from '../store/action/cart';
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.WHITE,
  },
  image: {
    backgroundColor: Colors.BACKGROUND,
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'flex-end',
    height: Dimensions.get('window').height * 0.15,
  },
});
export default function FavScreen({ navigation }) {
  const dispatch = useDispatch();
  const phone = useSelector((state) => state.auth.phone);
  const favProducts = useSelector((state) => state.product.favProducts);

  const user = useSelector((state) => state.auth.userType);

  const isAuth = (product) => {
    if (user) dispatch(addProductToCart(product, navigation, phone, '1'));
    else navigation.push('AuthStackScreen');
  };
  const isAuthFav = (product) => {
    if (user) dispatch(setFav(product, phone));
    else navigation.push('AuthStackScreen');
  };
  const isAuthDelete = (product) => {
    if (user) dispatch(deleteFav(product, phone));
    else navigation.push('AuthStackScreen');
  };
  useEffect(() => {
    dispatch(fetchFav(phone));
  }, []);
  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
      <StatusBar backgroundColor={Colors.BACKGROUND} barStyle='light-conten' />
      <View style={styles.image}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <RightArrow />
        </TouchableOpacity>
        <View>
          <Text
            style={{
              fontSize: 30,
              fontFamily: 'Tajawal-Medium',
              color: 'white',
              textAlign: 'right'
            }}
          >
            المفضلة
          </Text>
        </View>
      </View>

      <ScrollView style={{ padding: 8 }}>
        {favProducts != undefined &&
          favProducts.map((product) => (
            <VerticalItemCard
              product={product}
              addToFav={() => isAuthFav(product)}
              deleteFav={() => isAuthDelete(product)}
              add={() => isAuth(product)}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}
export function VerticalItemCard({ product, deleteFav, add }) {
  const [isFav, setIsFav] = useState(true);
  const handleFav = async () => {
    AsyncStorage.removeItem(product.firebaseId);
    setIsFav(false);
    deleteFav();
  };
  useEffect(() => {
    const getProductId = async () => {
      const x = await AsyncStorage.getItem(product.firebaseId);
      if (x) {
        setIsFav(true);
      }
    };
    getProductId();
  }, []);
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        height: 120,
        borderWidth: 1,
        borderColor: '#d0d0d0',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingTop: 13,
        marginTop: 16,
        flexDirection: 'row',
      }}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',

            paddingHorizontal: 16,
            marginTop: 8,
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            {isFav ? (
              <TouchableOpacity onPress={() => handleFav()}>
                <HeartIcon color='red' />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => handleFav()}>
                <HeartEmptyIcon />
              </TouchableOpacity>
            )}
            <TouchableOpacity style={{ marginLeft: 8 }} onPress={add}>
              <PlusIcon />
            </TouchableOpacity>
          </View>
          <Text style={{ textAlign: 'right', fontFamily: 'Tajawal-Medium' }}>
            {product.product_name}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            width: '100%',
            paddingHorizontal: 16,
          }}
        >
          <Text
            style={{
              color: '#B8B8CD',
              fontFamily: 'Tajawal-Regular',
              height: 40,
              marginTop: 8,
            }}
          >
            {product.product_desc}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            paddingHorizontal: 16,
            marginTop: 8,
          }}
        >
          <Text
            style={{
              textAlign: 'right',
              fontFamily: 'Tajawal-Bold',
              color: '#515462',
            }}
          >
            {product.price} شيكل
          </Text>
        </View>
      </View>

      <Image
        style={{ width: 100, height: 100, marginRight: 8, borderRadius: 5 }}
        source={{ uri: product.image }}
      />
    </TouchableOpacity>
  );
}
