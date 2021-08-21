import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header/Header";
import OpenViduSession from "openvidu-react";
import {
  OPENVIDU_SERVER_URL,
  OPENVIDU_SERVER_SECRET,
} from "../../config/config";

export default function CreateRoomForm({ authService, dataService }) {
  const [state, setState] = useState({
    mySessionId: "SessionA", // 방이름
    myUserName: "", // 유저이름(유저의 uid임) - 별명아님
    token: undefined,
    session: undefined,
  });

  useEffect(() => {
    //로그인한 유저의 uid와 방이름(mySessionId) 를 넘김
    authService.getLoginStatus((uid) => {
      console.log(uid);
      setState((user) => ({
        ...user,
        myUserName: uid.uid,
      }));
    });
  }, []);

  //세션 입장 메서드
  const handlerJoinSessionEvent = () => {
    console.log("Join session");
    dataService.userJoinRoom(state.myUserName, state.mySessionId);

    dataService.getAllRooms((values) => {
      let currentPeoplecount = Object.values(values).filter(
        (room) => room.sessionId == state.mySessionId
      )[0].peopleCount;

      dataService.changeRoomData(state.mySessionId, currentPeoplecount + 1);
    });
  };

  //세션 나갈때
  const handlerLeaveSessionEvent = () => {
    console.log("Leave session");
    setState({
      ...state,
      session: undefined,
    });
    dataService.leftRoom(state.myUserName);

    dataService.getAllRooms((values) => {
      let currentPeoplecount = Object.values(values).filter(
        (room) => room.sessionId == state.mySessionId
      )[0].peopleCount;

      if (currentPeoplecount == 1) {
        //내가 마지막 인원이면
        dataService.deleteRoom(state.mySessionId);
      } else {
        //나가는데 인원이 더남아있으면
        dataService.changeRoomData(state.mySessionId, currentPeoplecount - 1);
      }
    });
  };

  const handlerErrorEvent = () => {
    console.log("Leave session");
  };

  const handleChangeSessionId = (e) => {
    setState({
      ...state,
      mySessionId: e.target.value,
    });
  };

  //방 만들기(세션만들기)
  const joinSession = (event) => {
    let isAlreadyExisted = false;
    dataService.getAllRooms((values) => {
      if (values != undefined) {
        const roomLength = Object.keys(values).filter(
          (room) => room == state.mySessionId
        ).length;
        if (roomLength != 0) {
          alert("이미 해당 방이 존재합니다");
          isAlreadyExisted = true;
        }
      }
    });
    // if (isAlreadyExisted) return;
    // console.log("joinSession");
    event.preventDefault();
    if (state.mySessionId && state.myUserName) {
      getToken().then((token) => {
        if (isAlreadyExisted) return;
        setState((prev) => ({
          ...prev,
          token: token,
          session: true,
        }));
        let roomIdx = 1;
        dataService.getAllRooms((callback) => {
          if (callback != undefined) {
            roomIdx = Object.keys(callback).length + 1;
          }
        });

        dataService.createRoom(state.mySessionId, roomIdx);
        //방생성 동시에 방에 접속(세션에 접속)
      });
    }
  };

  const getToken = () => {
    return createSession(state.mySessionId)
      .then((sessionId) => createToken(sessionId))
      .catch((Err) => console.error(Err));
  };

  const createSession = (sessionId) => {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions", data, {
          headers: {
            Authorization:
              "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("CREATE SESION", response);
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error.response && error.response.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              "No connection to OpenVidu Server. This may be a certificate error at " +
                OPENVIDU_SERVER_URL
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  OPENVIDU_SERVER_URL +
                  '"'
              )
            ) {
              window.location.assign(
                OPENVIDU_SERVER_URL + "/accept-certificate"
              );
            }
          }
        });
    });
  };

  const createToken = (sessionId) => {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({});
      axios
        .post(
          OPENVIDU_SERVER_URL +
            "/openvidu/api/sessions/" +
            sessionId +
            "/connection",
          data,
          {
            headers: {
              Authorization:
                "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("TOKEN", response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  };

  return (
    <>
      <Header />
      {state.session === undefined ? (
        <div>
          <div id="join">
            <div id="join-dialog">
              <h1> Join a video session </h1>
              <form onSubmit={joinSession}>
                <p>
                  <label> Session: </label>
                  <input
                    type="text"
                    id="sessionId"
                    value={state.mySessionId}
                    onChange={handleChangeSessionId}
                    required
                  />
                </p>
                <p>
                  <input name="commit" type="submit" value="JOIN" />
                </p>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h1>{state.mySessionId} 방</h1>
          <OpenViduSession
            id="opv-session"
            sessionName={state.mySessionId}
            user={state.myUserName}
            token={state.token}
            joinSession={handlerJoinSessionEvent}
            leaveSession={handlerLeaveSessionEvent}
            error={handlerErrorEvent}
          />
        </>
      )}
    </>
  );
}
