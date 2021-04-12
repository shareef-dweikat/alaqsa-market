import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
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
    fontFamily: 'Tajawal-Medium',
    color: 'white',
    fontSize: 17,
  },
  forgotPassText: {
    color: '#F8A912',
    fontSize: 15,
    textAlign: 'left',
    fontFamily: 'Tajawal-Regular',
  },
  agreeOnConditionsTxt: {
    color: 'black',
    fontSize: 12,
    textAlign: 'right',
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
    minHeight: 347,
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
export default function SignForm({
  inputs,
  forgotPassBtnShown,
  agreeOnConditionsBoxShown,
  isSignUpActive,
  submitText,
  onPress,
  navigation,
  routeName,
}) {
  return (
    <View style={styles.formContainer}>
      <View style={styles.formContainerHeader}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={{ alignItems: 'center' }}
        >
          <Text style={styles.formContainerHeaderTap}>دخول</Text>
          <View
            style={
              routeName === 'SignInScreen' || routeName === 'SignInAdminScreen'
                ? styles.formContainerHeaderTapActiveLine
                : styles.formContainerHeaderTapLine
            }
          ></View>
        </TouchableOpacity>
        {isSignUpActive && (
          <TouchableOpacity
            onPress={() => navigation.push('SignUpScreen')}
            style={{ alignItems: 'center' }}
          >
            <Text style={styles.formContainerHeaderTap}>إنشاء حساب</Text>
            <View
              style={
                routeName === 'SignInScreen'
                  ? styles.formContainerHeaderTapLine
                  : styles.formContainerHeaderTapActiveLine
              }
            ></View>
          </TouchableOpacity>
        )}
      </View>

      {inputs}
      {/* {forgotPassBtnShown && (
        <Text style={styles.forgotPassText}>نسيت كلمة المرور؟</Text>
      )} */}
      {/* {agreeOnConditionsBoxShown && (
        <Text style={styles.agreeOnConditionsTxt}>
            بالنقر على زر التسجيل أنا أوافق على الشروط والأحكام
        </Text>
      )} */}
      <TouchableOpacity onPress={onPress} style={styles.btn}>
        <Text style={styles.btnText}>{submitText}</Text>
      </TouchableOpacity>
    </View>
  );
}
export function MyInputText({ placeholder, onChangeText, keyboardType, secureTextEntry }) {
  return (
    <TextInput
      onChangeText={onChangeText}
      style={styles.input}
      keyboardType={keyboardType}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
    />
  );
}
