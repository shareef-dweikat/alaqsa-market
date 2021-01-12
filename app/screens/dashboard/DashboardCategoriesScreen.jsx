import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  Modal,
  TextInput,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Switch } from 'react-native-paper';
import EditIcon from '../../../assets/edit.svg';
import DeleteIcon from '../../../assets/delete-icon-dashboard.svg';
import { ExpandableListView } from 'react-native-expandable-listview';
import * as ImagePicker from 'expo-image-picker';

import { SafeAreaView } from 'react-navigation';
import pImage from '../../../assets/home/product.png';
import HeartIcon from '../../../assets/small-heart-icon.svg';
import DownArrow from '../../../assets/down-arrow-categories-dashboard.svg';
import UpArrow from '../../../assets/up-arrow-categories-dashboard.svg';
import { useDispatch, useSelector } from 'react-redux';
import Tick from '../../../assets/tick-confirmation.svg';

import DrawerIcon from '../../../assets/drawer-icon.svg';
import FloatingICon from '../../../assets/floating-button-icon.svg';
import BellIcon from '../../../assets/dashboard-drawer/bell.svg';
import Colors from '../../constants/colors';
import {
  fetchCategories,
  updateCategory,
  deleteCategory,
  editCategory,
} from '../../store/action/category';

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
const MySwitch = ({ name, desc, isVisible, firebaseId, arrayElementId }) => {
  console.log('arrayElementId', arrayElementId);
  const [productAvailability, setProductAvailability] = useState(isVisible);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const isLoading = useSelector((state) => state.category.isLoading);

  const dispatch = useDispatch();

  const handleVisibilityChanged = (isVisible) => {
    setProductAvailability(isVisible);
    dispatch(updateCategory(name, desc, isVisible, firebaseId));
  };
  const handleDelete = () => {
    setDeleteDialogVisible(false);
    dispatch(deleteCategory(firebaseId, arrayElementId));
  };
  const handleEdit = (catName, catDesc, image) => {
    setEditModalVisible(false);
    dispatch(editCategory(firebaseId, catName, catDesc, image));
  };
  const showDeleteDialog = () => {
    setDeleteDialogVisible(!deleteDialogVisible);
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => showDeleteDialog()}>
          <DeleteIcon style={{ marginRight: 16 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setEditModalVisible(true)}>
          <EditIcon style={{ marginRight: 8 }} />
        </TouchableOpacity>
        <Switch
          trackColor={{ false: '#767577', true: '#22C993' }}
          thumbColor={productAvailability ? Colors.WHITE : '#f4f3f4'}
          ios_backgroundColor='#3e3e3e'
          onValueChange={(e) => handleVisibilityChanged(e)}
          value={productAvailability}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <DownArrow />
        <Text style={{ fontFamily: 'Tajawal-Bold' }}>{name}</Text>
      </View>
      <DeleteConfirmation
        visible={deleteDialogVisible}
        handleDelete={handleDelete}
        name={name}
        setDeleteDialogVisible={setDeleteDialogVisible}
      />
      <EditModal
        visible={editModalVisible}
        desc={desc}
        handleEdit={handleEdit}
        name={name}
        setDeleteDialogVisible={setEditModalVisible}
      />
      <LoadingModal
        visible={isLoading}
        // handleEdit={handleEdit}
        // name={name}
        // setDeleteDialogVisible={setEditModalVisible}
      />
    </View>
  );
};

export default function DashboardCategoriesScreen({ navigation }) {
  const categories = useSelector((state) => state.category.categories);

  const dispatch = useDispatch();
  const CONTENT = [];
  categories.map((cat, id) =>
    CONTENT.push({
      id,
      firebaseId: cat.firebaseId,
      categoryName: cat.category_name,
      isVisible: cat.isVisible,
      customItem: (
        <MySwitch
          arrayElementId={id}
          isVisible={cat.isVisible}
          name={cat.category_name}
          desc={cat.category_desc}
          firebaseId={cat.firebaseId}
        />
      ),
      subCategory: [
        {
          id: '1',
          name: cat.category_desc,
        },
      ],
    })
  );
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  return (
    <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
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
            {/* <BellIcon color={Colors.INACTIVE_VIEW_TAP} /> */}
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
              التصنيفات
            </Text>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView style={styles.container}>
        {/* <VerticalItemCard /> */}
        <ExpandableListView
          data={CONTENT} // required
          itemContainerStyle={{
            justifyContent: 'flex-end',
            backgroundColor: Colors.WHITE,
          }}
          innerItemLabelStyle={{ fontFamily: 'Tajawal-Medium' }}
        />
        <View style={{ height: 120 }}></View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.push('AddCategoryScreen')}
        style={styles.fab}
      >
        <FloatingICon />
      </TouchableOpacity>
      {/* <Button title="Alert" onPress={()=>navigation.push('Alert')}/> */}
    </View>
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

export function EditModal({
  name,
  visible,
  desc,
  handleEdit,
  setDeleteDialogVisible,
}) {
  const [catName, setCatName] = useState(name);
  const [catDesc, setCatDesc] = useState(desc);
  const [image, setImage] = useState('');

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
              onPress={() => handleEdit(catName, catDesc, image)}
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
  console.log(visible, 'pvvvvvvv');
  return (
    <Modal visible={visible}>
      <View
        // style={{
        //   height: '100%',
        //   justifyContent: 'center',
        //   alignItems: 'center',
        //   backgroundColor: 'rgba(0,0,0,0.5)',
        // }}
      >
        {/* <View
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
            جار تعديل التصنيف
          </Text>
        </View> */}
      </View>
    </Modal>
  );
}
