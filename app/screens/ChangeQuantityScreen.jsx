import IntroductionSlider from '../components/introductionSlider/IntroductionSlider';
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Keyboard,
} from 'react-native';
import pImage from '../../assets/meat.png';
import HeartIcon from '../../assets/small-heart-icon.svg';
import PlusIcon from '../../assets/plus-icon.svg';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-community/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/colors';
import RightArrow from '../../assets/right-arrow.svg';
import SearchBox from '../components/SearchBox';
import { StatusBar } from 'expo-status-bar';
import VerticalItemDetailsCard from '../components/VerticalItemDetailsCard';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
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
export default function ChangeQuantityScreen({ navigation }) {
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
            تغيير الكمية
          </Text>
        </View>
      </View>
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
          desssss
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            paddingHorizontal: 32,
            marginTop: 32,
          }}
        >
          <View style={{ flex: 1 }}>
            <Picker
              selectedValue={'sss'}
              style={{ height: 50, width: 100 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ language: itemValue })
              }
            >
              <Picker.Item label='دولار  للكيلو' value='1' />
              <Picker.Item label='دولارين  للكيلتين' value='2' />
            </Picker>
          </View>

          <Text
            style={{ fontFamily: 'Tajawal-Regular', color: '#515462', flex: 1 }}
          >
            قم بتحديد الكمية
          </Text>
        </View>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>أضف إلى السلة</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
