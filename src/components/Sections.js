import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import pc from "../assets/section-pc.jpeg";
import ps5 from "../assets/section-PS5.jpeg";
import laptop from "../assets/section-laptop.jpeg";
import phone from "../assets/section-phone.jpeg";
import headphone from "../assets/section-accessories.jpeg";
import watch from "../assets/section-watch.jpeg";
import screen from "../assets/section-screen.jpeg";

const Sections = () => {
  return (
    <Wrapper>
      <div className="section-center">
        <article className="header">
          <h3>
            cause you deserve
            <br />
            better
          </h3>
          <p>
            Our new collections with best quality`` temporibus, quis quaerat
            aperiam sunt maiores impedit quidem pariatur placeat quibusdam!
          </p>
        </article>
        <div className="services-center">
          <article className="service">
            <Link to="/desktop">
              <img src={pc} alt="pc" />
              <h3>desktop</h3>
            </Link>
          </article>
          <article className="service">
            <Link to="/laptop">
              <img src={laptop} alt="laptop" />
              <h3>laptop</h3>
            </Link>
          </article>
          <article className="service">
            <Link to="/tv">
              <img src={screen} alt="screen" />
              <h3>screens</h3>
            </Link>
          </article>
          <article className="service">
            <Link to="/mobile">
              <img src={phone} alt="phone" />
              <h3>phones</h3>
            </Link>
          </article>
          <article className="service">
            <Link to="/console">
              <img src={ps5} alt="ps5" />
              <h3>console</h3>
            </Link>
          </article>
          <article className="service">
            <Link to="/accessories">
              <img src={headphone} alt="headphone" />
              <h3>accessories</h3>
            </Link>
          </article>
          <article className="service">
            <Link to="/smart watch">
              <img src={watch} alt="watch" />
              <h3>watches</h3>
            </Link>
          </article>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  h3,
  h4 {
    color: var(--clr-primary-1);
  }
  padding: 5rem 0;

  background: var(--clr-primary-10);

  .header h3 {
    margin-bottom: 2rem;
  }
  p {
    margin-bottom: 0;
    line-height: 1.8;
    color: var(--clr-primary-3);
  }
  .services-center {
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
  .service {
    position: relative;
    box-shadow: 0 0 10px;
    text-align: center;
    border-radius: var(--radius);
    overflow: hidden;
    width: 75vw;
    height: 98%;
    cursor: pointer;
    h3 {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: var(--clr-white);
      text-shadow: 0 0 10px var(--clr-primary-3);
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all 0.7s;
    }
    p {
      color: var(--clr-primary-2);
    }
  }
  span {
    width: 4rem;
    height: 4rem;
    display: grid;
    margin: 0 auto;
    place-items: center;
    margin-bottom: 1rem;
    border-radius: 50%;
    background: var(--clr-primary-10);
    color: var(--clr-primary-1);
    svg {
      font-size: 2rem;
    }
  }
  @media (min-width: 992px) {
    .header {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 576px) {
    .services-center {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 350px));
      justify-content: space-evenly;
      gap: auto;
      .service {
        width: auto;
      }
    }
  }
  @media (min-width: 768px) {
    /* .services-center {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: start;
    } */
  }
  @media (min-width: 1280px) {
    padding: 0;
    .section-center {
      transform: translateY(5rem);
    }
  }
  .service:hover img {
    transform: rotate(15deg) scale(1.3);
  }
`;
export default Sections;
