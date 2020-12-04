import IntroductionSlider from '../components/introductionSlider/IntroductionSlider';
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Colors from '../constants/colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import RightArrow from '../../assets/right-arrow.svg';
import SearchBox from '../components/SearchBox';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import VerticalItemCard from '../components/VerticalItemCard';
import { fetchSearchProducts } from '../store/action/product';
import { addProductToCart } from '../store/action/cart';

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
    height: Dimensions.get('window').height * 0.2,
    // width: Dimensions.get('window').width,
  },
});
export default function SearchScreen({ navigation }) {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  const [filterdProducts, setFilterdProducts] = useState([]);

  const search = (text) => {
    let myProducts = [];
    for (let i in products) {
      if (products[i].product_name.search(text) == -1) {
      } else {
        myProducts.push(products[i]);
      }
    }

    setFilterdProducts(myProducts);
  };
  useEffect(() => {
    dispatch(fetchSearchProducts());
  }, []);
  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
      <StatusBar backgroundColor={Colors.BACKGROUND} barStyle='light-conten' />
      <View style={styles.image}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <RightArrow />
        </TouchableOpacity>
        <View style={{ width: '100%', height: 100 }}>
          <Text
            style={{
              fontSize: 30,
              fontFamily: 'Tajawal-Medium',
              color: 'white',
            }}
          >
            ابحث عن منتج
          </Text>
          <SearchBox search={search} />
        </View>
      </View>

      <ScrollView style={{ padding: 8 }}>
        {filterdProducts.map((product) => (
          <VerticalItemCard
            add={() => dispatch(addProductToCart(product, navigation))}
            name={product.product_name}
            price={product.price}
            desc={product.product_desc}
            isFav={product.isVisible}
            onPress={() => navigation.push('ItemDetailsScreen', { product })}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
