import {Amplify, Auth} from 'aws-amplify';

export const setTokens = (token) => {
  return {
    type: 'SET_TOKENS',
    payload: {
      token,
    },
  };
};

const handleSignIn = async (email, password) => {
  console.log(email, password);
  let problem = null;
  try {
    const response = await Auth.signIn(email, password);
    const idToken = response
      .getSignInUserSession()
      ?.getIdToken()
      ?.getJwtToken();
    if (idToken) return idToken;
  } catch (e) {
    // setErrorMessage(e);
    return e;
    // console.log('eesss', e);
    // problem = e;
  }
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

export function login(email, password, navigation) {
  return (dispatch) => {
    handleSignIn(email.toLowerCase(), password).then((TOKEN) => {
      if (!TOKEN.message) {
        navigation.push('Home');
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: TOKEN,
        });
      } else
        dispatch({
          type: 'LOGIN_FAILURE',
          errors: TOKEN.message,
        });
    });
  };
}

export function signUp(email, password) {
  return (dispatch) => {
    handleSignUp(email.toLowerCase(), password).then((SUCCESS) => {
      // console.log(SUCCESS, 'SUCCESSsddddss');
      if (!SUCCESS.message)
        dispatch({
          type: 'SIGNUP_SUCCESS',
          // payload: TOKEN,
        });
      else
        dispatch({
          type: 'SIGNUP_FAILURE',
          errors: SUCCESS.message,
        });
    });
  };
}


