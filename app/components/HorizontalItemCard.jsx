import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import pImage from '../../assets/home/product.png';
import HeartIcon from '../../assets/small-heart-icon.svg';
import { addToFav } from '../store/action/product';
import PlusIcon from '../../assets/plus-icon.svg';
import HeartEmptyIcon from '../../assets/small-heart-empty-icon.svg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default function HorizontalItemCard({
  name,
  price,
  desc,
  phone,
  onPress,
  add,
  product,
  addToFav,
  deleteFromFav,
  image,
}) {
  const [isFav, setIsFav] = useState(false);
  const handleFav = async () => {
    const x = await AsyncStorage.getItem(product.firebaseId);

    if (x) {
      AsyncStorage.removeItem(product.firebaseId);
      // setIsFav(false);
      deleteFromFav();
    } else {
      AsyncStorage.setItem(product.firebaseId, product.firebaseId);
      setIsFav(true);
      addToFav();
    }

    // const x = await AsyncStorage.getItem(product.firebaseId)
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
        width: 100,
        height: 200,
        borderWidth: 1,
        borderColor: '#d0d0d0',
        borderRadius: 10,
        alignItems: 'center',
        paddingTop: 4,
        marginTop: 16,
      }}
    >
      <Image
        style={{ width: 90, height: 100, borderRadius: 5 }}
        source={{ uri: image }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
           paddingHorizontal: 4,
          marginTop: 8,
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
        <Text
          style={{
            textAlign: 'right',
            fontFamily: 'Tajawal-Medium',
            fontSize: 12,
          
          }}
        >
          {name}
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'flex-end',
          width: '100%',
          paddingHorizontal: 4,
        }}
      >
        <Text
          style={{
            color: '#B8B8CD',
            fontFamily: 'Tajawal-Regular',
            textAlign: 'right',
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
          paddingHorizontal: 4,
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
            fontSize: 12
          }}
        >
          {price} شيكل
        </Text>
      </View>
    </TouchableOpacity>
  );
}
