import { AnyAction } from 'redux';
// import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
  // existingNumber: null,
  itemToDelete: '',
  isLoading: false,
  orders:[]
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'FETCH_ORDERS_SUCCESS':
      console.log('FETCH_ORDERS_SUCCESS');
      return {
        ...state,
        isLoading: false,
        orders: action.payload,
      };
    default:
      return state;
  }
};

export interface Interface {
  existingNumber: typeof initialState.existingNumber;
  user: typeof initialState.user;
}
