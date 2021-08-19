import React from "react";
import * as S from "./Rooms.style";
import Room from "../room/Room";
import Header from "../header/Header";
import axios from "axios";
import OpenViduSession from "openvidu-react";
import { useState } from "react";

const Rooms = ({ rooms }) => {
  return (
    <>
      <S.RoomsContainer>
        {rooms.map((room) => {
          console.log(room);
          return (
            <Room
              key={room.id}
              id={room.id}
              name={room.name}
              hashTag={room.hashTag}
            ></Room>
          );
        })}
      </S.RoomsContainer>
    </>
  );
};

export default Rooms;
