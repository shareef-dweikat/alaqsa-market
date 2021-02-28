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
      return {
        ...state,
         isLoading: true,
      };
    case 'SLIDE_ADDED_SUCCESS':
      return {
        ...state,
         isLoading: false,
         uploadedSlideImageUri: action.payload
      };
      case 'FETCH_SLIDE_IMAGE':
      return {
        ...state,
         isLoading: false,
         uploadedSlideImageUri: action.payload.myImage,
         desc: action.payload.desc

      };
    default: 
      return state;
  }
};

export interface Interface {
  existingNumber: typeof initialState.existingNumber;
  user: typeof initialState.user;
}
