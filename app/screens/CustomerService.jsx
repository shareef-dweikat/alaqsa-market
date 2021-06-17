import React from 'react';
import {
  Text,
  View,
  Linking,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/colors';
import RightArrow from '../../assets/right-arrow.svg';

import { StatusBar } from 'expo-status-bar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  txt: { fontFamily: 'Tajawal-Medium', textAlign: 'right', fontSize: 18, borderBottomColor: 'black', borderBottomWidth: 1 },
  title: { fontFamily: 'Tajawal-Medium', textAlign: 'right', color: 'orange', fontSize: 18  },
  image: {
    backgroundColor: Colors.BACKGROUND,
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'flex-end',
    height: Dimensions.get('window').height * 0.1,
  },
});
export default function CustomerService({ navigation }) {
  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
      <View style={styles.image}>
        <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <RightArrow />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 30,
              marginRight: 16,
              fontFamily: 'Tajawal-Medium',
              color: 'white',
            }}
          >
            خدمة العملاء
          </Text>
        </View>
        <View style={{ width: '100%', height: 60 }} />
      </View>
      <StatusBar backgroundColor={Colors.BACKGROUND} barStyle='light-conten' />
      <View style={{ justifyContent: 'center', marginTop: 64, padding: 8 }}>
        <Text style={{...styles.txt,  borderBottomWidth: 0}}>
          يسعدنا تواصلكم معنا عبر أي الوسائل التالية:
        </Text>

        <TouchableOpacity
          style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop:64 }}
          onPress={() => Linking.openURL(`tel:0595205387`)}
        >
          <Text style={styles.txt}>0595205387</Text>
          <Text style={styles.title}>الجوال: </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: 16 }}
          onPress={() => Linking.openURL(`https://wa.me/+970595205387`)}
        >
          <Text style={styles.txt}>+970595205387</Text>
          <Text style={styles.title}>واتساب: </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: 16 }}
          onPress={() => Linking.openURL(`fb://page/109599771206362/`)}
        >
          <Text style={styles.txt}>الأقصى ماركت "Al Aqsa Market"</Text>
          <Text style={styles.title}>فيسبوك: </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: 16 }}
          onPress={() => Linking.openURL(`https://www.instagram.com/al_aqsa_market`)}
        >
          <Text style={styles.txt}>al_aqsa_market</Text>
          <Text style={styles.title}>انستغرام: </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: 16, }}
          onPress={() => Linking.openURL(`mailto:alaqsamarket.2021@gmail.com`)}
        >
          <Text style={styles.txt}>alaqsamarket.2021@gmail.com</Text>
          <Text style={styles.title}>الإيميل: </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
