import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import CategoriesIcon from '../../assets/categories-icon.svg';
import { AntDesign } from '@expo/vector-icons';
import HomeIcon from '../../assets/home-icon.svg';
import ProfileIcon from '../../assets/profile-icon.svg';
import Colors from '../constants/colors';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default function BottomNav({ navigation }) {
  const currentScreen = navigation.dangerouslyGetState().routes[
    navigation.dangerouslyGetState().index
  ].name;

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
      <TouchableOpacity onPress={() => navigation.push('ProfileScreen')}>
        <ProfileIcon
          color={currentScreen === 'ProfileScreen' ? Colors.GOLDEN : 'black'}
          size={25}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.push('NotificationsScreen')}>
        <AntDesign
          name='notification'
          color={
            currentScreen === 'NotificationsScreen' ? Colors.GOLDEN : 'black'
          }
          size={25}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.push('HomeScreen')}>
        <HomeIcon
          color={currentScreen === 'HomeScreen' ? Colors.GOLDEN : 'black'}
          size={50}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.push('CartScreen')}>
        <AntDesign
          name='shoppingcart'
          color={currentScreen === 'CartScreen' ? Colors.GOLDEN : 'black'}
          size={25}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.push('CategoriesScreen')}>
        <CategoriesIcon
          size={25}
          color={currentScreen === 'CategoriesScreen' ? Colors.GOLDEN : 'black'}
        />
      </TouchableOpacity>
    </View>
  );
}
