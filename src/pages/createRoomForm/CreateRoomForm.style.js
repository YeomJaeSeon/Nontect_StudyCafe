import styled, { keyframes } from "styled-components";

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
