import firebase from '../../config/firebase';

// export function fetchOrders(phone) {
//   return (dispatch) => {
//     firebase
//       .database()
//       .ref(`orders/${phone}`)
//       .once('value', function (remoteOrders) {
//         let orders = remoteOrders.val();
//         let ordersList = [];
//         let totalPrice = 0;
//         for (let ordertIndex in orders) {
//           for (let productIndex in orders[ordertIndex]) {
//             ordersList.push(orders[ordertIndex][productIndex]);
//             totalPrice =  orders[ordertIndex][productIndex].price +  totalPrice;
//           }
//         }
//         console.log(totalPrice, ordersList, 'PPPPPP');
//         dispatch({
//           type: 'FETCH_ORDERS_SUCCESS',
//           payload: ordersList
//         });
//       });
//   };
// }
export function fetchOrders(phone) {
  return (dispatch) => {
    firebase
      .database()
      .ref(`orders/${phone}`)
      .once('value', function (remoteOrders) {
         let orders = Object.values(remoteOrders.val());
        dispatch({
          type: 'FETCH_ORDERS_SUCCESS',
          payload: orders,
        });
      });
  };
}

export function makeOrder() {
  // firebase
  //   .database()
  //   .ref('category/')
  //   .push({
  //     category_name: name,
  //     category_desc: desc,
  //     isVisible: true,
  //     image: url,
  //   })
  //   .catch((e) => console.log('createCategoryAPI', e));
  // return (dispatch) => {
  //   dispatch({
  //     type: 'FETCH_ORDERS_SUCCESS',
  //     // payload: ordersList
  //   });
  // };
}

export function fetchOrder(orderId, seller) {
  console.log(orderId, seller)
  return (dispatch) => {
    firebase
      .database()
      .ref(`seller-orders/${seller}/${orderId}`)
      .once('value', function (remoteOrders) {
        let order = remoteOrders.val()
        let products = Object.values(order.productsObject);
          dispatch({
            type: 'FETCH_SELLER_ORDERS_SUCCESS',
            payload: {order, products},
          });
      });
  };
}



