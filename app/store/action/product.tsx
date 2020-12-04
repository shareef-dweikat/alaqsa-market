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
  for(let index in categories) {
    if (categories[index].category_name === product.productCat )
       catFirebaseId = categories[index].firebaseId
  }
  return (dispatch) => {
    dispatch({
      type: 'PRODUCT_ADD',
    });
    uploadProductImageAPI(product.productName, product.image).then(
      async (snapshot) => {
        let url = await snapshot.ref.getDownloadURL();
        addProductAPI(product, url, catFirebaseId).then(() => {
          dispatch(fetchProducts())
          navigation.goBack()
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
  return firebase.database().ref('category')
            .once('value', function(snapshot) {
                console.log("adasdd",snapshot.val())
  })
  
    .catch((e) => console.log('addProductAPI', e));
};

export function fetchProducts() {

  return (dispatch) => {
    
    firebase.database().ref('category')
    .once('value', function(snapshot) {
      let products = []
        let categories = snapshot.val()
        for(let index in categories) {
          
          for(let i in categories[index]['products']) {
            products.push(categories[index]['products'][i])
          }
        }
        console.log(products, "fetchProducts")
        dispatch({
          type: 'FETCH_PRODUCTS',
          payload: products
        });
})
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
    
    firebase.database().ref('category')
    .once('value', function(snapshot) {
      let products = []
        let categories = snapshot.val()
        for(let index in categories) {
          
          for(let i in categories[index]['products']) {
          //  if(categories[index]['products'][i].product_name.search(text) != -1)
                products.push(categories[index]['products'][i])
          }
        }
        // console.log(products, "fetchProducts")
        dispatch({
          type: 'FETCH_PRODUCTS_SEARCH',
          payload: products
        });
})
  
  };
}


const setFav = async (product, catFirebaseId) => {

  console.log(product, catFirebaseId)
  // return firebase
  //   .database()
  //   .ref(`category/${catFirebaseId}/products`)
  //   .set({
  //     product_name: product.productName,
  //     product_desc: product.productDesc,
  //     isVisible: product.productAvailability,
  //     price: product.price,
  //   })
  //   .catch((e) => console.log('addProductAPI', e));
};

const deleteFav = async (product, catFirebaseId) => {

  console.log(product, catFirebaseId)
  // return firebase
  //   .database()
  //   .ref(`category/${catFirebaseId}/products`)
  //   .set({
  //     product_name: product.productName,
  //     product_desc: product.productDesc,
  //     isVisible: product.productAvailability,
  //     price: product.price,
  //   })
  //   .catch((e) => console.log('addProductAPI', e));
};