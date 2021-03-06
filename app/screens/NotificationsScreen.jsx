import React, { useEffect } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import DrawerIcon from '../../assets/drawer-icon.svg';
import { fetchNotifications } from '../store/action/notifications';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import BottomNav from '../components/BottomNav';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
export default function NotificationsScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userType);

  const isAuth = () => {
    if (user == null) {
      navigation.push('AuthStackScreen');
    } else navigation.toggleDrawer();
  };
  const notifications = useSelector(
    (state) => state.notification.notifications
  );

  useEffect(() => {
    dispatch(fetchNotifications());
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView style={{ padding: 8, paddingHorizontal: 16, }}>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 8,
            }}
          >
            <Text
              style={{
                fontFamily: 'Tajawal-Medium',
                marginRight: 16,
                fontSize: 20,
              }}
            >
              الإشعارات
            </Text>
            <TouchableOpacity onPress={() => isAuth()}>
              <DrawerIcon />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <View>
          {notifications &&
            notifications.map((notification) => (
              <View style={{ marginTop: 16, paddingBottom: 16 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 16,
                    alignSelf: 'flex-end',
                  }}
                >
                  <View>
                    <Text
                      style={{
                        marginRight: 8,
                        width: 250,
                        textAlign: 'right',
                        fontFamily: 'Tajawal-Regular',
                      }}
                    >
                      {notification.title}
                    </Text>
                    <Text
                      style={{
                        marginRight: 8,
                        fontSize: 12,
                        fontFamily: 'Tajawal-Regular',
                        textAlign: 'right',
                        color: '#515462',
                      }}
                    >
                      {notification.date}
                    </Text>
                  </View>

                  <Image
                    style={{ width: 40, height: 40 }}
                    resizeMode='contain'
                    source={require('../../assets/logo.png')}
                  />
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
      <BottomNav navigation={navigation} />
    </View>
  );
}
