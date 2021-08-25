import styled from 'styled-components';
import * as style from '../../utils/css-utils';


export const BackgroundContainer = styled.div`
width: 100vw;
height: 100vh;  

position: fixed;
background-color: ${style.BackgroundColor};
`;


export const Background = styled.img`
width: 100vw;
height: 100vh;  
opacity: 0.5;
position: absolute;
z-index:-1;
`;


export const MainContainer = styled.div`
  width: 90%;
  height: 500px;
  background-color: ${style.BoxColor};
  margin: auto;
  opacity:0.6;

  border: 1px solid ${style.MainColor};
  border-radius: 5px;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.75);
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
  
  transition: all 0.4s;
  color: ${style.MainColor};
  &:hover {
    
    transform: scale(1.10);
    color:${style.HeaderButtonColor};
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

  margin-right: ${(props) => (props.left ? '15px' : null)};
  font-weight: bolder;
  cursor: pointer;
  transition: all 0.4s;

  &:hover {
    background-color: ${style.HeaderButtonColor};
    transform: scale(1.10);
    color:white;

  }
`;
