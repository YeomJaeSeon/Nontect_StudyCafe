import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header/Header";
import OpenViduSession from "openvidu-react";
import {
  OPENVIDU_SERVER_URL,
  OPENVIDU_SERVER_SECRET,
  koreanReg,
} from "../../config/config";

import { alarm, Focus, setFocus } from "./Focus";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import { drawMesh } from "./utilities";
import Webcam from "react-webcam";

import { useHistory, useLocation } from "react-router";
import * as S from "./CreateRoomForm.style";
import { useBeforeunload } from "react-beforeunload";

import Graph from "../../components/graph/Graph";

import Modal from "react-modal";
import Time from "../../components/time/Time";

const customStyles = {
  content: {
    top: "45%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function CreateRoomForm({ authService, dataService }) {
  const [clickGraph, setClickGraph] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  let subtitle;

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  //----집중시간 나타내는 변수 ----//
  const [totalSec, setTotalSeconds] = useState(0);
  const [studySec, setStudySeconds] = useState(0);

  const FocusingRate = studySec / totalSec; //집중도

  const Totalminute = Math.floor(totalSec / 60);
  const Totalsecond = totalSec % 60;
  const Studyminute = Math.floor(studySec / 60);
  const Studysecond = studySec % 60;

  const [state, setState] = useState({
    mySessionId: "", // 방이름
    myUserName: "", // 유저이름(유저의 uid임) - 별명아님
    token: undefined,
    session: undefined,
  });

  //--이현욱
  //yyyymmdd 형식의 날짜 데이터
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const nowDate = year + month + day;

  //  Load posenet
  const runFacemesh = async () => {
    const net = await facemesh.load(
      facemesh.SupportedPackages.mediapipeFacemesh
    );
    setInterval(() => {
      //clearInterval -> 멈출 수 있음
      detect(net);
    }, 800);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      // OLD MODEL
      //       const face = await net.estimateFaces(video);
      // NEW MODEL
      const face = await net.estimateFaces({ input: video });

      // try-catch 예외처리 - 얼굴최초인식되고 도중에 인식안될때
      // 프로그램 비정상 종료되는 에러있었음.
      try {
        alarm(face[0].annotations);
      } catch (err) {
        console.log("얼굴 인식안됩니다.");
        setFocus(false);
      }
      console.log("---------");

      // Get canvas context
      //==염재선 - 임시방편 방들어갔다 나오면 canvasRef.current가 null됨==//

      const ctx = canvasRef.current && canvasRef.current.getContext("2d");
      requestAnimationFrame(() => {
        drawMesh(face, ctx);
      });
    }
  };
  //집중시간 업데이트시 초, 분은 변화가 나타나지만 mesh는 지속적으로 렌더링 되어야 하기에
  const mounted = useRef(false);

  useEffect(() => {
    runFacemesh();

    const totalStudytime = setInterval(() => {
      //총 공부시간
      setTotalSeconds((totalSec) => totalSec + 1);
    }, 1000);
    const realStudytime = setInterval(() => {
      //총 공부시간
      if (Focus) {
        setStudySeconds((studySec) => studySec + 1);
      }
    }, 1000);

    //언마운트시 데이터 누출막기
    return () => {
      clearInterval(totalStudytime);
      clearInterval(realStudytime);
    };
  }, []); //배열 안에 minutes, seconds를 설정하여 인터벌간격(1초)마다 업데이트

  //==방에서 total시간 db 연동==//
  useEffect(() => {
    dataService.updateTotalTimeByRoom(state.myUserName, totalSec);
  }, [totalSec]);

  //==방에서 집중시간 db 연동==//
  useEffect(() => {
    dataService.updateFocusTimeByRoom(state.myUserName, studySec);
  }, [studySec]);

  //---------------------------------------------------------------
  const [isLoading, setIsLoading] = useState(false);

  const [interestedField, setInterestedField] = useState({
    health: true,
    IT: false,
    certification: false,
    entertainment: false,
    religion: false,
    tech: false,
  });

  const [isSecreteRoom, setIsSecreteRoom] = useState(false);

  const [secreteRoomNumber, setSecreteRoomNumber] = useState("");
  //방의 해시태그
  // 1 ~ 3 checkbox
  const updateInterestedField = (e) => {
    const name = e.currentTarget.name;
    const isChecked = e.currentTarget.checked;

    const checkedCount = Object.values(interestedField).filter(
      (bool) => bool
    ).length;
    if (checkedCount === 1 && interestedField[name] === true) return;
    if (checkedCount === 3 && interestedField[name] === false) return;
    setInterestedField((prev) => ({
      ...prev,
      [name]: isChecked,
    }));
  };

  const location = useLocation();
  const history = useHistory();

  useBeforeunload((e) => {
    e.preventDefault();
  });

  useEffect(() => {
    const unscribe = authService.getLoginStatus((user) => {
      if (user) {
        //로그인 되어있으면
        if (location.state !== undefined) {
          setState((prev) => ({
            ...prev,
            mySessionId: location.state.name,
          }));
          joinSession(undefined);
        }
        setState((u) => ({
          ...u,
          myUserName: user.uid,
        }));
      } else {
        //로그인 안되어있으면
        history.push("/");
        alert("로그인 해주세요");
      }
    });
    return () => {
      unscribe();
    };
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
    //-- 이현욱
    // 누적은 1번만 시행이 되도록 하기 위해서 count
    dataService.studayDataExists(state.myUserName, nowDate, (value) => {
      console.log("value 출력" + value);
      var count = 0;
      count++;
      if (value == true && count == 1) {
        //기존 데이터가 있으므로 누적
        console.log("@@@@누적실행 @@@@");
        dataService.getTodayStudyData(state.myUserName, nowDate, (values) => {
          var currentTotalTime = Object.values(values);
          //index 0 : focustime, index 1 : totaltime
          var cumulativeTotalSec = totalSec + currentTotalTime[1];
          var cumulativeStudylSec = studySec + currentTotalTime[0];
          if (count == 1) {
            dataService.focusRecord(
              state.myUserName,
              nowDate,
              cumulativeTotalSec,
              cumulativeStudylSec
            );
            count++;
          }
        });
      } else if (value == false && count == 1) {
        dataService.focusRecord(state.myUserName, nowDate, totalSec, studySec);
        count++;
      }
    });

    setIsLoading(true);
    console.log("세션 나감!! ");
    setState({
      ...state,
      session: undefined,
    });
    dataService.leftRoom(state.myUserName);

    dataService.getAllRooms((values) => {
      const room = Object.values(values).filter(
        (room) => room.sessionId == state.mySessionId
      );

      if (room[0]) {
        let currentPeoplecount = room[0].peopleCount;
        console.log("나갈대 현재 방인원 세보자 ");
        console.log(currentPeoplecount);

        if (currentPeoplecount <= 1) {
          //내가 마지막 인원이면
          dataService.deleteRoom(state.mySessionId).then(() => {
            history.push("/rooms");
            setIsLoading(false);
          });
        } else {
          //나가는데 인원이 더남아있으면
          dataService
            .changeRoomData(state.mySessionId, currentPeoplecount - 1)
            .then(() => {
              console.log("ㅋㅋㅋ");
              history.push("/rooms");
              setIsLoading(false);
            });
        }
      } else {
        history.push("/rooms");
        setIsLoading(false);
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
    setIsLoading(true);
    let isAlreadyExisted = false;
    dataService.getAllRooms((values) => {
      if (values != undefined) {
        const roomLength = Object.keys(values).filter(
          (room) => room == state.mySessionId
        ).length;
        if (event !== undefined && roomLength != 0) {
          alert("이미 해당 방이 존재합니다");
          isAlreadyExisted = true;
        }
      }
    });
    if (event !== undefined) {
      event.preventDefault();
      if (state.mySessionId == "") {
        alert("방이름을 입력해주세요!");
        setIsLoading(false);
        return;
      }

      if (koreanReg.test(state.mySessionId)) {
        alert("방이름은 한글로 설정할수 없습니다.");
        setIsLoading(false);
        return;
      }
    }
    if (event !== undefined) {
      //방생성 후 입장

      if (isSecreteRoom) {
        //비밀방 여부 true로 설정했으면
        if (secreteRoomNumber == "") {
          //공백이면
          alert("방 비밀번호를 입력해주세요");
          setIsLoading(false);
          return;
        }
      }

      console.log("방 생성 후 입장");
      if (state.mySessionId && state.myUserName) {
        getToken().then((token) => {
          if (isAlreadyExisted) {
            setIsLoading(false);
            return;
          }
          setState((prev) => ({
            ...prev,
            token: token,
            session: true,
          }));
          //방생성 동시에 방에 접속(세션에 접속)
          const interestArr = Object.keys(interestedField).filter(
            (value) => interestedField[value] == true
          );
          console.log("방의 해쉬태그으으으으");
          console.log(interestArr);
          if (isSecreteRoom) {
            //비밀방이면
            dataService.createRoom(
              state.mySessionId,
              interestArr,
              secreteRoomNumber
            );
          } else {
            //공개방이면
            dataService.createRoom(state.mySessionId, interestArr, "public");
          }
          setIsLoading(false);
        });
      }
    } else {
      //방 목록에서 방입장
      console.log("방 목록에서 방입장!!!!!!!!");

      getToken().then((token) => {
        setState((prev) => ({
          ...prev,
          token: token,
          session: true,
        }));
        setIsLoading(false);
      });
    }
  };

  const getToken = () => {
    if (location.state == undefined) {
      console.log("나는 방생성해서 들어왔어요");
      return createSession(state.mySessionId)
        .then((sessionId) => createToken(sessionId))
        .catch((Err) => console.error(Err));
    } else {
      console.log("나는 방 목록에서 입장해서 들어왔어요");
      return createSession(location.state.name)
        .then((sessionId) => createToken(sessionId))
        .catch((Err) => console.error(Err));
    }
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

  //==모달 관련 메서드==//

  const openModal = () => {
    setIsOpen(true);
  };
  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  //== secrete room 여부 체크메서드==//
  const selectSecreteRoomHandler = () => {
    setIsSecreteRoom((prev) => {
      if (!prev) {
        console.log("비밀방으로 변경됨");
      }
      return !prev;
    });
  };

  //==secret room number 입력==//
  const changeSecreteRoomNumberHandler = (e) => {
    setSecreteRoomNumber(e.target.value);
  };

  return (
    <>
      {isLoading ? (
        <>
          <Header />
          <S.LoadingSpinnerContainer>
            <S.LoadingSpinner />
          </S.LoadingSpinnerContainer>
        </>
      ) : (
        <>
          {state.session ? (
            // 화상채팅중
            <Header chatting={true} />
          ) : (
            // 화상채팅 안하는중
            <Header chatting={false} />
          )}

          {state.session === undefined ? (
            <S.BackgroundContainer>
              <S.Background
                src="/main_background.jpg"
                alt="main"
              ></S.Background>
              <S.CreateContainer>
                <div>
                  <h1> 스터디룸 생성 </h1>
                  <S.DivLine />
                  <form onSubmit={joinSession}>
                    <p>
                      <S.NameLabel>스터디룸 이름을 입력하세요</S.NameLabel>
                      <S.NameInput
                        type="text"
                        id="sessionId"
                        value={state.mySessionId}
                        onChange={handleChangeSessionId}
                        required
                      />
                    </p>
                    <S.SecreteRoomSelector>
                      <label>
                        비밀방 여부
                        <input
                          type="checkbox"
                          onClick={selectSecreteRoomHandler}
                          checked={isSecreteRoom}
                        />
                      </label>
                    </S.SecreteRoomSelector>
                    {isSecreteRoom ? (
                      <S.SecreteNumberInput>
                        <input
                          value={secreteRoomNumber}
                          onChange={changeSecreteRoomNumberHandler}
                          type="number"
                          placeholder="방 비밀번호 입력(숫자)"
                        />
                      </S.SecreteNumberInput>
                    ) : (
                      <S.SecreteNumberInput></S.SecreteNumberInput>
                    )}

                    <p>
                      <S.NameLabel>
                        스터디룸 해시태그를 선택하세요(최대 3개)
                      </S.NameLabel>
                      <S.RoomHashTagBox>
                        <S.Label>
                          수능
                          <S.InputCheck
                            type="checkbox"
                            name="health"
                            value="health"
                            onChange={updateInterestedField}
                            checked={interestedField.health}
                          />
                        </S.Label>
                        <S.Label>
                          자격증
                          <S.InputCheck
                            type="checkbox"
                            name="certification"
                            value="certification"
                            onChange={updateInterestedField}
                            checked={interestedField.certification}
                          />
                        </S.Label>
                        <S.Label>
                          IT
                          <S.InputCheck
                            type="checkbox"
                            name="IT"
                            value="IT"
                            onChange={updateInterestedField}
                            checked={interestedField.IT}
                          />
                        </S.Label>
                        <S.Label>
                          예체능
                          <S.InputCheck
                            type="checkbox"
                            name="entertainment"
                            value="entertainment"
                            onChange={updateInterestedField}
                            checked={interestedField.entertainment}
                          />
                        </S.Label>
                        <S.Label>
                          외국어
                          <S.InputCheck
                            type="checkbox"
                            name="religion"
                            value="religion"
                            onChange={updateInterestedField}
                            checked={interestedField.religion}
                          />
                        </S.Label>
                        <S.Label>
                          기타
                          <S.InputCheck
                            type="checkbox"
                            name="tech"
                            value="tech"
                            onChange={updateInterestedField}
                            checked={interestedField.tech}
                          />
                        </S.Label>
                      </S.RoomHashTagBox>
                    </p>
                    <p>
                      <S.CreateButton name="commit" type="submit">
                        생성
                      </S.CreateButton>
                    </p>
                  </form>
                </div>
              </S.CreateContainer>
            </S.BackgroundContainer>
          ) : (
            <>
              <S.VideoContainer>
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

                <S.Facemesh>
                  <div>
                    <header>
                      <Webcam
                        ref={webcamRef}
                        style={{
                          position: "absolute",

                          zindex: 9,
                          width: 640,
                          height: 480,
                        }}
                      />
                      <canvas
                        ref={canvasRef}
                        style={{
                          position: "absolute",

                          zindex: 9,
                          width: 640,
                          height: 480,
                        }}
                      />
                    </header>
                  </div>
                </S.Facemesh>
              </S.VideoContainer>
              <S.ModalOpenButton onClick={openModal}>
                집중도 & 집중 시간 비교
              </S.ModalOpenButton>
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="graph Modal"
              >
                <S.ModalCloseButton onClick={closeModal}>
                  닫기
                </S.ModalCloseButton>
                <Graph
                  dataService={dataService}
                  roomName={state.mySessionId}
                ></Graph>
                <Time
                  dataService={dataService}
                  roomName={state.mySessionId}
                ></Time>
              </Modal>
            </>
          )}
        </>
      )}
    </>
  );
}
