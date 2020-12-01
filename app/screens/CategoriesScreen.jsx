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
import { useDispatch, useSelector } from 'react-redux';
import BottomNav from '../components/BottomNav';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
});
export default function CategoriesScreen({ navigation }) {
  // const image = { uri: '../../assets/signin-screen/background.png' };
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const [products, setProducts] = useState([]);
  const [isVertical, setIsVertical] = useState(true);
  // const [searchValue, setSearchValue] = useState('');

  // const allProducts = () => {
  //   let products = [];
  //   for (let index in categories) {
  //     for (let i in categories[index]['products']) {
  //       products.push(categories[index]['products'][i]);
  //     }
  //   }
  //   console.log(products, 'all-productssssss');

  //   setProducts(products);
  // };
  const search = (txt) => {
    // dispatch(searchAction(txt))
  };
  const parseCategpry = (name) => {
    for (let index in categories) {
      if (categories[index].category_name === name) {
        // console.log(Object.values(categories[index]['products']))
        setProducts(Object.values(categories[index]['products']));
      }
    }
  };
  const names = [];
  for (let index in categories) {
    names.push(categories[index].category_name);
  }
  // console.log('aadsd', categories);
  useEffect(() => {
    dispatch(fetchCategories());
    // allProducts()
    parseCategpry(names[0]);
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
            marginHorizontal: 8,
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
              style={{ marginRight: 8 }}
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
            flex: 3,
            paddingHorizontal: 8,
            borderRadius: 10,
            height: 35,
          }}
        >
          <TextInput
            style={{ marginRight: 8 }}
            onChangeText={(txt) => search(txt)}
            placeholder='بحث'
          />
          <SIcon />
        </View>
        <TouchableOpacity
          style={{ marginLeft: 8, flex: 1 }}
          onPress={() => navigation.toggleDrawer()}
        >
          <DrawerIcon />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ maxHeight: 60, marginRight: 16 }} horizontal>
        {names.map((name) => (
          <Card
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
          products.map((product) => (
            <VerticalItemCard
              add={() => dispatch(addProductToCart(product, navigation))}
              name={product.product_name}
              desc={product.product_desc}
              price={product.price}
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
            {products.map((product) => (
              <HorizontalItemCard
                add={() => dispatch(addProductToCart(product, navigation))}
                name={product.product_name}
                desc={product.product_desc}
                price={product.price}
                onPress={() =>
                  navigation.push('ItemDetailsScreen', { product })
                }
              />
            ))}
          </View>
        )}
      </ScrollView>
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
