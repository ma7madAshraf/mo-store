import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import heroBcg from "../assets/Hero-big.jpeg";
import heroBcg2 from "../assets/hero-small.jpeg";
import overlay from "../assets/overlay2.jpeg";
const Hero = () => {
  return (
    <Wrapper className="section-center">
      <article className="content">
        <img src={overlay} alt="hero1" className="overlay-img" />
        <h1>
          We adore technology. <br />
          We are passionate about innovation.
        </h1>
        <p>
          We in Mo store adore technology adipisicing elit. Iusto voluptatibus
          nihil ea earum omnis, eius eveniet architecto a ullam sapiente.
        </p>
        <Link to="/products" className="btn hero-btn">
          Shop now
        </Link>
      </article>
      <article className="img-container">
        <img src={heroBcg} alt="hero1" className="main-img" />
        <img src={heroBcg2} alt="hero2" className="accent-img" />
      </article>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 5rem;
  .content {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 1.5rem;
    .overlay-img {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -2;
      top: 0;
      left: 0;
    }
    h1 {
      font-family: "Telma", cursive;
    }
    p {
      display: none;
    }
  }

  min-height: 60vh;
  display: grid;
  place-items: center;
  .img-container {
    display: none;
  }

  p {
    line-height: 2;
    max-width: 45em;
    margin-bottom: 2rem;
    color: var(--clr-grey-5);
    font-size: 1rem;
  }
  @media (min-width: 992px) {
    height: calc(100vh - 5rem);
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
    h1 {
      margin-bottom: 1rem;
    }
    p {
      font-size: 1.25rem;
    }
    .hero-btn {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    }
    .overlay-img {
      display: none;
    }
    .img-container {
      display: block;
      position: relative;
    }
    .main-img {
      width: 100%;
      height: 550px;
      position: relative;
      border-radius: var(--radius);
      display: block;
      object-fit: cover;
    }
    .accent-img {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 250px;
      transform: translateX(-50%);
      border-radius: var(--radius);
    }
    .img-container::before {
      content: "";
      position: absolute;
      width: 10%;
      height: 80%;
      background: var(--clr-primary-9);
      bottom: 0%;
      left: -8%;
      border-radius: var(--radius);
    }
  }
`;

export default Hero;
