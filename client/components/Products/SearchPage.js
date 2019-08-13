import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ProductCard from './ProductCard';

const SearchPage = props => {
  // queryString creates an object of key value pairs based on the query url
  // location.search is where react stores the query url
  const { query } = queryString.parse(location.search);
  const { allProducts } = props;

  const queries = query.toLowerCase().split(' ');

  // check if any of the search terms are in the name, description, or category of a product
  const foundProducts = allProducts.filter(prod => {
    let { name, description, category } = prod;
    name = name.toLowerCase();
    description = description.toLowerCase();
    category = category.toLowerCase();
    let matchCount = 0;
    for (let i = 0; i < queries.length; i++) {
      const currentQuery = queries[i];
      if (
        name.includes(currentQuery) ||
        description.includes(currentQuery) ||
        category.includes(currentQuery)
      ) {
        matchCount += 1;
      }
    }
    // only return true if 70% of the search query words match the product in some way
    if (matchCount / queries.length > 0.7) {
      return true;
    }
    return false;
  });

  console.log('found products', foundProducts);
  return (
    <div>
      <p>searching for... {query}</p>
      <div id="products-container">
        {foundProducts.length ? (
          foundProducts.map(prod => {
            return (
              <Link key={prod.id} to={`/products/single/${prod.id}`}>
                <ProductCard product={prod} />
              </Link>
            );
          })
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};
const mapState = ({ product: { allProducts } }) => ({ allProducts });
export default connect(mapState)(SearchPage);
