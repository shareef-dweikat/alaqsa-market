import { AnyAction } from 'redux';
// import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
  products: [],
  // user: {},
  // existingNumber: null,
  itemToDelete: '',
  isLoading: false,
  totalPrice: 0,
  branches: []
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'PRODUCT_ADD_TO_CART':
      return {
        ...state,
        isLoading: true,
      };
    case 'PRODUCT_ADD_TO_CART_SUCCESS':
      return {
        ...state,
        isLoading: false,
      };
    case 'FETCH_CART_PRODUCTS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        products: action.payload.productsList,
        totalPrice: action.payload.totalPrice,
      };
    case 'STORE_ITEM_TO_DELETE':
      return {
        ...state,
        isLoading: false,
        itemToDelete: action.payload,
      };
      case 'DELETE_CART_PRODUCTS':
        return {
          ...state,
          isLoading: false,
          products: action.payload.productsList,
          totalPrice: action.payload.totalPrice,
        };
    case 'DELETE_ITEM_SUCCESS':
      let newProducts = state.products.filter(
        (item) => item.firebaseId !== state.itemToDelete
      );
      return {
        ...state,
        products: newProducts,
      };
      case 'FETCH_BRANCHES_SUCCESS':
      return {
        ...state,
        branches: action.payload,
      };
      case 'FETCH_DISCOUNT_SUCCESS':
        return {
          ...state,
          discount: action.payload.discount,
        };
    default:
      return state;
  }
};

export interface Interface {
  existingNumber: typeof initialState.existingNumber;
  user: typeof initialState.user;
}
