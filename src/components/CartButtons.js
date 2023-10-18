import React, { useState } from "react";
import {
  FaShoppingCart,
  FaUserMinus,
  FaUserPlus,
  FaHeart,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import { useProductsContext } from "../context/products_context";
import { useCartContext } from "../context/cart_context";
import { useUserContext } from "../context/user_context";

const CartButtons = ({ sidebar, closeSidebar }) => {
  const { totalItems, clearCart, wishTotal } = useCartContext();
  const { loginWithRedirect, logout, myUser } = useUserContext();
  const [btn, setBtn] = useState(false);
  return (
    <Wrapper className="cart-btn-wrapper">
      <Link
        to="/wishlist"
        className="cart-btn"
        onClick={() => {
          if (sidebar) {
            closeSidebar();
          }
        }}
      >
        <span className="cart-container">
          <FaHeart />
          <span className="cart-value">{wishTotal}</span>
        </span>
      </Link>
      <Link
        to="/Cart"
        className="cart-btn"
        onClick={() => {
          if (sidebar) {
            closeSidebar();
          }
        }}
      >
        <span className="cart-container">
          <FaShoppingCart />
          <span className="cart-value">{totalItems}</span>
        </span>
      </Link>
      {!myUser ? (
        <button className="auth-btn" onClick={loginWithRedirect}>
          login
          <FaUserPlus />
        </button>
      ) : (
        <div
          className="user"
          onClick={() => setBtn(true)}
          onMouseLeave={() => {
            setBtn(false);
          }}
        >
          <div className="image">
            <img src={myUser.picture} alt="user" />
          </div>
          <div className="name">
            {myUser.given_name ? myUser.given_name : myUser.nickname}
          </div>
          {btn && (
            <ul className="user-menu">
              <li>
                <Link to="/wishlist">my wishlist</Link>
              </li>
              <li>
                <Link to="/orders">my orders</Link>
              </li>
              <li
                onClick={() => {
                  clearCart();
                  logout({ returnTo: window.location.origin });
                }}
              >
                logout
                <FaUserMinus />
              </li>
            </ul>
          )}
        </div>
        // <button
        //   className="auth-btn"
        //   onClick={() => {
        //     clearCart();
        //     logout({ returnTo: window.location.origin });
        //   }}
        // >
        //   logout
        //   <FaUserMinus />
        // </button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  align-items: center;
  width: 225px;
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr 2fr;
  }
  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.25rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;

    align-items: center;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
      font-size: 21px;
    }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 10px;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.25rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
      font-size: 21px;
    }
  }
  .user {
    position: relative;
    display: flex;
    justify-content: space-between;
    gap: 5px;
    align-items: center;
    cursor: pointer;
    .name {
      text-transform: capitalize;
      color: var(--clr-primary-7);
    }
    .image {
      overflow: hidden;
      width: 35px;
      height: 36px;
      border-radius: 8px;
      img {
        width: 35px;
        object-fit: cover;
      }
    }
    .user-menu {
      position: absolute;
      bottom: -100px;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 1rem;
      display: flex;
      align-items: center;
      background: var(--clr-primary-9);
      flex-direction: column;
      min-width: 120px;
      padding: 5px 0px;
      border-radius: 5px;

      &::before {
        content: "";
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        border-width: 11px;
        border-style: solid;
        border-image: none;
        border-color: transparent transparent var(--clr-primary-9);
      }
      li {
        margin-bottom: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: capitalize;
        border-radius: 5px;
        transition: var(--transition);
        width: 100%;
        &:hover {
          background-color: var(--clr-primary-5);
          color: var(--clr-white);
        }
      }
      svg {
        height: 1.6rem;
        margin-left: 5px;
        font-size: 18px;
      }
    }
  }
  @media (max-width: 991px) {
    .user,
    .user-menu {
      display: none;
    }
  }
`;
export default CartButtons;
