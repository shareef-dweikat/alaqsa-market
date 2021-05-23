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
  ActivityIndicator,
} from 'react-native';
import SIcon from '../../../assets/small-search-icon.svg';

import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import EditIcon from '../../../assets/edit.svg';
import * as ImagePicker from 'expo-image-picker';
import { Switch } from 'react-native-paper';
import DeleteIcon from '../../../assets/delete-icon-dashboard.svg';
import { deleteProduct } from '../../store/action/product';
import FloatingICon from '../../../assets/floating-button-icon.svg';
import Colors from '../../constants/colors';
import {
  editProduct,
  fetchProducts,
  editProductVisibility,
} from '../../store/action/product';
import { FlatList } from 'react-native-gesture-handler';
const styles = StyleSheet.create({
  container: {
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
    textAlign: 'right',
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
  const isLoading = useSelector((state) => state.product.isLoading);
  const [searchProducts, setSearchProducts] = useState([]);
  const width = Dimensions.get('window').width;

  const handleSearch = (text) => {
    let myProducts = [];
    for (let i in products) {
      if (products[i].product_name.search(text) == -1) {
      } else {
        myProducts.push(products[i]);
      }
    }

    setSearchProducts(myProducts);
  };
  let myRef = null;
  let myProducts = searchProducts;
  if (products.length >= 100 && searchProducts.length === 0) {
    myProducts = products.slice(0, 98);
  }
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
          <TextInput
            onChangeText={handleSearch}
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              borderColor: Colors.BORDER_COLOR,
              borderWidth: 1,
              width: width / 1.8,
              paddingHorizontal: 8,
              borderRadius: 10,
              height: 35,
            }}
          />
          {isLoading ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Tajawal-Medium',
                    fontSize: 12,
                    marginRight: 8,
                  }}
                >
                  جار إضافة منتج
                </Text>
                <ActivityIndicator color='red' />
              </View>

              <Text
                style={{
                  fontFamily: 'Tajawal-Medium',
                  fontSize: 20,
                  marginRight: 16,
                  textAlign: 'left',
                }}
              >
                المنتجات
              </Text>
            </View>
          ) : (
            <Text
              style={{
                fontFamily: 'Tajawal-Medium',
                fontSize: 20,
                marginRight: 8,
                textAlign: 'left',
              }}
            >
              المنتجات
            </Text>
          )}
        </View>
      </SafeAreaView>

      <FlatList
        data={myProducts}
        ListFooterComponent={() => (
          <>
            <View style={{ height: 200 }} />
            <View ref={(r) => (myRef = r)} />
          </>
        )}
        renderItem={({ item }) => (
          <VerticalItemCard
            key={item.productFirebaseId}
            products={products}
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
        )}
      />
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
  isVisible,
  products,
}) {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [av, setAv] = useState(isVisible);

  const showDeleteDialog = () => {
    setDeleteDialogVisible(!deleteDialogVisible);
  };
  const handleDelete = () => {
    setDeleteDialogVisible(false);
    dispatch(deleteProduct(catId, productFirebaseId));
  };
  const handleVisibleChange = () => {
    dispatch(editProductVisibility(productFirebaseId, catId, !av));
    setAv(!av);
  };
  const handleEdit = (catName, catDesc, image, productVisible, price) => {
    setEditModalVisible(false);
    dispatch(
      editProduct(
        productFirebaseId,
        catId,
        catName,
        catDesc,
        image,
        productVisible,
        price
      )
    );
  };
  useEffect(() => {
    setAv(isVisible);
  }, [isVisible]);
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
              onPress={() => {
                setEditModalVisible(true);
                // products.map((item, id) => {
                //   if (item.categoryFirebaseId == catId) {
                //     if (id >= products.length - 3) {
                //       // myRef.scrollTo()
                //     }
                //   }
                // });
              }}
            >
              <EditIcon />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => showDeleteDialog()}>
              <DeleteIcon />
            </TouchableOpacity>
            <Switch
              trackColor={{ false: '#767577', true: '#22C993' }}
              thumbColor={isVisible ? Colors.WHITE : '#f4f3f4'}
              ios_backgroundColor='#3e3e3e'
              onValueChange={(e) => handleVisibleChange()}
              value={av}
            />
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
          {!isVisible && (
            <Text
              style={{
                color: 'red',
                fontFamily: 'Tajawal-Regular',
                marginRight: 8,
              }}
            >
              غير متوفر
            </Text>
          )}
        </View>
      </View>

      <Image
        style={{ height: 100, width: 100, marginRight: 8, borderRadius: 10 }}
        source={{
          uri: image,
        }}
      />

      <EditModal
        name={name}
        price={price}
        desc={desc}
        handleEdit={handleEdit}
        setEditModalVisible={setEditModalVisible}
        visible={editModalVisible}
        isVisible={isVisible}
      />
      {/* <LoadingModal visible={isLoading} /> */}
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
  price,
  isVisible,
}) {
  const [catName, setCatName] = useState(name);
  const [catDesc, setCatDesc] = useState(desc);
  const [image, setImage] = useState('');
  const [myPrice, setMyPrice] = useState(price);
  const [productVisible, setProductVisible] = useState(isVisible);
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
            height: 380,
            padding: 16,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            {/* <TouchableOpacity
              onPress={() => setProductVisible(!productVisible)}
              style={{
                height: 25,
                width: 80,
                alignItems: 'center',
                borderRadius: 5,
                backgroundColor: productVisible ? '#22C993' : '#f4f3f4',
              }}
            >
              {productVisible ? (
                <Text style={{ fontFamily: 'Tajawal-Medium' }}>متوفر</Text>
              ) : (
                <Text style={{ fontFamily: 'Tajawal-Medium' }}>غير متوفر</Text>
              )}
            </TouchableOpacity> */}
            {/* <Text style={{ fontFamily: 'Tajawal-Medium', marginRight: 8 }}>
              التوافر:
            </Text>
            <Switch
              trackColor={{ false: '#767577', true: '#22C993' }}
              thumbColor={productVisible ? Colors.WHITE : '#f4f3f4'}
              ios_backgroundColor='#3e3e3e'
              onValueChange={(e) => setProductVisible(!productVisible)}
              value={productVisible}
            /> */}
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
          <TextInput
            onChangeText={(txt) => setMyPrice(txt)}
            value={myPrice}
            style={{ ...styles.input, height: 30 }}
            textAlignVertical='top'
            placeholder='السعر'
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
                handleEdit(catName, catDesc, image, productVisible, myPrice)
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
