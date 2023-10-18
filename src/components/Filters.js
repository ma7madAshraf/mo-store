import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";
import { useProductsContext } from "../context/products_context";

const Filters = () => {
  const { mobFilter, closeMobFilter } = useProductsContext();
  const { allProducts, filters, updateFilters, clearFilters } =
    useFilterContext();
  const {
    text,
    category,
    company,
    color,
    shipping,
    price,
    minPrice,
    maxPrice,
  } = filters;

  const categories = getUniqueValues(allProducts, "category");
  const colors = getUniqueValues(allProducts, "colors");
  const companies = getUniqueValues(allProducts, "company");
  return (
    <Wrapper>
      <div className="content lg ">
        <form onSubmit={(e) => e.preventDefault()} className="form-control">
          <input
            type="text"
            name="text"
            placeholder="search"
            value={text}
            className="search-input"
            onChange={updateFilters}
          />
          {/* start categories */}
          <h5>category</h5>
          {categories.map((ele) => {
            return (
              <button
                key={ele}
                value={ele}
                name="category"
                //${ele==="all"?"all-btn":""}
                className={`${ele === category ? "active" : ""}  `}
                onClick={updateFilters}
              >
                {ele}
              </button>
            );
          })}
          {/* end categories */}
          {/* start companies */}
          <div className="form-control">
            <h5>company</h5>
            <select
              name="company"
              id="company"
              value={company}
              className="company"
              onChange={updateFilters}
            >
              {companies.map((e, index) => {
                return (
                  <option key={index} value={e}>
                    {e}
                  </option>
                );
              })}
            </select>
          </div>
          {/* end companies */}
          {/* start colors */}
          <h5>colors</h5>
          <div className="colors">
            {colors.map((e) => {
              if (e === "all") {
                return (
                  <button
                    name="color"
                    key={e}
                    value={e}
                    className={e === color ? "active all-btn" : "all-btn"}
                    onClick={updateFilters}
                  >
                    all
                  </button>
                );
              }
              return (
                <button
                  name="color"
                  key={e}
                  value={e}
                  className={e === color ? "active color-btn" : "color-btn"}
                  style={{ backgroundColor: e }}
                  onClick={updateFilters}
                >
                  {e === color && <FaCheck />}
                </button>
              );
            })}
          </div>
          {/* end colors */}
          <div className="price">
            <h5>price</h5>
            <p>{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              id="price"
              value={price}
              min={minPrice}
              max={maxPrice}
              onChange={updateFilters}
            />
          </div>
          <div className="shipping form-control">
            <input
              type="checkbox"
              name="shipping"
              checked={shipping}
              id="shipping"
              onChange={updateFilters}
            />
            <label htmlFor="shipping">free shipping</label>
          </div>
        </form>
        <button className="clear-btn" onClick={clearFilters}>
          clear filters
        </button>
      </div>
      {/* /////////////////////////////////////////////////////////////////////////////////////// */}
      {/* mobile filter */}
      <div className={` mob ${mobFilter ? "show" : ""}`}>
        <form onSubmit={(e) => e.preventDefault()} className="form-control">
          <input
            type="text"
            name="text"
            placeholder="search"
            value={text}
            className="search-input"
            onChange={updateFilters}
          />
          {/* start categories */}
          <div className="cat form-control">
            <h5>category</h5>
            <select
              name="category"
              onChange={updateFilters}
              className="company"
              value={category}
            >
              {categories.map((ele) => {
                return (
                  <option
                    key={ele}
                    value={ele}
                    className={`${ele === category ? "active" : ""}  `}
                  >
                    {ele}
                  </option>
                );
              })}
            </select>
          </div>
          {/* end categories */}
          {/* start companies */}
          <div className="form-control">
            <h5>company</h5>
            <select
              name="company"
              id="company"
              value={company}
              className="company"
              onChange={updateFilters}
            >
              {companies.map((e, index) => {
                return (
                  <option key={index} value={e}>
                    {e}
                  </option>
                );
              })}
            </select>
          </div>
          {/* end companies */}
          {/* start colors */}
          <div className="colors-container">
            <h5>colors</h5>
            <div className="colors">
              {colors.map((e) => {
                if (e === "all") {
                  return (
                    <button
                      name="color"
                      key={e}
                      value={e}
                      className={e === color ? "active all-btn" : "all-btn"}
                      onClick={updateFilters}
                    >
                      all
                    </button>
                  );
                }
                return (
                  <button
                    name="color"
                    key={e}
                    value={e}
                    className={e === color ? "active color-btn" : "color-btn"}
                    style={{ backgroundColor: e }}
                    onClick={updateFilters}
                  >
                    {e === color && <FaCheck />}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end colors */}
          <div className="price">
            <h5>price</h5>
            <p>{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              id="price"
              value={price}
              min={minPrice}
              max={maxPrice}
              onChange={updateFilters}
            />
          </div>
          <div className="shipping form-control">
            <input
              type="checkbox"
              name="shipping"
              checked={shipping}
              id="shipping"
              onChange={updateFilters}
            />
            <label htmlFor="shipping">free shipping</label>
          </div>
        </form>
        <div className="btns-container">
          <button className="clear-btn" onClick={clearFilters}>
            clear filters
          </button>
          <button className="clear-btn show-btn" onClick={closeMobFilter}>
            Show products
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .lg {
    display: none;
  }
  .mob {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--clr-white);
    transition: var(--transition);
    transform: translate(-100%);
    z-index: -1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    form {
      gap: 10px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .mob.show {
    transform: translate(0);
    z-index: 999;
  }
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .btns-container {
    display: flex;
    justify-content: space-between;
    width: 70vw;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  .mob .clear-btn {
    width: 30vw;
    height: 50px;
    font-size: 1.25rem;
  }
  .show-btn {
    background-color: var(--clr-primary-5);
    color: #fff;
    padding: 5px;
  }

  @media (min-width: 768px) {
    .content.lg {
      position: sticky;
      top: 1rem;
      display: block;
    }
    .mob {
      display: none;
    }
  }
`;

export default Filters;
