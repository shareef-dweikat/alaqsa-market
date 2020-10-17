import IntroductionSlider from '../components/introductionSlider/IntroductionSlider';
import React from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import bb from '../../assets/home/header.png';
import { SafeAreaView } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import DrawerIcon from '../../assets/drawer-icon.svg';
import SearchIcon from '../../assets/search-icon.svg';

import HorizontalItemCard from '../components/HorizontalItemCard';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    // flex: 1,
    // resizeMode: 'cover',
    justifyContent: 'center',
    height: Dimensions.get('window').height * 0.3,
    // width: Dimensions.get('window').width,
  },
  screenContentContainer: {
    padding: 16,
  },
});
export default function HomeScreen({ navigation }) {
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <ImageBackground style={styles.image} source={bb}>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 24,
              flex: 1,
              marginTop: 16,
            }}
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <TouchableOpacity onPress={() => navigation.push('SearchScreen')}>
                <SearchIcon />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <DrawerIcon />
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'center', flex: 1 }}>
              <Text
                style={{
                  textAlign: 'right',
                  fontFamily: 'Tajawal-Regular',
                  fontSize: 18,
                }}
              >
                نص يمكن استبداله
              </Text>
              <Text
                style={{
                  textAlign: 'right',
                  fontSize: 29,
                  fontFamily: 'Tajawal-Bold',
                }}
              >
                يوضع هنا نص اعلاني
              </Text>
              <Text
                style={{
                  textAlign: 'right',
                  fontFamily: 'Tajawal-Regular',
                  fontSize: 18,
                }}
              >
                نص يمكن استبداله
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
      <View
        style={{
          height: 45,
          backgroundColor: '#515462',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 17,
            fontFamily: 'Tajawal-Regular',
          }}
        >
          نص يمكن أن يستبدل في نفس المساحة
        </Text>
      </View>
      <ScrollView style={styles.screenContentContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons
              style={{ marginRight: 8 }}
              name='ios-arrow-back'
              size={16}
            />
            <Text style={{ fontFamily: 'Tajawal-Regular', fontSize: 14 }}>
              مشاهدة المزيد
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'Tajawal-Bold',
              fontSize: 17,
              color: '#E49500',
            }}
          >
            الأحدث
          </Text>
        </View>
        <HorizontalItemCard
          onPress={() => navigation.push('ItemDetailsScreen')}
          name='a'
          price={2}
          desc='1'
          isFav={true}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 32,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons
              style={{ marginRight: 8 }}
              name='ios-arrow-back'
              size={16}
            />
            <Text style={{ fontFamily: 'Tajawal-Regular', fontSize: 14 }}>
              مشاهدة المزيد
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'Tajawal-Bold',
              fontSize: 17,
              color: '#E49500',
            }}
          >
            الأكثر مبيعاً
          </Text>
        </View>
        <HorizontalItemCard name='a' price={2} desc='1' isFav={true} />
        <View style={{ height: 32 }}></View>
      </ScrollView>
      {/* <Button title="Alert" onPress={()=>navigation.push('Alert')}/> */}
    </View>
  );
}
