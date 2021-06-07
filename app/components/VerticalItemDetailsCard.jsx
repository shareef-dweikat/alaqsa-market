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
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProductToCart,
} from '../store/action/cart';
import colors from '../constants/colors';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    backgroundColor: '#F8A912',
    padding: 16,

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
  const user = useSelector((state) => state.auth.userType);

  const handleAddToCart = () => {
    if (user == null) {
      navigation.push('AuthStackScreen');
      return;
    }
    if (!product.isVisible) {
      alert('هذا المنتج غير متوفر');
      return;
    }
    dispatch(addProductToCart(product, navigation, phone, quantity));
  };
  return (
    <ScrollView
      contentContainerStyle={{
        marginTop: 16,
        paddingHorizontal: 24,
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

      <View
        style={{
          flexDirection: 'row-reverse',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            fontFamily: 'Tajawal-Medium',
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
          marginTop: 8,
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
          marginTop: 8,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            borderWidth: 0.5,
            borderRadius: 40,
            borderColor: colors.PLACEHOLDER,
            width: 80,
            marginHorizontal: 8,
            paddingHorizontal: 8,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <TouchableOpacity
            style={{
              height: 20,
              width: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              const sum = parseInt(quantity) + 1;
              setQuantity(sum + '');
            }}
          >
            <Text style={{ color: 'black', fontSize: 18 }}>+</Text>
          </TouchableOpacity>
          <TextInput
            keyboardType='number-pad'
            value={quantity}
            onChangeText={(txt) => {
              if (txt == 0) {
                setQuantity(txt);
                return;
              }
              setQuantity(txt);
            }}
            style={{
              fontSize: 15,
              fontFamily: 'Tajawal-Regular',
              textAlign: 'center',
              color: 'black',
              fontSize: 12,
            }}
            placeholder='الكمية'
          />
          <TouchableOpacity
            style={{ 
              height: 20,
               width: 20,
               justifyContent: 'center',
              alignItems: 'center',
             }}
            onPress={() => {
              const sum = parseInt(quantity) - 1;
              if (sum < 1) setQuantity(1 + '');
              else setQuantity(sum + '');
            }}
          >
            <Text style={{ color: 'black', fontSize: 22 }}>-</Text>
          </TouchableOpacity>
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
