import React, { useState, useEffect } from "react";
import Search from "../../components/search/Search";
import * as S from "./Main.style";
import Rooms from "../../components/rooms/Rooms";
import Header from "../../components/header/Header";
import { useHistory } from "react-router-dom";

//======= 해시태그 매핑할 한국어
const hashMatch = {
  health: "건강",
  IT: "IT",
  certification: "자격증",
  entertainment: "예능",
  religion: "종교",
  tech: "기술",
};

const reverseHashMatch = {
  건강: "health",
  IT: "IT",
  자격증: "certification",
  예능: "entertainment",
  종교: "religion",
  기술: "tech",
};
Object.freeze(hashMatch);
Object.freeze(reverseHashMatch);
//=========

const Main = ({ authService, dataService }) => {
  //test datas
  const [rooms, setRooms] = useState([]); //방들 (세션들)
  const [startRoomNumber, setStartRoomNumber] = useState(0);
  const [totalRoomsLength, setTotalRoomsLength] = useState(0);

  const history = useHistory();

  const logout = () => {
    authService.logout();
  };

  useEffect(() => {
    dataService.getAllRooms((values) => {
      if (values != undefined) {
        console.log("values =====");
        console.log(values);
        const result = Object.values(values).map((value) => {
          return {
            name: value.sessionId,
            peopleCount: value.peopleCount,
            hashTag: Object.values(value.hashTag).map((v) => hashMatch[`${v}`]),
          };
        });

        console.log("result=======");
        console.log(result);
        setTotalRoomsLength(result.length);
        if (result.length > 4) {
          console.log("setState");
          setRooms(result.slice(0, 4));
        } else {
          console.log("setState");
          setRooms(result);
        }
      }
    });
  }, []);

  useEffect(() => {
    dataService.getAllRooms((rooms) => {
      if (rooms != undefined) {
        setRooms(
          Object.values(rooms)
            .map((value) => {
              return {
                name: value.sessionId,
                peopleCount: value.peopleCount,
                hashTag: Object.values(value.hashTag).map(
                  (v) => hashMatch[`${v}`]
                ),
              };
            })
            .slice(startRoomNumber, startRoomNumber + 4)
        );
      }
    });
  }, [startRoomNumber]);

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

  const showBackRooms = () => {
    console.log("left click");
    if (totalRoomsLength <= 4) return;
    if (startRoomNumber !== 0) {
      setStartRoomNumber((prev) => prev - 4);
    }
  };

  const showFrontRooms = () => {
    console.log("right click");
    console.log(totalRoomsLength);
    if (totalRoomsLength <= 4) return;
    if (startRoomNumber + 4 < totalRoomsLength) {
      setStartRoomNumber((prev) => prev + 4);
    }
  };

  //== 방 탐색==//
  const searchRooms = (category, target) => {
    console.log("main에서 search 클릭 영향받음");
    dataService.getAllRooms((value) => {
      if (value) {
        console.log(value);
        if (category == "title") {
          //방이름으로 검색
          console.log("target : " + target);
          const result = Object.values(value)
            .map((value) => {
              return {
                name: value.sessionId,
                peopleCount: value.peopleCount,
                hashTag: Object.values(value.hashTag).map(
                  (v) => hashMatch[`${v}`]
                ),
              };
            })
            .filter((value) => value.name == target);
          console.log(result);
          setTotalRoomsLength(result.length);
          if (result.length > 4) {
            console.log("setState");
            setRooms(result.slice(0, 4));
          } else {
            console.log("setState");
            setRooms(result);
          }
        } else {
          //해시태그로 검색
          console.log("taret : " + target);

          const result = Object.values(value)
            .map((value) => {
              return {
                name: value.sessionId,
                peopleCount: value.peopleCount,
                hashTag: Object.values(value.hashTag).map(
                  (v) => hashMatch[`${v}`]
                ),
              };
            })
            .filter((value) => value.hashTag.includes(target));

          console.log(result);
          setTotalRoomsLength(result.length);
          if (result.length > 4) {
            console.log("setState");
            setRooms(result.slice(0, 4));
          } else {
            console.log("setState");
            setRooms(result);
          }
        }
      }
    });
  };

  return (
    <>
      <Header location="main" logout={logout} />
      <S.BackgroundContainer>
        <S.Background src="./main_background.jpg" alt="main"></S.Background>
        <Search hashMatch={hashMatch} searchRooms={searchRooms} />
        <S.MainContainer>
          <Rooms dataService={dataService} rooms={rooms} />
          <S.ButtonBox>
            <S.Button onClick={showBackRooms}>{"<"}</S.Button>
            <S.Button onClick={showFrontRooms}>{">"}</S.Button>
          </S.ButtonBox>
        </S.MainContainer>
        <S.RoomButtonBox>
          <S.RoomButton onClick={goCreate} left>
            방 생성
          </S.RoomButton>
        </S.RoomButtonBox>
      </S.BackgroundContainer>
    </>
  );
};

export default Main;
