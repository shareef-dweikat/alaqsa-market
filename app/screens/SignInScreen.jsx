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
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import SignForm, { MyInputText } from '../components/SignForm';
import BB from '../../assets/signin-screen/background.svg';
import image from '../../assets/signin-screen/background-overlay.png';
import firebase from '../config/firebase';
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
export default function SignInScreen({ navigation, setUser }) {

  // const image = { uri: '../../assets/signin-screen/background.png' };
  const [logoVisible, setLogoVisible] = useState(true);
  const submit = async () => {
    // firebase.auth().onAuthStateChanged(({email: 'aa@gmail.com', password: '1234'})=> {
    // })
    firebase
      .auth()
      .signInWithEmailAndPassword('alaqsamart2020@gmail.com', 'husam1994S')
      .then((e) => {
         setUser({userType: 'customer'})
        console.log('adsd', e);
      })
      .catch(function (error) {
        console.log(error);
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
              submitText='دخول'
              onPress={() => submit()}
              inputs={
                <>
                  <MyInputText
                    onChangeText={(d) => console.log(d)}
                    placeholder='الإيميل'
                  />
                  <MyInputText
                    onChangeText={(d) => console.log(d)}
                    placeholder='كلمة المرور'
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
