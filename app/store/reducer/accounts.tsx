import { AnyAction } from 'redux';
// import AsyncStorage from '@react-native-community/async-storage';

const initialState = {};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'FETCH_SELLERS_ACCOUNTS_SUCCESS':
      alert('FETCH_SELLERS_ACCOUNTS_SUCCESS')
      return {
        ...state,
        accounts: action.payload,
      };
    default:
      return state;
  }
};

export interface Interface {
  existingNumber: typeof initialState.existingNumber;
  user: typeof initialState.user;
}
