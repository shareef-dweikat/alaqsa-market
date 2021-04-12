import IntroductionSlider from '../components/introductionSlider/IntroductionSlider';
import React, { useState } from 'react';
import { Text, View, Modal, TextInput, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, fetchProfile } from '../store/action/auth';
export default function Alert({ visible, setVisible, inputName, title }) {
  const dispatch = useDispatch();
  const phone = useSelector((state) => state.auth.phone);
  const [value, setValue] = useState('');
  const handleSave = () => {
    dispatch(updateProfile(phone, inputName, value));
    dispatch(fetchProfile(phone));

    setVisible(false);
  };
  return (
    <Modal transparent visible={visible}>
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
            height: 150,
            padding: 16,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontFamily: 'Tajawal-Medium', fontSize: 17, textAlign: 'right' }}>
            {title}
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: Colors.BORDER_COLOR,
              height: 40,
              marginTop: 16,
              borderRadius: 10,
              paddingHorizontal: 4,
              textAlign: 'right'
            }}
            placeholder='اكتب هنا'
            onChangeText={(txt) => setValue(txt)}
          />
          <View style={{ flexDirection: 'row', marginTop: 16 }}>
            <TouchableOpacity onPress={() => handleSave()}>
              <Text
                style={{
                  marginRight: 32,
                  fontSize: 17,
                  fontFamily: 'Tajawal-Medium',
                  color: Colors.GOLDEN,
                }}
              >
                حفظ
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setVisible(false)}>
              <Text style={{ fontSize: 17, fontFamily: 'Tajawal-Medium' }}>
                إلغاء
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
