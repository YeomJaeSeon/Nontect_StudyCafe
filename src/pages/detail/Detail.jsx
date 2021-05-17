import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as S from './Detail.style';

const Detail = (props) => {
  const [users, setUsers] = useState([
    { id: 1, name: '유저1' },
    { id: 2, name: '유저2' },
    { id: 3, name: '유저3' },
    { id: 4, name: '유저4' },
    { id: 5, name: '유저5' },
    { id: 6, name: '유저6' },
  ]);
  const location = useLocation().state;
  //location.id

  return (
    <S.Container>
      <S.LeftContainer>
        <S.UserContainer>
          {users.map((user) => {
            return (
              <S.User key={user.id}>
                <S.UserName>{user.name}</S.UserName>
                <S.UserMonitor src="/human.jpg" alt="" />
              </S.User>
            );
          })}
        </S.UserContainer>
        <S.ChatBox>
          <S.ChatInput type="text" placeholder="채팅창 입력" />
        </S.ChatBox>
      </S.LeftContainer>
      <S.RightContainer></S.RightContainer>
    </S.Container>
  );
};

export default Detail;
