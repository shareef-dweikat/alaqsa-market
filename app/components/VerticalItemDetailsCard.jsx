import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import pImage from '../../assets/meat.png';
import HeartIcon from '../../assets/small-heart-icon.svg';
import PlusIcon from '../../assets/plus-icon.svg';
import { ScrollView } from 'react-native-gesture-handler';
import {Picker} from '@react-native-community/picker' 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    backgroundColor: '#F8A912',
    padding: 16,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    width: '100%',
  },
  btnText: {
    fontFamily: 'Tajawal-Medium',
    color: 'white',
    fontSize: 17,
  },
});
export default function VerticalItemDetailsCard({
  name,
  price,
  desc,
  isFav,
  onPress,
  btn,
}) {
  return (
    <ScrollView
      contentContainerStyle={{
        marginTop: 16,
        paddingHorizontal: 32,
        // flexDirection: 'row',
      }}
    >
      <Image
        style={{
          width: '100%',
          borderRadius: 10,
        }}
        source={pImage}
      />

      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 12,
          width: '100%',
        }}
      >
        <Text style={{fontFamily: 'Tajawal-Medium'}}>اسسسس</Text>
      </View> */}
      <Text
        style={{
          fontFamily: 'Tajawal-Medium',
          marginTop: 12,
          color: '#515462',
        }}
      >
        اسسسس
      </Text>

      <Text
        style={{
          fontFamily: 'Tajawal-Regular',
          textAlign: 'right',
          width: '100%',
          marginTop: 16,
          color: '#515462',
        }}
      >
        desssss
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
          paddingHorizontal: 32,
          marginTop: 32,
        }}
      >
        <View style={{ flex: 1 }}>
          <Picker
            selectedValue={'sss'}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ language: itemValue })
            }
          >
            <Picker.Item label='دولار  للكيلو' value='1' />
            <Picker.Item label='دولارين  للكيلتين' value='2' />
          </Picker>
        </View>

        <Text
          style={{ fontFamily: 'Tajawal-Regular', color: '#515462', flex: 1 }}
        >
          قم بتحديد الكمية
        </Text>
      </View>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>أضف إلى السلة</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
