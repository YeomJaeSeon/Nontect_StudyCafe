import React, { useState, useEffect } from "react";
import Search from "../../components/search/Search";
import * as S from "./Main.style";
import Rooms from "../../components/rooms/Rooms";
import Header from "../../components/header/Header";
import { useHistory } from "react-router-dom";

const Main = ({ authService, dataService }) => {
  //test datas
  const [rooms, setRooms] = useState([]); //방들 (세션들)

  const history = useHistory();

  const logout = () => {
    authService.logout();
  };

  useEffect(() => {
    dataService.getAllRooms((values) => {
      if (values != undefined) {
        console.log(Object.values(values));
        setRooms(
          Object.values(values).map((value) => {
            return {
              id: value.idxCount,
              name: value.sessionId,
              peopleCount: value.peopleCount,
              hashTag: [],
            };
          })
        );
        console.log("이걸로 바뀌었어요");
        console.log(rooms);
      }
    });
  }, []);

  useEffect(() => {
    const unscribe = authService.getLoginStatus((user) => {
      if (!user) {
        history.push("/");
      }
    });

    return () => {
      unscribe();
    };
  }, [authService]);

  const goCreate = () => {
    history.push("/rooms/room");
  };

  return (
    <>
      <Header location="main" logout={logout} />
      <Search />
      <S.MainContainer>
        <Rooms rooms={rooms} />
        <S.ButtonBox>
          <S.Button>{"<"}</S.Button>
          <S.Button>{">"}</S.Button>
        </S.ButtonBox>
      </S.MainContainer>
      <S.RoomButtonBox>
        <S.RoomButton onClick={goCreate} left>
          방 생성
        </S.RoomButton>
        <S.RoomButton>방 참가</S.RoomButton>
      </S.RoomButtonBox>
    </>
  );
};

export default Main;
