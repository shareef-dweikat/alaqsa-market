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

export function pushOrderNotification(title) {
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
            body: title,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => console.log(responseJson, 'responseJson'));
      }
    })
    .catch((e) => console.log('pushOrderNotification', e));
}
export const pushNotification = (title) => {
  return (dispatch) => {
    firebase
      .database()
      .ref('notifications/')
      .push({
        title,
        date: moment().format('YYYY-MM-DD HH:mm:SS'),
      })
      .then(() => {
        pushOrderNotification(title);
        alert('تم الإرسال')
      });
    dispatch({
      type: 'FETCH_NOTIFICATIONSsssss',
      // payload: notifications,
    });
  };
};

export function pushToken(expoPushToken) {
  console.log(expoPushToken, "expoPushTokennnn")
  return (dispatch) => {
    firebase
      .database()
      .ref(`notificatios-tokens`)
      .once('value', async (notificatiosTokens) => {
        const notifiTokens = notificatiosTokens.val()
        let flag = false
        for(let index in notifiTokens) {

            if(notifiTokens[index].token == expoPushToken) {
            flag = true
            }
        }
        if(flag) return
        firebase
          .database()
          .ref(`notificatios-tokens`)
          .push({ token: expoPushToken })
          .then((d) => console.log(d, 'expoPushToken_error'));
      });

    dispatch({
      type: 'PUSH_NOTIFICATION_TOKEN',
      // payload: notifications,
    });
  };
}
