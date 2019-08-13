import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  CART_CONTAINER,
  CHECKOUT_BUTTON,
  BUTTON_CLASSES_PRIMARY,
} from './styles';
import CartTable from './CartTable';

const Cart = props => {
  const { cart } = props.cart;
  return (
    <div id="cart-component" style={CART_CONTAINER}>
      <h2 id="cart-title">Cart</h2>
      <CartTable />
      &nbsp; &nbsp;
      <div>
        {cart.length !== 0 && (
          <NavLink to="/checkout">
            <button className="btn btn-primary btn-block">CHECKOUT</button>
          </NavLink>
        )}
      </div>
    </div>
  );
};

const mapState = ({ currentUser, cart }) => ({ currentUser, cart });

export default connect(mapState)(Cart);
