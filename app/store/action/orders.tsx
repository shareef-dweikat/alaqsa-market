import firebase from '../../config/firebase';

export function fetchOrders(phone) {
  return (dispatch) => {
    firebase
      .database()
      .ref(`orders/${phone}`)
      .once('value', function (remoteOrders) {
        let orders = []
        
        if(remoteOrders.val()) {
          orders = Object.values(remoteOrders.val())
        }
        dispatch({
          type: 'FETCH_ORDERS_SUCCESS',
          payload: orders,
        });
      });
  };
}
export function fetchSellerOrders(username) {
  return (dispatch) => {
    firebase
      .database()
      .ref(`seller-orders/${username}`)
      .once('value', function (remoteOrders) {
        //  let orders = Object.values(remoteOrders.val());
        let orders = remoteOrders.val();
        const r = [];
        for (let index in orders) {
          r.push({ ...orders[index], orderId: index });
        }

        dispatch({
          type: 'FETCH_ORDERS_ADMIN_SUCCESS',
          payload: r,
        });
      });
  };
}
export function fetchSellersOrders() {
  return (dispatch) => {
    firebase
      .database()
      .ref(`seller-orders/`)
      .once('value', function (remoteOrders) {
        //  let orders = Object.values(remoteOrders.val());
        let sellers = remoteOrders.val();
        const r = [];

        for (let seller in sellers) {
          for (let index in sellers[seller]) {
            r.push({ ...sellers[seller][index], orderId: index, seller });
          }
        }

        dispatch({
          type: 'FETCH_ORDERS_ADMIN_SUCCESS',
          payload: r,
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
  return (dispatch) => {
    firebase
      .database()
      .ref(`seller-orders/${seller}/${orderId}`)
      .once('value', function (remoteOrders) {
        let order = remoteOrders.val();
        let products = [];
        if (order != null) products = Object.values(order.productsObject);
        dispatch({
          type: 'FETCH_SELLER_ORDERS_SUCCESS',
          payload: { order, products },
        });
      });
  };
}

export function fetchSellerOrder(orderId, seller) {
  return (dispatch) => {
    firebase
      .database()
      .ref(`seller-orders/${seller}/${orderId}`)
      .once('value', function (remoteOrders) {
        let order = remoteOrders.val();
        let products = order!=null &&  order.productsObject!=null? Object.values(order.productsObject):[]
        dispatch({
          type: 'FETCH_SELLER_ORDERS_SUCCESS',
          payload: { order, products },
        });
      });
  };
}

export function changeStatus(orderId, seller, status, phone) {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_ORDER_STATUS',
      // payload: { order, products },
    });
    firebase
      .database()
      .ref(`seller-orders/Nablus/${orderId}/status`)
      .set(status)
      .then(() => {
        dispatch({
          type: 'CHANGE_ORDER_STATUS_SUCCESS',
          // payload: { order, products },
        });
      });

    firebase
      .database()
      .ref(`orders/${phone}`)
      .once('value', function (orders) {
        let myOrders = orders.val();
        let orderIndex = '';
        for (let index in myOrders) {
          if (myOrders[index].orderId == orderId) {
            orderIndex = index;
          }
        }
        firebase
          .database()
          .ref(`orders/${phone}/${orderIndex}`)
          .update({
            status: status
          })
          .then(() => {
            // dispatch({
            //   type: 'CHANGE_ORDER_STATUS_SUCCESS',
            //   // payload: { order, products },
            // });
          });
      });
  };
}

export function updateSalesStatistics(seller, price) {
  return (dispatch) => {
    firebase
      .database()
      .ref(`statistics/Nablus`)
      .once('value', function (statistics) {
        let myStatistics = statistics.val();
        myStatistics = parseInt(price) + parseInt(myStatistics);
        firebase.database().ref(`statistics/Nablus`).set(myStatistics);
        // .then(() => {
        //   dispatch({
        //     type: 'FETCH_SELLER_ORDERS_SUCCESSrrrrrrr',
        //     // payload: { order, products },
        //   });
        // });
      });
  };
}

export function getSalesStatistics() {
  return (dispatch) => {
    firebase
      .database()
      .ref(`statistics/`)
      .once('value', function (statistics) {
        let myStatistics = Object.entries(statistics.val());
       
        dispatch({
          type: 'FETCH_STATISTICS_SUCCESS',
          payload: myStatistics,
        });
      });
  };
}
