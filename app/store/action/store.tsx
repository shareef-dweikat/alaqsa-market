import firebase from '../../config/firebase';


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
  // let data = await fetch('https://alaqsa-a64da-default-rtdb.firebaseio.com/category/.json?shallow=true')
  // data = await data.json()
  // console.log(data, "sssss")
  // // .then(data => console.log(data));
  return s;
};
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

const createStoreAPI = async (name,  url) => {
  return firebase
    .database()
    .ref('stores/')
    .push({
      store: name,
      isVisible: true,
      img: url,
    })
    .catch((e) => console.log('createCategoryAPI', e));
};

export function createStore(name, image, navigation) {
  return (dispatch) => {
    dispatch({
      type: 'CATEGORY_CREATE',
      // payload: TOKEN,
    });
    uploadCategoryImageAPI(name, image).then(async (snapshot) => {
      let url = await snapshot.ref.getDownloadURL();
      createStoreAPI(name, url).then(() => {
        dispatch(fetchStores());
        navigation.goBack();
        dispatch({
          type: 'CATEGORY_CREATE_SUCCESS',
          // payload: TOKEN,
        });
      });
    });
  };
}
const updateStoreAPI = async (name, isVisible, firebaseId) => {
  return firebase
    .database()
    .ref(`stores/${firebaseId}`)
    .update({
      store: name,
      isVisible: isVisible,
    })
    .catch((e) => console.log('updateStoreAPI', e));
};
export function updateStore(name, isVisible, firebaseId) {
  return (dispatch) => {
    updateStoreAPI(name, isVisible, firebaseId).then((TOKEN) => {
      dispatch({
        type: 'STORE_UPDATED_SUCCESS',
      });
    });
  };
}
const deleteStoreAPI = async (firebaseId) => {
  return firebase
    .database()
    .ref(`stores/${firebaseId}`)
    .remove()

    .catch((e) => console.log('deleteStoreAPI', e));
};
export function deleteStore(firebaseId) {
  return (dispatch) => {
    deleteStoreAPI(firebaseId).then(() => {
      dispatch(fetchStores());
      dispatch({
        type: 'STORE_DELETED_SUCCESS',
        // payload: arrayElementId,
      });
    });
  };
}
const editStoreAPI = async (firebaseId, name, uri) => {
  if (uri)
    return firebase
      .database()
      .ref(`stores/${firebaseId}`)
      .update({  store: name, img: uri });
  else
    return firebase
      .database()
      .ref(`stores/${firebaseId}`)
      .update({  store: name });
};
export function editStore(firebaseId, name, image) {
  return (dispatch) => {
    dispatch({
      type: 'STORE_EDITED',
    });
    uploadCategoryImageAPI(name, image).then(async (snapshot) => {
      let url = snapshot;
      if (url) {
        url = await snapshot.ref.getDownloadURL();
        editStoreAPI(firebaseId, name,  url).then(() => {
          // dispatch(fetchCategories());
          alert('تم التعديل');
          dispatch({
            type: 'STORE_EDITED_SUCCESS',
            payload: { name },
          });
        });
      } else {
        editStoreAPI(firebaseId, name, url).then(() => {
          // dispatch(fetchCategories());
          alert('تم التعديل');
          dispatch({
            type: 'CATEGORY_EDITED_SUCCESS',
            payload: { name },
          });
        });
      }
    });
  };
}
