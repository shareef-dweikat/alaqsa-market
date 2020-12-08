import { AsyncStorage } from 'react-native';
import firebase from '../../config/firebase';

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

const handleSignIn = async (phone, pass) => {
  // console.log(email, password);
  // let problem = null;
  // try {
  //   const response = await Auth.signIn(email, password);
  //   const idToken = response
  //     .getSignInUserSession()
  //     ?.getIdToken()
  //     ?.getJwtToken();
  //   if (idToken) return idToken;
  // } catch (e) {
  //   return e;
  // }
};

const handleSignUp = async (email, password) => {
  let problem = null;

  try {
    await Auth.signUp({
      username: email.toLowerCase(),
      password,
      // attributes: {
      //   email: email.toLowerCase(),
      //   given_name: firstName,
      //   family_name: lastName,
      // },
    });
  } catch (e) {
    // setErrorMessage(e);
    return e;
    // console.log('eesss', e);
    // problem = e;
  }

  return true;
};

export function login(phone, pass, navigation) {
  return (dispatch) => {
    firebase
      .database()
      .ref(`users/${phone}`)
      .once('value', async (user) => {
        if (user.val() != null && pass == user.val().password) {
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
    // handleSignIn(email.toLowerCase(), password).then((TOKEN) => {
    //   if (!TOKEN.message) {
    //     navigation.push('Home');
    //     dispatch({
    //       type: 'LOGIN_SUCCESS',
    //       payload: TOKEN,
    //     });
    //   } else
    //     dispatch({
    //       type: 'LOGIN_FAILURE',
    //       errors: TOKEN.message,
    //     });
    // });
  };
}

export function signup(phone, pass, confirmPass, email, name) {
  return (dispatch) => {
    firebase
    .database()
    .ref(`users/${phone}`)
    .set({
     pass, confirmPass, email, name,
    })
    .catch((e) => console.log('addProductToCartAPI', e));
  };
}