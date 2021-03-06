import React from "react";
import * as S from "./Rooms.style";
import Room from "../room/Room";
import Header from "../header/Header";
import axios from "axios";
import OpenViduSession from "openvidu-react";
import { useState, useEffect } from "react";

const Rooms = ({ dataService, rooms, startRoomNumber }) => {
  useEffect(() => {
    console.log("Rooms useEffect");
    console.log(rooms);
  }, []);
  return (
    <>
      <S.RoomsContainer>
        {rooms.slice(startRoomNumber, startRoomNumber + 4).map((room, idx) => {
          return (
            <Room
              dataService={dataService}
              key={idx}
              id={room.id}
              name={room.name}
              peopleCount={room.peopleCount}
              secret={room.secret}
              hashTag={room.hashTag}
            ></Room>
          );
        })}
      </S.RoomsContainer>
    </>
  );
};

export default Rooms;
