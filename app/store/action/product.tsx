import firebase from '../../config/firebase';

const addProductAPI = async (product, url, catFirebaseId, activeStore) => {
  return firebase
    .database()
    .ref(`category/${activeStore}/${catFirebaseId}/products`)
    .push({
      product_name: product.productName,
      product_desc: product.productDesc,
      isVisible: product.productAvailability,
      price: product.price,
      image: url,
    })
    .catch((e) => console.log('addProductAPI', e));
};

export function addProduct(product, navigation, categories) {
  let catFirebaseId;
  for (let index in categories) {
    if (categories[index].category_name === product.productCat)
      catFirebaseId = categories[index].firebaseId;
  }
  return (dispatch) => {
    dispatch({
      type: 'PRODUCT_ADD',
    });
    uploadProductImageAPI(product.productName, product.image).then(
      async (snapshot) => {
        let url = await snapshot.ref.getDownloadURL();
        addProductAPI(product, url, catFirebaseId, product.activeStore).then(
          () => {
            dispatch(fetchProducts(product.activeStore));
            // navigation.goBack();
            alert('تم الإضافة بنجاح');
            dispatch({
              type: 'PRODUCT_ADD_SUCCESS',
            });
          }
        );
      }
    );
  };
}

const fetchProductsAPI = async () => {
  return firebase
    .database()
    .ref('category')
    .once('value', function (snapshot) {
      console.log('adasdd', snapshot.val());
    })

    .catch((e) => console.log('addProductAPI', e));
};

export function fetchProducts(storeId) {
  return (dispatch) => {
    firebase
      .database()
      .ref(`category/${storeId}`)
      .once('value', function (snapshot) {
        let products = [];
        let categories = snapshot.val();
        for (let index in categories) {
          for (let i in categories[index]['products']) {
            products.push({
              ...categories[index]['products'][i],
              productFirebaseId: i,
              category_name: categories[index].category_name,
              categoryFirebaseId: index,
            });
          }
        }
        dispatch({
          type: 'FETCH_PRODUCTS',
          payload: products,
        });
      });
    // dispatch({
    //   type: 'IMAGE_UPLOAD_SUCCESS',
    //   payload: x,
    // });
    // dispatch({
    //   type: 'SIGNUP_SUCCESS',
    //   // payload: TOKEN,
    // });
  };
}

const uploadProductImageAPI = async (productName, uri) => {
  try {
    const response = await fetch(uri);

    const blob = await response.blob();
    var ref = firebase.storage().ref(`/images/products`).child(productName);

    return ref.put(blob);
  } catch (error) {
    return null;
  }
};

export function uploadProductImage(productName, uri) {
  return (dispatch) => {
    dispatch({
      type: 'IMAGE_UPLOAD',
    });
  };
}

export function fetchSearchProducts(text) {
  return (dispatch) => {
    firebase
      .database()
      .ref('category')
      .once('value', function (snapshot) {
        let products = [];
        let categories = snapshot.val();
        for (let indexStore in categories) {
          const stores = categories[indexStore];
          for (let index in stores) {
            for (let i in stores[index]['products']) {
              //  if(categories[index]['products'][i].product_name.search(text) != -1)
              products.push(stores[index]['products'][i]);
            }
          }
        }
        dispatch({
          type: 'FETCH_PRODUCTS_SEARCH',
          payload: products,
        });
      });
  };
}

export const storeFavIdToProduct = (key, phone) => {
  firebase
    .database()
    .ref(`category/${phone}/${key}`)
    .set({ favFirebase: key })

    .catch((e) => console.log('addProductAPI', e));
};
export const setFav = (product, phone) => {
  return (dispatch) => {
    firebase
      .database()
      .ref(`fav/${phone}/`)
      .push({
        product_name: product.product_name,
        image: product.image,
        product_desc: product.product_desc,
        isVisible: product.isVisible,
        price: product.price,
        firebaseId: product.firebaseId,
      })
      .then((e) => {
        // storeFavIdToProduct(e.key, phone)
        dispatch({
          type: 'FAV_ADDED',
          // payload: products,
        });
      })
      .catch((e) => console.log('addProductAPI', e));
  };
};

export const fetchFav = (phone) => {
  return (dispatch) => {
    firebase
      .database()
      .ref(`fav/${phone}/`)
      .once('value', function (snapshot) {
        let products = snapshot.val();
        let productsList = [];
        for (let index in products) {
          products[index].favId = index;
          productsList.push(products[index]);
        }
        dispatch({
          type: 'FETCH_FAV_SUCCESS',
          payload: productsList,
        });
      })
      .catch((e) => console.log('addProductAPI', e));
  };
};

export const deleteFav = async (product, phone) => {
  return firebase
    .database()
    .ref(`fav/${phone}/${product.favId}`)
    .remove()
    .catch((e) => console.log('deleteFav', e));
};

const editProductAPI = async (
  productFirebaseId,
  categoryFirebaseId,
  name,
  desc,
  uri,
  productVisible,
  price,
  activeStore
) => {
  if (uri)
    return firebase
      .database()
      .ref(
        `category/${activeStore}/${categoryFirebaseId}/products/${productFirebaseId}`
      )
      .update({
        product_desc: desc,
        product_name: name,
        image: uri,
        isVisible: productVisible,
        price,
      });
  else
    return firebase
      .database()
      .ref(
        `category/${activeStore}/${categoryFirebaseId}/products/${productFirebaseId}`
      )
      .update({
        product_desc: desc,
        product_name: name,
        isVisible: productVisible,
        price,
      });
};
export function editProduct(
  productFirebaseId,
  categoryFirebaseId,
  name,
  desc,
  image,
  productVisible,
  price,
  activeStore
) {
  return (dispatch) => {
    dispatch({
      type: 'PRODUCT_EDITED',
    });

    uploadProductImageAPI(name, image).then(async (snapshot) => {
      let url = snapshot;
      if (url) {
        url = await snapshot.ref.getDownloadURL();
        editProductAPI(
          productFirebaseId,
          categoryFirebaseId,
          name,
          desc,
          url,
          productVisible,
          price,
          activeStore
        ).then(() => {
          // dispatch(fetchCategories());
          alert('تم التعديل');
          dispatch({
            type: 'PRODUCT_EDITED_SUCCESS',
            // payload: { name, desc },
          });
        });
      } else {
        editProductAPI(
          productFirebaseId,
          categoryFirebaseId,
          name,
          desc,
          url,
          productVisible,
          price,
          activeStore
        ).then(() => {
          // dispatch(fetchCategories());
          alert('تم التعديل');
          dispatch({
            type: 'PRODUCT_EDITED_SUCCESS',
            // payload: { name, desc },
          });
        });
      }
    });
  };
}

const deleteProductAPI = async (catFirebaseId, firebaseId, activeStore) => {
  return firebase
    .database()
    .ref(`category/${activeStore}/${catFirebaseId}/products/${firebaseId}`)
    .remove()
    .catch((e) => console.log('deleteProductAPI', e));
};
export function deleteProduct(catFirebaseId, firebaseId, activeStore) {
  return (dispatch) => {
    deleteProductAPI(catFirebaseId, firebaseId, activeStore).then(() => {
      dispatch(fetchProducts(activeStore));
      dispatch({
        type: 'PRODUCT_DELETED_SUCCESS',
        // payload: arrayElementId,
      });
    });
  };
}

export function editProductVisibility(
  productFirebaseId,
  categoryFirebaseId,
  productVisible,
  activeStore
) {
  return (dispatch) => {
    dispatch({
      type: 'PRODUCT_VISIBLE_EDITED',
    });
    firebase
      .database()
      .ref(
        `category/${activeStore}/${categoryFirebaseId}/products/${productFirebaseId}`
      )
      .update({
        isVisible: productVisible,
      })
      .then(() => alert('تم التعديل'))
      .catch((e) => console.log(e, 'error'));
  };
}
