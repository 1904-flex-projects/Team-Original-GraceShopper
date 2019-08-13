import axios from 'axios';
import {
  ADD_TO_CART,
  CLEAR_CART,
  DECREASE_CART_QTY,
  GOT_CART,
  INCREASE_CART_QTY,
  REMOVE_FROM_CART,
  SUBMIT_ORDER,
} from '../actionCreators/cartCreators';

const initialState = {
  cart: [],
};

// Reducer helper functions
const newCartToReducer = (cart, product, mode, qty = 1) => {
  let wasFound = false;
  let newCart = cart.map(cartProd => {
    const newProduct = Object.assign({}, cartProd);
    if (newProduct.product.id === product.id) {
      if (mode === ADD_TO_CART) {
        newProduct.qty += qty;
        wasFound = true;
      }
      if (mode === INCREASE_CART_QTY) {
        newProduct.qty += 1;
        wasFound = true;
      }
      if (mode === DECREASE_CART_QTY) {
        newProduct.qty -= 1;
        wasFound = true;
      }
    }
    return newProduct;
  });
  if (!wasFound && mode === ADD_TO_CART) {
    newCart = newCart.concat([{ product, qty }]);
  }
  return { cart: newCart };
};

const removeProductFromCart = (cart, product) => {
  const newCart = cart
    .map(cartProd => {
      const newProd = Object.assign({}, cartProd);
      return newProd;
    })
    .filter(newCartProd => product.id !== newCartProd.productId);
  console.log('new', newCart);
  return { cart: newCart };
};

const updateCartToDb = cart => {
  return axios
    .post('/api/carts', cart)
    .then(() => {
      console.log('DB updated cart', cart);
    })
    .catch(() => console.log('Error updating cart to db!'));
};

const removeCartProductFromDb = product => {
  return axios
    .delete('/api/carts', { where: { productId: product.id } })
    .then(res => res.data)
    .then(() => {
      console.log('DB removed product from cart', product);
    })
    .catch(() => console.log('Error removing product from cart db!'));
};

// Reducer
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { product, qty } = action;
      const updatedCart = newCartToReducer(
        state.cart,
        product,
        ADD_TO_CART,
        qty
      );
      updateCartToDb(updatedCart);

      return updatedCart;
    }
    case GOT_CART: {
      return { cart: action.cart };
    }
    case CLEAR_CART: {
      return { cart: [] };
    }
    case INCREASE_CART_QTY: {
      const { product } = action;
      const updatedCart = newCartToReducer(
        state.cart,
        product,
        INCREASE_CART_QTY,
        1
      );
      updateCartToDb(updatedCart);

      return updatedCart;
    }
    case DECREASE_CART_QTY: {
      const { product } = action;
      const updatedCart = newCartToReducer(
        state.cart,
        product,
        DECREASE_CART_QTY,
        1
      );
      updateCartToDb(updatedCart);

      return updatedCart;
    }
    case REMOVE_FROM_CART: {
      const { product } = action;
      console.log('remove', product);
      const updatedCart = removeProductFromCart(state.cart, product);
      console.log('update cart', updatedCart);
      removeCartProductFromDb(product);
      updateCartToDb(updatedCart);

      return updatedCart;
    }
    case SUBMIT_ORDER: {
      const { cart } = action.cart;
      const emptyCart = { cart: [] };
      // Send cart with submitOrder flag to find and update.
      updateCartToDb({ cart, submitOrder: true });

      // Return empty cart to state; order placed and processed
      return emptyCart;
    }
    default:
      return state;
  }
};

export default cartReducer;
