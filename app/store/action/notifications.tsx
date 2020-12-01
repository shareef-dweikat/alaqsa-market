import firebase from '../../config/firebase';

const fetchProductsAPI = async () => {
  return firebase
    .database()
    .ref('category')
    .once('value', function (snapshot) {
      console.log('adasdd', snapshot.val());
    })

    .catch((e) => console.log('addProductAPI', e));
};

export function fetchNotifications() {
  console.log('fetchNotificationsaaaaaaaaa');
  return (dispatch) => {
    firebase
      .database()
      .ref('notifications/')
      .once('value', function (notificationsSnap) {
        let notifications = notificationsSnap.val();
        dispatch({
          type: 'FETCH_NOTIFICATIONS',
          payload: notifications,
        });
      }).catch((e)=>console.log(e, 'errrrrr'))
  };
}
