import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
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
  const height = Dimensions.get('window').height * 0.4;
  const width = Dimensions.get('window').width - 40;
  const dispatch = useDispatch();
  const phone = useSelector((state) => state.auth.phone);
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
      <Text
        style={{
          fontFamily: 'Tajawal-Medium',
          marginTop: 12,
          color: '#515462',
        }}
      >
        {product.product_name}
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
        {product.product_desc}{' '}
      </Text>
      {/* <View
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
      </View> */}
      <TouchableOpacity
        onPress={() => dispatch(addProductToCart(product, navigation, phone))}
        style={styles.btn}
      >
        <Text style={styles.btnText}>أضف إلى السلة</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
