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
import { SafeAreaView } from 'react-navigation';
import RightArrow from '../../assets/right-arrow.svg';
import DrawerIcon from '../../assets/drawer-icon.svg';
import Tick from '../../assets/tick.svg';
import navigation from '../config/navigation';
import Alert from './Alert';
import * as ImagePicker from 'expo-image-picker';
import Camera from '../../assets/photo-camera.svg';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default function ProfileScreen({ navigation }) {
  // const image = { uri: '../../assets/signin-screen/background.png' };
  const [alertVisibility, setVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [chooseImageModalVisible, setChooseImageModalVisible] = useState(false);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('لا يمكنك تغيير صوتك دون منح الإذن');
        }
        const {
          statusCamera,
        } = await ImagePicker.requestCameraPermissionsAsync();
        // if (statusCamera !== 'granted') {
        //   alert('لا يمكنك استعمال الكاميرا دون اعطاء اذن للتطبيق');
        // }
      }
    })();
  }, []);


  // const [assets] = useAssets([
  //   require('file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540shareef.dweikat%252Falaqsa/ImagePicker/982b6615-0f0c-4283-b284-70bed1bf96d8.jpg'),
  // ]);

  // if (!assets) {
  //   return <AppLoading />;
  // }
  // console.log("adddd", assets)
  return (
    <ScrollView
      style={{ padding: 16, backgroundColor: Colors.WHITE, height: '100%' }}
    >
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
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 16,
        }}
      >
        <Image source={require('../../assets/person-drawer.png')} />
        <TouchableOpacity
          // onPress={() => pickImage()}
          onPress={() => setChooseImageModalVisible(true)}
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}
        >
          <Text style={{ fontFamily: 'Tajawal-Medium', marginRight: 8 }}>
            تغيير الصورة الشخصية
          </Text>
          <Camera />
        </TouchableOpacity>

        <Field title='اسم المستخدم' onPress={() => setVisible(true)} />
        <Field title='الايميل' />
        <Field title='رقم الجوال' />
        <Field
          title='كلمة المرور'
          onPress={() => navigation.push('PasswordResetScreen')}
        />
        <Field title='العنوان' />
      </View>

      <Alert visible={alertVisibility} setVisible={setVisible} />
      <ChooseImageModal
        visible={chooseImageModalVisible}
        setVisible={setChooseImageModalVisible}
        setImage={setImage}
      />
    </ScrollView>
  );
}

export function Field({ title, onPress }) {
  // const image = { uri: '../../assets/signin-screen/background.png' };

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
        <TouchableOpacity onPress={onPress}>
          <Tick />
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
        style={{ fontSize: 15, color: 'black', fontFamily: 'Tajawal-Medium' }}
      >
        شسيشسي
      </Text>
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

    console.log(result);
    setVisible(false)

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
    console.log(resultCamera);
    setVisible(false)

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
          <TouchableOpacity onPress={()=>pickImage()} style={{ marginTop: 18 }}>
            <Text style={{ fontFamily: 'Tajawal-Regular' }}>
              استيراد من معرض الصور
            </Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={()=>takePicture()} style={{ marginTop: 18 }}>
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
