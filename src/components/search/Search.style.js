import styled from 'styled-components';
import * as style from '../../utils/css-utils';

export const SelectorContainer = styled.div`
  margin-left: 150px;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const Selector = styled.select`
  margin-right: 30px;
  background-color: ${style.BoxColor};
  border: 2px solid ${style.MainColor};
  padding: 3px 10px;
  font-weight: bolder;
  font-size: 20px;
`;

export const Input = styled.input`
  background-color: ${style.BoxColor};
  border: 2px solid ${style.MainColor};
  padding: 3px 10px;
  font-weight: bolder;
  font-size: 20px;
`;
