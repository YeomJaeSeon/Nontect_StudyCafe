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
export const FocusContainer = styled.div``;
export const Focusimg = styled.img`
  width: 100px;
  height: 100px;
  z-index: 1;
  position: absolute;
  bottom: 0;
  cursor: pointer;
  opacity: 0.3;
`;

export const FocusTimer = styled.div`
  z-index: 1;
  text-align: center;
  position: absolute;
  bottom: 0;
  background-color: ${style.BoxColor};
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
  text-align: center;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  opacity: 0.6;
  width: 450px;
  height: 550px;
  background-color: ${style.BoxColor};
  border-radius: 5px;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.75);
  margin-top: 80px;
`;

export const DivLine = styled.div`
  width: 70%;
  height: 2px;
  margin: auto;
  background-color: ${style.BackgroundColor};
`;

export const NameLabel = styled.div`
  font-size: 15px;
  margin-bottom: 20px;
`;

export const NameInput = styled.input`
  font-size: 20px;
  padding: 5px;
  text-align: center;
  margin-bottom: 60px;
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

export const VideoContainer = styled.div`
  margin-top: 0;
  z-index: -1;
`;
export const GraphContainer = styled.div`
  z-index: 1;
  position: absolute;
  bottom: 0;
`;

//==모달 style==//
export const ModalOpenButton = styled.button`
  color: white;
  z-index: 1;
  position: absolute;
  left: 5px;
  bottom: 5px;
  font-size: 20px;
  padding: 5px;
  cursor: pointer;
  background-color: ${style.HeaderButtonColor};
  border: none;
  border-radius: 5px;
  transition: all 0.4s;
  &:hover {
    transform: scale(1.1);
  }
`;

export const ModalCloseButton = styled.button`
  color: white;
  cursor: pointer;
  font-size: 15px;
  padding: 5px;
  background-color: ${style.HeaderButtonColor};
  border: none;
  border-radius: 5px;
  transition: all 0.4s;
  &:hover {
    transform: scale(1.1);
  }
`;
