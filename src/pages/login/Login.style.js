import styled from "styled-components";
import * as style from "../../utils/css-utils";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;
export const Background = styled.img`
  width: 100vw;
  height: 100vh;
`;
export const logo = styled.div`
position: fixed;
display: flex;
  color:black;
  background-color:white;
`;
export const TitleContainer = styled.div`
  display: block;
`;

export const Title = styled.div`
  background-color: ${style.BoxColor};
  font-size: 44px;
  flex-basis: 70%;
`;

export const Box = styled.div`
  position: fixed;
  display: flex;
  top: 50%;
  left: 20%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 550px;
  background-color: ${style.BoxColor};
  margin-top: 30px;
  opacity: 0.8;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 5px;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.75);
`;

export const FormBox = styled.form`
  display: flex;
  width: 90%;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  font-size: 20px;
  width: 80%;
`;

export const SubmitBtn = styled.input`
  margin: 10px 0;
  padding: 5px 15px;
  background-color: ${style.MainColor};
  color: white;
  font-weight: bolder;
  cursor: pointer;
  border-radius: 10px;
  transition: all 300ms ease;
  &:hover {
    background-color: white;
    color: ${style.MainColor};
  }
`;
export const Button = styled.button`
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

export const DivLine = styled.div`
  width: 70%;
  height: 2px;
  margin: 10px 0;
  background-color: ${style.BackgroundColor};
`;

export const SignUpBtn = styled.button`
  padding: 8px;
  color: white;
  background-color: ${style.ButtonColor};
  outline: none;
  border-radius: 10px;
  font-size: 18px;
  margin-top: 30px;
  cursor: pointer;
  transition: all 300ms ease;
  &:hover {
    background-color: white;
    color: ${style.ButtonColor};
  }
`;
