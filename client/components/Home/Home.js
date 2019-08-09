import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = props => {
  const categories = props.products.product.topLevelCategories;
  console.log(categories);
  return (
    <div>
      <center>
        <h1>
          <u>We sell this stuff</u>
        </h1>
        {categories.map(category => {
          return (
            <div key={category.pcid}>
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

export default connect(
  mapState,
  null
)(Home);
