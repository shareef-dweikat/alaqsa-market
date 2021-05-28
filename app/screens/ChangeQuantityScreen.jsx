import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import pImage from '../../assets/meat.png';

import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-community/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/colors';
import RightArrow from '../../assets/right-arrow.svg';

import { StatusBar } from 'expo-status-bar';

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
    backgroundColor: Colors.BACKGROUND,
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'flex-end',
    height: Dimensions.get('window').height * 0.15,
  },
});
export default function ChangeQuantityScreen({ navigation }) {
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
         
        }}
      >
        <Image
          style={{
            width: '100%',
            borderRadius: 10,
          }}
          source={pImage}
        />

        <Text
          style={{
            fontFamily: 'Tajawal-Medium',
            marginTop: 12,
            color: '#515462',
          }}
        >
          ...
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
