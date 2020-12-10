import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '../slices/auth';
import bannersReducer from '../slices/banners';
import cartsReducer from '../slices/carts';
import stocksReducer from '../slices/stocks';
import outletsReducer from '../slices/outlets';
import ordersReducer from '../slices/orders';
import errorReducer from '../slices/error';
import locationReducer from '../slices/location';
import searchReducer from '../slices/search';
import wishlistReducer from '../slices/wishlist';
import networkReducer from '../slices/network';
import notificationReducer from '../slices/notification';
import uiReducer from '../slices/ui';

export default combineReducers({
  auth: authReducer,
  banner: bannersReducer,
  carts: cartsReducer,
  stocks: stocksReducer,
  outlets: outletsReducer,
  orders: ordersReducer,
  search: searchReducer,
  location: locationReducer,
  error: errorReducer,
  wishlist: wishlistReducer,
  network: networkReducer,
  notification: notificationReducer,
  ui: uiReducer,
});
