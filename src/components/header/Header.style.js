import styled from 'styled-components';
import * as style from '../../utils/css-utils';

export const HeaderContainer = styled.header`
  display: flex;
  position: fixed;
  top: 0;
  background-color: ${style.MainColor};
  width: 100%;
  height: 60px;
`;

export const InfoBtn = styled.button`
  position: absolute;
  font-weight: bolder;
  width: 80px;
  height: 30px;
  right: 120px;
  top: 15px;
  background-color: ${style.BoxColor};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
`;

export const LogoutBtn = styled.button`
  position: absolute;
  font-weight: bolder;
  width: 80px;
  height: 30px;
  right: 20px;
  top: 15px;
  background-color: ${style.BoxColor};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
`;
