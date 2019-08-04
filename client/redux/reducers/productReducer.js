import {
  GOT_ALL_PRODUCTS,
  GOT_TOP_TIER_CATS,
  GOT_UPDATED_CATS,
  GOT_UPDATED_PRODUCTS,
  GOT_NEXT_TIER_CATS,
  GOT_ALL_CATEGORIES,
} from '../actionCreators/productsCreators';
import store from '..';

const intialState = {
  allProducts: [], //will not change
  topLevelCategories: [], //will not change
  currentCategories: [],
  currentProducts: [],
  allCategories: { pc1: [], pc2: [], pc3: [] },
};

const productReducer = (state = intialState, action) => {
  switch (action.type) {
    case GOT_ALL_PRODUCTS:
      return { ...state, allProducts: action.products };
    case GOT_TOP_TIER_CATS:
      return { ...state, topLevelCategories: action.categories };
    case GOT_NEXT_TIER_CATS:
      return { ...state, currentCategories: action.categories };
    case GOT_ALL_CATEGORIES:
      return { ...state, allCategories: action.categories };
    case GOT_UPDATED_CATS:
      return { ...state, currentCategories: action.updatedCats };

    case GOT_UPDATED_PRODUCTS:
      return { ...state, currentProducts: action.updatedProducts };
    default:
      return state;
  }
};

export default productReducer;
