import React, { useEffect } from 'react';
import {
  Text,
  View,
  Image,
  AsyncStorage,
  StyleSheet,
  Dimensions,
} from 'react-native';
import bb from '../../../assets/home/header.png';
import { SafeAreaView } from 'react-navigation';
import * as Notifications from 'expo-notifications';

import DrawerIcon from '../../../assets/drawer-icon.svg';
import SearchIcon from '../../../assets/dashboard-drawer/search.svg';
import BellIcon from '../../../assets/dashboard-drawer/bell.svg';
import SIcon from '../../../assets/small-search-icon.svg';
import Colors from '../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPushToken } from '../../store/action/auth';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { setAdminType } from '../../store/action/auth';
import { getSalesStatistics } from '../../store/action/orders';

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

  useEffect(() => {
    const getToken = async () => {
      // const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      const expoPushToken = await Notifications.getExpoPushTokenAsync();
      dispatch(uploadPushToken(userType, expoPushToken.data));
      Notifications.addNotificationReceivedListener((d) => {
        console.log(d, 'zzxxxx');
        alert('notifiatino rec');
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
            {/* <BellIcon color={Colors.INACTIVE_VIEW_TAP} /> */}
            {/* <View
              style={{
                position: 'relative',
                bottom: 10,
                right: 10,
                backgroundColor: Colors.GOLDEN,
                width: 25,
                height: 25,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: Colors.WHITE,
                borderWidth: 2,
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Tajawal-Medium',
                  fontSize: 15,
                }}
              >
                2
              </Text>
            </View> */}
            {/* <SearchIcon
              color={Colors.ACTIVE_VIEW_TAP}
              style={{ marginRight: 8 }}
            /> */}
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
