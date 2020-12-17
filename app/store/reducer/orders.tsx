import { AnyAction } from 'redux';
// import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
  // existingNumber: null,
  itemToDelete: '',
  isLoading: false,
  orders:[],
  order: {},
  products: [],
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
      
      case 'FETCH_SELLER_ORDERS_SUCCESS':
        console.log('FETCH_SELLER_ORDERS_SUCCESS');
        return {
          ...state,
          isLoading: false,
          order: action.payload.order,
          products: action.payload.products,
        };
        case 'FETCH_ORDERS_ADMIN_SUCCESS':
        console.log('FETCH_ORDERS_ADMIN_SUCCESS');
        return {
          ...state,
          // isLoading: false,
          orders: action.payload.orders,
        };
    default:
      return state;
  }
};

export interface Interface {
  existingNumber: typeof initialState.existingNumber;
  user: typeof initialState.user;
}
