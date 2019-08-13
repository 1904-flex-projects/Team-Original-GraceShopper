import React from 'react';
import AddToCartButton from './AddToCartButton';

const ProductCard = props => {
  const { name, price, image_url } = props.product;

  return (
    <div className="product-card-container">
      <div className="product-card-title">
        <p>{name}</p>
      </div>

      <img src={image_url} alt="product image" />
      <div>
        <p>${price}</p>
        <AddToCartButton qty={1} productInfo={props.product} />
      </div>
    </div>
  );
};

export default ProductCard;
