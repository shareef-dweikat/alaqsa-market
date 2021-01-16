import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Modal,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import DeleteIcon from '../../../assets/delete-icon-dashboard.svg';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '../../config/firebase';
import { pushNotification } from '../../store/action/notifications';
import Colors from '../../constants/colors';

const styles = StyleSheet.create({
  input: {
    borderColor: 'black',
    borderWidth: 1,
    height: 40,
    width: '100%',
    marginTop: 16,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  btn: {
    backgroundColor: '#F8A912',
    padding: 16,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  btnText: {
    fontFamily: 'Tajawal-Regular',
    color: 'white',
  },
});

export default function DashboardNotifications({ navigation }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const dispatch = useDispatch();

  const submit = () => {
    dispatch(pushNotification(title, desc));
  };

  return (
    <View
      style={{
        backgroundColor: Colors.WHITE,
        flex: 1,
        paddingTop: 124,
        paddingHorizontal: 16,
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          fontFamily: 'Tajawal-Bold',
          marginBottom: 16,
          fontSize: 18
        }}
      >
        نموذج الإشعارات
      </Text>
      <TextInput style={styles.input} onChangeText={(txt) => setTitle(txt)} />
      <TextInput
        style={{ ...styles.input, height: 60 }}
        onChangeText={(txt) => setDesc(txt)}
      />
      <TouchableOpacity onPress={() => submit()} style={styles.btn}>
        <Text style={styles.btnText}>ارسال</Text>
      </TouchableOpacity>
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
