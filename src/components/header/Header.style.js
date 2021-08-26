import styled from "styled-components";
import * as style from "../../utils/css-utils";

export const NonHeader = styled.header`
  background-color: ${style.BackgroundColor};
  margin-bottom: 0;
  display:flex;
  position: fixed;
  top: 0;
  width: 100%;
  height: 40px;
`;

export const HeaderContainer = styled.header`
  //margin-bottom: 0;
  position: fixed;
  
  top: 0;
  background-color: ${style.MainColor};
  width: 100%;
  height: 40px;
  display: flex;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.4);
`;

export const InfoBtn = styled.button`
  position: absolute;
  font-weight: bolder;
  width: 80px;
  height: 30px;
  right: 120px;
  top: 5px;
  background-color: ${style.HeaderButtonColor};
  color: white;
  border: none;
  border-radius: 5px;
  transition: all 0.4s;
  &:hover {
    transform: scale(1.1);
    color: white;
  }
`;

export const LogoContainer = styled.img`
  position: absolute;
  width: 140px;
  height: 30px;
  left: 0;
  top: 4px;
  cursor: pointer;
`;

export const LogoutBtn = styled.button`
  color: white;
  position: absolute;
  font-weight: bolder;
  width: 80px;
  height: 30px;
  right: 20px;
  top: 5px;
  background-color: ${style.HeaderButtonColor};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.4s;
  &:hover {
    transform: scale(1.1);
  }
`;
