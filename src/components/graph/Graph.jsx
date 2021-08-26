import React, { useEffect } from "react";
import "../../../node_modules/react-vis/dist/style.css";
import { XYPlot, VerticalBarSeries } from "react-vis";
import * as S from "./Graph.style";

export default function Graph({ dataService }) {
  useEffect(() => {}, []);
  const data = [
    { x: 0, y: 8 },
    { x: 1, y: 5 },
    { x: 2, y: 4 },
    { x: 3, y: 9 },
    { x: 4, y: 1 },
    { x: 5, y: 7 },
    { x: 6, y: 6 },
    { x: 7, y: 3 },
    { x: 8, y: 2 },
    { x: 9, y: 0 },
  ];
  return (
    <S.GraphBox className="App">
      <XYPlot height={500} width={1000}>
        <VerticalBarSeries data={data} />
      </XYPlot>
    </S.GraphBox>
  );
}
