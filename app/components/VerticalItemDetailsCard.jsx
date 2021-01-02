import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import pImage from '../../assets/meat.png';
import HeartIcon from '../../assets/small-heart-icon.svg';
import PlusIcon from '../../assets/plus-icon.svg';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-community/picker';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProductToCart,
  // searchAction
} from '../store/action/cart';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
export default function VerticalItemDetailsCard({ product, navigation }) {
  const [quantity, setQuantity] = useState('1');

  const height = Dimensions.get('window').height * 0.4;
  const width = Dimensions.get('window').width - 40;
  const dispatch = useDispatch();
  const phone = useSelector((state) => state.auth.phone);

  const handleAddToCart = () => {
    if (!product.isVisible){
      alert('هذا المنتج غير متوفر')
      return
    }
      dispatch(addProductToCart(product, navigation, phone, quantity));
  };
  return (
    <ScrollView
      contentContainerStyle={{
        marginTop: 16,
        paddingHorizontal: 24,
        // flexDirection: 'row',
      }}
    >
      <Image
        style={{
          width: width,
          height: height,
          alignSelf: 'center',
          borderRadius: 10,
        }}
        source={{ uri: product.image }}
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
      <View
        style={{
          flexDirection: 'row-reverse',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            fontFamily: 'Tajawal-Medium',
            // marginTop: 12,
            color: '#515462',
          }}
        >
          {product.product_name}
        </Text>
        {!product.isVisible && (
          <Text style={{ color: 'red', fontFamily: 'Tajawal-Medium' }}>
            غير متوفر
          </Text>
        )}
      </View>

      <Text
        style={{
          fontFamily: 'Tajawal-Regular',
          textAlign: 'right',
          width: '100%',
          marginTop: 16,
          color: '#515462',
        }}
      >
        {product.product_desc}{' '}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          // paddingHorizontal: 32,
          marginTop: 32,
        }}
      >
        <View>
          <TextInput
            keyboardType='number-pad'
            value={quantity}
            onChangeText={(txt) => setQuantity(txt)}
            style={{
              fontSize: 15,
              fontFamily: 'Tajawal-Regular',
              borderWidth: 0.5,
              borderRadius: 40,
              textAlign: 'center',
              marginRight: 8,
              color: 'black',
              borderColor: colors.PLACEHOLDER,
              width: 50,
              fontSize: 12,
            }}
            placeholder='الكمية'
          />
        </View>

        <Text style={{ fontFamily: 'Tajawal-Regular', color: '#515462' }}>
          قم بتحديد الكمية
        </Text>
      </View>
      <TouchableOpacity onPress={() => handleAddToCart()} style={styles.btn}>
        <Text style={styles.btnText}>أضف إلى السلة</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
