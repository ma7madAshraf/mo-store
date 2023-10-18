import React from "react";
import styled from "styled-components";
import emptyCart from "../assets/empty-cart.svg";
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";
import { CartContent, PageHero } from "../components";

const CartPage = () => {
  const { cart } = useCartContext();
  if (cart.length < 1) {
    return (
      <Wrapper className="page-100">
        <div className="empty">
          <h2>your cart is empty</h2>
          <Link to="/products" className="btn">
            fill it
          </Link>
        </div>
        <img src={emptyCart} alt="empty cart" className="empty-cart" />
      </Wrapper>
    );
  }
  return (
    <main>
      <PageHero title="cart" />
      <Wrapper className="page">
        <CartContent />
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  @media (min-width: 768px) {
    flex-direction: row;
  }
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
  .empty-cart {
    display: block;
    width: 400px;
    margin: 10px;
    @media (min-width: 768px) {
      width: 300px;
    }
  }
`;

export default CartPage;
