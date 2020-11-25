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
export default function DashboardItemDetailsScreen({ navigation }) {
  // const image = { uri: '../../assets/signin-screen/background.png' };

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
      <VerticalItemDetailsCard />
    </SafeAreaView>
  );
}

export function VerticalItemDetailsCard({
  name,
  price,
  desc,
  isFav,
  onPress,
  btn,
}) {
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
          width: '100%',
          borderRadius: 10,
        }}
        source={pImage}
      />

      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 12,
          width: '100%',
        }}
      >
        <Text style={{fontFamily: 'Tajawal-Medium'}}>اسسسس</Text>
      </View> */}
      <Text
        style={{
          fontFamily: 'Tajawal-Medium',
          marginTop: 12,
          color: '#515462',
        }}
      >
        اسسسس
      </Text>

      <Text
        style={{
          fontFamily: 'Tajawal-Regular',
          textAlign: 'right',
          width: '100%',
          marginTop: 16,
          color: '#515462',
        }}
      >
        التصنيف
      </Text>
      <Text
        style={{
          fontFamily: 'Tajawal-Regular',
          textAlign: 'right',
          width: '100%',
          marginTop: 16,
          color: '#515462',
        }}
      >
        هذا النـص هو مثال لنص يمكن أن يستبدل في نـــــــــــفس المساحــة، لقد تم
        توليد هذا النص من مولد النـــــــــــــــــــــــص العربى، حيـث يمكنك أن
        تولد مثل هذا النص أو العديـــــــــــد من النـصوص الأخرى إضافة إلى زيادة
        عدد الحروف التـــــى يولدها التطبيق
      </Text>
    </ScrollView>
  );
}
