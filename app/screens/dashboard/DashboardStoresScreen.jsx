import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
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
import { SafeAreaView } from 'react-native-safe-area-context';
import DownArrow from '../../../assets/down-arrow-categories-dashboard.svg';
import { useDispatch, useSelector } from 'react-redux';
import FloatingICon from '../../../assets/floating-button-icon.svg';
import Colors from '../../constants/colors';
import { fetchCategories } from '../../store/action/category';
import {
  fetchStores,
  updateStore,
  editStore,
  deleteStore,
} from '../../store/action/store';

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    justifyContent: 'center',
    height: Dimensions.get('window').height * 0.3,
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
  title: {
    fontFamily: 'Tajawal-Medium',
    fontSize: 20,
    marginRight: 8,
    marginTop: 16,
    textAlign: 'right',
  },
});
const MySwitch = ({ name, isVisible, firebaseId, activeStore }) => {
  const [productAvailability, setProductAvailability] = useState(isVisible);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  // const isLoading = useSelector((state) => state.category.isLoading);
  const dispatch = useDispatch();

  const handleVisibilityChanged = (isVisible) => {
    setProductAvailability(isVisible);
    dispatch(updateStore(name, isVisible, firebaseId, activeStore));
  };
  const handleDelete = () => {
    setDeleteDialogVisible(false);
    dispatch(deleteStore(firebaseId, activeStore));
  };
  const handleEdit = (catName, catDesc, image) => {
    setEditModalVisible(false);
    dispatch(editStore(firebaseId, catName, catDesc, image, activeStore));
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
        handleEdit={handleEdit}
        name={name}
        setDeleteDialogVisible={setEditModalVisible}
      />
      {/* <LoadingModal
        visible={isLoading}
        // handleEdit={handleEdit}
        // name={name}
        // setDeleteDialogVisible={setEditModalVisible}
      /> */}
    </View>
  );
};

export function Card({ name, backgroundColor, color = 'black', onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: backgroundColor,
        height: 35,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        marginHorizontal: 4,
        paddingHorizontal: 4,
        marginBottom: 32,
      }}
    >
      <Text
        style={{ color: color, fontFamily: 'Tajawal-Medium', fontSize: 12 }}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
}
export default function DashboardStoresScreen({ navigation }) {
  const stores = useSelector((state) => state.store.stores);
  const [activeStore, setActiveStore] = useState('');
  const dispatch = useDispatch();
  const CONTENT = [];
  stores.map((cat, id) =>
    CONTENT.push({
      id,
      firebaseId: cat.firebaseId,
      categoryName: cat.store,
      isVisible: cat.isVisible,
      customItem: (
        <MySwitch
          arrayElementId={id}
          isVisible={cat.isVisible}
          name={cat.store}
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

  const handleSetStore = (id) => {
    dispatch(fetchCategories(id));
    setActiveStore(id);
  };
  const handleAddStore = () => {
      navigation.push('AddStoreScreen', { activeStore });
  };
  useEffect(() => {
    dispatch(fetchStores());
  }, []);

  return (
    <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <SafeAreaView forceInset={{ top: 'always' }}>
        <Text style={styles.title}>المتاجر</Text>
      </SafeAreaView>

      <ScrollView style={styles.container}>
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
      <TouchableOpacity onPress={handleAddStore} style={styles.fab}>
        <FloatingICon />
      </TouchableOpacity>
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
  handleEdit,
  setDeleteDialogVisible,
}) {
  const [catName, setCatName] = useState(name);
  // const [catDesc, setCatDesc] = useState(desc);
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
          {/* <TextInput
            onChangeText={(txt) => setCatDesc(txt)}
            value={catDesc}
            style={{ ...styles.input, height: 80, padding: 8 }}
            textAlignVertical='top'
            placeholder='الوصف'
          /> */}
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
              onPress={() => handleEdit(catName, image)}
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
