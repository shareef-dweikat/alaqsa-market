import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import Colors from '../../constants/colors';
import RightArrow from '../../../assets/right-arrow.svg';
import SearchBox from '../../components/SearchBox';
import { StatusBar } from 'expo-status-bar';
import {
  fetchSellerOrders,
  fetchSellersOrders,
  changeStatus,
  updateSalesStatistics,
} from '../../store/action/orders';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  image: {
    // flex: 1,
    // resizeMode: 'cover',
    backgroundColor: Colors.BACKGROUND,
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'flex-end',
    height: Dimensions.get('window').height * 0.15,
    // width: Dimensions.get('window').width,
  },
  lookForProductText: {
    fontSize: 30,
    fontFamily: 'Tajawal-Medium',
    color: 'white',
  },
  orderCard: {
    borderRadius: 10,
    backgroundColor: '#F9F9FA',
    padding: 16,
    paddingHorizontal: 32,
  },
  orderCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderTitle: {
    fontSize: 12,
    fontFamily: 'Tajawal-Medium',
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productPrice: {
    marginTop: 16,
    fontFamily: 'Tajawal-Regular',
    color: '#515462',
  },
  productName: {
    marginTop: 16,
    fontFamily: 'Tajawal-Regular',
    color: '#515462',
  },
});
export default function DashboardOrdersPage({ navigation }) {
  // const image = { uri: '../../assets/signin-screen/background.png' };
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const isLoading = useSelector((state) => state.orders.isLoading);
  const username = useSelector((state) => state.auth.username);
  const userType = useSelector((state) => state.auth.userType);
  console.log(userType, 'casdadsad');
  const order = useSelector((state) => state.orders.order);
  const products = useSelector((state) => state.orders.products);
  // console.log(products, 'products');

  const [orderId, setOrderId] = useState('');
  useEffect(() => {
    if (userType == 'admin') {
      dispatch(fetchSellersOrders());
    } else {
      dispatch(fetchSellerOrders(username));
    }
  }, []);
  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
      <StatusBar backgroundColor={Colors.BACKGROUND} barStyle='light-conten' />
      <View style={styles.image}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <RightArrow />
        </TouchableOpacity>
        <View style={{ width: '100%' }}>
          <Text style={styles.lookForProductText}>طلباتي</Text>
          {/* <SearchBox /> */}
        </View>
      </View>
      <ScrollView style={{ height: '100%', backgroundColor: '#F9F9FA' }}>
        {orders &&
          orders.map((order) => (
            <OrderCardContainer
              date={order.date}
              order={order}
              products={order.productsObject}
            />
          ))}
      </ScrollView>
      {/* <ScrollView style={{ padding: 8 }}></ScrollView> */}
      <LoadingModal visible={isLoading} />
    </SafeAreaView>
  );
}

export function OrderCardContainer({ date, products, order }) {
  console.log(order, "adasdsadccccccc")
  const dispatch = useDispatch();
  const [status, setStatus] = useState(order.status);
  let myProducts = products ?Object.values(products): []
  const username = useSelector((state) => state.auth.username);
  const handleChangeStatus = (orderId, status) => {
    setStatus(status);
    dispatch(changeStatus(orderId, username, status));
    dispatch(updateSalesStatistics(username, order.totalPrice));
  };
  const handleHeaderClicked = () => {};
  return (
    <>
      <View style={styles.orderCard}>
        <View
          onPress={() => handleHeaderClicked()}
          style={styles.orderCardHeader}
        >
          <Text
            style={{
              color: '#F8A912',
              fontSize: 12,
              fontFamily: 'Tajawal-Medium',
            }}
          >
            {date}
          </Text>
          <Text style={styles.orderTitle}>{order.seller}</Text>
          <Text style={styles.orderTitle}> الزبون {order.phone}</Text>
        </View>
        {myProducts.length > 0 && (
          <>
            {myProducts &&
              myProducts.map((product) => ( 
                <View style={styles.productRow}>
                  <Text style={styles.productPrice}>{product.price} شيكل</Text>
                  <Text style={styles.productName}>
                    {product.product_desc.substring(0, 10)}
                  </Text>
                  <Text style={styles.productName}>الكمية: {product.quantity} </Text>
                  <Text style={styles.productName}>{product.product_name}</Text>
                </View>
              ))}

            <View
              style={{
                justifyContent: 'space-between',
                width: '50%',
                flexDirection: 'row',
                marginTop: 32,
              }}
            >
              <View>
                <Text style={{ fontFamily: 'Tajawal-Regular' }}>
                  {order.totalPrice} شيكل
                </Text>
                <Text
                  style={{
                    fontFamily: 'Tajawal-Regular',
                    color: 'black',
                    marginTop: 8,
                  }}
                >
                  {order.transPrice} شيكل
                </Text>
                <Text
                  style={{
                    fontFamily: 'Tajawal-Regular',
                    marginTop: 8,
                    color: '#F8A912',
                  }}
                >
                  {order.totalPrice + order.transPrice} شيكل
                </Text>
                <View
                  style={{
                    height: 30,
                    paddingHorizontal: 8,
                    borderRadius: 5,
                    marginTop: 8,
                  }}
                >
                  <Text
                    style={{
                      color:
                        status == 'تم التوصيل'
                          ? 'green'
                          : status == ' قبول'
                          ? 'orange'
                          : 'red',
                      fontFamily: 'Tajawal-Regular',
                    }}
                  >
                    {status}
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: 'Tajawal-Regular',
                    color: 'black',
                  }}
                >
                  المجموع
                </Text>
                <Text
                  style={{
                    fontFamily: 'Tajawal-Regular',
                    marginTop: 8,
                    color: 'black',
                  }}
                >
                  التوصيل
                </Text>
                <Text
                  style={{
                    fontFamily: 'Tajawal-Regular',
                    color: '#F8A912',
                    marginTop: 8,
                  }}
                >
                  الاجمالي
                </Text>
                <Text
                  style={{
                    fontFamily: 'Tajawal-Regular',
                    color: 'black',
                    marginTop: 8,
                  }}
                >
                  الحالة
                </Text>
              </View>
            </View>
          </>
        )}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 16,
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity
            style={{
              height: 30,
              borderWidth: 1,
              borderColor: 'green',
              paddingHorizontal: 8,
              borderRadius: 5,
            }}
            onPress={() => handleChangeStatus(order.orderId, 'تم التوصيل')}
          >
            <Text style={{ color: 'green', fontFamily: 'Tajawal-Regular' }}>
              تم التوصيل
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 30,
              borderWidth: 1,
              borderColor: 'orange',
              paddingHorizontal: 8,
              borderRadius: 5,
            }}
            onPress={() => handleChangeStatus(order.orderId, 'قبول')}
          >
            <Text style={{ color: 'orange', fontFamily: 'Tajawal-Regular' }}>
              قبول
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 30,
              borderWidth: 1,
              borderColor: 'red',
              paddingHorizontal: 8,
              borderRadius: 5,
            }}
            onPress={() => handleChangeStatus(order.orderId, 'رفض')}
          >
            <Text style={{ color: 'red', fontFamily: 'Tajawal-Regular' }}>
              رفض
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

export function LoadingModal({ title, visible, setVisible, setImage }) {
  return (
    <Modal visible={visible} transparent>
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
            height: 200,
            padding: 16,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator color={Colors.GOLDEN} size='large' />
          <Text style={{ marginTop: 32, fontFamily: 'Tajawal-Medium' }}>
            جار تغيير الحالة
          </Text>
        </View>
      </View>
    </Modal>
  );
}
