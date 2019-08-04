import React from 'react';
import { NavLink } from 'react-router-dom';
import { PRODUCT_NAV_CONTAINER, ACTIVE_CAT_LINK } from './Styles';

const ProductNav = props => {
  const { allCategories, params } = props;
  const renderCategoryChain = () => {
    const { pc1, pc2, pc3 } = params;
    const categoriesArr = [pc1, pc2, pc3];
    // add root level link before all the other links
    const categoryChain = [
      <NavLink key="cat_0" exact to="/products" activeStyle={ACTIVE_CAT_LINK}>
        All Products
      </NavLink>,
    ];
    let currentPath = '/products';

    for (let i = 0; i < categoriesArr.length; i++) {
      const currentCatId = categoriesArr[i];
      // stop the for loop if a parentcategory is undefined
      if (!currentCatId) {
        break;
      }
      categoryChain.push(
        <p key={`spacer_${i}`} style={{ margin: 0, padding: '0px 5px 0 5px' }}>
          :
        </p>
      );
      const currentLevelCats = allCategories[`pc${i + 1}`];
      const currentCatObj = currentLevelCats.find(
        cat => cat[`pcid${i + 1}`] === parseInt(currentCatId, 10)
      );
      let currentCatName = '';
      if (currentLevelCats.length) {
        currentCatName = currentCatObj[`name${i + 1}`];
      }

      currentPath += `/${currentCatId}`;
      categoryChain.push(
        <NavLink
          key={`cat_${i + 1}`}
          exact
          to={currentPath}
          activeStyle={ACTIVE_CAT_LINK}
        >
          {currentCatName}
        </NavLink>
      );
    }

    return categoryChain;
  };

  return <div style={PRODUCT_NAV_CONTAINER}>{renderCategoryChain()}</div>;
};

export default ProductNav;
