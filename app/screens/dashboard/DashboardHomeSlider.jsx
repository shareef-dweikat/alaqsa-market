import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  Modal,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import EditIcon from '../../../assets/edit.svg';
import * as ImagePicker from 'expo-image-picker';

import DeleteIcon from '../../../assets/delete-icon-dashboard.svg';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '../../config/firebase';

import RightArrow from '../../../assets/right-arrow.svg';

import Colors from '../../constants/colors';
import { fetchSellerAccounts } from '../../store/action/accounts';
import { uploadSlide, fetchSlideImage } from '../../store/action/homeSlider';
import { TextInput } from 'react-native-gesture-handler';
const styles = StyleSheet.create({
  image: {
    backgroundColor: Colors.BACKGROUND,
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 45,
    alignItems: 'flex-end',
    height: Dimensions.get('window').height * 0.15,
  },
  lookForProductText: {
    fontSize: 22,
    fontFamily: 'Tajawal-Medium',
    color: 'white',
  },
});

export default function DashboardHomeSlider({ navigation }) {
  const [slides, setSlides] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // firebase
    //   .database()
    //   .ref(`admins/`)
    //   .once('value', async (sellers) => {
    //     const sellersList = Object.keys(sellers.val());
    //     setAccounts(sellersList);
    //   })
    //   .catch((e) => console.log('fetchSellerAccounts', e));
  }, []);
  return (
    <View style={{ backgroundColor: '#F5F5F5', flex: 1 }}>
      <View>
        <View style={styles.image}>
          <TouchableOpacity
            style={{ width: 20 }}
            onPress={() => navigation.pop()}
          >
            <RightArrow />
          </TouchableOpacity>
          <View style={{ width: '100%' }}>
            <Text style={styles.lookForProductText}>البانر الإعلاني</Text>
            {/* <SearchBox /> */}
          </View>
        </View>
      </View>
      <ScrollView style={{ paddingHorizontal: 8, paddingTop: 8 }}>
        {[1].map((slide) => (
          <SlideCard slide={slide} />
        ))}
      </ScrollView>
    </View>
  );
}

export function SlideCard({ slide }) {
  const uploadeImageUri = useSelector(
    (state) => state.homeSlider.uploadedSlideImageUri
  );
  const [value, setValue] = useState('');
  const [image, setImage] = useState('');
  const isLoading = useSelector((state) => state.homeSlider.isLoading);
  const dispatch = useDispatch();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const handleUpdate = () => {
    dispatch(uploadSlide('homeSlider1', value, image));
  };
  useEffect(() => {
    dispatch(fetchSlideImage());
    // setImage(uploadeImageUri);
  }, [uploadeImageUri]);
  return (
    <>
      <View
        style={{
          width: '100%',
          backgroundColor: 'white',
          borderRadius: 5,
          marginVertical: 8,
          // flexDirection: 'row',
          // justifyContent: 'space-between',
          padding: 8,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 50,
            padding: 8,
            alignItems: 'center',
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => pickImage()}>
              <EditIcon style={{ marginRight: 8 }} />
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => showDeleteDialog()}>
              <DeleteIcon style={{ marginRight: 16 }} />
            </TouchableOpacity> */}
          </View>
          <Text style={{ fontFamily: 'Tajawal-Regular' }}>
            {' '}
            السلابدر الإعلاني للشاشة الرئيسة{' '}
          </Text>
        </View>
        <Image
          style={{ height: 180, borderRadius: 5 }}
          resizeMode='contain'
          source={{ uri: uploadeImageUri }}
        />
        <TextInput
          style={{
            backgroundColor: '#515462',
            borderRadius: 10,
            height: 40,
            paddingHorizontal: 8,
            color: 'white',
            fontFamily: 'Tajawal-Regular',
          }}
          onChangeText={(txt) => setValue(txt)}
          value={value}
          placeholderTextColor='white'
          placeholder='اكتب نصا هنا'
        />
        <TouchableOpacity
          onPress={() => handleUpdate()}
          style={{
            backgroundColor: Colors.GOLDEN,
            marginTop: 8,
            height: 40,
            width: '100%',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontFamily: 'Tajawal-Regular' }}>
            حفظ
          </Text>
        </TouchableOpacity>
      </View>
      <LoadingModal visible={isLoading} />
    </>
  );
}
export function LoadingModal({ title, visible, setVisible, setImage }) {
  return (
    <Modal visible={visible} transparent>
      <View
        style={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            width: '80%',
            height: 200,
            padding: 16,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator color={Colors.GOLDEN} size='large' />
          <Text style={{ marginTop: 32, fontFamily: 'Tajawal-Medium' }}>
            جار إضافة إعلان
          </Text>
        </View>
      </View>
    </Modal>
  );
}
