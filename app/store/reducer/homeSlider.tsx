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
    case 'SLIDE_ADDED_SUCCESS':
      console.log("asdddddddddddddddddd", action)

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
