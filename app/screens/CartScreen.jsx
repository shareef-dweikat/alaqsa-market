import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import Colors from '../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import DrawerIcon from '../../assets/drawer-icon.svg';
import { ScrollView } from 'react-native-gesture-handler';
import Card from '../components/cart-screen/Card';
import Tick from '../../assets/tick-confirmation.svg';
import BottomNav from '../components/BottomNav';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  deleteCartItem,
  fetchBranches,
  fetchDiscount,
  order,
} from '../store/action/cart';

const styles = StyleSheet.create({
  container: {
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
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [orderSuccessModalVisible, setOrderConfirmationSuccessModalVisible] =
    useState(false);
  const [orderModalVisible, setOrderConfirmationModalVisible] = useState(false);

  const cartProducts = useSelector((state) => state.cart.products);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const discount = useSelector((state) => state.cart.discount);
  const phone = useSelector((state) => state.auth.phone);
  const [pickerValue, setPickerValue] = useState('Nablus');
  const isDeleted = useSelector((state) => state.cart.isDeleted);
  const transPrice = 10;
  const dispatch = useDispatch();
  const handleOrder = (addr) => {
    if (cartProducts.length <= 0) {
      return;
    }
    if (pickerValue == '') {
      alert('اختر الفرع');
      return;
    }
    dispatch(
      order(pickerValue, phone, totalPrice, parseInt(transPrice), discount,addr)
    );
    setOrderConfirmationSuccessModalVisible(true);
  };
  useEffect(() => {
    dispatch(fetchProducts(phone));
    dispatch(fetchBranches());
    dispatch(fetchDiscount());
  }, [isDeleted]);
  return (
    <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
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
            {cartProducts && cartProducts.length === 0 && (
              <Text
                style={{
                  fontFamily: 'Tajawal-Regular',
                  textAlign: 'right',
                  margin: 16,
                  fontSize: 18,
                }}
              >
                السلة فارغة
              </Text>
            )}
            {cartProducts &&
              cartProducts.map((product) => (
                <Card
                  fetchProducts={fetchProducts}
                  phone={phone}
                  quantity={product.quantity}
                  key={product.firebaseId}
                  firebaseId={product.firebaseId}
                  name={product.product_name}
                  price={product.price}
                  image={product.image}
                  desc={product.product_desc}
                  setDeleteModalVisible={setDeleteModalVisible}
                  navigation={() => navigation.navigate('ChangeQuantityScreen')}
                />
              ))}
          </View>
        </View>
      </ScrollView>

      <View
        style={{ marginTop: 16, padding: 16, paddingTop: 0, marginBottom: 16 }}
      >
        <View style={styles.checkoutContainer}>
          <Text style={styles.checkoutTxt}>{totalPrice} شيكل</Text>
          <Text style={styles.checkoutTxt}>المجموع</Text>
        </View>
        <View style={styles.checkoutContainer}>
          <Text style={styles.checkoutTxt}>{((parseInt(discount) / 100) * parseInt(totalPrice)).toFixed(2)} شيكل</Text>
          <Text style={styles.checkoutTxt}>الخصم {discount}%</Text>
        </View>
        <View style={styles.checkoutContainer}>
          <Text style={styles.checkoutTxt}>
            {(totalPrice - (parseInt(discount) / 100) * parseInt(totalPrice)).toFixed(2)}{' '}
            شيكل
          </Text>
          <Text style={styles.checkoutTxt}>المبلغ الإجمالي</Text>
        </View>
      
        <TouchableOpacity
          onPress={() => {
            if (cartProducts.length != 0) {
              setOrderConfirmationModalVisible(true);
            } else alert('السلة فارغة');
          }}
          style={styles.btn}
        >
          <Text style={styles.btnText}>شراء الآن</Text>
        </TouchableOpacity>
      </View>
      <DeleteConfirmation
        visible={deleteModalVisible}
        setVisible={setDeleteModalVisible}
      />
      <OrderConfirmationSuccess
        visible={orderSuccessModalVisible}
        setVisible={setOrderConfirmationSuccessModalVisible}
      />
      <OrderConfirmation
        visible={orderModalVisible}
        setVisible={setOrderConfirmationModalVisible}
        handleOrder={handleOrder}
      />
      <BottomNav navigation={navigation} />
    </View>
  );
}

export function DeleteConfirmation({ visible, setVisible }) {
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
            هل تريد فعلا حذف من السلة ؟
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
                dispatch(fetchProducts(phone));
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
export function OrderConfirmationSuccess({ navigation, visible, setVisible }) {
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

export function OrderConfirmation({ handleOrder, visible, setVisible }) {
  const [value, setValue] = useState('');
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
            height: 450,
            padding: 16,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Tick />
          <Text
            style={{
              marginTop: 16,
              fontFamily: 'Tajawal-Bold',
              fontSize: 20,
              textAlign: 'center',
            }}
          >
            هل ترغب في التأكيد على طلبك؟
          </Text>
          <TextInput
            onChangeText={(txt) => setValue(txt)}
            style={{
              borderWidth: 1,
              borderStyle: 'solid',
              height: 40,
              marginTop: 16,
              width: 150,
              padding: 8,
              borderRadius: 10,
            }}
            placeholder='عنوانك المختصر'
          />
          <View style={{ width: '100%', marginTop: 16, }}>
            <TouchableOpacity
              onPress={() => {
                if (value.length < 4) {
                  alert('الرجاء إدخال عنوانك')
                  return;
                }
                setVisible(false);
                handleOrder(value);
              }}
              style={{ ...styles.btn, marginTop: 8 }}
            >
              <Text style={styles.btnText}>موافق</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: '100%' }}>
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
              }}
              style={{ ...styles.btn, backgroundColor: 'white' }}
            >
              <Text style={{ ...styles.btnText, color: 'black' }}>لا</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
