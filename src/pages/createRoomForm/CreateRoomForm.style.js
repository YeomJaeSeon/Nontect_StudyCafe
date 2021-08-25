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

export const Container = styled.div`
  text-align: center;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;

  width: 450px;
  height: 550px;
  background-color: ${style.BoxColor};

  margin-top: 80px;
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

export const Facemesh = styled.div`
  visibility: hidden;
`;

export const FocusTimer = styled.div`
  marginleft: 50px;
  marginright: 50px;
  left: 0;
  position: absolute;
  text-align: center;
  bottom: 0;
`;

export const Label = styled.label`
  margin: 10px 15px;
  font-size: 20px;
`;

export const InputCheck = styled.input`
  margin-left: 15px;
  transform: scale(1.5);
`;

// 방생성 박스
export const CreateContainer = styled.div`
  margin-top: 50px;
`;

export const NameLabel = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
`;

export const NameInput = styled.input`
  font-size: 20px;
  padding: 5px;
  text-align: center;
`;

export const RoomHashTagBox = styled.div`
  width: 300px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
`;

export const CreateButton = styled.button`
  padding: 5px 30px;
  font-size: 20px;
  background-color: ${style.BoxColor};
  margin-top: 20px;

  font-weight: bolder;
  cursor: pointer;
  transition: all 0.4s;

  &:hover {
    background-color: ${style.HeaderButtonColor};
    transform: scale(1.1);
    color: white;
  }
`;
