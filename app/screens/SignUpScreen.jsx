import IntroductionSlider from '../components/introductionSlider/IntroductionSlider';
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
  Keyboard,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import SignForm, { MyInputText } from '../components/SignForm';
import { signup } from '../store/action/auth';
import image from '../../assets/signin-screen/background-overlay.png';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    // height: Dimensions.get('window').height * 0.5,
    width: Dimensions.get('window').width,
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    padding: 8,
    borderRadius: 10,
    marginVertical: 8,
    height: 45,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    fontFamily: 'Tajawal-Regular',
    textAlign: 'right',
  },
  btn: {
    backgroundColor: '#F8A912',
    padding: 16,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  btnText: {
    fontFamily: 'Tajawal-Regular',
    color: 'white',
  },
  forgotPassText: {
    color: '#F8A912',
    fontSize: 15,
    textAlign: 'left',
    fontFamily: 'Tajawal-Regular',
  },
  slogon: {
    marginVertical: 16,
    color: 'white',
    fontFamily: 'Tajawal-Regular',
    textAlign: 'center'
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    height: 347,
    width: Dimensions.get('window').width - 50,
  },
  formContainerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 100,
    borderBottomWidth: 1,
    borderColor: '#D8D8D8',
  },
  formContainerHeaderTap: {
    fontFamily: 'Tajawal-Regular',
    fontSize: 18,
  },
  formContainerHeaderTapActiveLine: {
    width: 30,
    height: 5,
    backgroundColor: '#FFA820',
    marginTop: 5,
  },
  formContainerHeaderTapLine: {
    width: 30,
    height: 5,
    backgroundColor: 'white',
    marginTop: 5,
  },
});
export default function SignUpScreen({ navigation }) {
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const submit = async () => {
    if (pass != confirmPass) {
      alert('كلمات المرور غير متطابقة');
      return;
    }
    if (email.search('@') === -1) {
      alert('الايميل المدخل غير صحيح');
      return;
    }
    dispatch(
      signup(
        phone.trim(),
        pass.trim(),
        email.trim().toLowerCase(),
        name.trim(),
        navigation
      )
    );
  };
  // const image = { uri: '../../assets/signin-screen/background.png' };
  const [logoVisible, setLogoVisible] = useState(true);
  let [bachgroundHeight, setBachgroundHeight] = useState(
    Dimensions.get('window').height * 0.5
  );

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setBachgroundHeight(Dimensions.get('window').height * 0.25);
      setLogoVisible(false);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setBachgroundHeight(Dimensions.get('window').height * 0.5);
      setLogoVisible(true);
    });
    return function cleanup() {
      Keyboard.removeListener('keyboardDidShow');
      Keyboard.removeListener('keyboardDidHide');
    };
  }, []);
  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
      <ImageBackground
        source={image}
        style={{ ...styles.image, height: bachgroundHeight }}
      >
        <KeyboardAvoidingView keyboardVerticalOffset={-300} behavior='padding'>
          <ScrollView
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            {logoVisible ? (
              <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                <Image source={require('../../assets/logo.png')} />
                <Text style={styles.slogon}>كل ما تحتاجه في تطبيق</Text>
              </View>
            ) : null}
            <SignForm
              agreeOnConditionsBoxShown={true}
              submitText='إنشاء حساب'
              navigation={navigation}
              onPress={() => submit()}
              inputs={
                <>
                  <MyInputText
                    onChangeText={(d) => setName(d)}
                    placeholder='اسم المستخدم'
                  />
                  <MyInputText
                    onChangeText={(d) => setPhone(d)}
                    placeholder='رقم الجوال'
                    keyboardType= "number-pad"
                  />
                  {/* <MyInputText
                    onChangeText={(d) => setEmail(d)}
                    placeholder='الايميل'
                  /> */}
                  <MyInputText
                    onChangeText={(d) => setPass(d)}
                    placeholder='كلمة المرور'
                  />
                  <MyInputText
                    onChangeText={(d) => setConfirmPass(d)}
                    placeholder='تأكيد كلمة المرور'
                  />
                </>
              }
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}
