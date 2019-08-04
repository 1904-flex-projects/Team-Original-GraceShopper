import { combineReducers } from 'redux';

// import individual reducers here
import currentUserReducer from './reducers/currentUserReducer';
import isLoggedInReducer from './reducers/isLoggedInReducer';
import productReducer from './reducers/productReducer';

const rootReducer = combineReducers({
  isLoggedIn: isLoggedInReducer,
  currentUser: currentUserReducer,
  product: productReducer,
});

export default rootReducer;
