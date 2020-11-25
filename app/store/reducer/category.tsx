import { AnyAction } from 'redux';
// import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
  categories: [],
  // user: {},
  // existingNumber: null,
   isLoading: false,
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'CATEGORY_CREATE_SUCCESS':
      return {
        ...state,
         isLoading: false,
      };
    case 'CATEGORY_CREATE':
      return {
        ...state,
        isLoading: true,
      };
    case 'CATEGORY_FETCH_SUCCESS':
      return {
        ...state,
        categories: action.payload,
        // isLoading: true,
      };
    case 'CATEGORY_DELETED_SUCCESS':
      // let c = state.categories.splice(0, 1);
      // console.log('vvvvvvv', c.length);
      return {
        ...state,
        categories: state.categories,
        // isLoading: true,
      };
    default:
      return state;
  }
};

export interface Interface {
  existingNumber: typeof initialState.existingNumber;
  user: typeof initialState.user;
}
