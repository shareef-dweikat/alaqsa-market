import firebase from '../../config/firebase';

export function fetchSellerAccounts() {
  return (dispatch) => {
    firebase
      .database()
      .ref(`admins/`)
      .once('value', async (sellers) => {
        dispatch({
          type: 'FETCH_SELLERS_ACCOUNTS_SUCCESS',
          // payload: sellers.val(),
        });
      })
      .catch((e) => console.log('fetchSellerAccounts', e));
  };
}
// dispatch({
//   type: 'PROFILE_SUCCESS',
//   payload: user.val(),
// });
