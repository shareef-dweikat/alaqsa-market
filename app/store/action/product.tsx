import firebase from '../../config/firebase';

const addProductAPI = async (product, url, catFirebaseId) => {
  return firebase
    .database()
    .ref(`category/${catFirebaseId}/products`)
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
        addProductAPI(product, url, catFirebaseId).then(() => {
          dispatch(fetchProducts());
          navigation.goBack();
          dispatch({
            type: 'PRODUCT_ADD_SUCCESS',
          });
        });
      }
    );
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

const fetchProductsAPI = async () => {
  return firebase
    .database()
    .ref('category')
    .once('value', function (snapshot) {
      console.log('adasdd', snapshot.val());
    })

    .catch((e) => console.log('addProductAPI', e));
};

export function fetchProducts() {
  return (dispatch) => {
    firebase
      .database()
      .ref('category')
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
        console.log(products, 'fetchProducts');
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
  console.log('productName', productName);
  const response = await fetch(uri);
  const blob = await response.blob();
  var ref = firebase.storage().ref(`/images/products`).child(productName);

  return ref.put(blob);
};

export function uploadProductImage(productName, uri) {
  return (dispatch) => {
    dispatch({
      type: 'IMAGE_UPLOAD',
    });
    // uploadProductImageAPI(productName, uri).then(async (snapshot) => {
    //   let x = await snapshot.ref.getDownloadURL();
    //   console.log('caads', x);
    //   dispatch({
    //     type: 'IMAGE_UPLOAD_SUCCESS',
    //     payload: x,
    //   });
    // });
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
        for (let index in categories) {
          for (let i in categories[index]['products']) {
            //  if(categories[index]['products'][i].product_name.search(text) != -1)
            products.push(categories[index]['products'][i]);
          }
        }
        // console.log(products, "fetchProducts")
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
        product_desc: product.product_desc,
        isVisible: product.isVisible,
        price: product.price,
        firebaseId: product.firebaseId,
      })
      .then((e) => {
        console.log(e.key, 'aaaaaaaaaaaaaaaaa');
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
        // console.log('adasdd', snapshot.val());
        let products = snapshot.val();
        let productsList = [];
        for (let index in products) {
          products[index].favId = index;
          productsList.push(products[index]);
        }
        console.log(productsList, 'doooom');
        dispatch({
          type: 'FETCH_FAV_SUCCESS',
          payload: productsList,
        });
      })
      .catch((e) => console.log('addProductAPI', e));
  };
};

export const deleteFav = async (product, phone) => {
  console.log(product, phone);
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
  uri
) => {
  return firebase
    .database()
    .ref(`category/${categoryFirebaseId}/products/${productFirebaseId}`)
    .update({ product_desc: desc, product_name: name, image: uri });
};
export function editProduct(
  productFirebaseId,
  categoryFirebaseId,
  name,
  desc,
  image
) {
  return (dispatch) => {
    dispatch({
      type: 'PRODUCT_EDITED',
    });
    console.log( productFirebaseId,
      categoryFirebaseId,
      name,
      desc, "pdadsdasd")
    uploadProductImageAPI(name, image).then(async (snapshot) => {
      let url = await snapshot.ref.getDownloadURL();
      editProductAPI(
        productFirebaseId,
        categoryFirebaseId,
        name,
        desc,
        url
      ).then(() => {
        // dispatch(fetchCategories());
        alert('تم التعديل');
        dispatch({
          type: 'PRODUCT_EDITED_SUCCESS',
          // payload: { name, desc },
        });
      });
    });
  };
}
