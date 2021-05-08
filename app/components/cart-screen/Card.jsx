import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import firebase from '../../config/firebase';

import X from '../../../assets/cart/x.svg';
import { storeItemToDelete } from '../../store/action/cart';

export default function Card({
  fetchProducts,
  setDeleteModalVisible,
  phone,
  price,
  name,
  image,
  firebaseId,
  quantity,
}) {

  const [value, setValue] = useState();
  const dispatch = useDispatch();
  const handleQChanged = (txt) => {
    if (txt == 0) {
      setValue(txt);
      return;
    }
    setValue(txt);
    firebase
      .database()
      .ref(`cart/${phone}/${firebaseId}`)
      .update({
        quantity: txt,
      })
      .then(() => {
        dispatch(fetchProducts(phone));
      });
  };

  useEffect(() => {
    setValue(quantity);
  }, []);
  return (
    <View style={{ marginBottom: 16 }}>
      <View
        style={{
          flexDirection: 'row',
          position: 'relative',
          bottom: -8,
          zIndex: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            dispatch(storeItemToDelete(firebaseId));
            setDeleteModalVisible();
          }}
        >
          <X style={{ marginRight: 16 }} />
        </TouchableOpacity>
 
      </View>
      <View
        style={{
          backgroundColor: '#F9F9FA',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 8,
          borderRadius: 5,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            paddingHorizontal: 16
          }}
        >
          <Text style={{ fontSize: 15, fontFamily: 'Tajawal-Medium' }}>
            {price} شيكل
          </Text>
        </View>
        <View
          style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}
        >
          <View>
            <Text
              style={{
                marginRight: 16,
                fontFamily: 'Tajawal-Regular',
                fontSize: 17,
              }}
            >
              {name}
            </Text>
            <View style={{ flexDirection: 'row', paddingHorizontal: 16, marginTop: 8 }}>
              <TextInput
                keyboardType='number-pad'
                value={value}
                onChangeText={(txt) => handleQChanged(txt)}
                style={{
                  fontSize: 12,
                  fontFamily: 'Tajawal-Regular',
                  textAlign: 'center',
                  borderColor: 'black',
                  borderWidth: 1,
                  height: 20,
                  width: 30,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                placeholder='0'
              />
              <Text style={{fontFamily: 'Tajawal-Regular'}}>الكمية: </Text>
            </View>
          </View>
          <Image
            style={{ height: 100, width: 100, borderRadius: 10 }}
            source={{ uri: image }}
          />
        </View>
      </View>
    </View>
  );
}
