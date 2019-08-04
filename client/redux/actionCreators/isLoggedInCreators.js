// constants
export const CHANGE_LOGIN_STATUS = 'CHANGE_LOGIN_STATUS';

// creators

export const changeLoginStatus = isLoggedIn => {
  return { type: CHANGE_LOGIN_STATUS, isLoggedIn };
};

// thunks
export const checkLoginStatus = () => {
  // authentication
};
