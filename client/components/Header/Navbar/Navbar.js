import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginLink from './LoginLink';
import cartImage from './cartImage';

import {
  NAV_LINKS_CONTAINER,
  NAV_LINK,
  PRODUCT_MODAL,
  NAV_ACCOUNT_LINKS_CONTAINER,
  BUTTON_CLASSES_PRIMARY,
  BUTTON_CLASSES_DANGER,
} from '../styles';

const Navbar = props => {
  const navbarLinks = ['account', 'orders', 'cart'];

  const { isAdmin, isLoggedIn, cart } = props;

  return (
    <div id="nav-links-container" style={NAV_LINKS_CONTAINER}>
      <div id="nav-products-container">
        {/* modals */}
        <NavLink to="/products" style={PRODUCT_MODAL}>
          <button className={BUTTON_CLASSES_PRIMARY}>Products</button>
        </NavLink>
      </div>

      <div id="nav-account-links-container" style={NAV_ACCOUNT_LINKS_CONTAINER}>
        <LoginLink />
        {isAdmin ? (
          <NavLink to="/admin" style={NAV_LINK}>
            <button className={BUTTON_CLASSES_DANGER}>Admin Page</button>
          </NavLink>
        ) : (
          ''
        )}
        {navbarLinks.map(link => {
          if (link === 'cart') {
            return (
              <NavLink key={link} to={`/${link}`} style={NAV_LINK}>
                <button
                  className={BUTTON_CLASSES_PRIMARY}
                  onClick={() => window.location.replace('/cart')}
                >
                  {cartImage} {link[0].toUpperCase()}
                  {link.slice(1)}({cart.cart.length})
                </button>
              </NavLink>
            );
          }
          if (link === 'account' && !isLoggedIn) {
            link = 'signup';
          }
          if (link === 'orders' && !isLoggedIn) {
            return;
          }
          return (
            <NavLink key={link} to={`/${link}`} style={NAV_LINK}>
              <button className={BUTTON_CLASSES_PRIMARY}>
                {link[0].toUpperCase()}
                {link.slice(1)}
              </button>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

const mapState = ({ cart, isLoggedIn, currentUser: { isAdmin } }) => ({
  isLoggedIn,
  isAdmin,
  cart,
});
export default connect(mapState)(Navbar);
