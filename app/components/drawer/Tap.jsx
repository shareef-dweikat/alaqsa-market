import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../constants/colors';

import SIcon from '../../../assets/small-search-icon.svg';
import SmallHeart from '../../../assets/small-heart-icon.svg';
import BuyHistory from '../../../assets/drawer/history.svg';

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    backgroundColor: 'white',
    width: '100%',
    height: 45,
    justifyContent: 'flex-end',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  input: {
    backgroundColor: 'white',
    height: '100%',
    borderRadius: 10,
    marginRight: 8,
  },
});
export default function Tap({ value, tapIcon, title, onPress }) {
  return (

        <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 16,  }}>
          <View
            style={{
              padding: 8,
              flexDirection: 'row',
              backgroundColor: Colors.BACKGROUND,
              width: '100%',
              marginTop: 8,
              borderRadius: 15,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', marginRight: 8 , fontFamily: 'Tajawal-Regular'}}>{title}</Text>
            {tapIcon}
          </View>
        </TouchableOpacity>
   
  );
}
