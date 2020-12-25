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
      case 'CATEGORY_EDITED_SUCCESS':
        let categories = state.categories.map((category)=> {
          if(action.payload.name == category.category_name)
           return {...category, category_desc: action.payload.desc, category_name: action.payload.name}
           else return category
        })
         console.log('categcategories', categories);
        return {
          ...state,
            categories
        };
    default: 
      return state;
  }
};

export interface Interface {
  existingNumber: typeof initialState.existingNumber;
  user: typeof initialState.user;
}
