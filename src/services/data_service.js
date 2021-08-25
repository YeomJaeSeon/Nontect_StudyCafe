import { firebaseDatabase, firebaseAuth } from "./firebase";
import axios from "axios";

// 기본적으로 axios로 rest api를 이용하려했음
// 뭔가 0은 없다는 것을 의미함.(일종의 flag)

export default class Database {
  //==회원가입==//
  createUser(uid, name, email, interestedField) {
    const entries = new Map();
    interestedField.forEach((value) => {
      entries.set(value, value);
    });

    const obj = Object.fromEntries(entries);

    return axios.put(
      `https://web-project-e37c4-default-rtdb.firebaseio.com/users/${uid}.json`,
      {
        uid: uid,
        name: name,
        email: email,
        score: 0,
        joinRoom: 0,
        hashTag: obj,
      }
    );
  }

  //==방장이 방생성==//
  createRoom(sessionId, interestedArr) {
    const entries = new Map();
    interestedArr.forEach((value) => {
      entries.set(value, value);
    });

    const obj = Object.fromEntries(entries);
    return axios.put(
      `https://web-project-e37c4-default-rtdb.firebaseio.com/rooms/${sessionId}.json`,
      {
        sessionId: sessionId,
        peopleCount: 0, //방만 생성시 count = 0 (방의 유저 수)
        hashTag: obj,
      }
    );
  }

  //==방에 진입==//(user 데이터 변경)
  userJoinRoom(uid, sessionId) {
    return axios.patch(
      `https://web-project-e37c4-default-rtdb.firebaseio.com/users/${uid}.json`,
      { joinRoom: sessionId }
    );
  }

  //==방에 진입 혹은 퇴장시--//(room 데이터 변경)
  changeRoomData(sessionId, peopleCount) {
    return axios.patch(
      `https://web-project-e37c4-default-rtdb.firebaseio.com/rooms/${sessionId}.json`,
      { peopleCount: peopleCount }
    );
  }

  //==방에서 나감==//
  leftRoom(uid) {
    return axios.patch(
      `https://web-project-e37c4-default-rtdb.firebaseio.com/users/${uid}.json`,
      { joinRoom: 0 }
    );
  }

  //==방 삭제==//
  deleteRoom(sessionId) {
    return axios.delete(
      `https://web-project-e37c4-default-rtdb.firebaseio.com/rooms/${sessionId}.json`
    );
  }

  //==== 데이터 조회 =====//
  //== rooms 모두 조회 ==//
  getAllRooms(func) {
    const roomsDatasRef = firebaseDatabase.ref(`rooms`);
    roomsDatasRef.once("value", (snapshot) => {
      func && func(snapshot.val());
    });
  }

  //== users 모두 조회==//
  getAllUsers(func) {
    const usersDatasRef = firebaseDatabase.ref("users");
    usersDatasRef.once("value", (snapshot) => {
      func && func(snapshot.val());
    });
  }
}
