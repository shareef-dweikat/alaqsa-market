import IntroductionSlider from './introductionSlider/IntroductionSlider';
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import pImage from '../../assets/home/product.png';
import HeartIcon from '../../assets/small-heart-icon.svg';
import HeartEmptyIcon from '../../assets/small-heart-empty-icon.svg';
import PlusIcon from '../../assets/plus-icon.svg';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default function VerticalItemCard({
  name,
  price,
  desc,
  // isFav,
  onPress,
  add,
  addToFav,
  deleteFromFav,
  product,
  phone,
}) {
  const [isFav, setIsFav] = useState(false);
  const handleFav = async () => {
    const x = await AsyncStorage.getItem(product.firebaseId);

    if (x) {
      AsyncStorage.removeItem(product.firebaseId);
      setIsFav(false);
    } else {
      AsyncStorage.setItem(product.firebaseId, product.firebaseId);
      setIsFav(true);
    }

    // const x = await AsyncStorage.getItem(product.firebaseId)
    addToFav(product, phone);
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
      onPress={onPress}
      style={{
        flex: 1,
        height: 140,
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
            {name}
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
            {desc}
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
            {price} شيكل
          </Text>
        </View>
      </View>
      <Image resizeMode='contain' style={{ height: 100 }} source={pImage} />
    </TouchableOpacity>
  );
}
