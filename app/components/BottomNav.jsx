import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import HomeIcon from '../../assets/home-icon.svg';
import Notifications from '../../assets/bell.svg';
import ProfileIcon from '../../assets/profile-icon.svg';
import Colors from '../constants/colors';
import CategoriesIcon from '../../assets/categories-icon.svg';

export default function BottomNav({ navigation }) {
  const currentScreen = navigation.dangerouslyGetState().routes[
    navigation.dangerouslyGetState().index
  ].name;
  const user = useSelector((state) => state.auth.userType);

  const isAuth = (screen) => {
    if (user) navigation.push(screen);
    else navigation.push('AuthStackScreen');
  };
  return (
    <View
      style={{
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 32,
      }}
    >
      <TouchableOpacity onPress={() => isAuth('ProfileScreen')}>
        <ProfileIcon
          color={currentScreen === 'ProfileScreen' ? Colors.GOLDEN : 'black'}
          size={25}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => isAuth('NotificationsScreen')}>
        <Notifications
          name='notification'
          color={
            currentScreen === 'NotificationsScreen' ? Colors.GOLDEN : 'black'
          }
          size={25}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => isAuth('HomeScreen')}>
        <HomeIcon
          color={currentScreen === 'HomeScreen' ? Colors.GOLDEN : 'black'}
          size={50}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => isAuth('CartScreen')}>
        <AntDesign
          name='shoppingcart'
          color={currentScreen === 'CartScreen' ? Colors.GOLDEN : 'black'}
          size={25}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => isAuth('CategoriesScreen')}>
        <CategoriesIcon
          size={25}
          color={currentScreen === 'CategoriesScreen' ? Colors.GOLDEN : 'black'}
        />
      </TouchableOpacity>
    </View>
  );
}
