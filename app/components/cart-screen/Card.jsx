import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from '../../../assets/cart/cart-item.png';
import Pen from '../../../assets/cart/pen.svg';
import X from '../../../assets/cart/x.svg';
import navigation from '../../config/navigation';

const styles = StyleSheet.create({});
export default function Card({ setDeleteModalVisible, navigation }) {
  return (
    <View style={{ marginBottom: 16 }}>
      <View
        style={{
          flexDirection: 'row',
          position: 'relative',
          bottom: -8,
          zIndex: 1,
        }}
      >
        <TouchableOpacity onPress={() => setDeleteModalVisible()}>
          <X style={{ marginRight: 16 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation()}>
          <Pen />
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: '#F9F9FA',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 8,
          borderRadius: 5,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-evenly',
          }}
        >
          <Text style={{ fontSize: 15, fontFamily: 'Tajawal-Medium' }}>
            20${' '}
          </Text>
          <Text style={{ fontSize: 15, fontFamily: 'Tajawal-Regular' }}>
            2 كيلو
          </Text>
        </View>
        <View
          style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}
        >
          <Text
            style={{
              marginRight: 8,
              fontFamily: 'Tajawal-Regular',
              fontSize: 17,
            }}
          >
            اسم المنتج
          </Text>
          <Image source={Icon} />
        </View>
      </View>
    </View>
  );
}
