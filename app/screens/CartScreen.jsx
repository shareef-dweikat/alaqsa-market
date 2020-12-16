import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Keyboard,
} from 'react-native';
import DownArrow from '../../assets/Shape.png';
import Colors from '../constants/colors';
import { SafeAreaView } from 'react-navigation';
import DrawerIcon from '../../assets/drawer-icon.svg';
import { ScrollView } from 'react-native-gesture-handler';
import Card from '../components/cart-screen/Card';
import Tick from '../../assets/tick-confirmation.svg';
import { CustomPicker } from 'react-native-custom-picker';
import BottomNav from '../components/BottomNav';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  deleteCartItem,
  fetchBranches,
  order,
} from '../store/action/cart';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 16,
    padding: 20,
  },
  checkoutTxt: {
    fontFamily: 'Tajawal-Medium',
    fontSize: 17,
  },
  btn: {
    backgroundColor: Colors.GOLDEN,
    padding: 16,
    borderColor: Colors.GOLDEN,
    borderWidth: 1,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  btnText: {
    fontFamily: 'Tajawal-Medium',
    color: 'white',
    fontSize: 17,
  },
  checkoutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});
export default function CartScreen({ navigation }) {
  let picker;
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [orderModalVisible, setOrderConfirmationModalVisible] = useState(false);
  const cartProducts = useSelector((state) => state.cart.products);
  const options = useSelector((state) => state.cart.branches);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const phone = useSelector((state) => state.auth.phone);
  const [pickerValue, setPickerValue] = useState('Nablus');
  const isDeleted = useSelector((state) => state.cart.isDeleted);
  // const transPrice = pickerValue === options[0] ? 15 : 20;
  const transPrice = 10
  const dispatch = useDispatch();
  const handleOrder = () => {
    if (cartProducts.length <= 0) {
      return;
    }
    if (pickerValue == '') {
      alert('اختر الفرع');
      return;
    }
    dispatch(
      order(pickerValue, phone, parseInt(totalPrice), parseInt(transPrice))
    );
    setOrderConfirmationModalVisible(true);
  };
  useEffect(() => {
    dispatch(fetchProducts(phone));
    dispatch(fetchBranches());
  }, [isDeleted]);
  return (
    <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // marginTop: 8,
          }}
        >
          <Text
            style={{
              fontFamily: 'Tajawal-Bold',
              fontSize: 17,
              color: Colors.GOLDEN,
            }}
          >
            {cartProducts && cartProducts.length} عناصر
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                fontFamily: 'Tajawal-Medium',
                marginRight: 16,
                fontSize: 20,
              }}
            >
              السلة
            </Text>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <DrawerIcon />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <ScrollView>
        <View>
          <View style={{ paddingHorizontal: 16 }}>
            {cartProducts &&
              cartProducts.map((product) => (
                <Card
                  key={product.firebaseId}
                  firebaseId={product.firebaseId}
                  name={product.product_name}
                  price={product.price}
                  image={product.image}
                  setDeleteModalVisible={setDeleteModalVisible}
                  navigation={() => navigation.navigate('ChangeQuantityScreen')}
                />
              ))}
          </View>
        </View>
        {/* <View style={{ height: 4000 }}></View> */}
      </ScrollView>
    
      <View style={{ marginTop: 16, padding: 16, marginBottom: 16 }}>
        <View style={styles.checkoutContainer}>
          <Text style={styles.checkoutTxt}>{parseInt(totalPrice)} شيكل</Text>
          <Text style={styles.checkoutTxt}>المجموع</Text>
        </View>
        <View style={styles.checkoutContainer}>
          <Text style={styles.checkoutTxt}>{transPrice} شيكل</Text>
          <Text style={styles.checkoutTxt}>التوصيل</Text>
        </View>
        <View style={styles.checkoutContainer}>
          <Text style={styles.checkoutTxt}>{totalPrice + transPrice} شيكل</Text>
          <Text style={styles.checkoutTxt}>المبلغ الكلي</Text>
        </View>
        <TouchableOpacity onPress={() => handleOrder()} style={styles.btn}>
          <Text style={styles.btnText}>شراء الآن</Text>
        </TouchableOpacity>
      </View>
      <DeleteConfirmation
        visible={deleteModalVisible}
        setVisible={setDeleteModalVisible}
      />
      <OrderConfirmation
        visible={orderModalVisible}
        setVisible={setOrderConfirmationModalVisible}
      />
      <BottomNav navigation={navigation} />
    </View>
  );
}

export function DeleteConfirmation({ navigation, visible, setVisible }) {
  // const image = { uri: '../../assets/signin-screen/background.png' };
  const itemToDelete = useSelector((state) => state.cart.itemToDelete);
  const dispatch = useDispatch();
  const phone = useSelector((state) => state.auth.phone);

  return (
    <Modal visible={visible}>
      <View
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
          <Tick />
          <Text
            style={{ marginTop: 8, fontFamily: 'Tajawal-Bold', fontSize: 20 }}
          >
            تنبيه
          </Text>
          <Text
            style={{
              marginTop: 8,
              fontFamily: 'Tajawal-Regular',
              fontSize: 17,
            }}
          >
            هل تريد فعلا حذف (اسم المنتج) من السلة ؟
          </Text>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={{ ...styles.btn, width: '45%', backgroundColor: 'white' }}
            >
              <Text style={{ ...styles.btnText, color: 'black' }}>لا</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                dispatch(deleteCartItem(itemToDelete, phone));
                setVisible(false);
              }}
              style={{ ...styles.btn, width: '45%' }}
            >
              <Text style={styles.btnText}>نعم</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
export function OrderConfirmation({ navigation, visible, setVisible }) {
  // const image = { uri: '../../assets/signin-screen/background.png' };

  return (
    <Modal visible={visible}>
      <View
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
          <Tick />
          <Text
            style={{ marginTop: 8, fontFamily: 'Tajawal-Bold', fontSize: 20 }}
          >
            تم ارسال طلب الشراء
          </Text>
          {/* <Text
            style={{
              marginTop: 8,
              fontFamily: 'Tajawal-Regular',
              fontSize: 17,
            }}
          >
            تم تغيير كلمة المرور بنجاح
          </Text> */}
          <View style={{ width: '100%' }}>
            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={styles.btn}
            >
              <Text style={styles.btnText}>موافق</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
