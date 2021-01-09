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
import * as Permissions from 'expo-permissions';
import BottomNav from '../components/BottomNav';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSlideImage } from '../store/action/homeSlider';
import { fetchCategories } from '../store/action/category';
import { uploadPushToken } from '../store/action/auth';


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
    height: Dimensions.get('window').height * 0.25,
    // marginTop: 32,
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
  const userType = useSelector((state) => state.auth.userType);

  const image = slide.uploadedSlideImageUri;
  const desc = slide.desc;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchSlideImage());
    dispatch(fetchCategories());
    const getToken = async () => {
      const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

      const expoPushToken = await Notifications.getExpoPushTokenAsync();
      dispatch(uploadPushToken(userType, expoPushToken.data))
      Notifications.addNotificationReceivedListener((d) => {
        console.log(d, 'zzxxxx');
      });
    };
    // getToken();
    // registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    // parseCategpry(names[0]);
  }, []);
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <StatusBar backgroundColor={Colors.BACKGROUND} barStyle='light-conten' />

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
            <View style={{ justifyContent: 'center', flex: 1 }}></View>
          </View>
        </SafeAreaView>
      </ImageBackground>
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
              <Text style={styles.seeMoreLabel}>مشاهدة المزيد</Text>
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

        <ScrollView>
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
                  onPress={() =>
                    navigation.push('CategoriesScreen', { category })
                  }
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
