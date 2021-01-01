import IntroductionSlider from '../components/introductionSlider/IntroductionSlider';
import React, { useEffect, useState } from 'react';

import pImage from '../../assets/home/product.png';
import HeartIcon from '../../assets/small-heart-icon.svg';
import HeartEmptyIcon from '../../assets/small-heart-empty-icon.svg';
import PlusIcon from '../../assets/plus-icon.svg';
import { setFav, deleteFav } from '../store/action/product';
import {
  Text,
  View,
  Image,
  AsyncStorage,
  TextInput,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Keyboard,
} from 'react-native';
import ListViewIcon from '../../assets/list-view.svg';
import GridViewIcon from '../../assets/grid-view.svg';
import { SafeAreaView } from 'react-navigation';
import Colors from '../constants/colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import RightArrow from '../../assets/right-arrow.svg';
import SearchBox from '../components/SearchBox';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFav, fetchProducts } from '../store/action/product';
import { fetchCategories } from '../store/action/category';
import {
  addProductToCart,
  // searchAction
} from '../store/action/cart';
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
    height: Dimensions.get('window').height * 0.15,
    // width: Dimensions.get('window').width,
  },
});
export default function FavScreen({ navigation }) {
  // const image = { uri: '../../assets/signin-screen/background.png' };
  const dispatch = useDispatch();
  const phone = useSelector((state) => state.auth.phone);
  const favProducts = useSelector((state) => state.product.favProducts);
  // const favProduct1s = useSelector((state) => state.product.favProducts);
  useEffect(() => {
    dispatch(fetchFav(phone));
    // dispatch(fetchProducts());
  }, []);
  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
      <StatusBar backgroundColor={Colors.BACKGROUND} barStyle='light-conten' />
      <View style={styles.image}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <RightArrow />
        </TouchableOpacity>
        <View
          style={{
            // flexDirection: 'row',
            // justifyContent: 'space-between',
            // width: '100%',
            // alignItems: 'center',
          }}
        >
          {/* <View
            style={{
              marginHorizontal: 8,
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
            }}
          >
            <ListViewIcon
              color={Colors.ACTIVE_VIEW_TAP}
              style={{ marginRight: 8 }}
            />
            <GridViewIcon color={Colors.INACTIVE_VIEW_TAP} />
          </View> */}
          <Text
            style={{
              fontSize: 30,
              fontFamily: 'Tajawal-Medium',
              color: 'white',
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
              addToFav={() => dispatch(setFav(product, phone))}
              deleteFav={() => dispatch(deleteFav(product, phone))}
              add={() => dispatch(addProductToCart(product, navigation, phone))}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}
export function VerticalItemCard({ product, addToFav, deleteFav, add }) {
  const [isFav, setIsFav] = useState(true);
  const dispatch = useDispatch();
  console.log(product, 'productimage');
  const handleFav = async () => {
    const x = await AsyncStorage.getItem(product.firebaseId);

    AsyncStorage.removeItem(product.firebaseId);
    setIsFav(false);
    deleteFav();
    // dispatch(fetchCategories())
    // else {
    //   AsyncStorage.setItem(product.firebaseId, product.firebaseId);
    //   setIsFav(true);
    //   addToFav();
    // }

    // const x = await AsyncStorage.getItem(product.firebaseId)
  };
  useEffect(() => {
    const getProductId = async () => {
      console.log(product, 'adasdadasd');
      const x = await AsyncStorage.getItem(product.firebaseId);
      if (x) {
        setIsFav(true);
      }
    };
    getProductId();
  }, []);
  return (
    <TouchableOpacity
      // onPress={onPress}
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
            // justifyContent: 'space-between',
            //  width: '100%',
            paddingHorizontal: 16,
            marginTop: 8,
            justifyContent: 'space-between',
          }}
        >
          {isFav ? (
            <TouchableOpacity onPress={() => handleFav()}>
              <HeartIcon color='red' />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => handleFav()}>
              <HeartEmptyIcon />
            </TouchableOpacity>
          )}
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
              height: 50,
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
          <TouchableOpacity onPress={add}>
            <PlusIcon />
          </TouchableOpacity>
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
        resizeMode='contain'
        source={{ uri: product.image }}
      />
    </TouchableOpacity>
  );
}
