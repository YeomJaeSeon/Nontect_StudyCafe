import React, { useEffect, useState } from "react";
import axios from "axios";
import * as M from "./Myinfo.style";
import { useHistory } from "react-router-dom";
import Header from "../../components/header/Header";

/*회원정보창에서 이름은 텍스트필드, 해쉬테그는 체크박스,
  집중정보는 리스트형태
  원하는 정보를 입력, 수정한 뒤 저장누르면 자동으로 업데이트
  그냥 세션을 나갈경우 기존 정보가 저장

  집중비율은 SUM(totalStudySec) / SUM(focusStudySec)
*/

export default function Myinfo ({ authService, dataService }) {
    firebase.auth().onAuthStateChanged((user) => {
        
    });

    //회원 정보 받아올 빈 깡통
    const [userData, getUserData] = useState({
        name : "",
        interestedField : {
            health : ""
        },
        myFocusRatio : 0
    });

    useEffect(() => {
        if (location.state !== undefined) {
          setState((prev) => ({
            ...prev,
            mySessionId: location.state.name,
          }));
          joinSession(undefined);
        }
    
        //로그인한 유저의 uid와 방이름(mySessionId) 를 넘김
        authService.getLoginStatus((uid) => {
          console.log(uid);
          setState((user) => ({
            ...user,
            myUserName: uid.uid,
          }));
        });
      }, []);



    const history = useHistory();
    
    //로그아웃 서비스
    const logout = () => {
        authService.logout();
    };

    //회원정보 받아서 필드에 저장 


    //회원정보 업데이트 onClick이벤틀 처리해야할 것 같음
    useEffect(() => {
        dataService.getLoginUserData()
    });

    return (
        <>
          <Header location="myInfo" logout={logout} />
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

export default Myinfo;