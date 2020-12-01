import { AnyAction } from 'redux';
// import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
  notifications: [],
  // user: {},
  // existingNumber: null,
  isLoading: false,
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'FETCH_NOTIFICATIONS':
      console.log('FETCH_NOTIFICATIONS', action);
      const notifications = Object.values(action.payload);
      return {
        ...state,
        // isLoading: true,
        notifications: notifications,
      };
    default:
      return state;
  }
};

export interface Interface {
  existingNumber: typeof initialState.existingNumber;
  user: typeof initialState.user;
}
