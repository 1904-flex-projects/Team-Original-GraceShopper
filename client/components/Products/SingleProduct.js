import React, { useState, useEffect } from 'react';
import ProductNav from './ProductNav';

import { connect } from 'react-redux';
import AddToCartButton from './AddToCartButton';

const SingleProduct = props => {
  const [productInfo, setProductInfo] = useState({});
  const [qty, setQty] = useState(1);

  const productId = props.match.params.id;
  const { allProducts, allCategories } = props;
  const params = {
    pc1: productInfo.parent_category_1,
    pc2: productInfo.parent_category_2,
    pc3: productInfo.parent_category_3,
  };

  // ProductNav component breaks if pc2 and pc3 are the same
  if (params.pc3 === params.pc2) {
    params.pc3 = null;
  }

  useEffect(() => {
    const foundInfo = allProducts.find(prod => prod.id === parseInt(productId));
    // getting all products can be async depending on how you get to the page.
    // need to wait for allProducts to get loaded before trying to set the state
    if (foundInfo) {
      setProductInfo(foundInfo);
    }
  }, [allProducts, allCategories]);

  return (
    <div>
      <ProductNav allCategories={allCategories} params={params} />
      <div id="single-product-main-container">
        <div id="single-product-info-container">
          <h1>
            {productInfo.name} ${productInfo.price}
          </h1>
          <img src={productInfo.image_url} alt="product image" />
          <h2>Description:</h2>
          <p>{productInfo.description}</p>
        </div>
        <div id="single-product-form">
          <div>
            <label htmlFor="qty">Qty: </label>
            <input
              className="form-control"
              type="number"
              name="qty"
              value={qty}
              min="1"
              onChange={e => {
                if (e.target.value < 1) {
                  e.target.value = 1;
                }
                setQty(e.target.value);
              }}
            />
          </div>
          <AddToCartButton productInfo={productInfo} qty={Number(qty)} />
        </div>
      </div>
    </div>
  );
};

const mapState = ({ product: { allProducts, allCategories } }) => ({
  allProducts,
  allCategories,
});

export default connect(mapState)(SingleProduct);
