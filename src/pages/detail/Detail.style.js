import styled from 'styled-components';
import * as style from '../../utils/css-utils';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const LeftContainer = styled.div`
  flex-basis: 70%;
  background-color: beige;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const RightContainer = styled.div`
  flex-basis: 30%;
  background-color: gainsboro;
`;

export const UserContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  list-style: none;
`;

export const User = styled.li`
  background-color: ${style.BoxColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 180px;
  height: 160px;
  padding: 30px;
  margin-right: 50px;
  margin-bottom: 20px;
  border: 2px solid black;
`;
export const UserName = styled.span``;

export const UserMonitor = styled.img`
  width: 170px;
  height: 150px;
`;

export const ChatBox = styled.div`
  background-color: ${style.BoxColor};
  position: relative;
  width: 88%;
  height: 130px;
  margin-bottom: 5px;
  border: 2px solid black;
`;

export const ChatInput = styled.input`
  position: absolute;
  bottom: 0px;
  left: 5px;
  width: 95%;
  border: 2px solid black;
  padding: 3px 10px;
`;
