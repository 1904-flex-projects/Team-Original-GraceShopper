import axios from 'axios';

// action constants
export const GOT_ALL_PRODUCTS = 'GOT_ALL_PRODUCTS';
export const GOT_TOP_TIER_CATS = 'GOT_TOP_TIER_CATS';
export const GOT_NEXT_TIER_CATS = 'GOT_NEXT_TIER_CATS';
export const GOT_ALL_CATEGORIES = 'GOT_ALL_CATEGORIES';
export const GOT_UPDATED_PRODUCTS = 'GOT_UPDATED_PRODUCTS';
export const GOT_UPDATED_CATS = 'GOT_UPDATED_CATS';

//action creators
export const gotAllProducts = products => {
  return { type: GOT_ALL_PRODUCTS, products };
};

export const gotTopTierCats = categories => {
  return { type: GOT_TOP_TIER_CATS, categories };
};

export const gotNextTierCats = categories => {
  return { type: GOT_NEXT_TIER_CATS, categories };
};

export const gotAllCategories = categories => {
  return { type: GOT_ALL_CATEGORIES, categories };
};

export const gotUpdatedProducts = updatedProducts => {
  return { type: GOT_UPDATED_PRODUCTS, updatedProducts };
};

export const gotUpdatedCats = updatedCats => {
  return { type: GOT_UPDATED_CATS, updatedCats };
};

// thunks
export const getAllProducts = () => {
  return (dispatch, getState) => {
    return axios
      .get('/api/products')
      .then(res => {
        dispatch(gotAllProducts(res.data));
        const { product: currentProducts } = getState();
        // populate currentProducts with all products if empty
        if (!currentProducts.length) {
          dispatch(gotUpdatedProducts(res.data));
        }
      })
      .catch(e => console.log(e));
  };
};

export const getTopTierCategories = () => {
  return (dispatch, getState) => {
    return axios
      .get('/api/categories/level1')
      .then(res => {
        dispatch(gotTopTierCats(res.data));
        const { product: currentCategories } = getState();
        // populate current categories with top tier if empty
        if (!currentCategories.length) {
          dispatch(gotUpdatedCats(res.data));
        }
      })
      .catch(e => console.log(e));
  };
};

export const getNextTierCategories = path => {
  return dispatch => {
    return axios
      .get(path)
      .then(res => {
        const nextTierCats = res.data;
        dispatch(gotNextTierCats(nextTierCats));
      })
      .catch(e => console.error(e));
  };
};

export const getAllCategories = () => {
  return dispatch => {
    return Promise.all([
      axios.get('/api/categories/level1'),
      axios.get('/api/categories/level2'),
      axios.get('/api/categories/level3'),
    ])
      .then(([pc1, pc2, pc3]) => {
        const categories = { pc1: [], pc2: [], pc3: [] };
        categories.pc1 = pc1.data;
        categories.pc2 = pc2.data;
        categories.pc3 = pc3.data;
        console.log('categories', categories);
        dispatch(gotAllCategories(categories));
      })
      .catch(e => console.error(e));
  };
};
