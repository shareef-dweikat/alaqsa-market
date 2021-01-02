import firebase from '../../config/firebase';
import moment from 'moment'
const addProductToCartAPI = async (
  { product_name, product_desc, isVisible, price, image, },
  navigation,
  phone
) => {
  console.log(phone, '$${phone}sss');
  return firebase
    .database()
    .ref(`cart/${phone}`)
    .push({
      product_name: product_name,
      product_desc: product_desc,
      price: price,
      image: image,
      quantity: "1",
    })
    .catch((e) => console.log('addProductToCartAPI', e));
};

export function addProductToCart(product, navigation, phone) {

  return (dispatch) => {
    dispatch({
      type: 'PRODUCT_ADD_TO_CART',
    });
    addProductToCartAPI(product, navigation, phone).then(() => {
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

export function fetchProducts(phone) {
  return (dispatch) => {
    firebase
      .database()
      .ref(`cart/${phone}`)
      .once('value', function (products) {
        let productsObject = products.val();
        let productsList = [];
        let totalPrice = 0;
        for (let productIndex in productsObject) {
          totalPrice =
            parseInt(productsObject[productIndex].price) *
              parseInt(productsObject[productIndex].quantity) +
            totalPrice;
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
  //stores an item in state to make ot accesible for other fun
  return (dispatch) => {
    console.log('storeItemToDelete', firebaseId);
    dispatch({
      type: 'STORE_ITEM_TO_DELETE',
      payload: firebaseId,
    });
  };
}

const deleteProductsAPI = async (itemToDelete, phone) => {
  return firebase
    .database()
    .ref(`cart/${phone}/${itemToDelete}`)
    .remove()

    .catch((e) => console.log('addProductAPI', e));
};

export function deleteCartItem(itemToDelete, phone) {
  deleteProductsAPI(itemToDelete, phone);
  return (dispatch) => {
    dispatch({
      type: 'DELETE_ITEM_SUCCESS',
      payload: [],
    });
  };
}

export function fetchBranches() {
  return (dispatch) => {
    firebase
      .database()
      .ref(`admins`)
      .once('value', function (branches) {
        const branchesList = Object.keys(branches.val());
        dispatch({
          type: 'FETCH_BRANCHES_SUCCESS',
          payload: branchesList,
        });
      });
  };
}
export function order(seller, phone, totalPrice, transPrice) {
  return (dispatch) => {
    firebase
      .database()
      .ref(`cart/${phone}`)
      .once('value', function (products) {
        const productsObject = products.val();
        firebase
          .database()
          .ref(`seller-orders/${seller}`)
          .push({
            productsObject,
            totalPrice,
            transPrice,
            phone,
            status: 'جار التنفيذ',
            date: `${moment().format('dddd')} ${moment().format('DD-MM-YYYY')} ${moment().format('HH:mm:SS')}`,
          })
          .then((e) =>
            firebase.database().ref(`orders/${phone}`).push({
              orderId: e.key,
              branch: seller,
              totalPrice,
              transPrice,
              status: 'جار التنفيذ',
              date: `${moment().format('dddd')} ${moment().format('DD-MM-YYYY')} ${moment().format('HH:mm:SS')}`,
            })
          );
        firebase.database().ref(`cart/${phone}`).remove();
        dispatch({
          type: 'DELETE_CART_PRODUCTS',
          payload: { productsList: [], totalPrice: 0 },
        });
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
