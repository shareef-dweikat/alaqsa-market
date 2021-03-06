import { AnyAction } from 'redux';
// import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
  stores: [],
  // user: {},
  // existingNumber: null,
  isLoading: false,
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    // case 'CATEGORY_CREATE_SUCCESS':
    //   return {
    //     ...state,
    //     isLoading: false,
    //   };
    case 'STORE_UPDATED_SUCCESS':
      return {
        ...state,
        isLoading: true,
      };
    case 'STORES_FETCH_SUCCESS':
      return {
        ...state,
        stores: action.payload,
        // isLoading: true,
      };
    // case 'CATEGORY_DELETED_SUCCESS':  
    //   return {
    //     ...state,
    //     categories: state.categories,
    //     // isLoading: true,
    //   };
    // case 'CATEGORY_EDITED_SUCCESS':
    //   let categories = state.categories.map((category) => {
    //     if (action.payload.name == category.category_name)
    //       return {
    //         ...category,
    //         category_desc: action.payload.desc,
    //         category_name: action.payload.name,
    //       };
    //     else return category;
    //   });
    //   return {
    //     ...state,
    //     categories,
    //     isLoading: false
    //   };
    //   case 'CATEGORY_EDITED':
    //     return {
    //       ...state,
    //       isLoading: false
    //     };
    default:
      return state;
  }
};

export interface Interface {
  existingNumber: typeof initialState.existingNumber;
  user: typeof initialState.user;
}
