import styled from "styled-components";
import * as style from "../../utils/css-utils";

export const HeaderContainer = styled.header`
  margin-bottom: 0;
  position: fixed;
  top: 0;
  background-color: ${style.MainColor};
  width: 100%;
  height: 60px;
  display: flex;
`;

export const InfoBtn = styled.button`
  position: absolute;
  font-weight: bolder;
  width: 80px;
  height: 30px;
  right: 120px;
  top: 7px;
  background-color: ${style.BoxColor};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
`;

export const LogoContainer = styled.img`
  position: absolute;
  width: 140px;
  height: 50px;
  left: 0;
  top: 4px;
  cursor: pointer;
`;

export const LogoutBtn = styled.button`
  position: absolute;
  font-weight: bolder;
  width: 80px;
  height: 30px;
  right: 20px;
  top: 7px;
  background-color: ${style.BoxColor};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
`;
