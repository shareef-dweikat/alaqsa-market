import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Colors from '../../constants/colors';
import RightArrow from '../../../assets/right-arrow.svg';
import { StatusBar } from 'expo-status-bar';
import pImage from '../../../assets/meat.png';
// import HeartIcon from '../../../assets/small-heart-icon.svg';
// import PlusIcon from '../../../assets/plus-icon.svg';
import { Picker } from '@react-native-community/picker';

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

  btn: {
    backgroundColor: '#F8A912',
    padding: 16,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    width: '100%',
  },
  btnText: {
    fontFamily: 'Tajawal-Medium',
    color: 'white',
    fontSize: 17,
  },
});
export default function DashboardItemDetailsScreen({ route, navigation }) {
  // const image = { uri: '../../assets/signin-screen/background.png' };
  const product = route.params;
  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
      <StatusBar backgroundColor={Colors.BACKGROUND} barStyle='light-conten' />
      <View style={styles.image}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <RightArrow />
        </TouchableOpacity>
        <View style={{ width: '100%' }}>
          <Text
            style={{
              fontSize: 30,
              fontFamily: 'Tajawal-Medium',
              color: 'white',
            }}
          >
            التفاصيل
          </Text>
        </View>
      </View>
      <VerticalItemDetailsCard product={product} />
    </SafeAreaView>
  );
}

export function VerticalItemDetailsCard({ product }) {
  const prod = product && product;
  console.log(prod, "ddddddddd")
  return (
    <ScrollView
      contentContainerStyle={{
        marginTop: 16,
        paddingHorizontal: 32,
        // flexDirection: 'row',
      }}
    >
      <Image
        style={{
          borderRadius: 10,
          height: 250,
        }}
        source={{ uri: prod.image }}
      />
      <Text
        style={{
          fontFamily: 'Tajawal-Medium',
          marginTop: 12,
          color: '#515462',
        }}
      >
        {product.name}
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
      <Text
          style={{
            fontFamily: 'Tajawal-Regular',
            marginTop: 16,
            color: '#515462',
          }}
        >
          {product.category}
        </Text>
        <Text
          style={{
            fontFamily: 'Tajawal-Regular',
             marginTop: 16,
            color: '#515462',
          }}
        >
          التصنيف :
        </Text>
      </View>
      <Text
        style={{
          fontFamily: 'Tajawal-Regular',
          textAlign: 'right',
          width: '100%',
          marginTop: 16,
          color: '#515462',
        }}
      >
        {product.desc}
      </Text>
    </ScrollView>
  );
}
