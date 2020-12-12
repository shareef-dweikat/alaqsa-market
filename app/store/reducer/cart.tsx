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
      console.log('PRODUCT_ADD_TO_CART');
      return {
        ...state,
        isLoading: true,
      };
    case 'PRODUCT_ADD_TO_CART_SUCCESS':
      console.log('PRODUCT_ADD_TO_CART_SUCCESS');
      return {
        ...state,
        isLoading: false,
      };
    case 'FETCH_CART_PRODUCTS_SUCCESS':
      console.log('FETCH_CART_PRODUCTS_SUCCESSdddddddd', action.payload);
      return {
        ...state,
        isLoading: false,
        products: action.payload.productsList,
        totalPrice: action.payload.totalPrice,
      };
    case 'STORE_ITEM_TO_DELETE':
      console.log('STORE_ITEM_TO_DELETE', action.payload);
      return {
        ...state,
        isLoading: false,
        itemToDelete: action.payload,
      };
      case 'DELETE_CART_PRODUCTS':
        console.log('DELETE_CART_PRODUCTS', action.payload);
        return {
          ...state,
          isLoading: false,
          products: action.payload.productsList,
          totalPrice: action.payload.totalPrice,
        };
    case 'DELETE_ITEM_SUCCESS':
      console.log('DELETE_ITEM_SUCCESSsss', state.itemToDelete);
      let newProducts = state.products.filter(
        (item) => item.firebaseId !== state.itemToDelete
      );
      return {
        ...state,
        products: newProducts,
      };
      case 'FETCH_BRANCHES_SUCCESS':
      console.log('FETCH_BRANCHES_SUCCESS');
      return {
        ...state,
        branches: action.payload,
      };
      // case 'SEARCH_CART_PRODUCTS':
      // let newProducts1 = state.products.filter((item)=> item.product_name.search(action.txt) != -1)
      // console.log(newProducts1, 'newProducts1ss')
      // return {
      //   ...state,
      //    products: newProducts1,
      // };
    default:
      return state;
  }
};

export interface Interface {
  existingNumber: typeof initialState.existingNumber;
  user: typeof initialState.user;
}
