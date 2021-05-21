import React from 'react';
import * as S from './Rooms.style';
import Room from '../room/Room';
import Header from '../header/Header';

const Rooms = ({ rooms }) => {
  console.log(rooms);
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
