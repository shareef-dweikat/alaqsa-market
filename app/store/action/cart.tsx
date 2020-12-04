import firebase from '../../config/firebase';

const addProductToCartAPI = async ({
  product_name,
  product_desc,
  isVisible,
  price,
  image,
}) => {
  return firebase
    .database()
    .ref(`cart/`)
    .push({
      product_name: product_name,
      product_desc: product_desc,
      price: price,
      image: image,
    })
    .catch((e) => console.log('addProductToCartAPI', e));
};

export function addProductToCart(product) {
  // let catFirebaseId;
  // for(let index in categories) {
  //   if (categories[index].category_name === product.productCat )
  //      catFirebaseId = categories[index].firebaseId
  // }
  console.log('addProductToCartAPIsssssss')
  return (dispatch) => {
    dispatch({
      type: 'PRODUCT_ADD_TO_CART',
    });
    addProductToCartAPI(product).then(() => {
      console.log('addProductToCartAPI');
      //   // dispatch(fetchProducts());
        dispatch({
          type: 'PRODUCT_ADD_TO_CART_SUCCESS',
        });
    });
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
      .ref('cart/')
      .once('value', function (products) {
        let productsObject = products.val();
        let productsList = [];
        let totalPrice = 0;
        for (let productIndex in productsObject) {
          totalPrice =
            parseInt(productsObject[productIndex].price) + totalPrice;
          console.log(totalPrice, 'totalPricetotalPrice');

          productsObject[productIndex].firebaseId = productIndex;
          productsList.push(productsObject[productIndex]);
        }
        dispatch({
          type: 'FETCH_CART_PRODUCTS_SUCCESS',
          payload: { productsList, totalPrice },
        });
      });
  };
}

export function storeItemToDelete(firebaseId) {
  return (dispatch) => {
    console.log('storeItemToDelete', firebaseId);
    dispatch({
      type: 'STORE_ITEM_TO_DELETE',
      payload: firebaseId,
    });
  };
}

const deleteProductsAPI = async (itemToDelete) => {
  return firebase
    .database()
    .ref(`cart/${itemToDelete}`)
    .remove()

    .catch((e) => console.log('addProductAPI', e));
};

export function deleteCartItem(itemToDelete) {
  deleteProductsAPI(itemToDelete);
  return (dispatch) => {
    dispatch({
      type: 'DELETE_ITEM_SUCCESS',
      payload: [],
    });
  };
}

// export function searchAction(txt) {
//   console.log(txt)
//   return (dispatch) => {
//     dispatch({
//       type: 'SEARCH_CART_PRODUCTS',
//       text: txt
//     });
//   };
// }

