import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { CART_CONTAINER } from '../Cart/styles';

const Orders = props => {
  const [orderItems, setOrderItems] = useState([]);
  const { allProducts } = props.product;

  useEffect(() => {
    axios
      .get('/api/orders')
      .then(result => {
        setOrderItems(() => [...result.data]);
      })
      .catch(e => console.error(e));
  }, []);

  return (
    <div style={CART_CONTAINER}>
      <h2>Your Previous Orders</h2>
      <table className="table">
        <tbody className="thead-dark">
          <tr>
            <th scope="col">Product</th>
            <th scope="col" className="text-center">
              Quantity
            </th>
            <th scope="col" className="text-center">
              Price
            </th>
            <th scope="col" className="text-center">
              Purchase Date
            </th>
          </tr>
          {orderItems.map((orderItem, i) => {
            const itemName = allProducts.filter(
              product => product.id === orderItem.productId
            )[0];

            return (
              <tr key={i}>
                <td>
                  <img
                    src={itemName.image_url}
                    style={{ width: '30px', marginRight: '30px' }}
                  />
                  {itemName.name}
                </td>
                <td className="text-center">{orderItem.qty}</td>
                <td className="text-center">{orderItem.price}</td>
                <td className="text-center">{orderItem.timeStamp}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
const mapState = ({ product }) => ({ product });

export default connect(mapState)(Orders);
