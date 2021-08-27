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

import * as S from "./Graph.style";

// const dataV = [
//   {
//     name: "Page A",

//     집중도: 86.66666,
//   },
//   {
//     name: "Page B",

//     집중도: 20.3,
//   },
//   {
//     name: "Page C",
//     // uv: 2000,
//     집중도: 2800,
//     // amt: 2290,
//   },
//   {
//     name: "Page D",
//     // uv: 2780,
//     집중도: 3908,
//     // amt: 2000,
//   },
//   {
//     name: "Page E",
//     // uv: 1890,
//     집중도: 4800,
//     // amt: 2181,
//   },
//   {
//     name: "Page F",
//     // uv: 2390,
//     집중도: 3800,
//     // amt: 2500,
//   },
//   {
//     name: "Page G",
//     // uv: 3490,
//     집중도: 4300,
//     // amt: 2100,
//   },
// ];

export default function Graph({ dataService, roomName }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    dataService.getAllUsers((value) => {
      console.log("graph를 위한 데이터 보여주!");
      if (value) {
        //filterArr
        // 방에서 공부하는 유저이름, focus, total모두 있음
        const filterArr = Object.values(value)
          .filter((value) => value.joinRoom == roomName)
          .map((value) => ({
            name: value.name,
            focus: value.studyTimeInRoom.focus,
            total: value.studyTimeInRoom.total,
          }));

        setData(
          filterArr.map((value, idx) => ({
            name: value.name,
            집중도: (value.focus / value.total) * 100,
          }))
        );
      }
    });
  }, []);

  return (
    <S.GraphBox className="App">
      <S.GraphTitle>집중도 그래프</S.GraphTitle>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={20}
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="집중도" fill="#8884d8" background={{ fill: "#eee" }} />
      </BarChart>
    </S.GraphBox>
  );
}
