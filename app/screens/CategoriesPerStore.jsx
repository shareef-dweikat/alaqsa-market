import React, { useEffect } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LeftArrow from '../../assets/home/left-arrow.svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNav from '../components/BottomNav';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSlideImage } from '../store/action/homeSlider';
import { fetchCategories } from '../store/action/category';
import { pushToken } from '../store/action/notifications';

import HorizontalCategoryCard from '../components/HorizontalCategoryCard';
import { StatusBar } from 'react-native';
import * as Notifications from 'expo-notifications';
import Colors from '../constants/colors';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    justifyContent: 'center',
    height: Dimensions.get('window').height * 0.3,
  },
  screenContentContainer: {
    padding: 16,
  },
  seeMoreLabel: { fontFamily: 'Tajawal-Regular', fontSize: 14 },
});
export default function CategoriesPerStore({ navigation, route }) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const store = route.params.store;
  useEffect(() => {
    dispatch(fetchCategories(store));
  }, []);

  if (categories.length === 0) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ActivityIndicator color={Colors.GOLDEN} size='large' />
      </View>
    );
  }
  console.log(categories, 'ddddddd');
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <StatusBar backgroundColor={Colors.BACKGROUND} barStyle='light-conten' />
      {/* <ImageBackground style={styles.image} source={{ uri: image }}>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 24,
              flex: 1,
              marginTop: 16,
            }}
          >
            <View style={{ justifyContent: 'center', flex: 1 }}></View>
          </View>
        </SafeAreaView>
      </ImageBackground> */}
      <ScrollView style={styles.screenContentContainer}>
          <Text
            style={{
              fontFamily: 'Tajawal-Bold',
              fontSize: 17,
              color: '#E49500',
              textAlign: 'right',
              marginTop: 16
            }}
          >
            التصنيفات
          </Text>
        <ScrollView>
          <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 8
            }}
          >
            {categories &&
              categories.map((category) => (
                <HorizontalCategoryCard
                  key={category.category_name}
                  name={category.category_name}
                  category={category}
                  image={category.image}
                  onPress={() => navigation.push('CategoriesScreen', { category, store })}
                />
              ))}
          </View>
          <View style={{ height: 20 }} />
        </ScrollView>
      </ScrollView>
      <BottomNav navigation={navigation} />
    </View>
  );
}
