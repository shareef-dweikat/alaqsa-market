import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Keyboard,
  AsyncStorage,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignForm, { MyInputText } from '../components/SignForm';
import image from '../../assets/signin-screen/background-overlay.png';
import firebase from '../config/firebase';
import * as Updates from 'expo-updates';
import RightArrow from '../../assets/right-arrow.svg';

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
export default function SignInAdminScreen({ route, navigation, setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [logoVisible, setLogoVisible] = useState(true);
  const login = () => {
    firebase
      .database()
      .ref(`admins/${username.trim()}`)
      .once('value', (user) => {
        const userObj = user.val();
        if (userObj) {
          if (userObj.password == password.trim()) {
            AsyncStorage.setItem('userType', userObj.userType);
            AsyncStorage.setItem('username', username);
            Updates.reloadAsync();

            dispatch({
              type: 'LOGIN_ADMIN_SUCCESS',
              payload: {
                username,
                userType: userObj.userType,
              },
            });
          } else {
            alert('كلمة مرور خاطئة');
          }
        } else {
          alert('لا يوجد مستخدم بهذا الاسم');
        }
      })
      .catch((e) => console.log('SignInAdminScreen', e));
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
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 0,
          zIndex: 10,
          alignSelf: 'flex-end',
          paddingRight: 16,
          paddingTop: 16,
        }}
        onPress={() => navigation.pop()}
      >
        <RightArrow />
      </TouchableOpacity>
      <ImageBackground
        source={image}
        style={{ ...styles.image, height: bachgroundHeight }}
      >
        <KeyboardAvoidingView keyboardVerticalOffset={-300} behavior='padding'>
          <ScrollView
            keyboardShouldPersistTaps='handled'
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            {logoVisible ? (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../../assets/logo.png')} />
                <Text style={styles.slogon}>لوحة التحكم</Text>
              </View>
            ) : null}
            <SignForm
              forgotPassBtnShown={true}
              isSignUpActive={false}
              submitText='دخول'
              routeName={route.name}
              onPress={() => login()}
              inputs={
                <>
                  <MyInputText
                    onChangeText={(d) => setUsername(d)}
                    placeholder='اسم المستخدم'
                  />
                  <MyInputText
                    onChangeText={(d) => setPassword(d)}
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
