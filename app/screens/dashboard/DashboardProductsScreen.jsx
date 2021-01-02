import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  Modal,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import EditIcon from '../../../assets/edit.svg';
import * as ImagePicker from 'expo-image-picker';
import { Switch } from 'react-native-paper';
import DeleteIcon from '../../../assets/delete-icon-dashboard.svg';
import { deleteProduct } from '../../store/action/product';
import DrawerIcon from '../../../assets/drawer-icon.svg';
import FloatingICon from '../../../assets/floating-button-icon.svg';
import BellIcon from '../../../assets/dashboard-drawer/bell.svg';
import SIcon from '../../../assets/small-search-icon.svg';
import Colors from '../../constants/colors';
import { editProduct, fetchProducts } from '../../store/action/product';
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 16,
  },
  image: {
    // flex: 1,
    // resizeMode: 'cover',
    justifyContent: 'center',
    height: Dimensions.get('window').height * 0.3,
    // width: Dimensions.get('window').width,
  },
  screenContentContainer: {
    padding: 16,
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    left: 20,
    bottom: 20,
    backgroundColor: Colors.GOLDEN,
    borderRadius: 30,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 40,
    color: 'white',
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
  input: {
    width: '100%',
    borderColor: Colors.BORDER_COLOR,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 8,
    paddingHorizontal: 8,
    height: 40,
    fontFamily: 'Tajawal-Regular',
  },
});
export default function DashboardHome({ navigation }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <SafeAreaView forceInset={{ top: 'always' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 16,
          }}
        >
          <View
            style={{
              marginHorizontal: 8,
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
            }}
          >
            <BellIcon color={Colors.INACTIVE_VIEW_TAP} />
            <View
              style={{
                position: 'relative',
                bottom: 10,
                right: 10,
                backgroundColor: Colors.GOLDEN,
                width: 25,
                height: 25,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: Colors.WHITE,
                borderWidth: 2,
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Tajawal-Medium',
                  fontSize: 15,
                }}
              >
                2
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                fontFamily: 'Tajawal-Medium',
                fontSize: 20,
                marginRight: 8,
              }}
            >
              المنتجات
            </Text>
            {/* <TouchableOpacity
              // style={{ marginLeft: 8, flex: 1 }}
              onPress={() => navigation.toggleDrawer()}
            >
              <DrawerIcon />
            </TouchableOpacity> */}
          </View>
        </View>
      </SafeAreaView>

      <ScrollView style={styles.container}>
        {products.map((item) => (
          <VerticalItemCard
            productFirebaseId={item.productFirebaseId}
            catId={item.categoryFirebaseId}
            name={item.product_name}
            category={item.category_name}
            price={item.price}
            desc={item.product_desc}
            isFav={item.isFav}
            image={item.image}
            isVisible={item.isVisible}
            navigation={navigation}
          />
        ))}
        <View style={{ height: 100 }}></View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.push('AddProductScreen')}
        style={styles.fab}
      >
        <FloatingICon />
      </TouchableOpacity>
      {/* <Button title="Alert" onPress={()=>navigation.push('Alert')}/> */}
    </View>
  );
}

function VerticalItemCard({
  name,
  price,
  desc,
  category,
  productFirebaseId,
  image,
  catId,
  navigation,
}) {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.product.isLoading);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const showDeleteDialog = () => {
    setDeleteDialogVisible(!deleteDialogVisible);
  };
  const handleDelete = () => {
    setDeleteDialogVisible(false);
    console.log(catId, productFirebaseId, "firebaseIdddd")
     dispatch(deleteProduct(catId, productFirebaseId));
  };
  const handleEdit = (catName, catDesc, image, productVisible) => {
    setEditModalVisible(false);
    dispatch(
      editProduct(
        productFirebaseId,
        catId,
        catName,
        catDesc,
        image,
        productVisible
      )
    );
  };
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.push('DashboardItemDetailsScreen', {
          image,
          name,
          desc,
          category,
        })
      }
      style={{
        height: 120,
        borderWidth: 1,
        borderColor: '#d0d0d0',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingTop: 13,
        marginTop: 16,
        flexDirection: 'row',
      }}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-between',
            //  width: '100%',
            paddingHorizontal: 16,
            marginTop: 8,
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{ marginRight: 8 }}
              onPress={() => setEditModalVisible(true)}
            >
              <EditIcon />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => showDeleteDialog()}>
              <DeleteIcon />
            </TouchableOpacity>
          </View>
          <View />
          <Text style={{ textAlign: 'right', fontFamily: 'Tajawal-Medium' }}>
            {name}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            width: '100%',
            paddingHorizontal: 16,
          }}
        >
          <Text
            style={{
              color: '#B8B8CD',
              fontFamily: 'Tajawal-Regular',
              height: 50,
            }}
          >
            {desc}
          </Text>
        </View>
        <Text
          style={{
            textAlign: 'left',
            fontFamily: 'Tajawal-Bold',
            color: '#515462',
            marginLeft: 16,
          }}
        >
          {price} شيكل
        </Text>
      </View>
      <Image
        style={{ height: 100, width: 100, marginRight: 8, borderRadius: 10 }}
        source={{
          uri: image,
        }}
      />
      <EditModal
        name={name}
        desc={desc}
        handleEdit={handleEdit}
        setEditModalVisible={setEditModalVisible}
        visible={editModalVisible}
      />
      <LoadingModal visible={isLoading} />
      <DeleteConfirmation
        visible={deleteDialogVisible}
        handleDelete={handleDelete}
        name={name}
        setDeleteDialogVisible={setDeleteDialogVisible}
      />
    </TouchableOpacity>
  );
}
export function EditModal({
  name,
  visible,
  desc,
  handleEdit,
  setEditModalVisible,
}) {
  const [catName, setCatName] = useState(name);
  const [catDesc, setCatDesc] = useState(desc);
  const [image, setImage] = useState('');
  const [productVisible, setProductVisible] = useState(true);
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
  return (
    <Modal visible={visible}>
      <TouchableOpacity
        onPress={() => setEditModalVisible(false)}
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
            alignItems: 'flex-end',
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: 'Tajawal-Medium', marginRight: 8 }}>
              التوافر
            </Text>
            <Switch
              trackColor={{ false: '#767577', true: '#22C993' }}
              thumbColor={visible ? Colors.WHITE : '#f4f3f4'}
              ios_backgroundColor='#3e3e3e'
              onValueChange={(e) => setProductVisible(!productVisible)}
              value={productVisible}
            />
          </View>
          <TextInput
            onChangeText={(txt) => setCatName(txt)}
            value={catName}
            style={styles.input}
            placeholder='اسم التصنيف'
          />
          <TextInput
            onChangeText={(txt) => setCatDesc(txt)}
            value={catDesc}
            style={{ ...styles.input, height: 80, padding: 8 }}
            textAlignVertical='top'
            placeholder='الوصف'
          />

          <TouchableOpacity
            onPress={() => pickImage()}
            style={{
              borderColor: Colors.BORDER_COLOR,
              borderWidth: 1,
              padding: 8,
              marginTop: 8,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontFamily: 'Tajawal-Medium' }}>اختر صورة</Text>
          </TouchableOpacity>
          <View style={{ width: '100%' }}>
            <TouchableOpacity
              onPress={() =>
                handleEdit(catName, catDesc, image, productVisible)
              }
              style={styles.btn}
            >
              <Text style={styles.btnTxt}>حفظ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

export function LoadingModal({ visible }) {
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
          <ActivityIndicator color={Colors.GOLDEN} size='large' />
          <Text style={{ marginTop: 32, fontFamily: 'Tajawal-Medium' }}>
            جار تعديل المنتج
          </Text>
        </View>
      </View>
    </Modal>
  );
}

export function DeleteConfirmation({
  name,
  visible,
  handleDelete,
  setDeleteDialogVisible,
}) {
  return (
    <Modal visible={visible}>
      <TouchableOpacity
        onPress={() => setDeleteDialogVisible(false)}
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
          <DeleteIcon />
          <Text
            style={{
              marginTop: 8,
              fontFamily: 'Tajawal-Bold',
              fontSize: 20,
              textAlign: 'center',
            }}
          >
            هل انت متأكد من حذف تصنيف {name}؟ كل منتجات التصنيف ستضيع
          </Text>

          <View style={{ width: '100%' }}>
            <TouchableOpacity onPress={() => handleDelete()} style={styles.btn}>
              <Text style={styles.btnTxt}>تأكيد الحذف</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
