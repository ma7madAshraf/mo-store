import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  COUNT_WISh_TOTAL,
  REMOVE_WISH_ITEM,
  CLEAR_WISH,
  ADD_TO_WISH,
} from "../actions";

const getLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }
};
const getWishlist = () => {
  let wish = localStorage.getItem("wish");
  if (wish) {
    return JSON.parse(localStorage.getItem(`wish`));
  } else {
    return [];
  }
};
const initialState = {
  cart: getLocalStorage(),
  totalItems: [],
  totalPrice: [],
  wishlist: getWishlist(),
  wishTotal: 0,
  shippingFee: 1099,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //add to cart
  const addToCart = (id, color, amount, product) => {
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
  };
  //add to wishlist
  const addToWish = (id, product) => {
    dispatch({ type: ADD_TO_WISH, payload: { id, product } });
  };
  //add to localStorage
  useEffect(() => {
    if (state.cart) {
      localStorage.setItem("cart", JSON.stringify(state.cart));
      dispatch({ type: COUNT_CART_TOTALS });
    }
    if (state.wishlist) {
      if (state.wishlist) {
        localStorage.setItem("wish", JSON.stringify(state.wishlist));
        dispatch({ type: COUNT_WISh_TOTAL });
      }
    }
  }, [state.cart, state.wishlist]);
  //remove item from cart
  const removeItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };
  //remove item from wishlist
  const removeWishItem = (id) => {
    dispatch({ type: REMOVE_WISH_ITEM, payload: id });
  };
  //toggle amount
  const toggleAmount = (id, type) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, type } });
  };
  //clear cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  //clear wishlist
  const clearWish = () => {
    dispatch({ type: CLEAR_WISH });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        clearCart,
        removeItem,
        toggleAmount,
        addToWish,
        removeWishItem,
        clearWish,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
