import { AnyAction } from 'redux';
// import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
  products: [],
  // user: {},
  // existingNumber: null,
  favProducts: [],
  isLoading: false,
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'PRODUCT_ADD_SUCCESS':
      return {
        ...state,
        isLoading: false,
      };
    case 'PRODUCT_ADD':
      return {
        ...state,
        isLoading: true,
      };
    case 'FETCH_PRODUCTS':
      return {
        ...state,
        // isLoading: true,
        products: action.payload,
      };
    case 'FETCH_PRODUCTS_SEARCH':
      return {
        ...state,
        // isLoading: true,
        products: action.payload,
      };
    case 'FETCH_FAV_SUCCESS':
      return {
        ...state,
        // isLoading: true,
        favProducts: action.payload,
      };
      case 'PRODUCT_EDITED_SUCCESS':
        return {
          ...state,
          isLoading: false,
          // favProducts: action.payload,
        };
        case 'PRODUCT_EDITED_SUCCESS':
          return {
            ...state,
            isLoading: false,
            // favProducts: action.payload,
          };
        case 'PRODUCT_DELETED_SUCCESS':
          return {
            ...state,
            //  isLoading: true,
            // favProducts: action.payload,
          }; 
    default: 
      return state;
  }
};

export interface Interface {
  existingNumber: typeof initialState.existingNumber;
  user: typeof initialState.user;
}
