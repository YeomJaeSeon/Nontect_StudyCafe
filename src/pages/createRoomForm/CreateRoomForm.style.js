import styled, { keyframes } from "styled-components";
import * as style from "../../utils/css-utils";


export const BackgroundContainer = styled.div`
width: 100vw;
height: 100vh;  

  background-color: ${style.BackgroundColor};
`;



export const Container = styled.div`
  text-align: center;
 
`;

const spin = keyframes`
  0%{
    tranform : rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
`;

export const LoadingSpinner = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 15px solid gray;
  border-top: 15px solid blue;
  animation: ${spin} 2s infinite linear;
`;

export const LoadingSpinnerContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Facemesh = styled.div`
    visibility: hidden;
 `;

export const FocusTimer = styled.div`
    marginLeft: 50px;
    marginRight: 50px;
    left: 0;
    position: absolute;
    text-align: center;
    bottom: 0;
`;
