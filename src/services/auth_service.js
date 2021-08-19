import { firebaseAuth } from "./firebase";

export default class AuthService {
  signUp(email, password) {
    return firebaseAuth.createUserWithEmailAndPassword(email, password);
  }
  login(email, password) {
    return firebaseAuth.signInWithEmailAndPassword(email, password);
  }
  // 유저의 로그인 상태 받아옴
  getLoginStatus(callback) {
    return firebaseAuth.onAuthStateChanged((user) => {
      callback && callback(user);
    });
  }
  logout() {
    firebaseAuth.signOut();
  }
  // 회원 탈퇴. 유저 회원가입 정보 삭제(auth 삭제임. db삭제아님)
  delete() {
    // const deleteUser = firebaseAuth.currentUser;
    // deleteUser?.delete().catch(() => {
    //   this.logout();
    // });
  }
}
