import React, { useState, useEffect } from 'react';
import Search from '../../components/search/Search';
import * as S from './Main.style';
import Rooms from '../../components/rooms/Rooms';
import Header from '../../components/header/Header';
import { useHistory } from 'react-router-dom';

const Main = ({ authService }) => {
  //test datas
  const [rooms, setRooms] = useState([
    { id: 1, name: '공부하러와요 ㅋㅋ', hashTag: ['건강', '자격증', 'IT'] },
    { id: 2, name: '빡센방', hashTag: ['건강', '자격증', 'IT'] },
    { id: 3, name: '소통해요 ㅎㅎ', hashTag: ['건강', '자격증', 'IT'] },
  ]);

  // 방 생성을 위한 state
  const [state, setState] = useState({
    mySessionId: 'SessionA',
    myUserName: 'OpenVidu_User_' + Math.floor(Math.random() * 100),
    token: undefined,
    session : undefined
  });

  const history = useHistory();

  const logout = () => {
    authService.logout();
  };
  useEffect(() => {
    const unscribe = authService.getLoginStatus((user) => {
      if (!user) {
        history.push('/');
      }
    });

    return () => {
      unscribe();
    };
  }, [authService]);

  const goCreate = () => {
    history.push('/rooms/room');
  }

  return (
    <>
      <Header location="main" logout={logout} />
      <Search />
      <S.MainContainer>
        <Rooms rooms={rooms} />
        <S.ButtonBox>
          <S.Button>{'<'}</S.Button>
          <S.Button>{'>'}</S.Button>
        </S.ButtonBox>
      </S.MainContainer>
      <S.RoomButtonBox>
        <S.RoomButton onClick={goCreate} left>방 생성</S.RoomButton>
        <S.RoomButton>방 참가</S.RoomButton>
      </S.RoomButtonBox>
    </>
  );
};

export default Main;
