import React, { useEffect, useContext, useReducer } from "react";
// import { getUniqueValues } from "../utils/helpers";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  allProducts: [],
  filteredProducts: [],
  gridView: true,
  sort: "name-a",
  filters: {
    text: "",
    category: "all",
    company: "all",
    color: "all",
    shipping: false,
    price: 0,
    maxPrice: 0,
    minPrice: 0,
  },
};
const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { allProducts } = useProductsContext();
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: allProducts });
  }, [allProducts]);

  const setGrid = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const setList = () => {
    dispatch({ type: SET_LISTVIEW });
  };
  const updateSort = (sort) => {
    dispatch({ type: UPDATE_SORT, payload: sort });
  };

  const updateFilters = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    console.log(name, value);
    if (name === "shipping") {
      value = e.target.checked;
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };
  const preFiltered = (value) => {
    dispatch({ type: UPDATE_FILTERS, payload: { name: "category", value } });
  };
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };
  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    if (state.sort) {
      dispatch({ type: SORT_PRODUCTS });
    }
  }, [state.sort, allProducts, state.filters]);
  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGrid,
        setList,
        updateSort,
        updateFilters,
        clearFilters,
        preFiltered,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
