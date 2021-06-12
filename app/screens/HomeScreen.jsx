import React, { useEffect } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNav from '../components/BottomNav';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSlideImage } from '../store/action/homeSlider';
import { pushToken } from '../store/action/notifications';
import HorizontalCategoryCard from '../components/HorizontalCategoryCard';
import { StatusBar } from 'react-native';
import * as Notifications from 'expo-notifications';
import Colors from '../constants/colors';
import { fetchStores } from '../store/action/store';
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
  const stores = useSelector((state) => state.store.stores);

  const image = slide.uploadedSlideImageUri;
  const registerForPushNotificationsAsync = async () => {
    let token;
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  };
  useEffect(() => {
    dispatch(fetchSlideImage());
    dispatch(fetchStores());
    const getToken = async () => {
      const token = await registerForPushNotificationsAsync();
      dispatch(pushToken(token));
    };
    getToken();
  }, []);

  if (stores.length === 0) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ActivityIndicator color={Colors.GOLDEN} size='large' />
      </View>
    );
  }

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
        <Text
          style={{
            fontFamily: 'Tajawal-Bold',
            fontSize: 17,
            color: '#E49500',
            textAlign: 'right',
          }}
        >
          المتاجر
        </Text>
        <ScrollView>
          <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            {stores &&
              stores.map((store) => {
                if (store.isVisible)
                  return (
                    <HorizontalCategoryCard
                      key={store.store}
                      name={store.store}
                      category={store}
                      image={store.img}
                      onPress={() =>
                        navigation.push('CategoriesPerStore', {
                          store: store.firebaseId,
                        })
                      }
                    />
                  );
                else {
                  return;
                }
              })}
          </View>
          <View style={{ height: 20 }} />
        </ScrollView>
      </ScrollView>
      <BottomNav navigation={navigation} />
    </View>
  );
}
