import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Linking,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import { TouchableHighlight, TouchableNativeFeedback } from 'react-native-gesture-handler';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    // marginTop: 32
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
  const order = useSelector((state) => state.orders.order);
  const products = useSelector((state) => state.orders.products);
  const [image, setImage] = useState('');
  const [imageModal, setImageModal] = useState(false);
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
              key={order.date}
              date={order.date}
              order={order}
              addr={orders.addr}
              myStatus={order.status}
              userType={userType}
              products={order.productsObject}
              showImage={(img) => {
                setImageModal(true);
                setImage(img);
              }}
            />
          ))}
      </ScrollView>
      {/* <ScrollView style={{ padding: 8 }}></ScrollView> */}
      <LoadingModal visible={isLoading} />
      <ImageModal
        visible={imageModal}
        hideModal={() => setImageModal(false)}
        image={image}
      />
    </SafeAreaView>
  );
}

export function OrderCardContainer({
  date,
  products,
  order,
  myStatus,
  userType,
  addr,
  showImage,
}) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(myStatus);
  let myProducts = products ? Object.values(products) : [];
  const username = useSelector((state) => state.auth.username);
  const handleChangeStatus = (orderId, status, preStatus) => {
    if (preStatus == 'تم التوصيل') {
      alert('لا يمكن تغير حالة تم التوصيل');
      return;
    }
    setStatus(status);
    dispatch(changeStatus(orderId, username, status, order.phone));
    if (status == 'تم التوصيل')
      dispatch(updateSalesStatistics(username, order.totalPrice));
  };
  const handleHeaderClicked = () => {};
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
        <View
          onPress={() => handleHeaderClicked()}
          style={styles.orderCardHeader}
        >
          <Text
            style={{
              color: '#F8A912',
              fontSize: 10,
              fontFamily: 'Tajawal-Medium',
            }}
          >
            {date}
          </Text>
          <Text style={styles.orderTitle}>{order.seller}</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${order.phone}`)}
          >
            <Text style={styles.orderTitle}> الزبون {order.phone}</Text>
          </TouchableOpacity>
        </View>
        {myProducts.length > 0 && (
          <>
            {myProducts &&
              myProducts.map((product) => (
                <TouchableNativeFeedback
                  style={styles.productRow}
                  onPress={() => showImage(product.image)}
                >
                  <Text style={styles.productPrice}>{product.price} شيكل</Text>
                  <Text style={styles.productName}>
                    {product.product_desc.substring(0, 9)}
                  </Text>
                  <Text style={styles.productName}>
                    الكمية: {product.quantity}{' '}
                  </Text>
                  <Text style={{ ...styles.productName, width: 120 }}>
                    {product.product_name}
                  </Text>
                </TouchableNativeFeedback>
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
                <Text style={{ fontFamily: 'Tajawal-Regular', marginTop: 8 }}>
                  {order.totalPrice} شيكل
                </Text>
                <Text
                  style={{
                    fontFamily: 'Tajawal-Regular',
                    marginTop: 8,
                    textAlign: 'right',
                  }}
                >
                  {order.discount}%
                </Text>
                <Text style={{ fontFamily: 'Tajawal-Regular', marginTop: 8 }}>
                  {(
                    order.totalPrice -
                    (parseInt(order.discount) / 100) *
                      parseInt(order.totalPrice)
                  ).toFixed(2)}
                  شيكل
                </Text>

                <View
                  style={{
                    height: 30,
                    borderRadius: 5,
                    marginTop: 8,
                  }}
                >
                  <Text style={getColor(status)}>{status}</Text>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: 'Tajawal-Regular',
                    color: '#F8A912',
                    marginTop: 8,
                  }}
                >
                  المجموع
                </Text>

                <Text
                  style={{
                    fontFamily: 'Tajawal-Regular',
                    color: '#F8A912',
                    marginTop: 8,
                  }}
                >
                  الخصم
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
        {userType != 'admin' && (
          <StatusRow
            handleChangeStatus={handleChangeStatus}
            status={status}
            order={order}
          />
        )}
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Text style={{ fontFamily: 'Tajawal-Regular', marginTop: 8 }}>
            {order.addr}
          </Text>
          <Text style={{ fontFamily: 'Tajawal-Regular', marginTop: 8 }}>
            العنوان:
          </Text>
        </View>
      </View>
    </>
  );
}

export function StatusRow({ handleChangeStatus, order, status }) {
  return (
    <>
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
          onPress={() =>
            handleChangeStatus(order.orderId, 'تم التوصيل', status)
          }
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
          onPress={() => handleChangeStatus(order.orderId, 'قبول', status)}
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
          onPress={() => handleChangeStatus(order.orderId, 'رفض', status)}
        >
          <Text style={{ color: 'red', fontFamily: 'Tajawal-Regular' }}>
            رفض
          </Text>
        </TouchableOpacity>
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

export function ImageModal({ visible, image, hideModal }) {
  return (
    <Modal visible={visible} transparent>
      <TouchableOpacity
        onPress={() => hideModal()}
        style={{
          
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Image source={{ uri: image }} style={{ height: 180, width: 180 }} />
      </TouchableOpacity>
    </Modal>
  );
}
