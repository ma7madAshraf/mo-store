import React from "react";
import { PageHero } from "../components";
import styled from "styled-components";
import { useCartContext } from "../context/cart_context";
import GridView from "../components/GridView";
import { Link } from "react-router-dom";
import emptyList from "../assets/empty_wishlist.svg";
const WishlistPage = () => {
  const { clearWish, wishlist } = useCartContext();
  console.log(wishlist);
  return (
    <main>
      <PageHero title="wishList" />
      <Wrapper className="page">
        {wishlist.length < 1 && (
          <>
            <div className="empty">
              <h2>your wishlist is empty</h2>
              <Link to="/products" className="btn">
                fill it
              </Link>
            </div>
            <img src={emptyList} alt="empty list" className="empty-list" />
          </>
        )}
        {wishlist.length > 0 && (
          <div className="section-center products">
            <GridView products={wishlist} />{" "}
            <button className="link-btn clear-btn" onClick={clearWish}>
              clear wishlist
            </button>{" "}
          </div>
        )}
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  .empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    margin: 1rem;
  }
  .empty-list {
    width: 400px;
    margin: 1rem auto;
    display: block;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background: var(--clr-black);
    margin: 1rem auto;
    font-size: 18px;
    display: block;
  }
`;
export default WishlistPage;
