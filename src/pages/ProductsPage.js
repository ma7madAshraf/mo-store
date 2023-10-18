import React, { useEffect } from "react";
import styled from "styled-components";
import {
  Filters,
  ProductList,
  Sort,
  PageHero,
  MobileFilter,
} from "../components";
import { useParams } from "react-router-dom";
import { useFilterContext } from "../context/filter_context";

const ProductsPage = () => {
  const { preFiltered } = useFilterContext();
  const { cat } = useParams();
  useEffect(() => {
    preFiltered(cat);
    // eslint-disable-next-line
  }, [cat]);
  return (
    <main>
      <PageHero title="products" />
      <Wrapper className="page">
        <div className="section-center products">
          <Filters />
          <div>
            <Sort />
            <ProductList />
          </div>
        </div>
        <MobileFilter />
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`;

export default ProductsPage;
