import React, { useEffect } from "react";
import styled from "styled-components";
import noOrders from "../assets/no_data.svg";
import { Link } from "react-router-dom";
import { PageHero } from "../components";
import { useUserContext } from "../context/user_context";
import OrderContent from "../components/OrderContent";

const OrdersPage = () => {
  const { myUser } = useUserContext();
  const getOrders = () => {
    if (myUser) {
      return JSON.parse(localStorage.getItem(`${myUser.name}Orders`));
    }
  };
  const orders = getOrders();
  useEffect(() => {
    getOrders();
    // eslint-disable-next-line
  }, [myUser]);

  if (!orders) {
    return (
      <Wrapper className="page-100">
        <div className="empty">
          <h2>you have no orders</h2>
          <Link to="/products" className="btn">
            Order Now
          </Link>
        </div>
        <img src={noOrders} alt="no orders" className="no-orders" />
      </Wrapper>
    );
  }
  return (
    <main>
      <PageHero title="orders" />
      <Wrapper className="page">
        <section className="section section-center orders">
          {orders.map((ele) => {
            const { date, order } = ele;
            console.log(order);
            return <OrderContent date={date} order={order} />;
          })}
          <Link to="/products" className="btn order">
            Order Now
          </Link>
        </section>
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
  .orders {
    width: 95vw;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
  .no-orders {
    display: block;
    width: 400px;
    margin: 10px;
    @media (min-width: 768px) {
      width: 300px;
    }
  }
  a.order {
    width: fit-content;
    margin: 1rem auto;
  }
`;
export default OrdersPage;
