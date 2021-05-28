import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Text,
  Image,
  KeyboardAvoidingView,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignForm, { MyInputText } from '../components/SignForm';
import image from '../../assets/signin-screen/background-overlay.png';
import firebase from '../config/firebase';
import {useRoute} from '@react-navigation/native';
import { login } from '../store/action/auth';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
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
export default function SignInScreen({ navigation }) {
  const [logoVisible, setLogoVisible] = useState(true);
  const [pass, setPass] = useState(null);
  const [phone, setPhone] = useState(null);
  const dispatch = useDispatch();
  const route = useRoute();
  const submit = async () => {
    firebase
    .database()
    .ref(`fav/${phone}`)
    .remove()
    .then(() => {
      dispatch(login(phone, pass))
    });
   
  };
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
              <TouchableOpacity
                onPress={() => navigation.push('SignInAdminScreen')}
                style={{ alignItems: 'center', justifyContent: 'center' }}
              >
                <Image source={require('../../assets/logo.png')} />
                <Text style={styles.slogon}>كل ما تحتاجه في تطبيق</Text>
              </TouchableOpacity>
            ) : null}
            <SignForm
              forgotPassBtnShown={true}
              isSignUpActive={true}
              submitText='دخول'
              onPress={() => submit()}
              routeName={route.name}
              navigation={navigation}
              inputs={
                <>
                  <MyInputText
                    onChangeText={(phone) => setPhone(phone)}
                    placeholder='رقم الجوال'
                    keyboardType= "number-pad"
                    secureTextEntry={false}
                  />
                  <MyInputText
                    onChangeText={(pass) => setPass(pass)}
                    placeholder='كلمة المرور'
                    secureTextEntry={true}
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
