import moment from 'moment';
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
      })
      .catch((e) => console.log(e, 'errrrrr'));
  };
}

export function pushOrderNotification(title, desc) {
  firebase
    .database()
    .ref(`notificatios-tokens`)
    .once('value', async (pushTokens) => {
      console.log(pushTokens, 'pushTokenpushToken');
      for (let index in pushTokens.val()) {
        let token = pushTokens.val()[index].token;
        fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: token,
            title: title,
            body: desc,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => console.log(responseJson, 'responseJson'));
      }
    })
    .catch((e) => console.log('pushOrderNotification', e));
}
export const pushNotification = (title, desc) => {
  return (dispatch) => {
    firebase
      .database()
      .ref('notifications/')
      .push({
        title,
        desc,
        date: moment().format('YYYY-MM-DD HH:mm:SS'),
      })
      .then(() => {
        pushOrderNotification(title, desc);
      });
    dispatch({
      type: 'FETCH_NOTIFICATIONSsssss',
      // payload: notifications,
    });
  };
};
