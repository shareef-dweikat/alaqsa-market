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
import ListViewIcon from '../../assets/list-view.svg';
import GridViewIcon from '../../assets/grid-view.svg';
import { SafeAreaView } from 'react-navigation';
import Colors from '../constants/colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import RightArrow from '../../assets/right-arrow.svg';
import SearchBox from '../components/SearchBox';
import { StatusBar } from 'expo-status-bar';
import VerticalItemCard from '../components/VerticalItemCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFav, fetchProducts } from '../store/action/product';
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
});
export default function FavScreen({ navigation }) {
  // const image = { uri: '../../assets/signin-screen/background.png' };
  const dispatch = useDispatch();
   const phone = useSelector((state) => state.auth.phone);
   const products = useSelector((state) => state.product.products);
  useEffect(() => {
    dispatch(fetchFav(phone));
    dispatch(fetchProducts())
  }, []);
  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
      <StatusBar backgroundColor={Colors.BACKGROUND} barStyle='light-conten' />
      <View style={styles.image}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <RightArrow />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
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
            <ListViewIcon
              color={Colors.ACTIVE_VIEW_TAP}
              style={{ marginRight: 8 }}
            />
            <GridViewIcon color={Colors.INACTIVE_VIEW_TAP} />
          </View>
          <Text
            style={{
              fontSize: 30,
              fontFamily: 'Tajawal-Medium',
              color: 'white',
            }}
          >
            المفضلة
          </Text>
        </View>
      </View>

      <ScrollView style={{ padding: 8 }}>
        {/* {products.map((product)=><VerticalItemCard product={product}/>)} */}
        
      </ScrollView>
    </SafeAreaView>
  );
}
