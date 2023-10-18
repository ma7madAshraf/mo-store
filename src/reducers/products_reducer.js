import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const products_reducer = (state, action) => {
  if (action.type === SIDEBAR_OPEN) {
    return (state = { ...state, sidebar: true });
  }
  if (action.type === SIDEBAR_CLOSE) {
    return (state = { ...state, sidebar: false });
  }
  if (action.type === "OPEN_MOBILE") {
    return (state = { ...state, mobFilter: true });
  }
  if (action.type === "CLOSE_MOBILE") {
    return (state = { ...state, mobFilter: false });
  }
  if (action.type === GET_PRODUCTS_BEGIN) {
    return (state = { ...state, products_loading: true });
  }
  if (action.type === GET_PRODUCTS_SUCCESS) {
    const featProducts = action.payload.filter((ele) => ele.featured === true);
    return (state = {
      ...state,
      products_loading: false,
      allProducts: action.payload,
      featProducts: featProducts,
    });
  }
  if (action.type === GET_PRODUCTS_ERROR) {
    return (state = {
      ...state,
      products_loading: false,
      products_error: true,
    });
  }
  if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
    return (state = {
      ...state,
      product_loading: true,
      product_error: false,
    });
  }
  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return (state = {
      ...state,
      product_loading: false,
      theProduct: action.payload,
    });
  }
  if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return (state = { ...state, product_loading: false, product_error: true });
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;
