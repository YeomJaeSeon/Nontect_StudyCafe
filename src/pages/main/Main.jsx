import React, { useState, useEffect } from "react";
import Search from "../../components/search/Search";
import * as S from "./Main.style";
import Rooms from "../../components/rooms/Rooms";
import Header from "../../components/header/Header";
import { useHistory } from "react-router-dom";
import Info from "../myInfo/Myinfo";

//======= 해시태그 매핑할 한국어
const hashMatch = {
  health: "수능",
  IT: "IT",
  certification: "자격증",
  entertainment: "예체능",
  religion: "외국어",
  tech: "기타",
};

const reverseHashMatch = {
  수능: "health",
  IT: "IT",
  자격증: "certification",
  예체능: "entertainment",
  외국어: "religion",
  기타: "tech",
};
Object.freeze(hashMatch);
Object.freeze(reverseHashMatch);
//=========

const Main = ({ authService, dataService }) => {
  //test datas
  const [rooms, setRooms] = useState([]); //방들 (세션들)
  const [startRoomNumber, setStartRoomNumber] = useState(0);
  const [totalRoomsLength, setTotalRoomsLength] = useState(0);
  const [myHashTag, setMyHashTag] = useState([]);
  const [isSelectMyHash, setIsSelectMyHash] = useState(false);

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
            secret: value.secret,
            hashTag: Object.values(value.hashTag).map((v) => hashMatch[`${v}`]),
          };
        });

        console.log("result=======");
        console.log(result);
        setTotalRoomsLength(result.length);
        setRooms(result);
      }
    });
  }, []);

  useEffect(() => {
    const unscribe = authService.getLoginStatus((user) => {
      if (!user) {
        history.push("/");
        alert("로그아웃 성공");
      } else {
        console.log("로그인한 유저의 모오오오오든 데이터");
        dataService.getLoginUserData(user.uid, (value) => {
          if (value) {
            setMyHashTag(
              Object.keys(value.hashTag)
                .map((value) => value)
                .filter((value) => value)
            );
          }
        });
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
    setStartRoomNumber(0);
    setIsSelectMyHash(false);

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
                secret: value.secret,
                hashTag: Object.values(value.hashTag).map(
                  (v) => hashMatch[`${v}`]
                ),
              };
            })
            .filter((value) => value.name == target);
          console.log(result);
          setTotalRoomsLength(result.length);
          setRooms(result);
        } else {
          //해시태그로 검색
          console.log("taret : " + target);

          const result = Object.values(value)
            .map((value) => {
              return {
                name: value.sessionId,
                peopleCount: value.peopleCount,
                secret: value.secret,
                hashTag: Object.values(value.hashTag).map(
                  (v) => hashMatch[`${v}`]
                ),
              };
            })
            .filter((value) => value.hashTag.includes(target));

          console.log(result);
          setTotalRoomsLength(result.length);
          setRooms(result);
        }
      }
    });
  };

  //== 자신의 관심사에 맞는 방들을 랜더링==//
  const recommendUserRooms = () => {
    setIsSelectMyHash(true);
    console.log("자신에게 맞는 방 추천");
    if (myHashTag.length > 0) {
      //myHashTag 로딩 완료
      const transformMyHashTag = myHashTag.map((value) => {
        return hashMatch[`${value}`];
      });
      console.log("변경된 해시태그들");
      console.log(transformMyHashTag);
      dataService.getAllRooms((value) => {
        if (value) {
          const result = Object.values(value)
            .map((value) => {
              return {
                name: value.sessionId,
                peopleCount: value.peopleCount,
                secret: value.secret,
                hashTag: Object.values(value.hashTag).map(
                  (v) => hashMatch[`${v}`]
                ),
              };
            })
            .filter((value) =>
              value.hashTag.some((v) => transformMyHashTag.includes(v))
            );
          console.log("자신에게 맞는 방 추천");
          console.log(result);
          setTotalRoomsLength(result.length);
          setStartRoomNumber(0);
          setRooms(result);
        }
      });
    } else {
      //my hashtag로딩중..
      alert("로딩중. 잠시후 다시 시도해주세요");
    }
  };

  return (
    <>
      <Header location="main" logout={logout} />
      <S.BackgroundContainer>
        <S.Background src="./main_background.jpg" alt="main"></S.Background>
        <Search
          hashMatch={hashMatch}
          searchRooms={searchRooms}
          recommendUserRooms={recommendUserRooms}
          myHashTag={myHashTag.map((value) => "#" + hashMatch[`${value}`])}
          isSelectMyHash={isSelectMyHash}
        />
        <S.MainContainer>
          <Rooms
            dataService={dataService}
            rooms={rooms}
            startRoomNumber={startRoomNumber}
          />
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
