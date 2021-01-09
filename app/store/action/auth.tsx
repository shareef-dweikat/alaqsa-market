import { AsyncStorage } from 'react-native';
import firebase from '../../config/firebase';
import navigation from '../../config/navigation';
import { Field } from '../../screens/ProfileScreen';

export const setUserType = (USER_FROM_ASYNC, USER_PHONE_FROM_ASYNC) => {
  console.log('ctra', USER_FROM_ASYNC);
  return (dispatch) => {
    dispatch({
      type: 'SET_USER_TYPE',
      payload: {
        userType: USER_FROM_ASYNC,
        phone: USER_PHONE_FROM_ASYNC,
      },
    });
  };
};
export const setAdminType = (USERTYPE_FROM_ASYNC, USER_USERNAME_FROM_ASYNC) => {
  console.log('ctra', USERTYPE_FROM_ASYNC);
  return (dispatch) => {
    dispatch({
      type: 'SET_ADMIN_TYPE',
      payload: {
        userType: USERTYPE_FROM_ASYNC,
        username: USER_USERNAME_FROM_ASYNC,
      },
    });
  };
};

export function login(phone, pass, navigation) {
  console.log(phone);

  return (dispatch) => {
    firebase
      .database()
      .ref(`users/${phone}`)
      .once('value', (user) => {
        console.log(user.val());
        if (user.val() != null && pass == user.val().pass) {
          AsyncStorage.setItem('userType', 'customer');
          AsyncStorage.setItem('phone', phone + '');
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: phone,
          });
          //serType: 'customer'
        } else alert('خطا في العلومات');
      })
      .catch((e) => console.log('createCategoryAPI', e));
  };
}

export function signup(phone, pass, email, name, navigation) {
  console.log(name, 'my_Nme');
  return (dispatch) => {
    firebase
      .database()
      .ref(`users/${phone}`)
      .set({
        pass,
        email,
        name,
      })
      .then(() => {
        alert('تم التسجيل بنجاح');
        navigation.pop();
      })
      .catch((e) => console.log('addProductToCartAPI', e));
  };
}

export function fetchProfile(phone) {
  return (dispatch) => {
    firebase
      .database()
      .ref(`users/${phone}`)
      .once('value', async (user) => {
        dispatch({
          type: 'PROFILE_SUCCESS',
          payload: user.val(),
        });
      })
      .catch((e) => console.log('createCategoryAPI', e));
  };
}
export function updateProfile(phone, field, value) {
  return (dispatch) => {
    firebase
      .database()
      .ref(`users/${phone}/${field}`)
      .set(value)
      .catch((e) => console.log('createCategoryAPI', e));
  };
}

export function uploadPushToken(userType, pushToken) {
  return (dispatch) => {
    if (userType == 'seller')
      firebase
        .database()
        .ref(`admins/Nablus`)
        .update({ pushToken })
        .catch((e) => console.log('createCategoryAPI', e));
    // else
    //   firebase
    //     .database()
    //     .ref(`users/`)
    //     .set({pushToken})
    //     .catch((e) => console.log('createCategoryAPI', e));
  };
}

export function fetchSellerAccounts() {
  return (dispatch) => {
    firebase
      .database()
      .ref(`admins/`)
      .once('value', async (sellers) => {
        dispatch({
          type: 'FETCH_SELLERS_ACCOUNTS_SUCCESS',
          payload: sellers.val(),
        });
      })
      .catch((e) => console.log('fetchSellerAccounts', e));
  };
}
