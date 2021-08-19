import { firebaseDatabase, firebaseAuth } from "./firebase";
import axios from "axios";

export default class Database {
  createUser(uid, name, email) {
    firebaseDatabase.ref(`users/${uid}`).set({
      name: name,
      email: email,
      score: 0,
      joinRoom: undefined,
    });
  }

  createRoom(sessionId) {
    firebaseDatabase.ref(`rooms`).set({
      sessionId: sessionId,
    });
  }
}
