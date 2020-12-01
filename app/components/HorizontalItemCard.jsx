import IntroductionSlider from './introductionSlider/IntroductionSlider';
import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import pImage from '../../assets/home/product.png';
import HeartIcon from '../../assets/small-heart-icon.svg';
import PlusIcon from '../../assets/plus-icon.svg';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default function HorizontalItemCard({
  name,
  price,
  desc,
  isFav,
  onPress,
  add
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 150,
        height: 230,
        borderWidth: 1,
        borderColor: '#d0d0d0',
        borderRadius: 10,
        alignItems: 'center',
        paddingTop: 13,
        marginTop: 16,
      }}
    >
      <Image source={pImage} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          paddingHorizontal: 16,
          marginTop: 8,
        }}
      >
        <HeartIcon />
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
    </TouchableOpacity>
  );
}
