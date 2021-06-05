import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import RightArrow from '../../assets/right-arrow.svg';
import { StatusBar } from 'expo-status-bar';
import { fetchOrders, fetchOrder } from '../store/action/orders';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  image: {
    backgroundColor: Colors.BACKGROUND,
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'flex-end',
    height: Dimensions.get('window').height * 0.15,
  },
  lookForProductText: {
    fontSize: 30,
    fontFamily: 'Tajawal-Medium',
    color: 'white',
    textAlign: 'right',
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
    textAlign: 'right',
  },
});
export default function OrdersPage({ navigation }) {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const phone = useSelector((state) => state.auth.phone);
  const order = useSelector((state) => state.orders.order);
  const products = useSelector((state) => state.orders.products);

  const [orderId, setOrderId] = useState('');
  useEffect(() => {
    dispatch(fetchOrders(phone));
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
        </View>
      </View>
      <ScrollView>
        {orders && orders.length === 0 && (
          <Text style={{ fontFamily: 'Tajawal-Regular',textAlign: 'right', margin: 16, fontSize: 18  }}>لا يوجد طلبات</Text>
        )}
        {orders &&
          orders.map((orderHeader) => (
            <OrderCardsContainer
              orders={orders}
              products={products}
              order={order}
              orderHeader={orderHeader}
              orderId={orderId}
              setOrderId={setOrderId}
            />
          ))}
      </ScrollView>

      <View style={{ padding: 8 }}></View>
    </SafeAreaView>
  );
}

export function OrderCardsContainer({
  products,
  order,
  orderHeader,
  setOrderId,
  orderId,
}) {
  const dispatch = useDispatch();
  const handleHeaderClicked = () => {
    setOrderId(orderHeader.orderId);
    dispatch(fetchOrder(orderHeader.orderId, orderHeader.branch));
  };
  const getColor = (status) => {
    if (status === 'تم التوصيل')
      return {
        color: 'green',
        fontFamily: 'Tajawal-Regular',
      };
    if (status === 'قبول')
      return {
        color: 'orange',
        fontFamily: 'Tajawal-Regular',
      };
    if (status === 'رفض')
      return {
        color: 'red',
        fontFamily: 'Tajawal-Regular',
      };
  };
  return (
    <>
      <View style={styles.orderCard}>
        <TouchableOpacity
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
            {orderHeader.date}
          </Text>

          <Text style={styles.orderTitle}>{orderHeader.branch} الفرع</Text>
        </TouchableOpacity>

        {products.length > 0 && orderId == orderHeader.orderId && (
          <>
            {products &&
              products.map((product) => (
                <View style={styles.productRow}>
                  <Text style={styles.productPrice}>{product.price} شيكل</Text>
                  <Text style={styles.productName}>
                    {product.product_desc.substring(0, 8)}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.productName}>{product.quantity}</Text>
                    <Text style={styles.productName}>الكمية: </Text>
                  </View>
                  <Text style={{ ...styles.productName, width: 120 }}>
                    {product.product_name}
                  </Text>
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
                {/* <Text
                  style={{
                    fontFamily: 'Tajawal-Regular',
                    color: 'black',
                  }}
                >
                  {order.transPrice} شيكل
                </Text>

                <Text
                  style={{
                    fontFamily: 'Tajawal-Regular',
                    color: '#F8A912',
                  }}
                >
                  {order.totalPrice + order.transPrice} شيكل
                </Text> */}
                <View
                  style={{
                    height: 30,

                    borderRadius: 5,
                    marginTop: 8,
                  }}
                >
                  <Text style={getColor(orderHeader.status)}>
                    {orderHeader.status}
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
                {/* <Text
                  style={{
                    fontFamily: 'Tajawal-Regular',
                    color: 'black',
                  }}
                >
                  التوصيل
                </Text>

                <Text
                  style={{
                    fontFamily: 'Tajawal-Regular',
                    color: '#F8A912',
                  }}
                >
                  الاجمالي
                </Text> */}
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
      </View>
    </>
  );
}
