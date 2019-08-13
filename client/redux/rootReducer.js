import { combineReducers } from 'redux';

// import individual reducers here
import currentUserReducer from './reducers/currentUserReducer';
import isLoggedInReducer from './reducers/isLoggedInReducer';
import productReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';

const rootReducer = combineReducers({
  isLoggedIn: isLoggedInReducer,
  currentUser: currentUserReducer,
  product: productReducer,
  cart: cartReducer,
});

export default rootReducer;
