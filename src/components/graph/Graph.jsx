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

export default function Graph({ dataService, roomName }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    dataService.getAllUsers((value) => {
      console.log("graph를 위한 데이터 보여주!");
      if (value) {
        // 방에서 공부하는 유저이름, focus, total모두 있음
        const filterArr = Object.values(value)
          .filter((value) => value.joinRoom == roomName)
          .map((value) => ({
            name: value.name,
            focus: value.studyTimeInRoom.focus,
            total: value.studyTimeInRoom.total,
          }));

        const newData = filterArr.map((value) => ({
          name: value.name,
          집중도: Math.floor((value.focus / value.total) * 100),
        }));
        setData((prev) => {
          return [
            {
              name: "집중도 100",
              집중도: 100,
            },
            ...newData,
            {
              name: "집중도 0",
              집중도: 0,
            },
          ];
        });
        console.log("dataaaaaa");
        console.log(data);
      }
    });
  }, []);

  return (
    <S.GraphBox className="App">
      {data == [] ? (
        <h1>로딩중</h1>
      ) : (
        <>
          {" "}
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
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 10, right: 10 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
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
