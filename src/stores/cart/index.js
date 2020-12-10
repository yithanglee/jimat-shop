import { createContext, useContext } from 'react';

const CartContext = createContext({});
export const useCart = () => {
  let cart = useContext(CartContext);

  function setupCart(cartItems) {
    cart = cartItems;
  }

  function editByItem(item) {
    if (item.quantity === 0) {
      delete cart[item.id];
    } else {
      cart[item.id] = { ...cart[item.id], ...item };
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  function removeCart() {
    cart = {};
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function isEmpty() {
    return Object.keys(cart).length === 0;
  }
  const cartUtils = {
    setupCart,
    editByItem,
    removeCart,
    isEmpty,
  };

  return [cart, cartUtils];
};

export default CartContext;
