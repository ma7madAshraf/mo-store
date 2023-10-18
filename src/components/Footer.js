import React from "react";
import styled from "styled-components";
import logo2 from "../assets/mlogo.png";
const Footer = () => {
  return (
    <Wrapper>
      <div className="upper">
        <h5 className="year">&copy;{new Date().getFullYear()}</h5>

        <img src={logo2} alt="logo" />
      </div>
      <h5>All Rights Reserved</h5>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--clr-black);
  text-align: center;
  .year {
    color: var(--clr-primary-5);
  }
  .upper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    img {
      width: 100px;
    }
  }
  h5 {
    color: var(--clr-white);
    margin: 0.1rem;

    font-weight: 400;
    text-transform: none;
    line-height: 1.25;
  }
  @media (min-width: 776px) {
    flex-direction: row;
    gap: 50px;
  }
`;

export default Footer;
