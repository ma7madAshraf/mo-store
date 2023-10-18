import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  COUNT_WISh_TOTAL,
  REMOVE_WISH_ITEM,
  CLEAR_WISH,
  ADD_TO_WISH,
} from "../actions";

const cart_reducer = (state, action) => {
  //add to cart
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    const isExist = state.cart.find((ele) => ele.id === id + color);
    //edit item
    if (isExist) {
      let tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });
      return { ...state, cart: tempCart };
    }
    //new item
    else {
      let newItem = {
        id: id + color,
        name: product.name,
        amount,
        max: product.stock,
        color,
        price: product.price,
        Image: product.images[0].url,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }

  //remove item
  if (action.type === REMOVE_CART_ITEM) {
    let tempCart = state.cart.filter((e) => e.id !== action.payload);
    return { ...state, cart: tempCart };
  }

  //total items & price
  if (action.type === COUNT_CART_TOTALS) {
    const { totalPrice, totalItems } = state.cart.reduce(
      (total, item) => {
        const { amount, price } = item;
        total.totalPrice += amount * price;
        total.totalItems += amount;
        return total;
      },
      {
        totalPrice: 0,
        totalItems: 0,
      }
    );
    return { ...state, totalPrice, totalItems };
  }
  // let totalArray = state.cart.map((e) => e.price * e.amount);
  //   let items = state.cart.map((e) => e.amount);
  //   if (totalArray.length > 0) {
  //     const totalItems = items.reduce((acc, curr) => (acc += curr));
  //     const totalPrice = totalArray.reduce((acc, curr) => (acc += curr));
  //     return { ...state, totalAmount: totalPrice, totalItems: totalItems };
  //   } else {
  //     return { ...state, totalAmount: 0, totalItems: 0 };
  //   }

  //toggle item amount +1 -1
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, type } = action.payload;
    const tempCart = state.cart.map((e) => {
      let { amount, max } = e;
      if (e.id === id) {
        if (type === "increase") {
          if (amount < max) {
            amount += 1;
          }
        }
        if (type === "decrease") {
          if (amount > 1) {
            amount -= 1;
          }
        }
        return { ...e, amount };
      } else {
        return e;
      }
    });
    return { ...state, cart: tempCart };
  }

  //clear cart
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  //************************** */
  // for wishLit
  //ADD_TO_WISH

  if (action.type === ADD_TO_WISH) {
    const { id, product } = action.payload;
    const isExist = state.wishlist.find((ele) => ele.id === id);
    let tempWish;
    if (isExist) {
      tempWish = state.wishlist;
    } else {
      let newItem = { id, ...product, image: product.images[0].url };
      tempWish = [...state.wishlist, newItem];
    }
    return { ...state, wishlist: tempWish };
  }

  //clear wish
  if (action.type === CLEAR_WISH) {
    return { ...state, wishlist: [] };
  }
  //COUNT_WISh_TOTAL
  if (action.type === COUNT_WISh_TOTAL) {
    const total = state.wishlist.length;
    return { ...state, wishTotal: total };
  }
  // REMOVE_WISH_ITEM
  if (action.type === REMOVE_WISH_ITEM) {
    let tempWish = state.wishlist.filter((e) => e.id !== action.payload);
    return { ...state, wishlist: tempWish };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
