import React from "react";
import { useState, useEffect } from "react";
import * as S from "./Time.style";

export default function Time({ dataService, roomName }) {
  const [users, setUsers] = useState([]);

  const formatTime = (seconds) =>
    new Date(seconds * 1000).toLocaleTimeString("en-GB", {
      timeZone: "Etc/UTC",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  useEffect(() => {
    const unscribe = dataService.getKeepStduyTimes((value) => {
      if (value) {
        console.log("전체 유저데이터 가져와!");
        // console.log(value);
        const filterArr = Object.values(value)
          .filter((value) => value.joinRoom == roomName)
          .map((value) => ({
            name: value.name,
            focus: formatTime(value.studyTimeInRoom.focus),
            total: formatTime(value.studyTimeInRoom.total),
          }));
        setUsers(filterArr);
      }
    });

    return () => unscribe();
  }, []);
  return (
    <S.Container>
      <S.DivLine></S.DivLine>
      <S.Title>공부시간</S.Title>
      {users.length > 0 ? (
        <>
          <S.Table>
            <S.TableHeader>
              <S.TableTr>
                <S.TableTh>유저 이름</S.TableTh>
                <S.TableTh>순 집중시간</S.TableTh>
                <S.TableTh>총 공부시간</S.TableTh>
              </S.TableTr>
            </S.TableHeader>
            <S.TableBody>
              {users.map((value) => {
                return (
                  <S.TableTr key={value.name}>
                    <S.TableTd>{value.name}</S.TableTd>
                    <S.TableTd>{value.focus}</S.TableTd>
                    <S.TableTd>{value.total}</S.TableTd>
                  </S.TableTr>
                );
              })}
            </S.TableBody>
          </S.Table>
        </>
      ) : (
        <S.LoadingDiv>로딩중</S.LoadingDiv>
      )}
    </S.Container>
  );
}
