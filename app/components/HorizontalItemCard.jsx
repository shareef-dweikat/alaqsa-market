import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import HeartIcon from '../../assets/small-heart-icon.svg';
import PlusIcon from '../../assets/plus-icon.svg';
import HeartEmptyIcon from '../../assets/small-heart-empty-icon.svg';

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
  const user = useSelector((state) => state.auth.userType);

  const handleFav = async () => {
    if (!user) return

    const x = await AsyncStorage.getItem(product.firebaseId);
    if (x) {
      AsyncStorage.removeItem(product.firebaseId);
      deleteFromFav();
    } else {
      AsyncStorage.setItem(product.firebaseId, product.firebaseId);
      setIsFav(true);
      addToFav();
    }

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
            width: 70,
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
        numberOfLines={2}
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
