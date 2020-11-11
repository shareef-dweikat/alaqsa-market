import { combineReducers } from 'redux';
import auth, { Interface as authInterface } from './auth';
import main, { Interface as mainInterface } from './main';

const reducers = combineReducers({
  auth,
  main
});

export default reducers;

export interface Interface {
  auth: authInterface,
  main: mainInterface
}
