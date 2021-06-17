import firebase from '../../config/firebase';

export const fetchCategoriesAPI = async (storeId) => {
  let c;
  await firebase
    .database()
    .ref(`category/${storeId}`)
    .once('value', async (categories) => {
      let catList = [];
      for (let x in categories.val()) {
        catList.push({ ...categories.val()[x], firebaseId: x });
      }
      c = catList;
    })
    .catch((e) => console.log('createCategoryAPI', e));
    console.log(c, "cattttt")
  return c;
};

export const fetchStoresAPI = async () => {
  let s;
  await firebase
    .database()
    .ref('stores/')
    .once('value', async (stores) => {
      let storesList = [];
      for (let x in stores.val()) {
        storesList.push({ ...stores.val()[x], firebaseId: x });
      }
      s = storesList;
    })
    .catch((e) => console.log('fetchStoresAPI', e));
;
  return s;
};
const uploadCategoryImageAPI = async (categoryName, uri) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref(`/images/categories`).child(categoryName);

    return ref.put(blob);
  } catch (error) {
    return null;
  }
};

const createCategoryAPI = async (name, desc, url, activeStore) => {
  return firebase
    .database()
    .ref(`category/${activeStore}`)
    .push({
      category_name: name,
      category_desc: desc,
      isVisible: true,
      image: url,
    })
    .catch((e) => console.log('createCategoryAPI', e));
};

export function createCategory(name, desc, image, navigation, activeStore) {
  return (dispatch) => {
    dispatch({
      type: 'CATEGORY_CREATE',
      // payload: TOKEN,
    });
    uploadCategoryImageAPI(name, image).then(async (snapshot) => {
      let url = await snapshot.ref.getDownloadURL();
      createCategoryAPI(name, desc, url, activeStore).then(() => {
        dispatch(fetchCategories(activeStore));
        navigation.goBack();
        dispatch({
          type: 'CATEGORY_CREATE_SUCCESS',
        });
      });
    });
  };
}

export function fetchCategories(storeId) {
  return (dispatch) => {
    fetchCategoriesAPI(storeId).then((categories) => {
      dispatch({
        type: 'CATEGORY_FETCH_SUCCESS',
        payload: categories,
      });
    });
  };
}
export function fetchStores() {
  return (dispatch) => {
    fetchStoresAPI().then((stores) => {
      dispatch({
        type: 'STORES_FETCH_SUCCESS',
        payload: stores,
      });
    });
  };
}
const updateCategoryAPI = async (name, desc, isVisible, firebaseId, activeStore) => {
  console.log(activeStore, "ddddd")
  return firebase
    .database()
    .ref(`category/${activeStore}/${firebaseId}`)
    .update({
      category_name: name,
      category_desc: desc,
      isVisible: isVisible,
    })
    .catch((e) => console.log('createCategoryAPI', e));
};
export function updateCategory(name, desc, isVisible, firebaseId, activeStore) {
  return (dispatch) => {
    updateCategoryAPI(name, desc, isVisible, firebaseId, activeStore).then((TOKEN) => {
      dispatch({
        type: 'CATEGORY_UPDATED_SUCCESS',
        // payload: TOKEN,
      });
    });
  };
}

const deleteCategoryAPI = async (firebaseId, activeStore) => {
  return firebase
    .database()
    .ref(`category/${activeStore}/${firebaseId}`)
    .remove()
    .catch((e) => console.log('deleteCategoryAPI', e));
};
export function deleteCategory(firebaseId, activeStore) {
  return (dispatch) => {
    deleteCategoryAPI(firebaseId, activeStore).then(() => {
      dispatch(fetchCategories(activeStore));
      dispatch({
        type: 'CATEGORY_DELETED_SUCCESS',
      });
    });
  };
}
const editCategoryAPI = async (firebaseId, name, desc, uri, activeStore) => {
  if (uri)
    return firebase
      .database()
      .ref(`category/${activeStore}/${firebaseId}`)
      .update({ category_desc: desc, category_name: name, image: uri });
  else
    return firebase
      .database()
      .ref(`category/${activeStore}/${firebaseId}`)
      .update({ category_desc: desc, category_name: name });
};
export function editCategory(firebaseId, name, desc, image, activeStore) {
  return (dispatch) => {
    dispatch({
      type: 'CATEGORY_EDITED',
    });
    uploadCategoryImageAPI(name, image).then(async (snapshot) => {
      let url = snapshot;
      if (url) {
        url = await snapshot.ref.getDownloadURL();
        editCategoryAPI(firebaseId, name, desc, url, activeStore).then(() => {
          // dispatch(fetchCategories());
          alert('تم التعديل');
          dispatch({
            type: 'CATEGORY_EDITED_SUCCESS',
            payload: { name, desc },
          });
        });
      } else {
        editCategoryAPI(firebaseId, name, desc, url, activeStore).then(() => {
          // dispatch(fetchCategories());
          alert('تم التعديل');
          dispatch({
            type: 'CATEGORY_EDITED_SUCCESS',
            payload: { name, desc },
          });
        });
      }
    });
  };
}
