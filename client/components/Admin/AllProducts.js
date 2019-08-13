import React from 'react';

const AllProducts = props => {
  const { products } = props;
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
};

export default AllProducts;
