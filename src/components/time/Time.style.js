import styled from "styled-components";
import * as style from "../../utils/css-utils";

export const Container = styled.div`
  width: 100%;
`;

export const Title = styled.div`
  text-align: center;
  font-size: 20px;
  padding: 5px 0;
`;

export const Table = styled.table`
  margin: auto;
  box-sizing: border-box;
  width: 100%;
  border: 1px solid #444444;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  box-sizing: border-box;
`;
export const TableBody = styled.tbody`
  box-sizing: border-box;
`;
export const TableTr = styled.tr`
  box-sizing: border-box;
  margin: 5px;
`;
export const TableTd = styled.td`
  box-sizing: border-box;
  border: 1px solid #444444;
  text-align: center;
  padding: 5px;
`;

export const TableTh = styled.th`
  box-sizing: border-box;
  border: 1px solid #444444;
  padding: 5px;
`;

export const LoadingDiv = styled.div`
  text-align: center;
  font-size: 30px;
`;

export const DivLine = styled.div`
  width: 90%;
  height: 2px;
  background-color: ${style.MainColor};
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
`;
