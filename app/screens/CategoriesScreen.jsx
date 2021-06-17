import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  ActivityIndicator,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DrawerIcon from '../../assets/drawer-icon.svg';
import ListViewIcon from '../../assets/list-view.svg';
import GridViewIcon from '../../assets/grid-view.svg';
import SIcon from '../../assets/small-search-icon.svg';
import VerticalItemCard from '../components/VerticalItemCard';

import Colors from '../constants/colors';
import HorizontalItemCard from '../components/HorizontalItemCard';
import { fetchCategories } from '../store/action/category';
import { addProductToCart } from '../store/action/cart';
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
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const phone = useSelector((state) => state.auth.phone);
  const category = route?.params?.category;
  const [products, setProducts] = useState([]);
  const [isVertical, setIsVertical] = useState(true);
  const isLoading = useSelector((state) => state.cart.isLoading);
  const user = useSelector((state) => state.auth.userType);
  const [activeCategory, setActiveCategory] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const store = route.params.store;

  let myScroll = null;
  const width = Dimensions.get('window').width;
  const isAuth = () => {
    if (user == null) {
      navigation.push('AuthStackScreen');
    } else navigation.toggleDrawer();
  };
  const handleAddToCart = (product, navigation, phone) => {
    if (user == null) {
      navigation.push('AuthStackScreen');
      return;
    }
    if (!product.isVisible) {
      alert('هذا المنتج غير متوفر');
      return;
    }
    dispatch(addProductToCart(product, navigation, phone, '1'));
  };

  const isAuthFav = (item) => {
    if (user) dispatch(setFav(item, phone));
    else navigation.push('AuthStackScreen');
  };
  const isAuthDelete = (product) => {
    if (user) dispatch(deleteFav(product, phone));
    else navigation.push('FavScreen');
  };
  const parseCategpry = (name) => {
    for (let index in categories) {
      if (
        categories[index].category_name === name &&
        categories[index].isVisible != false
      ) {
        let products = [];
        for (let p in categories[index]['products']) {
          categories[index]['products'][p].firebaseId = p;
          products.push(categories[index]['products'][p]);
        }
        setProducts(products);
      }
    }
  };
  let names = [];
  for (let index in categories) {
    if (categories[index].isVisible) {
      names.push(categories[index].category_name);
    }
  }

  // useEffect(() => {
  //   for (let index in names) {
  //     if (names[index] == activeCategory) {
  //       let temp = names[0];
  //       names[0] = activeCategory;
  //       names[index] = temp;
  //     }
  //   }
  // }, []);
  useEffect(() => {
    dispatch(fetchCategories(store));
    if (category) {
      parseCategpry(category.category_name);
      setActiveCategory(category.category_name);
    } else {
      parseCategpry(names[0]);
      setActiveCategory(names[0]);
    }
  }, [names[0]]);
  return (
    <View style={styles.container}>
      <SafeAreaView forceInset={{ top: 'always' }}>
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
          <TouchableOpacity
            onPress={() => navigation.push('SearchScreen')}
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              borderColor: Colors.BORDER_COLOR,
              borderWidth: 1,
              width: width / 1.8,
              paddingHorizontal: 8,
              borderRadius: 10,
              height: 35,
            }}
          >
            <Text style={{ marginRight: 8, color: Colors.PLACEHOLDER }}>
              بحث
            </Text>
            <SIcon />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 8 }} onPress={() => isAuth()}>
            <DrawerIcon />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        ref={(ref) => {
          myScroll = ref;
        }}
        style={{ maxHeight: 100, marginRight: 16 }}
        horizontal
      >
        <>
          {names &&
            !isClicked &&
            names.map((name) => {
              return (
                name === activeCategory && (
                  <Card
                    key={name}
                    backgroundColor={
                      name === activeCategory
                        ? Colors.LIGTH_GOLDEN
                        : Colors.LIGTH_BACKGROUND_COLOR
                    }
                    name={name}
                    onPress={() => {
                      parseCategpry(name);
                      setActiveCategory(name);
                      setIsClicked(true);
                    }}
                  />
                )
              );
            })}
          {names &&
            names.map((name) => {
              return (
                !(name === activeCategory && !isClicked) && (
                  <Card
                    key={name}
                    backgroundColor={
                      name === activeCategory
                        ? Colors.LIGTH_GOLDEN
                        : Colors.LIGTH_BACKGROUND_COLOR
                    }
                    name={name}
                    onPress={() => {
                      parseCategpry(name);
                      setActiveCategory(name);
                      setIsClicked(true);
                    }}
                  />
                )
              );
            })}
        </>
      </ScrollView>

      <FlatList
        data={products}
        contentContainerStyle={
          !isVertical
            ? {
                justifyContent: 'space-between',
                flexDirection: 'row',
                flexWrap: 'wrap',
                paddingHorizontal: 8,
              }
            : {}
        }
        keyExtractor={(item) => item.product_name + item.product_desc}
        renderItem={({ item }) => (
          <>
            {isVertical ? (
              <VerticalItemCard
                image={item.image}
                add={() => handleAddToCart(item, navigation, phone)}
                name={item.product_name}
                desc={item.product_desc}
                isFav={item.isVisible}
                price={item.price}
                product={item}
                phone={phone}
                addToFav={() => isAuthFav(item)}
                deleteFromFav={() => isAuthDelete('FavScreen')}
                onPress={() => navigation.push('ItemDetailsScreen', { item })}
              />
            ) : (
              <HorizontalItemCard
                key={item.product_name}
                add={() => handleAddToCart(item, navigation, phone)}
                image={item.image}
                name={item.product_name}
                desc={item.product_desc}
                product={item}
                addToFav={() => isAuthFav(item)}
                deleteFromFav={() => isAuthDelete('FavScreen')}
                price={item.price}
                onPress={() => navigation.push('ItemDetailsScreen', { item })}
              />
            )}
          </>
        )}
      />

      <LoadingModal visible={isLoading} />
      <BottomNav navigation={navigation} />
    </View>
  );
}

export function Card({ name, backgroundColor, color = 'black', onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: backgroundColor,
        height: 35,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        marginHorizontal: 4,
        paddingHorizontal: 4,
        marginBottom: 32,
      }}
    >
      <Text
        style={{ color: color, fontFamily: 'Tajawal-Medium', fontSize: 12 }}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
}

export function LoadingModal({ visible }) {
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
