import React from 'react';
import * as S from './Rooms.style';
import Room from '../room/Room';
import Header from '../header/Header';
import axios from 'axios';
import OpenViduSession from 'openvidu-react';
import { useState } from 'react';

const Rooms = ({ rooms }) => {

  // const handlerJoinSessionEvent = () => {
  //   console.log('Join session');
  // }

  // const handlerLeaveSessionEvent = () => {
  //   console.log('Leave session');
  //   setState({
  //     ...state,
  //       session: undefined,
  //   });
  // }

  // const handlerErrorEvent = () => {
  //   console.log('Leave session');
  // }

  // const handleChangeSessionId = (e) => {
  //     setState({
  //       ...state,
  //       mySessionId: e.target.value,
  //   });
  // }
  // const handleChangeUserName = (e) => {
  //   setState({
  //     ...state,
  //     myUserName: e.target.value,
  // });
  // }

  // const joinSession = (event) => {
  //   if (state.mySessionId && state.myUserName) {
  //     this.getToken().then((token) => {
  //         setState({
  //           ...state,
  //             token: token,
  //             session: true,
  //         });
  //     });
  //     event.preventDefault();
  //   }
  // }

  // console.log(rooms);
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
