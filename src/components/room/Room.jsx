import React, { useState } from "react";
import * as S from "./Room.style";
import OpenViduSession from "openvidu-react";
import axios from "axios";

//여기서 오픈비두 입장 작업을 해야함

const Room = ({ id, name, hashTag, peopleCount }) => {
  const enterSession = () => {};

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
