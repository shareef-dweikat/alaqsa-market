import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { CustomPicker } from 'react-native-custom-picker';
import { SafeAreaView } from 'react-navigation';
import Colors from '../../constants/colors';
import RightArrow from '../../../assets/right-arrow.svg';
import TickIcon from '../../../assets/tick-big.svg';
import SearchBox from '../../components/SearchBox';
import { StatusBar } from 'expo-status-bar';
import DownArrow from '../../../assets/Shape.png';
import { Checkbox } from 'react-native-paper';
import VerticalItemDetailsCard from '../../components/VerticalItemDetailsCard';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory } from '../../store/action/category';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  image: {
    // flex: 1,
    // resizeMode: 'cover',
    backgroundColor: Colors.BACKGROUND,
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'flex-end',
    height: Dimensions.get('window').height * 0.15,
    // width: Dimensions.get('window').width,
  },

  inputDesc: {
    backgroundColor: 'white',
    marginTop: 16,
    height: 200,
    textAlignVertical: 'top',
    padding: 8,
    fontFamily: 'Tajawal-Medium',
    fontSize: 16,
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    marginTop: 16,
    borderRadius: 5,
    paddingHorizontal: 8,
    fontFamily: 'Tajawal-Regular',
  },
});
export default function AddCategoryScreen({ navigation }) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  console.log(name, desc);
  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
      <StatusBar backgroundColor={Colors.BACKGROUND} barStyle='light-conten' />
      <View style={styles.image}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <RightArrow />
        </TouchableOpacity>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => dispatch(createCategory(name, desc))}
            style={{width: 20, height: 20}}
          >
            <TickIcon />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 30,
              fontFamily: 'Tajawal-Medium',
              color: 'white',
            }}
          >
            إضافة تصنيف
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: Colors.MEDIUM_BACKGROUND_COLOR,
          flex: 1,
          padding: 16,
        }}
      >
        <TextInput
          onChangeText={(v) => setName(v)}
          style={styles.input}
          placeholder='اسم التصنيف الجديد'
        />
        <TextInput
          onChangeText={(v) => setDesc(v)}
          style={styles.inputDesc}
          placeholder='الوصف'
        />
      </View>
    </SafeAreaView>
  );
}

export function MyCustomPicker({ navigation }) {
  // const image = { uri: '../../assets/signin-screen/background.png' };
  const options = ['داخل نابلس', 'خارج نابلس'];
  let picker;
  const [checked, setChecked] = useState('unchecked');
  return (
    <CustomPicker
      ref={(el) => (picker = el)}
      options={options}
      value={'اختر التصنيف'}
      style={{ backgroundColor: Colors.WHITE, marginTop: 16, height: 40 }}
      // modalStyle={{borderRadius: 20, borderWidth: 1}}
      headerTemplate={(item) => (
        <View
          style={{
            backgroundColor: 'white',
            width: '100%',
            padding: 8,
            // justifyContent: 'center',
            // alignItems: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              borderBottomColor: Colors.BORDER_COLOR,
              borderBottomWidth: 1,
              paddingBottom: 12,
            }}
          >
            {/* <TouchableOpacity
                  style={{ width: 25, height: 25 }}
                  // onPress={() => setVisible(false)}
                >
                  <Text style={{ color: Colors.BORDER_COLOR, fontSize: 20 }}>
                    X
                  </Text>
                </TouchableOpacity> */}
            <Text style={{ fontFamily: 'Tajawal-Bold' }}>العنوان</Text>
          </View>
        </View>
      )}
      optionTemplate={({ item }) => (
        <TouchableOpacity
          // onPress={() => pickImage()}
          style={{ marginTop: 12, marginRight: 16 }}
        >
          <Text style={{ fontFamily: 'Tajawal-Regular' }}>{item}</Text>
        </TouchableOpacity>
      )}
      fieldTemplate={(item) => (
        <View
          style={{
            padding: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Image source={DownArrow} />
          <Text
            style={{
              textAlign: 'right',
              fontFamily: 'Tajawal-Medium',
              color: 'black',
            }}
          >
            {item.selectedItem}
          </Text>
        </View>
      )}
      footerTemplate={() => (
        <View style={{ height: 20, backgroundColor: 'white' }}></View>
      )}
      onValueChange={(value) => {
        // Alert.alert('Selected Item', value || 'No item were selected!');
      }}
    />
  );
}
