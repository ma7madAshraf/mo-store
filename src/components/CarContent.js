import React from "react";
import styled from "styled-components";
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";
import shoppingCart from "../assets/shopping-cart.svg";
import CartColumns from "./CartColumns";
import CartItem from "./CartItem";
import CartTotals from "./CartTotals";

const CartContent = () => {
  const { cart, clearCart } = useCartContext();
  return (
    <Wrapper className="section section-center">
      <CartColumns />
      {cart.map((ele) => {
        return <CartItem key={ele.id} {...ele} />;
      })}
      <hr />
      <div className="link-container">
        <Link to="/products" className="link-btn">
          continue shopping
        </Link>
        <button className="link-btn clear-btn" onClick={clearCart}>
          clear shopping cart
        </button>
      </div>
      <div className="shopping">
        <img className="shopping-cart" src={shoppingCart} alt="shopping cart" />
        <CartTotals />
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
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
  }
  .shopping {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: space-around;
    .shopping-cart {
      width: 400px;
      margin-top: 1rem;
    }
  }
  @media (min-width: 768px) {
    .shopping {
      flex-direction: row;
      .shopping-cart {
        width: 50vw;
      }
    }
  }
`;
export default CartContent;
