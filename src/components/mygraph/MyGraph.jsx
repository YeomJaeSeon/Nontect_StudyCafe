import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import * as S from "./MyGraph.style";

export default function MyGraph({ subData }) {
  const [data, setData] = useState([]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      console.log("active");
      console.log(active);
      console.log(payload);
      console.log(label);
      return (
        <S.ToolTipCustom className="custom-tooltip">
          <S.TooltipTitle className="label">{`${label} 집중도`}</S.TooltipTitle>
          <S.TooltilSubTitle className="label">{`${payload[0].value}%`}</S.TooltilSubTitle>
          {payload[0].value >= 80 && (
            <p className="desc">열심히 공부한 하루군요</p>
          )}
          {payload[0].value >= 50 && payload[0].value < 80 && (
            <p className="desc">더 노력해야할거 같아요</p>
          )}
          {payload[0].value < 50 && <p className="desc">분발하세요!</p>}
        </S.ToolTipCustom>
      );
    }

    return null;
  };

  useEffect(() => {
    console.log("섭데이터");
    console.log(subData);
    if (!subData) {
      //공부한 기록없는 사용자는 데이터에 아무것도없음
    } else {
      //공부한 기록있는 사용자만 데이터존재
      const changeData = Object.keys(subData).map((value) => {
        return {
          name: value,
          집중도:
            (subData[`${value}`].focusStudyTime /
              subData[`${value}`].totalStudyTime) *
            100,
        };
      });
      console.log(changeData);
      setData(
        Object.keys(subData).map((value) => {
          const date =
            value.substring(0, 4) +
            "년 " +
            value.substring(4, 6) +
            "월 " +
            value.substring(6, 8) +
            "일";
          const ratio =
            Math.floor(
              (subData[`${value}`].focusStudyTime /
                subData[`${value}`].totalStudyTime) *
                10000
            ) / 100;
          return {
            name: date,
            집중도: ratio,
          };
        })
      );
    }
  }, [subData]);
  return (
    <S.GraphBox className="App">
      {data == [] ? (
        <h1>로딩중</h1>
      ) : (
        <>
          {" "}
          <S.GraphTitle>집중도 그래프</S.GraphTitle>
          <BarChart
            width={800}
            height={400}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={20}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 10, right: 10, bottom: 100 }}
              fontSize={10}
            />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar
              dataKey="집중도"
              fill="#f50057"
              background={{ fill: "#eee" }}
            />
          </BarChart>
        </>
      )}
    </S.GraphBox>
  );
}
