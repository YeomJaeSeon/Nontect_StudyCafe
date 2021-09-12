import styled from "styled-components";
import * as style from "../../utils/css-utils";

export const BackgroundContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${style.BackgroundColor};
`;
export const Background = styled.img`
  width: 100vw;
  height: 100vh;
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
  width: 90%;
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
  width: 85%;
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
