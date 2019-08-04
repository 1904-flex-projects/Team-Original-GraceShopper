import axios from 'axios';

// action constants
export const GOT_USER = 'GOT_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

//action creators
export const gotUser = user => {
  return { type: GOT_USER, user };
};

export const logoutUser = () => {
  return { type: LOGOUT_USER };
};

import { changeLoginStatus } from './isLoggedInCreators';
// thunks
export const loginThunk = (email, password) => {
  return dispatch => {
    return axios
      .post('/api/users/login', { email, password })
      .then(res => {
        const user = res.data;
        // clear error if login is successful
        dispatch(gotUser({ ...user, error: '' }));
        dispatch(changeLoginStatus(true));
      })
      .catch(() => {
        console.log('error redux');
        // send error if login is unsuccessful
        dispatch(gotUser({ error: 'Invalid login credentials' }));
      });
  };
};
