import React, { Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { changeLoginStatus, logoutUser } from './../../../redux';

import { NAV_LINK } from './../styles';

const handleLoginClick = (isLoggedIn, changeStatus, logOut) => {
  if (isLoggedIn) {
    console.log('run logout routine');
    changeStatus(false);
    logOut();
  }
  // only for testing. delete when login page is up
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
      <button>{loginStatus}</button>
    </NavLink>
  );
};

const LoginLink = props => {
  let { isLoggedIn, changeStatus, user, logOut } = props;

  return (
    <Fragment>
      {isLoggedIn ? (
        <p style={{ margin: 0, ...NAV_LINK }}>
          {`Welcome, ${user.profile.first_name} `}
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
    [dispatch(logoutUser())];
  },
});

export default connect(
  mapState,
  mapDispatch
)(LoginLink);
