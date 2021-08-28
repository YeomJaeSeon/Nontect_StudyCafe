import styled from "styled-components";
import * as style from "../../utils/css-utils";

export const SelectorContainer = styled.div`
  margin: auto;
  width: 90%;
`;

export const Selector = styled.select`
  margin-left: auto;
  margin-top: 20px;
  margin-bottom: 30px;
  background-color: ${style.BackgroundColor};
  border: 1px solid ${style.MainColor};
  border-radius: 5px;
  opacity: 0.9;
  padding: 3px 10px;
  font-weight: bolder;
  color: white;
  font-size: 20px;
`;

export const Input = styled.input`
  background-color: ${style.BoxColor};
  margin-left: 30px;
  margin-top: 20px;
  margin-bottom: 30px;
  padding: 3px 10px;
  font-weight: bolder;
  font-size: 20px;
  opacity: 0.6;

  border: 1px solid ${style.MainColor};
  border-radius: 5px;
`;

export const Select = styled.select`
  background-color: ${style.BoxColor};
  margin-left: 30px;
  margin-top: 20px;
  margin-bottom: 30px;
  padding: 3px 10px;
  font-weight: bolder;
  font-size: 20px;
  opacity: 0.6;

  border: 1px solid ${style.MainColor};
  border-radius: 5px;
`;

export const SearchBtn = styled.button`
  background-color: ${style.BoxColor};
  margin-left: 30px;
  margin-top: 20px;
  margin-bottom: 30px;
  padding: 3px 10px;
  font-weight: bolder;
  font-size: 20px;
  opacity: 0.6;

  border: 1px solid ${style.MainColor};
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.4s;

  &:hover {
    background-color: ${style.HeaderButtonColor};
    transform: scale(1.10);
    color:white;

`;
