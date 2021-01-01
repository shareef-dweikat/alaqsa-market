import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import bb from '../../assets/home/header.png';
import { SafeAreaView } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import DrawerIcon from '../../assets/drawer-icon.svg';
import SearchIcon from '../../assets/search-icon.svg';
// import * as Notifications from 'expo-notifications';
import HorizontalItemCard from '../components/HorizontalItemCard';
import BottomNav from '../components/BottomNav';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSlideImage } from '../store/action/homeSlider';
import { fetchCategories } from '../store/action/category';
import HorizontalCategoryCard from '../components/HorizontalCategoryCard';

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
export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const slide = useSelector((state) => state.homeSlider);
  const categories = useSelector((state) => state.category.categories);
  const image = slide.uploadedSlideImageUri;
  const desc = slide.desc;
  const [products, setProducts] = useState([]);

  // const names = [];
  // for (let index in categories) {
  //   names.push(categories[index].category_name);
  // }
  console.log(products, 'productssss');
  useEffect(() => {
    dispatch(fetchSlideImage());
    dispatch(fetchCategories());
    // parseCategpry(names[0]);
  }, []);
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <ImageBackground style={styles.image} source={{ uri: image }}>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 24,
              flex: 1,
              marginTop: 16,
            }}
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <TouchableOpacity onPress={() => navigation.push('SearchScreen')}>
                <SearchIcon />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <DrawerIcon />
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'center', flex: 1 }}>
              {/* <Text
                style={{
                  textAlign: 'right',
                  fontFamily: 'Tajawal-Regular',
                  fontSize: 18,
                }}
              >
                نص يمكن استبداله
              </Text>
              <Text
                style={{
                  textAlign: 'right',
                  fontSize: 29,
                  fontFamily: 'Tajawal-Bold',
                }}
              >
                يوضع هنا نص اعلاني
              </Text>
              <Text
                style={{
                  textAlign: 'right',
                  fontFamily: 'Tajawal-Regular',
                  fontSize: 18,
                }}
              >
                نص يمكن استبداله
              </Text> */}
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
      <View
        style={{
          height: 45,
          backgroundColor: '#515462',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 17,
            fontFamily: 'Tajawal-Regular',
          }}
        >
          {desc}
        </Text>
      </View>
      <ScrollView style={styles.screenContentContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons
              style={{ marginRight: 8 }}
              name='ios-arrow-back'
              size={16}
            />
            <TouchableOpacity
              onPress={() => navigation.push('CategoriesScreen')}
            >
              <Text style={styles.seeMoreLabel}>
                مشاهدة المزيد
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontFamily: 'Tajawal-Bold',
              fontSize: 17,
              color: '#E49500',
            }}
          >
            التصنيفات
          </Text>
        </View>

        <ScrollView style={{ paddingHorizontal: 16 }}>
          <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            {categories &&
              categories.map((category) => (
                <HorizontalCategoryCard
                  key={category.category_name}
                  name={category.category_name}
                  category={category}
                  image={category.image}
                  // onPress={() =>
                  //   navigation.push('ItemDetailsScreen', { product })
                  // }
                />
              ))}
          </View>
        </ScrollView>
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 32,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons
              style={{ marginRight: 8 }}
              name='ios-arrow-back'
              size={16}
            />
            <Text style={{ fontFamily: 'Tajawal-Regular', fontSize: 14 }}>
              مشاهدة المزيد
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'Tajawal-Bold',
              fontSize: 17,
              color: '#E49500',
            }}
          >
            الأكثر مبيعاً
          </Text>
        </View>
        <HorizontalItemCard name='a' price={2} desc='1' isFav={true} />
        <View style={{ height: 32 }}></View> */}
      </ScrollView>
      <BottomNav navigation={navigation} />
      {/* <Button title="Alert" onPress={()=>navigation.push('Alert')}/> */}
    </View>
  );
}
