import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  //load products
  if (action.type === LOAD_PRODUCTS) {
    let theMax = Math.max(...action.payload.map((e) => e.price));
    let theMin = Math.min(...action.payload.map((e) => e.price));
    return (state = {
      ...state,
      allProducts: [...action.payload],
      filteredProducts: [...action.payload],
      filters: {
        ...state.filters,
        maxPrice: theMax,
        price: theMax,
        minPrice: theMin,
      },
    });
  }

  //grid vs list
  if (action.type === SET_GRIDVIEW) {
    return (state = {
      ...state,
      gridView: true,
    });
  }
  if (action.type === SET_LISTVIEW) {
    return (state = {
      ...state,
      gridView: false,
    });
  }

  //initial sort
  if (action.type === UPDATE_SORT) {
    return (state = {
      ...state,
      sort: action.payload,
    });
  }

  //change sort
  if (action.type === SORT_PRODUCTS) {
    if (state.sort === "name-a") {
      let newList = state.filteredProducts.sort((a, b) => {
        return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
      });
      return (state = { ...state, filteredProducts: newList });
    }
    if (state.sort === "name-z") {
      let newList = state.filteredProducts.sort((a, b) =>
        b.name > a.name ? 1 : a.name > b.name ? -1 : 0
      ); // return b.name.LocaleCompare(a.name)
      return (state = { ...state, filteredProducts: newList });
    }
    if (state.sort === "price-lowest") {
      let newList = state.filteredProducts.sort((a, b) => a.price - b.price);
      // a.price > b.price ? 1 : b.price > a.price ? -1 : 0
      return (state = { ...state, filteredProducts: newList });
    }
    if (state.sort === "price-highest") {
      let newList = state.filteredProducts.sort((a, b) => b.price - a.price);
      // b.price > a.price ? 1 : a.price > b.price ? -1 : 0
      return (state = { ...state, filteredProducts: newList });
    }
  }

  //initial filters
  if (action.type === UPDATE_FILTERS) {
    return (state = {
      ...state,
      filters: {
        ...state.filters,
        [action.payload.name]: action.payload.value,
      },
    });
  }

  //filters
  if (action.type === FILTER_PRODUCTS) {
    //text
    let newList = state.allProducts.filter((ele) =>
      ele.name.includes(state.filters.text)
    );
    //category
    if (state.filters.category) {
      if (state.filters.category !== "all") {
        newList = newList.filter((e) => e.category === state.filters.category);
      }
    }
    //company
    if (state.filters.company) {
      if (state.filters.company !== "all") {
        newList = newList.filter((e) => e.company === state.filters.company);
      }
    }
    //colors
    if (state.filters.color) {
      if (state.filters.color !== "all") {
        // eslint-disable-next-line
        newList = newList.filter((e) => {
          if (e.colors) {
            return e.colors.includes(state.filters.color) ? e : "";
          }
        });
      }
    } //.find
    //shipping
    if (state.filters.shipping) {
      newList = newList.filter((e) => e.shipping === state.filters.shipping);
    }
    //price
    if (state.filters.price) {
      newList = newList.filter((e) => e.price <= state.filters.price);
    }
    return (state = { ...state, filteredProducts: newList });
  }

  //clear filter
  if (action.type === CLEAR_FILTERS) {
    return (state = {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        category: "all",
        company: "all",
        color: "all",
        shipping: false,
        price: state.filters.maxPrice,
      },
    });
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
