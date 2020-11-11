import { AnyAction } from 'redux';
// import AsyncStorage from "@react-native-community/async-storage";

const initialState = {
  isLoading: false,
  error: null,
};
export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'CATEGORY':
      return {
        ...state,
        isLoading: true
      };
    case 'CATEGORY_SUCCESS':
      return {
        ...state,
        isLoading: false,
      }
    case 'CATEGORY_ERROR':
      return {
        ...state,
        isLoading: false,
        error: 'fuck'
      };
    case 'BRAND':
      return {
        ...state,
        isLoading: true,
      };
    case 'BRAND_SUCCESS':
      return {
        ...state,
        isLoading: false,
      }
    case 'BRAND_ERROR':
      return {
        ...state,
        isLoading: false,
        error: 'try'
      };
    case 'PROMOTION':
      return {
        ...state,
        isLoading: true
      };
    case 'PROMOTION_SUCCESS':
      return {
        ...state,
        isLoading: false,
      }
    case 'PROMOTION_ERROR':
      return {
        ...state,
        isLoading: false,
        error: 'fuck'
      };
    default:
      return {
        ...state
      };
  }
};
export interface Interface {
  isLoading: false,
}
