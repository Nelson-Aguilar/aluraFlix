import styled from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
isPropValid("size");

export const Btn = styled.button`
  width: 18rem;
  height: 5.4rem;
  flex-shrink: 0;
  text-align: center;
  font-family: "Roboto";
  font-size: 2.1rem;
  font-style: normal;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  background-color: ${(props) =>
    props.variant === "blue" ? "#2A7AE4" : "#dedede"};
  color: ${(props) => (props.variant === "blue" ? "#f5f5f5" : "#000000")};
  @media screen and (max-width: 768px) {
    width: ${(props) => (props.size === "full" ? " 320px" : "14rem")};
    font-size: 1.5rem;
  }
`;
