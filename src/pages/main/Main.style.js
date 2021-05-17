import styled from 'styled-components';
import * as style from '../../utils/css-utils';

export const MainContainer = styled.div`
  width: 80%;
  height: 400px;
  background-color: ${style.BoxColor};
  margin: auto;
  border: 3px solid ${style.MainColor};
`;

export const ButtonBox = styled.div`
  width: 150px;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button`
  width: 50px;
  height: 30px;
  font-size: 40px;
  font-weight: bolder;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: ${style.MainColor};
  &:hover {
    transform: scale(1.1);
  }
`;

export const RoomButtonBox = styled.div`
  float: right;
  margin-right: 150px;
  margin-top: 20px;
`;
export const RoomButton = styled.button`
  padding: 5px 30px;
  font-size: 20px;
  background-color: ${style.BoxColor};
  border: 2px solid ${style.MainColor};
  margin-right: ${(props) => (props.left ? '15px' : null)};
  font-weight: bolder;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
`;
