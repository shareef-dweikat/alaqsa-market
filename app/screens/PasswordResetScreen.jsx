import React, {  useState } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Tick from '../../assets/tick-confirmation.svg';
import Colors from '../constants/colors';
import RightArrow from '../../assets/right-arrow.svg';
import { StatusBar } from 'expo-status-bar';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  image: {
  
    backgroundColor: Colors.BACKGROUND,
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'flex-end',
    height: Dimensions.get('window').height * 0.2,
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
    height: 50,
    width: '100%',
    paddingHorizontal: 8,
    marginTop: 16,
  },
  btn: {
    backgroundColor: Colors.GOLDEN,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 32,
    width: '100%',
  },
  btnTxt: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'Tajawal-Medium',
  },
});
export default function PasswordResetScreen({ navigation }) {
  const [visible, setVisible] = useState(false);
  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
      <StatusBar backgroundColor={Colors.BACKGROUND} barStyle='light-conten' />
      <View style={styles.image}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <RightArrow />
        </TouchableOpacity>
        <View style={{ width: '100%' }}>
          <Text
            style={{
              fontSize: 30,
              fontFamily: 'Tajawal-Medium',
              color: 'white',
            }}
          >
            تغيير كلمة المرور
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Tajawal-Regular',
              color: 'white',
            }}
          >
            أدخل كلمة مرور قوية
          </Text>
        </View>
      </View>
      <View style={{ padding: 32 }}>
        <TextInput style={styles.input} placeholder='كلمة المرور القديمة' />
        <TextInput style={styles.input} placeholder='كلمة المرور الجديدة' />
        <TextInput style={styles.input} placeholder='تأكيد كلمة المرور' />
        <TouchableOpacity onPress={() => setVisible(true)} style={styles.btn}>
          <Text style={styles.btnTxt}>تأكيد التغيير</Text>
        </TouchableOpacity>
      </View>
      <PassChagnedConfirmation setVisible={setVisible} visible={visible} />
    </SafeAreaView>
  );
}

export function PassChagnedConfirmation({  visible, setVisible }) {

  return (
    <Modal visible={visible}>
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
            height: 300,
            padding: 16,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Tick />
          <Text
            style={{ marginTop: 8, fontFamily: 'Tajawal-Bold', fontSize: 20 }}
          >
            تم الحفظ
          </Text>
          <Text
            style={{
              marginTop: 8,
              fontFamily: 'Tajawal-Regular',
              fontSize: 17,
            }}
          >
            تم تغيير كلمة المرور بنجاح
          </Text>
          <View style={{ width: '100%' }}>
            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={styles.btn}
            >
              <Text style={styles.btnTxt}>تأكيد التغيير</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
