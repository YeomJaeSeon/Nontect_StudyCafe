import React, { useState } from 'react';
import * as S from './Room.style';
import { useHistory } from 'react-router-dom';

const Room = ({ id, name, hashTag }) => {
  const history = useHistory();
  const goToDetail = () => {
    history.push({
      pathname: `rooms/room/${id}`,
      state: { id: id },
    });
  };
  console.log(hashTag);
  
  return (
    <S.RoomContainer onClick={goToDetail}>
      <S.RoomTitleBox>{name}</S.RoomTitleBox>
      <S.InnerContainer>
        <S.HashTagContainer>
          {hashTag.map((tag) => {
            return <S.HashTagContent>#{tag}</S.HashTagContent>;
          })}
        </S.HashTagContainer>
        <div>{id}/6</div>
      </S.InnerContainer>
    </S.RoomContainer>
  );
};

export default Room;
