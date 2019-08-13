import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = props => {
  const categories = props.products.product.topLevelCategories;
  return (
    <div>
      <center>
        <img
          src="/images/Main/fry.jpg"
          alt="company logo"
          height="360"
          width="360"
        />
        <h1>
          <u>Check Out Some Of Our Products</u>
        </h1>
        {categories.map(category => {
          return (
            <div key={category.pcid1}>
              <Link to={`/products/${category.pcid1}`}>{category.name1}</Link>
            </div>
          );
        })}
      </center>
    </div>
  );
};

const mapState = state => ({
  products: state,
});

export default connect(mapState)(Home);
