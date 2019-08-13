import React from 'react';
import CheckoutCartTable from './CheckoutCartTable';
import {
  CART_CONTAINER,
  CART_TABLE,
  CHECKOUT_BUTTON,
  BUTTON_CLASSES_PRIMARY,
} from './styles';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { submitOrder } from '../../redux';
import { withRouter } from 'react-router';

const CheckoutPage = props => {
  const {
    first_name,
    last_name,
    street_address,
    city,
    state,
    zipcode,
    phone_number,
  } = props.currentUser.profile;
  const { email } = props.currentUser;
  const { submitOrder, cart, history } = props;

  const phoneNumber = `(${phone_number.slice(0, 3)}) ${phone_number.slice(
    3,
    6
  )}-${phone_number.slice(6)}`;

  console.log('cart in checkout', cart, history);
  return (
    <div style={CART_CONTAINER}>
      <h5 className="text-center text-danger">
        * Please confirm your shipping and contact information are correct *
      </h5>
      <div>&nbsp;</div>
      <div>
        <h4 className="text-info">SHIPPING INFORMATION</h4>
        <div>
          <div>
            {first_name}&nbsp;{last_name}
          </div>
          <div>{street_address}</div>
          <div>
            {city},&nbsp;{state} &nbsp;{zipcode}
          </div>
          <br />
          <h4 className="text-info">CONTACT INFORMATION</h4>
          <div>{phoneNumber}</div>
          <div>{email}</div>
        </div>
      </div>
      <br />
      <div>
        <h5 className="text-center text-danger">
          Please confirm your order is correct before submitting for delivery.
        </h5>
        <div>
          <CheckoutCartTable style={CART_TABLE} />
        </div>
        <div>&nbsp;</div>
        <div id="checkout-submit-button" style={CHECKOUT_BUTTON}>
          <NavLink to="/cart">
            <button className={BUTTON_CLASSES_PRIMARY}>Edit Cart</button>
          </NavLink>
          <div>&nbsp;</div>
          <button
            className="btn btn-primary "
            onClick={() => {
              submitOrder(cart);
              history.push('/confirmation');
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const mapState = ({ currentUser, cart }) => ({ currentUser, cart });

const mapDispatch = dispatch => ({
  submitOrder: cart => {
    dispatch(submitOrder(cart));
  },
});

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(CheckoutPage)
);
