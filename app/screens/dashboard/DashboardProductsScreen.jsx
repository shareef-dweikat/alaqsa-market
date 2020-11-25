import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import pImage from '../../../assets/home/product.png';
import HeartIcon from '../../../assets/small-heart-icon.svg';
import PlusIcon from '../../../assets/plus-icon.svg';

import DrawerIcon from '../../../assets/drawer-icon.svg';
import FloatingICon from '../../../assets/floating-button-icon.svg';
import BellIcon from '../../../assets/dashboard-drawer/bell.svg';
import SIcon from '../../../assets/small-search-icon.svg';
import Colors from '../../constants/colors';
import { fetchProducts } from '../../store/action/product';
import { ScrollView } from 'react-native-gesture-handler';
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 16,
  },
  image: {
    // flex: 1,
    // resizeMode: 'cover',
    justifyContent: 'center',
    height: Dimensions.get('window').height * 0.3,
    // width: Dimensions.get('window').width,
  },
  screenContentContainer: {
    padding: 16,
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    left: 20,
    bottom: 20,
    backgroundColor: Colors.GOLDEN,
    borderRadius: 30,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 40,
    color: 'white',
  },
});
export default function DashboardHome({ navigation }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <SafeAreaView forceInset={{ top: 'always' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 16,
          }}
        >
          <View
            style={{
              marginHorizontal: 8,
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
            }}
          >
            <BellIcon color={Colors.INACTIVE_VIEW_TAP} />
            <View
              style={{
                position: 'relative',
                bottom: 10,
                right: 10,
                backgroundColor: Colors.GOLDEN,
                width: 25,
                height: 25,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: Colors.WHITE,
                borderWidth: 2,
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Tajawal-Medium',
                  fontSize: 15,
                }}
              >
                2
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                fontFamily: 'Tajawal-Medium',
                fontSize: 20,
                marginRight: 8,
              }}
            >
              المنتجات
            </Text>
            {/* <TouchableOpacity
              // style={{ marginLeft: 8, flex: 1 }}
              onPress={() => navigation.toggleDrawer()}
            >
              <DrawerIcon />
            </TouchableOpacity> */}
          </View>
        </View>
      </SafeAreaView>

      <ScrollView style={styles.container}>
        {/* <VerticalItemCard /> */}
        {products.map((item) => (
          <VerticalItemCard
            name={item.product_name}
            price={item.price}
            desc={item.product_desc}
            isFav={item.isFav}
            image={item.image}
            isVisible={item.isVisible}
            navigation={navigation}
          />
        ))}
        <View style={{ height: 100 }}></View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.push('AddProductScreen')}
        style={styles.fab}
      >
        <FloatingICon />
      </TouchableOpacity>
      {/* <Button title="Alert" onPress={()=>navigation.push('Alert')}/> */}
    </View>
  );
}

function VerticalItemCard({
  name,
  price,
  desc,
  isFav,
  onPress,
  image,
  isVisible,
  navigation,
}) {
  console.log(isVisible);
  const [productAvailability, setProductAvailability] = useState(isVisible);
  return (
    <TouchableOpacity
      onPress={() => navigation.push('DashboardItemDetailsScreen')}
      style={{
        height: 120,
        borderWidth: 1,
        borderColor: '#d0d0d0',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingTop: 13,
        marginTop: 16,
        flexDirection: 'row',
      }}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-between',
            //  width: '100%',
            paddingHorizontal: 16,
            marginTop: 8,
            justifyContent: 'space-between',
          }}
        >
          {/* <HeartIcon color='red'/> */}
          {/* <Switch
            trackColor={{ false: '#767577', true: '#22C993' }}
            thumbColor={productAvailability ? Colors.WHITE : '#f4f3f4'}
            ios_backgroundColor='#3e3e3e'
            onValueChange={(e) => setProductAvailability(e)}
            value={productAvailability}
          /> */}
          <View />
          <Text style={{ textAlign: 'right', fontFamily: 'Tajawal-Medium' }}>
            {name}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            width: '100%',
            paddingHorizontal: 16,
          }}
        >
          <Text
            style={{
              color: '#B8B8CD',
              fontFamily: 'Tajawal-Regular',
              height: 50,
            }}
          >
            {desc}
          </Text>
        </View>
        <Text
          style={{
            textAlign: 'left',
            fontFamily: 'Tajawal-Bold',
            color: '#515462',
            marginLeft: 16,
          }}
        >
          ${price} شيكل
        </Text>
      </View>
      <Image
      style={{ height: 100, width: 100, marginRight: 8, borderRadius: 10}}
        source={{
          uri:
            'https://firebasestorage.googleapis.com/v0/b/alaqsamart-9e68e.appspot.com/o/images%2Fproducts%2F%D9%84%D8%A8%D9%86%D8%A9?alt=media&token=71219dce-1a81-467d-b9cf-cca6356bc57b'
        }}
      />
    </TouchableOpacity>
  );
}
