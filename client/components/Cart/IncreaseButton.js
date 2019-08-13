import React from 'react';
import { connect } from 'react-redux';
import { increaseQty } from './../../redux';

const IncreaseButton = props => {
  const { product, increaseQty } = props;
  return (
    <button
      className="btn btn-secondary btn-sm"
      data-pid={product.id}
      onClick={() => {
        console.log('qty increased');
        increaseQty(product);
      }}
    >
      +
    </button>
  );
};

const mapDispatch = dispatch => ({
  increaseQty: product => {
    dispatch(increaseQty(product));
  },
});

export default connect(
  null,
  mapDispatch
)(IncreaseButton);
