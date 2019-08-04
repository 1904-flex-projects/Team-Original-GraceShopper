import { CHANGE_LOGIN_STATUS } from './../index';
const initialState = false;

const isLoggedInReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LOGIN_STATUS:
      return action.isLoggedIn;
    default:
      return state;
  }
};

export default isLoggedInReducer;
