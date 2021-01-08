import firebase from '../../config/firebase';

export const fetchCategoriesAPI = async () => {
  let c;
  await firebase
    .database()
    .ref('category/')
    .once('value', async (categories) => {
      let catList = [];
      for (let x in categories.val()) {
        catList.push({ ...categories.val()[x], firebaseId: x });
      }
      c = catList;
    })
    .catch((e) => console.log('createCategoryAPI', e));

  return c;
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

const createCategoryAPI = async (name, desc, url) => {
  return firebase
    .database()
    .ref('category/')
    .push({
      category_name: name,
      category_desc: desc,
      isVisible: true,
      image: url,
    })
    .catch((e) => console.log('createCategoryAPI', e));
};

export function createCategory(name, desc, image, navigation) {
  return (dispatch) => {
    dispatch({
      type: 'CATEGORY_CREATE',
      // payload: TOKEN,
    });
    uploadCategoryImageAPI(name, image).then(async (snapshot) => {
      let url = await snapshot.ref.getDownloadURL();
      createCategoryAPI(name, desc, url).then(() => {
        dispatch(fetchCategories());
        navigation.goBack();
        dispatch({
          type: 'CATEGORY_CREATE_SUCCESS',
          // payload: TOKEN,
        });
      });
    });
  };
}

export function fetchCategories() {
  return (dispatch) => {
    fetchCategoriesAPI().then((categories) => {
      dispatch({
        type: 'CATEGORY_FETCH_SUCCESS',
        payload: categories,
      });
    });
  };
}

const updateCategoryAPI = async (name, desc, isVisible, firebaseId) => {
  console.log(name, desc, isVisible, firebaseId);
  return firebase
    .database()
    .ref(`category/${firebaseId}`)
    .update({
      category_name: name,
      category_desc: desc,
      isVisible: isVisible,
    })
    .catch((e) => console.log('createCategoryAPI', e));
};
export function updateCategory(name, desc, isVisible, firebaseId) {
  return (dispatch) => {
    updateCategoryAPI(name, desc, isVisible, firebaseId).then((TOKEN) => {
      dispatch({
        type: 'CATEGORY_UPDATED_SUCCESS',
        // payload: TOKEN,
      });
    });
  };
}

const deleteCategoryAPI = async (firebaseId) => {
  console.log(firebaseId);
  return firebase
    .database()
    .ref(`category/${firebaseId}`)
    .remove()

    .catch((e) => console.log('createCategoryAPI', e));
};
export function deleteCategory(firebaseId, arrayElementId) {
  return (dispatch) => {
    deleteCategoryAPI(firebaseId).then(() => {
      dispatch(fetchCategories());
      dispatch({
        type: 'CATEGORY_DELETED_SUCCESS',
        // payload: arrayElementId,
      });
    });
  };
}
const editCategoryAPI = async (firebaseId, name, desc, uri) => {
  if (uri)
    return firebase
      .database()
      .ref(`category/${firebaseId}`)
      .update({ category_desc: desc, category_name: name, image: uri });
  else
    return firebase
      .database()
      .ref(`category/${firebaseId}`)
      .update({ category_desc: desc, category_name: name });
};
export function editCategory(firebaseId, name, desc, image) {
  return (dispatch) => {
    dispatch({
      type: 'CATEGORY_EDITED',
    });
    uploadCategoryImageAPI(name, image).then(async (snapshot) => {
      let url = snapshot;
      if (url) {
        url = await snapshot.ref.getDownloadURL();
        editCategoryAPI(firebaseId, name, desc, url).then(() => {
          // dispatch(fetchCategories());
          alert('تم التعديل');
          dispatch({
            type: 'CATEGORY_EDITED_SUCCESS',
            payload: { name, desc },
          });
        });
      } else {
        editCategoryAPI(firebaseId, name, desc, url).then(() => {
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
