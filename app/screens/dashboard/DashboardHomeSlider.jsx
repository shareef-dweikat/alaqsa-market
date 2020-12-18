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
} from 'react-native';
import EditIcon from '../../../assets/edit.svg';
import * as ImagePicker from 'expo-image-picker';

import DeleteIcon from '../../../assets/delete-icon-dashboard.svg';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '../../config/firebase';

import RightArrow from '../../../assets/right-arrow.svg';

import Colors from '../../constants/colors';
import { fetchSellerAccounts } from '../../store/action/accounts';
import { uploadSlide } from '../../store/action/homeSlider';
const styles = StyleSheet.create({
  image: {
    backgroundColor: Colors.BACKGROUND,
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 45,
    alignItems: 'flex-end',
    height: Dimensions.get('window').height * 0.15,
  },
  lookForProductText: {
    fontSize: 22,
    fontFamily: 'Tajawal-Medium',
    color: 'white',
  },
});

export default function DashboardHomeSlider({ navigation }) {
  const [slides, setSlides] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // firebase
    //   .database()
    //   .ref(`admins/`)
    //   .once('value', async (sellers) => {
    //     const sellersList = Object.keys(sellers.val());
    //     setAccounts(sellersList);
    //   })
    //   .catch((e) => console.log('fetchSellerAccounts', e));
  }, []);
  return (
    <View style={{ backgroundColor: '#F5F5F5', flex: 1 }}>
      <View>
        <View style={styles.image}>
          <TouchableOpacity
            style={{ width: 20 }}
            onPress={() => navigation.pop()}
          >
            <RightArrow />
          </TouchableOpacity>
          <View style={{ width: '100%' }}>
            <Text style={styles.lookForProductText}>البانر الإعلاني</Text>
            {/* <SearchBox /> */}
          </View>
        </View>
      </View>
      <ScrollView style={{ paddingHorizontal: 8, paddingTop: 8 }}>
        {[1].map((slide) => (
          <SlideCard slide={slide} />
        ))}
      </ScrollView>
    </View>
  );
}

export function SlideCard({ slide }) {
  const [value, setValue] = useState('');
  const [image, setImage] = useState('');
  const uploadeImageUri = useSelector(
    (state) => state.homeSlider.uploadedSlideImageUri
  );
  const dispatch = useDispatch();
    console.log(uploadeImageUri, "uploadeImageUriiiiii")
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      dispatch(uploadSlide("homeSlider1", "homeSlider1", result.uri));
      // setImage(result.uri);
    }
  };
  const handleChangePassword = () => {
    // firebase
    //   .database()
    //   .ref(`admins/${account}/password`)
    //   .set(value.trim())
    //   .then(() => {
    //     setValue('')
    //     alert(`تم تغيير كلمة مرور ${account} بنجاح`)
    //   })
    //   .catch((e) => console.log('AccountCard', e));
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
            {/* <TouchableOpacity onPress={() => showDeleteDialog()}>
              <DeleteIcon style={{ marginRight: 16 }} />
            </TouchableOpacity> */}
          </View>
          <Text style={{ fontFamily: 'Tajawal-Regular' }}>
            {' '}
            البانر الإعلاني للشاشة الرئيسة{' '}
          </Text>
        </View>
        <Image style={{height: 250, borderRadius: 5}} resizeMode='contain' source={{uri: uploadeImageUri }} />
      </View>
    </>
  );
}

// export function DeleteConfirmation({
//   name,
//   visible,
//   handleDelete,
//   setDeleteDialogVisible,
// }) {
//   return (
//     <Modal visible={visible}>
//       <TouchableOpacity
//         onPress={() => setDeleteDialogVisible(false)}
//         style={{
//           height: '100%',
//           justifyContent: 'center',
//           alignItems: 'center',
//           backgroundColor: 'rgba(0,0,0,0.5)',
//         }}
//       >
//         <View
//           style={{
//             backgroundColor: 'white',
//             width: '80%',
//             height: 300,
//             padding: 16,
//             borderRadius: 10,
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <DeleteIcon />
//           <Text
//             style={{
//               marginTop: 8,
//               fontFamily: 'Tajawal-Bold',
//               fontSize: 20,
//               textAlign: 'center',
//             }}
//           >
//             هل انت متأكد من حذف التصنيف {name}؟ كل منتجات التصنيف ستضيع
//           </Text>

//           <View style={{ width: '100%' }}>
//             <TouchableOpacity onPress={() => handleDelete()} style={styles.btn}>
//               <Text style={styles.btnTxt}>تأكيد الحذف</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </TouchableOpacity>
//     </Modal>
//   );
// }
