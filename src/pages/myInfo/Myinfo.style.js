import styled, { keyframes } from "styled-components";
import * as style from "../../utils/css-utils";

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
  z-index: -1;
`;

export const MainContainer = styled.div`
  margin-top: 200px;
  width: 90%;
  height: 500px;

  background-color: ${style.MainContainerColor};
  margin: auto;
  opacity: 0.8;

  border: 0.5px solid ${style.MainColor};
  border-radius: 5px;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.75);
`;

export const Container = styled.div`
  position: fixed;
  display: flex;

  margin-top: 30px;
  top: 50%;
  left: 20%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 550px;

  flex-direction: column;
  align-items: center;

  background-color: ${style.BoxColor};
  opacity: 0.8;
  border: none;
  border-radius: 5px;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.75);
`;

export const SignUpHeader = styled.div`
  width: 100%;
  padding-top: 10px;
  padding-left: 50px;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  color: ${style.BackgroundColor};
`;

export const SubTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: ${style.BackgroundColor};
`;

export const DivLine = styled.div`
  width: 90%;
  height: 2px;
  background-color: ${style.MainColor};
  margin: 10px 0;
`;

export const FormContainer = styled.form`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

export const Input = styled.input`
  width: 80%;
  margin: 15px 0;
  padding: 10px;
  font-size: 20px;
`;

export const SignUpBtn = styled.button`
  padding: 8px;
  color: white;
  background-color: ${style.ButtonColor};
  outline: none;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
  transition: all 300ms ease;
  &:hover {
    background-color: white;
    color: ${style.ButtonColor};
  }
`;

export const LoginBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: ${style.MainColor};
  margin-top: 10px;
  font-size: 15px;
  &:hover {
    transform: scale(1.1);
  }
`;

export const InterestingTitle = styled.h3`
  margin-bottom: 30px;
`;

export const ListContainer = styled.div`
  width: 80%;
  display: flex;
  flex-wrap: wrap;
`;

export const Label = styled.label`
  margin: 10px 15px;
  font-size: 20px;
`;

export const InputCheck = styled.input`
  margin-left: 15px;
  transform: scale(1.5);
`;

export const None = styled.input`
  visibility: hidden;
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
  border: 15px solid #e0e0e0;
  border-top: 15px solid #212121;
  animation: ${spin} 2s infinite linear;
`;

export const LoadingSpinnerContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SmallTitle = styled.h2``;
