import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaCheck, FaHeart } from "react-icons/fa";
import { useCartContext } from "../context/cart_context";
import AmountButtons from "./AmountButtons";

const AddToCart = ({ theProduct, wished, setWished }) => {
  const { id, stock, colors } = theProduct;
  const [mainColor, setMainColor] = useState("");
  const [amount, setAmount] = useState(1);
  const { addToCart, addToWish, removeWishItem } = useCartContext();

  const increase = () => {
    if (amount + 1 < stock) {
      setAmount(amount + 1);
    }
  };
  const decrease = () => {
    console.log(amount);
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };
  useEffect(() => {
    if (colors) {
      setMainColor(colors[0]);
    }
  }, [colors]);
  return (
    <Wrapper>
      <div className="colors">
        <span>colors :</span>
        <div>
          {colors &&
            colors.map((ele, index) => {
              return (
                <button
                  key={index}
                  className={
                    ele === mainColor ? "active color-btn" : "color-btn"
                  }
                  style={{ backgroundColor: ele }}
                  onClick={() => {
                    setMainColor(ele);
                  }}
                >
                  {mainColor === ele ? <FaCheck /> : ""}
                </button>
              );
            })}
        </div>
      </div>
      <div className="btn-container">
        <AmountButtons
          amount={amount}
          increase={increase}
          decrease={decrease}
        />
        <button
          className="btn add-to-cart"
          onClick={() => addToCart(id, mainColor, amount, theProduct)}
        >
          add to cart
        </button>
        <button
          className={`btn ${wished ? "remove-wish" : "add-to-wish"} `}
          onClick={() => {
            if (!wished) {
              addToWish(id, theProduct);
              setWished(true);
            } else {
              removeWishItem(id);
              setWished(false);
            }
          }}
        >
          <FaHeart />
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
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
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
  .add-to-cart {
    width: 170px;
    text-align: center;
  }
  .add-to-wish {
    margin-left: 1rem;
    width: fit-content;
  }
  .remove-wish {
    background-color: var(--clr-red-dark);
    width: fit-content;
  }
`;
export default AddToCart;
