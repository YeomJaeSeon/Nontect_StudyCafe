import styled from "styled-components";
import * as style from "../../utils/css-utils";

export const RoomContainer = styled.div`
  width: 40%;
  height: 120px;
  margin-left: 50px;
  margin-right: 30px;
  
  background-color: ${style.RoomColor};
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 300ms ease;
  border-radius: 7px;
  &:hover {
    border: 3px solid ${style.MainColor};
    border-color : ${style.HeaderButtonColor};
    transform: scale(1.05);
    
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
  color: black;
  margin-top: 10px;
  border-radius: 7px;
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
  border-radius: 7px;
`;

export const HashTagContent = styled.span`
  color: #757575;
`;

export const PeopleCountContent = styled.div`
  color: ${(props) =>
    props.peopleCount == 6 ? style.HeaderButtonColor : "black"};
`;
