import React from "react";
import * as S from "./Rooms.style";
import Room from "../room/Room";
import Header from "../header/Header";
import axios from "axios";
import OpenViduSession from "openvidu-react";
import { useState, useEffect } from "react";

const Rooms = ({ rooms }) => {
  useEffect(() => {
    console.log("Rooms useEffect");
    console.log(rooms);
  }, []);
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
              peopleCount={room.peopleCount}
              hashTag={room.hashTag}
            ></Room>
          );
        })}
      </S.RoomsContainer>
    </>
  );
};

export default Rooms;
