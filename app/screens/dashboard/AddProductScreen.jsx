import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { CustomPicker } from 'react-native-custom-picker';
import { SafeAreaView } from 'react-navigation';
import Colors from '../../constants/colors';
import RightArrow from '../../../assets/right-arrow.svg';
import TickIcon from '../../../assets/tick-big.svg';
import SearchBox from '../../components/SearchBox';
import { StatusBar } from 'expo-status-bar';
import DownArrow from '../../../assets/Shape.png';
import * as ImagePicker from 'expo-image-picker';
import { addProduct, uploadProductImage } from '../../store/action/product';
import { fetchCategories } from '../../store/action/category';
import VerticalItemDetailsCard from '../../components/VerticalItemDetailsCard';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native-paper';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  image: {
    // flex: 1,
    // resizeMode: 'cover',
    backgroundColor: Colors.BACKGROUND,
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'flex-end',
    height: Dimensions.get('window').height * 0.15,
    // width: Dimensions.get('window').width,
  },
  checkboxsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  inputDesc: {
    backgroundColor: 'white',
    marginTop: 16,
    height: 200,
    textAlignVertical: 'top',
    padding: 8,
    fontFamily: 'Tajawal-Medium',
    fontSize: 16,
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    marginTop: 16,
    borderRadius: 5,
    paddingHorizontal: 8,
    fontFamily: 'Tajawal-Regular',
  },
  imagePlaceholder: {
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
    width: '100%',
    height: 200,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
export default function AddProductScreen({ navigation }) {
  // const image = { uri: '../../assets/signin-screen/background.png' };
  const categories = useSelector((state) => state.category.categories);

  const options = ['داخل نابلس', 'خارج نابلس'];
  let picker;
  const [checked, setChecked] = useState('unchecked');
  const [productAvailability, setProductAvailability] = useState(true);
  const [image, setImage] = useState('');
  const [productName, setProductName] = useState('');
  const [isProductNameEditable, setProductNameEditable] = useState(true);

  const [productDesc, setProductDesc] = useState('');
  const [productCat, setProductCat] = useState('لحوم بقر');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');
  const isLoading = useSelector((state) => state.product.isLoading);

  const dispatch = useDispatch();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleSubmit = () => {
    if (
      productName !== '' &&
      // productDesc !== '' &&
      productCat !== '' &&
      price !== ''
    )
      dispatch(
        addProduct(
          {
            productName,
            productDesc,
            productCat,
            productAvailability,
            price,
            image,
          },
          navigation,
          categories
        )
      );
    else alert('كل الحقول اجبارية');
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
      <StatusBar backgroundColor={Colors.BACKGROUND} barStyle='light-conten' />
      <View style={styles.image}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <RightArrow />
        </TouchableOpacity>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={() => handleSubmit()}>
            <TickIcon />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 30,
              fontFamily: 'Tajawal-Medium',
              color: 'white',
            }}
          >
            إضافة منتج
          </Text>
        </View>
      </View>

      <ScrollView>
        <View
          style={{
            backgroundColor: Colors.MEDIUM_BACKGROUND_COLOR,
            flex: 1,
            padding: 16,
          }}
        >
          <TextInput
            style={styles.input}
            onChangeText={(txt) => setProductName(txt)}
            placeholder='اسم المنتج الجديد'
            editable={isProductNameEditable}
          />
          <MyCustomPicker
            setProductCat={setProductCat}
            categories={categories}
          />
          <TextInput
            onChangeText={(txt) => setProductDesc(txt)}
            style={styles.inputDesc}
            placeholder='الوصف'
          />
          {/* <Text
            style={{
              fontFamily: 'Tajawal-Medium',
              fontSize: 16,
              marginTop: 16,
            }}
          >
            القياس
          </Text> */}
          {/* <View style={styles.checkboxsContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontFamily: 'Tajawal-Medium', fontSize: 16 }}>
                لتر
              </Text>
              <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked(!checked);
                }}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontFamily: 'Tajawal-Medium', fontSize: 16 }}>
                لتر
              </Text>
              <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked(!checked);
                }}
              />
            </View>
          </View> */}
          <TextInput
            onChangeText={(txt) => setPrice(txt)}
            style={styles.input}
            placeholder='السعر'
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 16,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Switch
                trackColor={{ productAvailability: '#767577', true: '#22C993' }}
                thumbColor={productAvailability ? Colors.WHITE : '#f4f3f4'}
                ios_backgroundColor='#3e3e3e'
                onValueChange={(e) => setProductAvailability(e)}
                value={productAvailability}
              />
              <Text
                style={{
                  fontFamily: 'Tajawal-Medium',
                  fontSize: 16,
                  marginLeft: 8,
                  color: Colors.PLACEHOLDER,
                }}
              >
                متوفر
              </Text>
            </View>
            <Text style={{ fontFamily: 'Tajawal-Medium', fontSize: 16 }}>
              الحالة
            </Text>
          </View>

          <Text style={{ fontFamily: 'Tajawal-Medium', marginTop: 16 }}>
            اختر صورة
          </Text>

          <TouchableOpacity
            style={{ marginTop: 16 }}
            onPress={() => pickImage()}
          >
            {/* <Image
              source={{ uri: image }}
              style={{ flex: 1, height: 200 }}
            /> */}
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ flex: 1, height: 200, marginTop: 16 }}
              />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={{ fontFamily: 'Tajawal-Bold' }}>
                  انقر لإضافة صورة
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <LoadingModal visible={isLoading} />
          {/* <View style={{height: 100}}></View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export function MyCustomPicker({ navigation, setProductCat, categories }) {
  const options = [];

  for (let cIndex in categories) {
    options.push(categories[cIndex].category_name);
  }
  let picker;
  return (
    <CustomPicker
      ref={(el) => (picker = el)}
      options={options}
      value={'اختر التصنيف'}
      style={{ backgroundColor: Colors.WHITE, marginTop: 16, height: 40 }}
      // modalStyle={{borderRadius: 20, borderWidth: 1}}
      headerTemplate={(item) => (
        <View
          style={{
            backgroundColor: 'white',
            width: '100%',
            padding: 8,
            // justifyContent: 'center',
            // alignItems: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              borderBottomColor: Colors.BORDER_COLOR,
              borderBottomWidth: 1,
              paddingBottom: 12,
            }}
          >
            <Text style={{ fontFamily: 'Tajawal-Bold' }}>التصنيف</Text>
          </View>
        </View>
      )}
      // optionTemplate={({ item }) => (
      //   <TouchableOpacity
      //     onPress={() => setProductCat(item)}
      //     style={{ marginTop: 12, marginRight: 16 }}
      //   >
      //     <Text style={{ fontFamily: 'Tajawal-Regular' }}>{item}</Text>
      //   </TouchableOpacity>
      // )}
      fieldTemplate={(item) => (
        <View
          style={{
            padding: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Image source={DownArrow} />
          <Text
            style={{
              textAlign: 'right',
              fontFamily: 'Tajawal-Medium',
              color: 'black',
            }}
          >
            {item.selectedItem}
          </Text>
        </View>
      )}
      footerTemplate={() => (
        <View style={{ height: 20, backgroundColor: 'white' }}></View>
      )}
      onValueChange={(value) => {
        console.log(value);
        setProductCat(value);
      }}
    />
  );
}

export function LoadingModal({ title, visible, setVisible, setImage }) {
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
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size='large' />
          <Text style={{ marginTop: 32, fontFamily: 'Tajawal-Medium' }}>
            جار إضافة المنتج
          </Text>
        </View>
      </View>
    </Modal>
  );
}
