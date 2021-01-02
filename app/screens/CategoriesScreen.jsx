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
  Modal,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import DrawerIcon from '../../assets/drawer-icon.svg';
import ListViewIcon from '../../assets/list-view.svg';
import GridViewIcon from '../../assets/grid-view.svg';
import SIcon from '../../assets/small-search-icon.svg';
import VerticalItemCard from '../components/VerticalItemCard';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/colors';
import SearchBox from '../components/SearchBox';
import HorizontalItemCard from '../components/HorizontalItemCard';
import { fetchCategories } from '../store/action/category';
import {
  addProductToCart,
  // searchAction
} from '../store/action/cart';
import { setFav, deleteFav } from '../store/action/product';

import { useDispatch, useSelector } from 'react-redux';
import BottomNav from '../components/BottomNav';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
});
export default function CategoriesScreen({ route, navigation }) {
  // const image = { uri: '../../assets/signin-screen/background.png' };
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const phone = useSelector((state) => state.auth.phone);
  const category = route?.params?.category;
  const [products, setProducts] = useState([]);
  const [isVertical, setIsVertical] = useState(true);
  const isLoading = useSelector((state) => state.cart.isLoading);

  const search = (txt) => {
    // dispatch(searchAction(txt))
  };
  const parseCategpry = (name) => {
    for (let index in categories) {
      if (categories[index].category_name === name) {
        let products = [];
        for (let p in categories[index]['products']) {
          categories[index]['products'][p].firebaseId = p;
          products.push(categories[index]['products'][p]);
        }
        setProducts(products);
      }
    }
  };
  const names = [];
  for (let index in categories) {
    names.push(categories[index].category_name);
  }
  useEffect(() => {
    dispatch(fetchCategories());
    if (category) {
      parseCategpry(category.category_name);
    } else {
      parseCategpry(names[0]);
    }
  }, [names[0]]);
  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
      <View
        style={{
          marginTop: 8,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            // marginHorizontal: 8,
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={() => setIsVertical(true)}>
            <ListViewIcon
              color={
                isVertical ? Colors.ACTIVE_VIEW_TAP : Colors.INACTIVE_VIEW_TAP
              }
              style={{ marginRight: 4 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsVertical(false)}>
            <GridViewIcon
              color={
                isVertical ? Colors.INACTIVE_VIEW_TAP : Colors.ACTIVE_VIEW_TAP
              }
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            borderColor: Colors.BORDER_COLOR,
            borderWidth: 1,
            flex: 2.8,
            paddingHorizontal: 8,
            borderRadius: 10,
            height: 35,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.push('SearchScreen')}
            style={{ flexDirection: 'row' }}
          >
            <Text style={{ marginRight: 8, color: Colors.PLACEHOLDER }}>
              بحث
            </Text>
            <SIcon />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ marginLeft: 8, flex: 1 }}
          onPress={() => navigation.toggleDrawer()}
        >
          <DrawerIcon />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ maxHeight: 60, marginRight: 16 }} horizontal>
        {names &&
          names.map((name) => (
            <Card
              key={name}
              backgroundColor={Colors.LIGTH_BACKGROUND_COLOR}
              name={name}
              onPress={() => parseCategpry(name)}
            />
          ))}

        {/* <Card
          backgroundColor={Colors.GOLDEN}
          color={Colors.WHITE}
          name='الكل'
          onPress={() => allProducts()}
        /> */}
      </ScrollView>
      <ScrollView style={{ paddingHorizontal: 16 }}>
        {isVertical ? (
          products &&
          products.map((product) => (
            <VerticalItemCard
              image={product.image}
              key={product.product_name}
              add={() => dispatch(addProductToCart(product, navigation, phone))}
              name={product.product_name}
              desc={product.product_desc}
              isFav={product.isVisible}
              price={product.price}
              product={product}
              phone={phone}
              addToFav={() => dispatch(setFav(product, phone))}
              deleteFromFav={() => navigation.push('FavScreen')}
              onPress={() => navigation.push('ItemDetailsScreen', { product })}
            />
          ))
        ) : (
          <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            {products &&
              products.map((product) => (
                <HorizontalItemCard
                  key={product.product_name}
                  add={() =>
                    dispatch(addProductToCart(product, navigation, phone))
                  }
                  image={product.image}
                  name={product.product_name}
                  desc={product.product_desc}
                  product={product}
                  addToFav={() => dispatch(setFav(product, phone))}
                  deleteFromFav={() => navigation.push('FavScreen')}
                  price={product.price}
                  onPress={() =>
                    navigation.push('ItemDetailsScreen', { product })
                  }
                />
              ))}
          </View>
        )}
      </ScrollView>
      <LoadingModal visible={isLoading} />
      <BottomNav navigation={navigation} />
    </SafeAreaView>
  );
}

export function Card({ name, backgroundColor, color = 'black', onPress }) {
  // const image = { uri: '../../assets/signin-screen/background.png' };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: backgroundColor,
        width: 100,
        height: 35,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        marginHorizontal: 4,
        marginBottom: 32,
      }}
    >
      <Text style={{ color: color, fontFamily: 'Tajawal-Medium' }}>{name}</Text>
    </TouchableOpacity>
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
            جار إضافة المنتج
          </Text>
        </View>
      </View>
    </Modal>
  );
}
