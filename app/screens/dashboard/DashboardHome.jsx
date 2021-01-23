import React, { useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import * as Notifications from 'expo-notifications';

import DrawerIcon from '../../../assets/drawer-icon.svg';
import Colors from '../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPushToken } from '../../store/action/auth';
import { setAdminType } from '../../store/action/auth';
import { getSalesStatistics } from '../../store/action/orders';
import { StatusBar } from 'react-native';

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
  branchCard: {
    backgroundColor: Colors.MEDIUM_BACKGROUND_COLOR,
    height: 100,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    borderRadius: 10,
  },
});
export default function DashboardHome({ navigation }) {
  const dispatch = useDispatch();
  const statistics = useSelector((state) => state.orders.statistics);
  const userType = useSelector((state) => state.auth.userType);
  const registerForPushNotificationsAsync = async() => {
    let token;

    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }
  useEffect(() => {
    const getToken = async () => {
      // const expoPushToken = await Notifications.getExpoPushTokenAsync();
      const token = await registerForPushNotificationsAsync()
      dispatch(uploadPushToken(userType, token));
      Notifications.addNotificationReceivedListener((d) => {
      
      });
    };
    getToken();
    const getUsername = async () => {
      const userType = await AsyncStorage.getItem('userType');
      const username = await AsyncStorage.getItem('username');
      dispatch(setAdminType(userType, username));
    };
    getUsername();
    dispatch(getSalesStatistics());
  }, []);
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <StatusBar backgroundColor={Colors.BACKGROUND}/>
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
              marginHorizontal: 8,
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
            }}
          >
            
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',

              flex: 3,
              paddingHorizontal: 8,

              height: 35,
            }}
          >
            <Text style={{ fontFamily: 'Tajawal-Medium', fontSize: 20 }}>
              نظرة عامة
            </Text>
          </View>
          <TouchableOpacity
            style={{ marginLeft: 8, flex: 1 }}
            onPress={() => navigation.toggleDrawer()}
          >
            <DrawerIcon />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={styles.container}>
        <Text style={{ fontFamily: 'Tajawal-Medium', fontSize: 20 }}>
          مرحبا بك في لوحة التحكم
        </Text>
        <Text
          style={{ fontFamily: 'Tajawal-Regular', fontSize: 20, marginTop: 32 }}
        >
          الإحصائيات
        </Text>
        <View
          style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 8,
          }}
        >
          {statistics &&
            statistics.map((item) => (
              <View key={item[0]} style={styles.branchCard}>
                <Text style={{ fontFamily: 'Tajawal-Regular' }}>{item[0]}</Text>
                <Text style={{ fontFamily: 'Tajawal-Regular', fontSize: 12 }}>
                  {item[1]} شيكل
                </Text>
              </View>
            ))}
        </View>
      </View>
      {/* <Button title="Alert" onPress={()=>navigation.push('Alert')}/> */}
    </View>
  );
}
