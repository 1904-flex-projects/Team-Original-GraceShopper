import React from 'react';
import { connect } from 'react-redux';
import { removeFromCart } from './../../redux';

const RemoveButton = props => {
  const { product, removeFromCart } = props;
  return (
    <button
      className="btn btn-danger btn-sm"
      onClick={() => {
        console.log('item removed');
        removeFromCart(product);
      }}
    >
      X
    </button>
  );
};

const mapDispatch = dispatch => ({
  removeFromCart: product => {
    dispatch(removeFromCart(product));
  },
});

export default connect(
  null,
  mapDispatch
)(RemoveButton);
