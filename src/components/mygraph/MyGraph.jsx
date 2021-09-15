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
  var avgRatio = 0;
  var result = 0;

  //var lastTenData = subData.slice(-10);
  var count = 0;
  var lastTenRatio = 0;
  var lastTenFocus = 0;
  var lastTenTotal = 0;
  const RecordLength = Object.keys(subData).length;

  var slicedData = [];

  //평균 집중력
  for (var i in subData) {
    result = result + Math.floor((subData[i].focusStudyTime / subData[i].totalStudyTime) * 10000) / 100;
    count++;
    //최근 10일 집중력
    if (count > RecordLength - 10) {
      lastTenFocus = lastTenFocus + subData[i].focusStudyTime;
      lastTenTotal = lastTenTotal + subData[i].totalStudyTime;
      if (count == RecordLength) {
        count = 0;
        break;
      }
    }
  }
  avgRatio = Math.floor(result / RecordLength *100) / 100;
  lastTenRatio = Math.floor((lastTenFocus / lastTenTotal) * 10000) / 100;

  const formatTime = (seconds) =>
    new Date(seconds * 1000).toLocaleTimeString("en-GB", {
      timeZone: "Etc/UTC",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  const [data, setData] = useState([]);
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      console.log("active " + active);
      console.log(payload[0].value);
      console.log(payload);
      console.log("라벨 " + label);
      return (
        <S.ToolTipCustom className="custom-tooltip">
          <S.TooltipTitle className="label">{`${label} 집중도`}</S.TooltipTitle>
          <S.focusAndTotal className="label">{`집중시간 : ${payload[0].payload.공부시간}`}</S.focusAndTotal>
          <S.focusAndTotal className="label">{`참여시간 : ${payload[0].payload.참여시간}`}</S.focusAndTotal>
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
          //onst focus = formatTime(subData[`${value}`].focusStudyTime);
          //const total = formatTime(subData[`${value}`].totalStudyTime);
          return {
            name: date,
            집중도: ratio,
            공부시간 : formatTime(subData[`${value}`].focusStudyTime),
            참여시간 : formatTime(subData[`${value}`].totalStudyTime),

          };
        })
      );
    }
  }, [subData]);
  //console.log(data);

  //데이터 10개 슬라이스
  for (var i = RecordLength - 10; i < RecordLength; i++) {
    slicedData[i + 10 - RecordLength] = data[i];
  }
  for (var i = 0; i < 10; i++) {
    console.log(slicedData[i]);
  }
  return (
    <S.GraphBox className="App">
      {data == [] ? (
        <h1>로딩중</h1>
      ) : (
        <>
          {" "}
          <S.GraphSubTitle>최근 10개 정보만 출력합니다.</S.GraphSubTitle>
          <S.PrintRatio>나의 평균 집중력 : {avgRatio}%</S.PrintRatio>
          <S.PrintRatio>최근 10일 집중력 : {lastTenRatio}%</S.PrintRatio>
          <BarChart
            width={800}
            height={400}
            data={slicedData.filter((value) => value)}
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
