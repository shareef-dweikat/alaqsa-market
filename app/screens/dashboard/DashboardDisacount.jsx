import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Modal,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import DeleteIcon from '../../../assets/delete-icon-dashboard.svg';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '../../config/firebase';

import RightArrow from '../../../assets/right-arrow.svg';

import Colors from '../../constants/colors';
import { fetchSellerAccounts } from '../../store/action/accounts';
import { ScrollView } from 'react-native';
const styles = StyleSheet.create({
  image: {
    backgroundColor: Colors.BACKGROUND,
    flexDirection: 'row-reverse',
    padding: 16,
    paddingTop: 45,
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.1,
    paddingBottom: 32,
  },
  lookForProductText: {
    fontSize: 22,
    fontFamily: 'Tajawal-Medium',
    color: 'white',
  },
});

export default function DashboardDisacount({ navigation }) {
  const [accounts, setAccounts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    firebase
      .database()
      .ref(`admins/`)
      .once('value', async (sellers) => {
        const sellersList = Object.keys(sellers.val());
        setAccounts(sellersList);
      })
      .catch((e) => console.log('fetchSellerAccounts', e));
  }, []);
  return (
    <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <View>
        <View style={styles.image}>
          <TouchableOpacity
            style={{ width: 20, marginLeft: 8 }}
            onPress={() => navigation.pop()}
          >
            <RightArrow />
          </TouchableOpacity>
          <View style={{ width: '100%' }}>
            <Text style={styles.lookForProductText}> إدارة حسابات الفروع</Text>
          </View>
        </View>
      </View>
      <ScrollView style={{ paddingHorizontal: 8, paddingTop: 8 }}>
        <Discount  />
      </ScrollView>
    </View>
  );
}


export function Discount() {
  const [value, setValue] = useState('');
  const handleSubmitDiscount = () => {
    firebase
      .database()
      .ref(`discount`)
      .set(value.trim())
      .then(() => {
        alert('تم حفظ النسبة بنجاح');
      })
      .catch((e) => console.log('Discount', e));
  };
  useEffect(()=> {
    firebase
    .database()
    .ref(`discount/`)
    .once('value', async (data) => {
      setValue(data.val());
    })
    .catch((e) => console.log('Discount', e));
  },[])
  return (
    <>
      <View
        style={{
          width: '100%',
          backgroundColor: '#e0e0e0',
          height: 60,
          borderTopColor: 'black',
          marginVertical: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 8,
        }}
      >
        <Text style={{ fontFamily: 'Tajawal-Regular' }}>نسبة الخصم</Text>
        <View style={{ flexDirection: 'row-reverse' }}>
          <TouchableOpacity
            onPress={() => handleSubmitDiscount()}
            style={{
              backgroundColor: Colors.GOLDEN,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 8,
              borderRadius: 10,
              marginHorizontal: 9,
            }}
          >
            <Text style={{ color: 'white', fontFamily: 'Tajawal-Regular' }}>
              حفظ
            </Text>
          </TouchableOpacity>
          <TextInput
            onChangeText={(txt) => setValue(txt)}
            value={value}
            style={{
              height: 40,
              backgroundColor: 'white',
              paddingHorizontal: 8,
              borderRadius: 10,
            }}
            placeholder='ادخل نسبة الخصم'
          />
           <Text style={{ color: 'black', fontFamily: 'Tajawal-Regular', fontSize: 18, marginTop: 5, marginRight: 4 }}>
              %
            </Text>
        </View>
      </View>
    </>
  );
}
