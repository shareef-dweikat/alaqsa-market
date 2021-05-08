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
    paddingBottom: 32
  },
  lookForProductText: {
    fontSize: 22,
    fontFamily: 'Tajawal-Medium',
    color: 'white',
  },
});

export default function DashboardAccounts({ navigation }) {
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
        {accounts.map((account) => (
          <AccountCard account={account} />
        ))}
      </ScrollView>
    </View>
  );
}

export function DeleteConfirmation({
  name,
  visible,
  handleDelete,
  setDeleteDialogVisible,
}) {
  return (
    <Modal visible={visible}>
      <TouchableOpacity
        onPress={() => setDeleteDialogVisible(false)}
        style={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            width: '80%',
            height: 300,
            padding: 16,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DeleteIcon />
          <Text
            style={{
              marginTop: 8,
              fontFamily: 'Tajawal-Bold',
              fontSize: 20,
              textAlign: 'center',
            }}
          >
            هل انت متأكد من حذف تصنيف {name}؟ كل منتجات التصنيف ستضيع
          </Text>

          <View style={{ width: '100%' }}>
            <TouchableOpacity onPress={() => handleDelete()} style={styles.btn}>
              <Text style={styles.btnTxt}>تأكيد الحذف</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

export function AccountCard({ account }) {
  const [value, setValue] = useState('');
  const handleChangePassword = () => {
    firebase
      .database()
      .ref(`admins/${account}/password`)
      .set(value.trim())
      .then(() => {
        setValue('') 
        alert(`تم تغيير كلمة مرور ${account} بنجاح`)
      })
      .catch((e) => console.log('AccountCard', e));
  };
  return (
    <>
      <View
        style={{
          width: '100%',
          backgroundColor: '#e0e0e0',
          height: 60,
          borderRadius: 5,
          marginVertical: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 8,
        }}
      >
        <Text style={{ fontFamily: 'Tajawal-Regular' }}>{account}</Text>
        <View style={{ flexDirection: 'row-reverse' }}>
          <TouchableOpacity
            onPress={() => handleChangePassword(value)}
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
            placeholder='ادخل كلمة مرور جديدة'
          />
        </View>
      </View>
    </>
  );
}
