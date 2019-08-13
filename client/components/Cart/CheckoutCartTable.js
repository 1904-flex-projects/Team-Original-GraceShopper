import React from 'react';
import { connect } from 'react-redux';

const CheckoutCartTable = props => {
  const { cart } = props.cart;

  let total = 0;
  return (
    <table className="table">
      <tbody className="thead-dark">
        <tr>
          <th scope="col">PRODUCTS</th>
          <th scope="col">QUANTITY</th>
          <th scope="col">PRICE</th>
        </tr>
        {cart.map(({ product, qty }) => {
          const { id, name, price, image_url } = product;
          total += Number(price) * qty;
          return (
            <tr key={id}>
              <td
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <img
                  src={image_url}
                  style={{ width: '30px', marginRight: '30px' }}
                />
                <div>{name}</div>
              </td>
              <td>{qty}</td>
              <td>${price}</td>
            </tr>
          );
        })}
        <tr />
        <tr height="9px" />
        <tr id="total-row">
          <td>
            <b>TOTAL</b>
          </td>
          <td id="total-middle" />
          <td id="total-amount">${total.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  );
};

const mapState = ({ cart }) => ({ cart });

export default connect(mapState)(CheckoutCartTable);
