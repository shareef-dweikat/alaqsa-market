import { combineReducers } from 'redux';
import auth, { Interface as authInterface } from './auth';
import main, { Interface as mainInterface } from './main';
import category from './category';
import product from './product';
import cart from './cart';
import orders from './orders';
import notifications from './notifications';
import accounts from './accounts';
import homeSlider from './homeSlider';

const reducers = combineReducers({
  auth,
  main,
  category: category,
  product:product,
  cart: cart,
  orders: orders,
  notification: notifications,
  accounts: accounts,
  homeSlider: homeSlider
});

export default reducers;

export interface Interface {
  auth: authInterface,
  main: mainInterface
}
