import React, { useEffect, useState } from "react";
import "../../../node_modules/react-vis/dist/style.css";
import * as S from "./Graph.style";

export default function Graph({ dataService, roomName }) {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState({});

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
            x: idx,
            y: (value.focus / value.total) * 10,
          }))
        );
        const entries = new Map();
        filterArr.forEach((value, idx) => {
          entries.set(idx, value.name);
        });
        const obj = Object.fromEntries(entries);
        setUsers(obj);
        console.log("obj name");
        console.log(obj);
        console.log(filterArr);
      }
    });
  }, []);
  const datas = [
    { x: 0, y: 8 },
    { x: 1, y: 5 },
    { x: 2, y: 4 },
    { x: 3, y: 9 },
    { x: 4, y: 1 },
    { x: 5, y: 7 },
    { x: 6, y: 6 },
    { x: 7, y: 3 },
    { x: 8, y: 2 },
    { x: 9, y: 5 },
  ];
  return (
    <S.GraphBox className="App">
      <S.GraphTitle>집중도 그래프</S.GraphTitle>
    </S.GraphBox>
  );
}
