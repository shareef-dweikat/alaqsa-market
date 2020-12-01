import firebase from '../../config/firebase';

export function fetchOrders() {
  return (dispatch) => {
    firebase
      .database()
      .ref('orders/aadddddtoken/')
      .once('value', function (remoteOrders) {
        let orders = remoteOrders.val();
        let ordersList = [];
        let totalPrice = 0;
        for (let ordertIndex in orders) {
          for (let productIndex in orders[ordertIndex]) {
            ordersList.push(orders[ordertIndex][productIndex]);
            totalPrice =  orders[ordertIndex][productIndex].price +  totalPrice;
          }
        }
        console.log(totalPrice, ordersList, 'PPPPPP');
        dispatch({
          type: 'FETCH_ORDERS_SUCCESS',
          payload: ordersList
        });
      });
  };
}
