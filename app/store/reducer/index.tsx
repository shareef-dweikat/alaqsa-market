import { combineReducers } from 'redux';
import auth, { Interface as authInterface } from './auth';
import main, { Interface as mainInterface } from './main';
import category from './category';
import product from './product';

const reducers = combineReducers({
  auth,
  main,
  category: category,
  product:product,
});

export default reducers;

export interface Interface {
  auth: authInterface,
  main: mainInterface
}
