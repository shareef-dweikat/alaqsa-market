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
export default function HorizontalCategoryCard({
  name,
  onPress,
  image,
  isVisible = true,
}) {
  if (!isVisible) {
    return <View />;
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 100,
        height: 140,
        borderWidth: 1,
        borderColor: '#d0d0d0',
        borderRadius: 10,
        alignItems: 'center',
        paddingTop: 8,
        marginTop: 16,
        marginHorizontal: 4,
      }}
    >
      <Image style={{ height: 80, width: 80 }} source={{ uri: image }} />
      <View
        style={{
          flexDirection: 'row',
          // justifyContent: 'space-between',
          // width: '100%',
          // paddingHorizontal: 16,
          marginTop: 8,
        }}
      >
        <Text
          style={{
            fontFamily: 'Tajawal-Medium',
            flexWrap: 'nowrap',
            fontSize: 12,
            textAlign: 'center',
          }}
        >
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
