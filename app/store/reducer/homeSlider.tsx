import { AnyAction } from 'redux';
// import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
  // user: {},
  // existingNumber: null,
  uploadedSlideImageUri: '',
   isLoading: false,
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'SLIDE_ADDED':
      console.log("asdddddddddddddddddd", action)
      return {
        ...state,
         isLoading: true,
      };
    case 'SLIDE_ADDED_SUCCESS':
      console.log("asdddddddddddddddddd", action)
      return {
        ...state,
         isLoading: false,
         uploadedSlideImageUri: action.payload
      };
      case 'FETCH_SLIDE_IMAGE':
      console.log("FETCH_SLIDE_IMAGE", action)
      return {
        ...state,
         isLoading: false,
         uploadedSlideImageUri: action.payload
      };
    default: 
      return state;
  }
};

export interface Interface {
  existingNumber: typeof initialState.existingNumber;
  user: typeof initialState.user;
}
