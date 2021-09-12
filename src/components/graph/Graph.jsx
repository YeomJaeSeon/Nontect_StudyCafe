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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      console.log("active");
      console.log(active);
      console.log(payload);
      console.log(label);
      return (
        <S.ToolTipCustom className="custom-tooltip">
          <S.TooltipTitle className="label">{`${label}님의 집중도`}</S.TooltipTitle>
          <S.TooltilSubTitle className="label">{`${payload[0].value}%`}</S.TooltilSubTitle>
          {/* {payload[0].value >= 80 && (
            <p className="desc">열심히 공부한 하루군요</p>
          )}
          {payload[0].value >= 50 && payload[0].value < 80 && (
            <p className="desc">더 노력해야할거 같아요</p>
          )}
          {payload[0].value < 50 && <p className="desc">분발하세요!</p>} */}
        </S.ToolTipCustom>
      );
    }

    return null;
  };

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

        const newData = filterArr.map((value) => {
          //공부한시간 데이터정제 잠시삭제
          // let time = 0;

          // if (value.total > 60) {
          //   const totalMin = Math.floor(value.total / 60); //분
          //   const totalSec = value.total % 60;
          //   time = 0 + ":" + totalMin + ":" + totalSec;
          // } else if (value.total > 3600) {
          //   const totalHour = Math.floor(value.total / (60 * 60));
          //   const totalMin = Math.floor(value.total / 60); //분
          //   const totalSec = value.total % 60;
          //   time = totalHour + ":" + totalMin + ":" + totalSec;
          // } else {
          //   const totalSec = value.total % 60;
          //   time = 0 + ":" + 0 + ":" + totalSec;
          // }
          return {
            // name: `${value.name}(${time})`,
            name: `${value.name}`,
            집중도: Math.floor((value.focus / value.total) * 100),
          };
        });
        setData((prev) => {
          return [...newData];
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
            <YAxis domain={[0, 100]} />
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
