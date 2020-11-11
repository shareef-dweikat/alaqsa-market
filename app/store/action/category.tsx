import firebase from '../../config/firebase';

export const fetchCategoriesAPI = async () => {
  let c;
  await firebase
    .database()
    .ref('category/')
    .once('value', async (categories) => {
      let catList= []
      for(let x in categories.val()) {
        catList.push({...categories.val()[x], firebaseId: x})
      }
      c = catList
    })
    .catch((e) => console.log('createCategoryAPI', e));

    return c
  ;
};

const createCategoryAPI = async (name, desc) => {
  return firebase
    .database()
    .ref('category/')
    .push({
      category_name: name,
      category_desc: desc,
      isVisible: true,
    })
    .catch((e) => console.log('createCategoryAPI', e));
};

export function createCategory(name, desc) {
  return (dispatch) => {
    createCategoryAPI(name, desc).then((TOKEN) => {
      dispatch({
        type: 'CATEGORY_CREATE_SUCCESS',
        // payload: TOKEN,
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
  console.log(name, desc, isVisible, firebaseId)
  return firebase
    .database()
    .ref(`category/${firebaseId}`)
    .set({
      category_name: name,
      category_desc: desc,
      isVisible: isVisible,
    })
    .catch((e) => console.log('createCategoryAPI', e));
};
export function updateCategory(name, desc, isVisible,firebaseId) {
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
  console.log(firebaseId)
  // return firebase
  //   .database()
  //   .ref(`category/${firebaseId}`).remove()
    
  //   .catch((e) => console.log('createCategoryAPI', e));
};
export function deleteCategory(firebaseId, arrayElementId) {
  console.log("adadsa",arrayElementId)
  return (dispatch) => {
    deleteCategoryAPI(firebaseId).then(() => {
      dispatch({
        type: 'CATEGORY_DELETED_SUCCESS',
        payload: arrayElementId,
      });
    });
  };
}