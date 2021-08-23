import React, { useState } from "react";
import * as S from "./Room.style";
import OpenViduSession from "openvidu-react";
import axios from "axios";
import { useHistory } from "react-router";

//여기서 오픈비두 입장 작업을 해야함

const Room = ({ id, name, hashTag, peopleCount, dataService }) => {
  const history = useHistory();
  const enterSession = () => {
    dataService.getAllRooms((callback) => {
      console.log(callback);
      console.log("이녀석 어떨까!!!!!!!!!!!!!!");
      if (callback == undefined) {
        //방이 존재안하면
        alert("존재하지 않는 방입니다. 새로고침해주세요");
      } else {
        console.log("콜백");
        console.log(callback);
        const length = Object.keys(callback).filter((v) => v == name).length;

        console.log("길이" + length);
        if (length == 0) alert("존재하지 않는 방입니다. 새로고침해주세요");
        else {
          history.push({
            pathname: "/rooms/room",
            state: { name: name },
          });
        }
      }
    });
  };
  return (
    <S.RoomContainer onClick={enterSession}>
      <S.RoomTitleBox>{name}</S.RoomTitleBox>
      <S.InnerContainer>
        <S.HashTagContainer>
          {hashTag.map((tag) => {
            return <S.HashTagContent>#{tag}</S.HashTagContent>;
          })}
        </S.HashTagContainer>
        <div>{peopleCount}/6</div>
      </S.InnerContainer>
    </S.RoomContainer>
  );
};

export default Room;
