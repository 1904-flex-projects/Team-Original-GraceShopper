import React from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../../redux';
import { BUTTON_CLASSES_PRIMARY } from './Styles';

const AddToCartButton = props => {
  const { qty, addToCart, productInfo } = props;
  const handleSubmit = e => {
    e.preventDefault();
    if (!productInfo.id) {
      console.log('Error: no pid');
      return;
    } else {
      addToCart(productInfo, qty);
    }
  };
  return (
    <button className={BUTTON_CLASSES_PRIMARY} onClick={handleSubmit}>
      Add To Cart
    </button>
  );
};

const mapState = ({
  currentUser: {
    profile: { userId },
  },
  cart,
}) => ({ userId, cart });

const mapDispatch = dispatch => {
  return {
    addToCart: (productInfo, qty) => {
      dispatch(addToCart(productInfo, qty));
    },
  };
};

export default connect(
  mapState,
  mapDispatch
)(AddToCartButton);
