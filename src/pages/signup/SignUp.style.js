import styled from 'styled-components';
import * as style from '../../utils/css-utils';

export const Container = styled.div`
  margin: auto;
  margin-top: 30px;
  width: 450px;
  height: 550px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${style.BoxColor};

  border: none;
  border-radius: 10px;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
`;

export const SignUpHeader = styled.div`
  width: 100%;
  padding-top: 10px;
  padding-left: 50px;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  color: ${style.TextColor};
`;

export const SubTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: ${style.TextColor};
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
  background-color: orange;
  outline: none;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
  transition: all 300ms ease;
  &:hover {
    background-color: white;
    color: orange;
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
