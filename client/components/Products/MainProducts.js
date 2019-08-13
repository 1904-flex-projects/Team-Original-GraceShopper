import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getNextTierCategories, gotUpdatedCats } from '../../redux';
import { Link } from 'react-router-dom';
import ProductNav from './ProductNav';
import CurrentCategories from './CurrentCategories';
import ProductCard from './ProductCard';

const MainProducts = props => {
  const {
    topLevelCategories,
    currentCategories,
    allCategories,
    getNextTier,
    updateCategories,
    location,
    allProducts,
  } = props;

  //parse the url for the api call to get the next list of categories
  const renderPath = params => {
    let path = '/api/categories';
    if (params.pc1) {
      path += `/${params.pc1}`;
    }
    if (params.pc2) {
      path += `/${params.pc2}`;
    }
    if (params.pc3) {
      path += `/${params.pc3}`;
    }
    return path;
  };

  const getParamsArray = params => {
    let paramsArr = [];
    if (params.pc1) {
      paramsArr.push(params.pc1);
    }
    if (params.pc2) {
      paramsArr.push(params.pc2);
    }
    if (params.pc3) {
      paramsArr.push(params.pc3);
    }
    return paramsArr;
  };

  const filterProducts = (products, currentLevel, currentCategoryId) => {
    if (currentLevel === 0) {
      return products;
    }
    return products.filter(
      product =>
        product[`parent_category_${currentLevel}`] ===
        parseInt(currentCategoryId)
    );
  };

  const params = props.match.params;
  const paramsArr = getParamsArray(params);

  // used for querying the categories database to find the next tier of categories
  const currentLevel = Object.keys(params).length;
  const nextPcLevel = currentLevel + 1;

  const path = renderPath(params);

  const currentProducts = filterProducts(
    allProducts,
    currentLevel,
    paramsArr[paramsArr.length - 1]
  );

  useEffect(() => {
    // only grab next tier if not at the deepest level
    // and not at the root level
    if (Object.keys(params).length && nextPcLevel <= 3) {
      getNextTier(path);
    } else {
      // root level
      updateCategories(topLevelCategories);
    }
  }, [location.pathname]); // rerender everytime the path changes

  return (
    <div id="main-products-container">
      <ProductNav allCategories={allCategories} params={params} />
      <CurrentCategories
        currentCategories={currentCategories}
        location={location}
        nextPcLevel={nextPcLevel}
      />
      <div id="products-container">
        {currentProducts.map(prod => {
          return (
            <Link key={prod.id} to={`/products/single/${prod.id}`}>
              <ProductCard product={prod} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const mapDispatch = dispatch => ({
  getNextTier: path => {
    dispatch(getNextTierCategories(path));
  },
  updateCategories: categories => {
    dispatch(gotUpdatedCats(categories));
  },
});

const mapState = ({ product }) => {
  return {
    currentCategories: product.currentCategories,
    currentProducts: product.currentProducts,
    topLevelCategories: product.topLevelCategories,
    allCategories: product.allCategories,
    allProducts: product.allProducts,
  };
};

export default connect(
  mapState,
  mapDispatch
)(MainProducts);
