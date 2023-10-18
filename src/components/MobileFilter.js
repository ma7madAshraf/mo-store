import React from "react";
import styled from "styled-components";
import { BsFillGridFill, BsList } from "react-icons/bs";

import { useProductsContext } from "../context/products_context";
import { useFilterContext } from "../context/filter_context";
const MobileFilter = () => {
  const { openMobFilter } = useProductsContext();
  const { gridView, sort, setGrid, setList, updateSort } = useFilterContext();
  return (
    <Wrapper>
      <button className="btn" onClick={openMobFilter}>
        Filter
      </button>
      <div className="btn-container">
        <button onClick={setGrid} className={gridView ? "active" : ""}>
          <BsFillGridFill />
        </button>
        <button onClick={setList} className={gridView ? "" : "active"}>
          <BsList />
        </button>
      </div>
      <select
        name="sort"
        id="sort"
        className="sort-input"
        value={sort}
        onChange={(e) => {
          updateSort(e.target.value);
        }}
      >
        {" "}
        <option value="name-a">name (a-z)</option>
        <option value="name-z">name (z-a)</option>
        <option value="price-lowest">price (lowest)</option>
        <option value="price-highest">price (highest)</option>
      </select>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  background: var(--clr-primary-10);
  width: 100vw;
  min-height: 04px;
  position: fixed;
  bottom: 0px;
  padding: 8px;
  display: grid;
  grid-template-columns: 5fr 2fr 5fr;
  .btn {
    width: 100%;
    height: 40px;
  }
  .btn-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    button {
      background: transparent;
      border: 1px solid var(--clr-black);
      color: var(--clr-black);
      width: 1.5rem;
      border-radius: var(--radius);
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        font-size: 1rem;
      }
    }
    .active {
      background: var(--clr-black);
      color: var(--clr-white);
    }
  }

  .sort-input {
    border-color: transparent;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    width: 100%;
    background: var(--clr-primary-5);
    height: 40px;
    border-radius: 5px;
  }
  option {
    background-color: #fff;
    :hover {
      background-color: var(--clr-primary-5);
    }
  }
  @media (min-width: 768px) {
    display: none;
  }
`;

export default MobileFilter;
