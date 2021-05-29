import React, { useEffect, useState } from 'react';
import { 
  Text, View, Image, TextInput,
   TouchableOpacity, Dimensions
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
  desc,
  firebaseId,
  quantity,
}) {
  const [value, setValue] = useState();
  const dispatch = useDispatch();
  const width = Dimensions.get('window').width
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
            paddingHorizontal: 16,
          }}
        >
          <Text style={{ fontSize: 15, fontFamily: 'Tajawal-Medium' }}>
            {price} شيكل
          </Text>
        </View>
        <View
          style={{ flexDirection: 'row', flex: 2, justifyContent: 'flex-end' }}
        >
          <View>
            <Text
              style={{
                marginRight: 16,
                fontFamily: 'Tajawal-Regular',
                fontSize: 17,
                textAlign: 'right',
                width: width * 0.30,
                alignSelf: 'flex-end'
              }}
            >
              {name}
            </Text>
            <Text numberOfLines={1} style={{marginRight: 16, marginTop: 8}}>{desc}</Text>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 16,
                marginTop: 8,
              }}
            >
              <TouchableOpacity
                style={{
                  height: 20,
                  width: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  handleQChanged(parseInt(value) + 1 + '');
                  // const sum = parseInt(quantity) + 1;
                  // setQuantity(sum + '');
                }}
              >
                <Text style={{ color: 'black', fontSize: 18 }}>+</Text>
              </TouchableOpacity>
             
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
              <TouchableOpacity
                style={{
                  height: 20,
                  width: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  if (value === '1') return;
                  else handleQChanged(parseInt(value) - 1 + '');
                  // const sum = parseInt(quantity) + 1;
                  // setQuantity(sum + '');
                }}
              >
                <Text style={{ color: 'black', fontSize: 22 }}>-</Text>
              </TouchableOpacity>
              <Text style={{ fontFamily: 'Tajawal-Regular' }}>الكمية: </Text>
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
