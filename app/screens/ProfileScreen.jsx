import IntroductionSlider from '../components/introductionSlider/IntroductionSlider';
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
} from 'react-native';
import Colors from '../constants/colors';
import { useAssets } from 'expo-asset';
import { SafeAreaView } from 'react-native-safe-area-context';
import RightArrow from '../../assets/right-arrow.svg';
import DrawerIcon from '../../assets/drawer-icon.svg';
import Pen from '../../assets/tick.svg';
import navigation from '../config/navigation';
import Alert from './Alert';
import * as ImagePicker from 'expo-image-picker';
import { fetchProfile } from '../store/action/auth';
import BottomNav from '../components/BottomNav';
import { useDispatch, useSelector } from 'react-redux';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default function ProfileScreen({ navigation }) {
  // const image = { uri: '../../assets/signin-screen/background.png' };
  const [image, setImage] = useState(null);
  const phone = useSelector((state) => state.auth.phone);
  let userProfile = useSelector((state) => state.auth.userProfile);
  userProfile = userProfile ? userProfile : {};
  const dispatch = useDispatch();
  const [chooseImageModalVisible, setChooseImageModalVisible] = useState(false);
  useEffect(() => {
    dispatch(fetchProfile(phone));
  }, []);

 
  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <ScrollView
        style={{ padding: 16, backgroundColor: Colors.WHITE, height: '100%' }}
      >
      <SafeAreaView forceInset={{ top: 'always' }}>

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
            الملف الشخصي
          </Text>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <DrawerIcon />
          </TouchableOpacity>
        </View>
        </SafeAreaView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 16,
          }}
        >
       
          <Field
            title='اسم المستخدم'
            value={userProfile.name}
            onPress={() => setVisible(true)}
            inputName='name'
          />
          {/* <Field title='الايميل' inputName='email' value={userProfile.email} /> */}
          <Field title='رقم الجوال' inputName='phone' value={phone} />
          <Field
            title='كلمة المرور'
            value='*****'
            inputName='pass'
            onPress={() => navigation.push('PasswordResetScreen')}
          />
          <Field
            title='العنوان'
            inputName='address'
            value={userProfile.address}
          />
        </View>

        <ChooseImageModal
          visible={chooseImageModalVisible}
          setVisible={setChooseImageModalVisible}
          setImage={setImage}
        />
      </ScrollView>
      <BottomNav navigation={navigation} />
    </View>
  );
}

export function Field({ title, value, inputName }) {
  // const image = { uri: '../../assets/signin-screen/background.png' };
  const [alertVisibility, setVisible] = useState(false);

  return (
    <View
      style={{
        height: 60,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        width: '100%',
        padding: 8,
        borderRadius: 10,
        marginTop: 16,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Pen />
        </TouchableOpacity>

        <Text
          style={{
            textAlign: 'right',
            fontSize: 10,
            color: '#515462',
            fontFamily: 'Tajawal-Regular',
          }}
        >
          {title}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 15,
          color: 'black',
          fontFamily: 'Tajawal-Medium',
          textAlign: 'right',
        }}
      >
        {value}
      </Text>
      <Alert
        visible={alertVisibility}
        setVisible={setVisible}
        title={title}
        inputName={inputName}
      />
    </View>
  );
}

export function ChooseImageModal({ title, visible, setVisible, setImage }) {
  // const image = { uri: '../../assets/signin-screen/background.png' };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    setVisible(false);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const takePicture = async () => {
    let resultCamera = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setVisible(false);

    if (!resultCamera.cancelled) {
      setImage(resultCamera.uri);
    }
  };

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
            // justifyContent: 'center',
            // alignItems: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomColor: Colors.BORDER_COLOR,
              borderBottomWidth: 1,
              paddingBottom: 12,
            }}
          >
            <TouchableOpacity
              style={{ width: 25, height: 25 }}
              onPress={() => setVisible(false)}
            >
              <Text style={{ color: Colors.BORDER_COLOR, fontSize: 20 }}>
                X
              </Text>
            </TouchableOpacity>
            <Text style={{ fontFamily: 'Tajawal-Bold' }}>
              تغيير الصورة الشخصية
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => pickImage()}
            style={{ marginTop: 18 }}
          >
            <Text style={{ fontFamily: 'Tajawal-Regular' }}>
              استيراد من معرض الصور
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => takePicture()}
            style={{ marginTop: 18 }}
          >
            <Text style={{ fontFamily: 'Tajawal-Regular' }}>التقاط صورة</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 18 }}>
            <Text style={{ fontFamily: 'Tajawal-Regular' }}>
              إزالة الصورة الشخصية
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
