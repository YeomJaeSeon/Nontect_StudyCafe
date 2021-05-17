import React, { useState } from 'react';
import Room from '../../components/room/Room';
import Search from '../../components/search/Search';
import * as S from './Main.style';
import Rooms from '../../components/rooms/Rooms';

const Main = (props) => {
  const [rooms, setRooms] = useState([
    { id: 1, name: '공부하러와요 ㅋㅋ', hashTag: ['건강', '자격증', 'IT'] },
    { id: 2, name: '빡센방', hashTag: ['건강', '자격증', 'IT'] },
    { id: 3, name: '소통해요 ㅎㅎ', hashTag: ['건강', '자격증', 'IT'] },
  ]);

  return (
    <>
      <Search />
      <S.MainContainer>
        <Rooms rooms={rooms} />
        <S.ButtonBox>
          <S.Button>{'<'}</S.Button>
          <S.Button>{'>'}</S.Button>
        </S.ButtonBox>
      </S.MainContainer>
      <S.RoomButtonBox>
        <S.RoomButton left>방 생성</S.RoomButton>
        <S.RoomButton>방 참가</S.RoomButton>
      </S.RoomButtonBox>
    </>
  );
};

export default Main;
