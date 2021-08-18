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
import { useDispatch, useSelector } from 'react-redux';
import RightArrow from '../../../assets/right-arrow.svg';
import Colors from '../../constants/colors';
import { deleteSlide, fetchSlideImage, changeImage } from '../../store/action/homeSlider';
const styles = StyleSheet.create({
  image: {
    backgroundColor: Colors.BACKGROUND,
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 30,
    alignItems: 'flex-end',
    height: Dimensions.get('window').height * 0.15,
    flexDirection: 'row-reverse',
    alignItems: 'center'
  },
  lookForProductText: {
    fontSize: 22,
    fontFamily: 'Tajawal-Medium',
    color: 'white',
  },
});

export default function DashboardHomeSlider({ navigation }) {
  // const [slides, setSlides] = useState([]);
  const slides = useSelector((state) => state.homeSlider);
  const dispatch = useDispatch();

  const changeImageFun = (image, uri) => {
      dispatch(changeImage(slides,image,uri))
  }
  useEffect(() => {
    dispatch(fetchSlideImage());
  }, []);
  return (
    <View style={{ backgroundColor: '#F5F5F5', flex: 1 }}>
      <View>
        <View style={styles.image}>
          <TouchableOpacity
            style={{ width: 25 }}
            onPress={() => navigation.pop()}
          >
            <RightArrow />
          </TouchableOpacity>
          <View style={{ width: '100%', marginRight: 16 }}>
            <Text style={styles.lookForProductText}>السلايدر الإعلاني</Text>
          </View>
        </View>
      </View>
      <ScrollView style={{ paddingHorizontal: 8, paddingTop: 8 }}>
        {slides?.uploadedSlideImageUri?.map((slide) => (
           <SlideCard key={slide.slide_name} slide={slide} changeImageFun={changeImageFun} />
        ))} 
      </ScrollView>
    </View>
  );
}

export function SlideCard({ slide, changeImageFun }) {
  // const uploadeImageUri = useSelector(
  //   (state) => state.homeSlider.uploadedSlideImageUri
  // );
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
      changeImageFun(slide, result.uri)
      // setImage(result.uri);
    }
  };
  const handleDelete = () => {
    dispatch(deleteSlide(slide.imageId));
  };

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
           
          </View>
          <Text style={{ fontFamily: 'Tajawal-Regular' }}>
            {' '}
            السلايدر الإعلاني للشاشة الرئيسة{' '}
          </Text>
        </View>
        <Image
          style={{ height: 180, borderRadius: 5 }}
          resizeMode='contain'
          source={{ uri: slide.image }}
        /> 
       
         <TouchableOpacity
          onPress={() => handleDelete()}
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
            حذف
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
