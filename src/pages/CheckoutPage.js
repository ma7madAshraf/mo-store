import React from "react";
import styled from "styled-components";
import { PageHero, StripeCheckout } from "../components";
// extra imports
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";
import emptyCart from "../assets/empty-cart.svg";

const CheckoutPage = () => {
  const { cart } = useCartContext();
  return (
    <main>
      <PageHero title="checkout" />
      <Wrapper className="page">
        {cart.length < 1 ? (
          <>
            <div className="empty">
              <h3>your cart is empty</h3>
              <Link to="/products" className="btn">
                fill it
              </Link>
            </div>
            <img src={emptyCart} alt="empty cart" className="empty-cart" />
          </>
        ) : (
          <StripeCheckout />
        )}
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  .empty {
    text-align: center;
  }
  .empty-cart {
    width: 400px;
  }
`;
export default CheckoutPage;
