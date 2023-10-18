import React from "react";
import styled from "styled-components";
import { formatPrice } from "../utils/helpers";

const OrderContent = ({ date, order }) => {
  //   console.log(order);
  return (
    <Wrapper>
      {order.map((item) => {
        const { name, amount, price, image } = item;
        return (
          <div className="item">
            <h5 className="name">{name}</h5>
            <img src={image} alt={name} />
            <h5 className="amount">amount: {amount}</h5>
            <h5 className="price">{formatPrice(price)}</h5>
          </div>
        );
      })}
      <h6 className="date">on: {date.slice(0, 10)}</h6>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  border: 1px solid;
  padding: 1rem;
  border-radius: 25px 5px;
  box-shadow: 0 0 3px inset;
  .item {
    display: grid;
    grid-template-columns: 2fr 2fr 1fr 1fr;
    align-items: center;
    .name {
      position: relative;
      width: fit-content;

      &::before {
        content: "";
        position: absolute;
        bottom: 0px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: var(--clr-primary-5);
        border-radius: 55px;
      }
    }
    img {
      width: 85px;
    }
    @media (max-width: 568px) {
      display: flex;
      -moz-box-align: center;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-between;
      img {
        display: none;
      }
      .name {
        color: var(--clr-primary-5);
      }
      .name::before {
        display: none;
      }
    }
  }
`;
export default OrderContent;
