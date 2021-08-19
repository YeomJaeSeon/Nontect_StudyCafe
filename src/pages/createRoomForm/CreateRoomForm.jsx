import React, { useState } from "react";
import axios from "axios";
import Header from "../../components/header/Header";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import OpenViduSession from "openvidu-react";

const OPENVIDU_SERVER_URL = "https://ec2-3-227-185-154.compute-1.amazonaws.com";
const OPENVIDU_SERVER_SECRET = "0000";

export default function CreateRoomForm({ dataService }) {
  const [state, setState] = useState({
    mySessionId: "SessionA",
    myUserName: "OpenVidu_User_" + Math.floor(Math.random() * 100),
    token: undefined,
    session: undefined,
  });

  const handlerJoinSessionEvent = () => {
    console.log("Join session");
  };

  const handlerLeaveSessionEvent = () => {
    console.log("Leave session");
    setState({
      ...state,
      session: undefined,
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

  const handleChangeUserName = (e) => {
    setState({
      ...state,
      myUserName: e.target.value,
    });
  };

  const joinSession = (event) => {
    console.log("joinSession");
    event.preventDefault();
    if (state.mySessionId && state.myUserName) {
      getToken().then((token) => {
        setState((prev) => ({
          ...prev,
          token: token,
          session: true,
        }));
        //database 방 session Id 저장
        console.log(dataService);
        dataService.createRoom(state.mySessionId);
        dataService.joinRoom(state.myUserName);
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
                this.OPENVIDU_SERVER_URL
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
                  <label>Participant: </label>
                  <input
                    type="text"
                    id="userName"
                    value={state.myUserName}
                    onChange={handleChangeUserName}
                    required
                  />
                </p>
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
