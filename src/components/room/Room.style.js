import styled from 'styled-components';
import * as style from '../../utils/css-utils';

export const RoomContainer = styled.div`
  width: 40%;
  height: 120px;
  margin-left: 50px;
  margin-right: 30px;
  background-color: orange;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 300ms ease;
  &:hover {
    border: 2px solid ${style.MainColor};
  }
`;

export const RoomTitleBox = styled.div`
  margin: auto;
  text-align: center;
  background-color: white;
  width: 80%;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  color: gray;
  margin-top: 10px;
`;

export const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const HashTagContainer = styled.div`
  background-color: white;
  padding: 5px 10px;
`;

export const HashTagContent = styled.span``;
