import React, { Fragment } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { changeLoginStatus, logoutThunk } from './../../../redux';

import { NAV_LINK, BUTTON_CLASSES_SUCCESS } from './../styles';

const handleLoginClick = (isLoggedIn, changeStatus, logOut) => {
  if (isLoggedIn) {
    console.log('run logout routine');
    changeStatus(false);
    logOut();
    window.location.replace('/'); //Logging out reloads to home page
  }
};

const renderLogin = (isLoggedIn, changeStatus, logOut) => {
  const path = isLoggedIn ? '/' : '/login';
  const loginStatus = isLoggedIn ? 'Logout' : 'Login';
  return (
    // display welcome message and name if logged in

    <NavLink
      to={path}
      style={NAV_LINK}
      onClick={() => handleLoginClick(isLoggedIn, changeStatus, logOut)}
    >
      <button className={BUTTON_CLASSES_SUCCESS}>{loginStatus}</button>
    </NavLink>
  );
};

const LoginLink = props => {
  let { isLoggedIn, changeStatus, user, logOut } = props;

  return (
    <Fragment>
      {isLoggedIn ? (
        <p style={{ margin: 10, ...NAV_LINK }}>
          {`Welcome, ${user.profile.first_name} !`}
        </p>
      ) : (
        ''
      )}
      {renderLogin(isLoggedIn, changeStatus, logOut)}
    </Fragment>
  );
};

const mapState = state => ({
  isLoggedIn: state.isLoggedIn,
  user: state.currentUser,
});
const mapDispatch = dispatch => ({
  changeStatus: status => {
    dispatch(changeLoginStatus(status));
  },
  logOut: () => {
    dispatch(logoutThunk());
  },
});

export default connect(
  mapState,
  mapDispatch
)(LoginLink);
