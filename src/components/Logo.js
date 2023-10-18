import styled from "styled-components";

const Logo = () => {
  return (
    <Wrapper>
      <span>MO</span>Store
    </Wrapper>
  );
};
const Wrapper = styled.h3`
  font-family: "Telma", cursive;
  margin-bottom: 0;
  color: var(--clr-grey-1);
  span {
    color: var(--clr-primary-5);
  }
`;

export default Logo;
