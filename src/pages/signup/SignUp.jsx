import React, { useState } from "react";
import * as S from "./SignUp.style";
import { useHistory } from "react-router-dom";
import { EmailReg } from "../../config/config";
import Header from "../../components/header/Header";

const today = new Date();
const year = today.getFullYear();
const month = ("0" + (today.getMonth() + 1)).slice(-2);
const day = ("0" + today.getDate()).slice(-2);
const nowDate = year + month + day;
// 관심분야 체크박스 0 ~ 3
const SignUp = ({ authService, dataService }) => {
  const [isCharacterProper, setIsCharacterProper] = useState(false);
  const [isEmailProper, setIsEmailProper] = useState(false);
  const [isPwdProper, setIsPwdProper] = useState(false);
  const [isPwdLengthProper, setIsPwdLengthProper] = useState(false);
  const [isRePwdLengthProper, setIsRePwdLengthProper] = useState(false);

  const [newUser, setNewUser] = useState({
    character: "",
    email: "",
    pwd: "",
    rePwd: "",
    interestedField: {
      health: true,
      IT: false,
      certification: false,
      entertainment: false,
      religion: false,
      tech: false,
    },
  });

  const [existedUsers, setExistedUsers] = useState([]);
  const [isSignUping, setIsSignUping] = useState(false); // 회원가입중 어뷰징 막기위해

  const history = useHistory();
  const goToLogin = () => {
    history.push("/");
  };

  const signUpHandler = (e) => {
    //먼저 이미 먼저 가입한 회원들의 이름을 가져옴
    dataService.getAllUsers((data) => {
      if (data) {
        const names = Object.values(data).map((data) => data.name);
        console.log(names);
        setExistedUsers(names);
      }
    });

    e.preventDefault();
    if (!isAllClear()) {
      alert("회원가입 조건을 모두 충족시켜주세요");
      return;
    } // 충조하지않으면 회원가입 X
    if (isSignUping) return;
    // 회원가입중이면 아무것도안함.
    if (!isCharacterProper) {
      alert("이미 존재하는 이름입니다.");
      return;
    }
    setIsSignUping(true);
    // 회원가입중
    authService
      .signUp(newUser.email, newUser.pwd)
      .then((user) => {
        console.log("user!!!!!!!!!!!!!!!!!!!!!");
        console.log(user);
        alert("회원가입 성공!");
        authService.logout();
        goToLogin();
        const interesedFieldArr = Object.keys(newUser.interestedField).filter(
          (v) => newUser.interestedField[`${v}`] === true
        );

        console.log("회원의 관심분야 배열");
        console.log(interesedFieldArr);

        dataService.createUser(
          user.user.uid,
          newUser.character,
          newUser.email,
          interesedFieldArr
        );
        dataService.createFocusRecord(user.user.uid, nowDate);
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          alert("이미 존재하는 이메일입니다.");
        }
      })
      .finally(() => {
        setIsSignUping(false);
        // 회원가입상태 변경.
      });
  };

  const upDateUserInfo = (e) => {
    const id = e.currentTarget.id;
    const value = e.currentTarget.value;
    // 별명 2 ~ 6자리까지 && 존재하는별명있는지
    if (id === "character") {
      if (value.length > 6) return;
      value.length >= 2
        ? existedUsers.some((characterName) => value === characterName)
          ? setIsCharacterProper(false)
          : setIsCharacterProper(true)
        : setIsCharacterProper(false);
      // email - 정규식에맞는지
    } else if (id === "email") {
      value.match(EmailReg) ? setIsEmailProper(true) : setIsEmailProper(false);
    }
    // 비번 6 ~ 10 - 재비번도 동일
    else if (id === "pwd") {
      if (value.length > 10) return;
      if (value.length < 6) {
        setIsPwdLengthProper(false);
      } else {
        setIsPwdLengthProper(true);
      }
      if (newUser.rePwd)
        newUser.rePwd === value ? setIsPwdProper(true) : setIsPwdProper(false);
    } else if (id === "rePwd") {
      if (value.length > 10) return;
      if (value.length < 6) setIsRePwdLengthProper(false);
      else setIsRePwdLengthProper(true);
      if (newUser.pwd)
        newUser.pwd === value ? setIsPwdProper(true) : setIsPwdProper(false);
    }
    setNewUser((user) => ({ ...user, [id]: value }));
  };

  // 1 ~ 3 checkbox
  const updateInterestedField = (e) => {
    const name = e.currentTarget.name;
    const isChecked = e.currentTarget.checked;

    const checkedCount = Object.values(newUser.interestedField).filter(
      (bool) => bool
    ).length;
    if (checkedCount === 1 && newUser.interestedField[name] === true) return;
    if (checkedCount === 3 && newUser.interestedField[name] === false) return;
    setNewUser((user) => ({
      ...user,
      interestedField: {
        ...user.interestedField,
        [name]: isChecked,
      },
    }));
  };

  const isAllClear = () => {
    if (
      isEmailProper &&
      isPwdProper &&
      newUser.character &&
      isPwdLengthProper &&
      isRePwdLengthProper
    )
      return true;
    else return false;
  };

  return (
    <S.BackgroundContainer>
      <Header />
      <S.Background src="./main_background.jpg" art="signup"></S.Background>
      <S.Container>
        <S.SignUpHeader>
          <S.Title>가입하기</S.Title>
          <S.SubTitle>빠르고 간단하게!</S.SubTitle>
        </S.SignUpHeader>
        <S.DivLine />
        <S.FormContainer onSubmit={signUpHandler}>
          {newUser.character.length > 0 && isCharacterProper === false && (
            <span>별명이 너무 짧습니다!</span>
          )}
          <S.Input
            type="text"
            placeholder="별명"
            id="character"
            value={newUser.character}
            onChange={upDateUserInfo}
          />
          {newUser.email.length > 0 && isEmailProper === false && (
            <span>이메일 형식이 틀립니다</span>
          )}
          <S.Input
            type="text"
            placeholder="이메일"
            id="email"
            value={newUser.email}
            onChange={upDateUserInfo}
          />
          {newUser.pwd.length > 0 && isPwdLengthProper === false && (
            <span>비밀번호가 너무 짧습니다!</span>
          )}
          {newUser.pwd.length > 0 && isPwdProper === false && (
            <span>두 비밀번호가 다릅니다!</span>
          )}
          <S.Input
            type="password"
            placeholder="비밀번호"
            id="pwd"
            value={newUser.pwd}
            onChange={upDateUserInfo}
          />
          {newUser.rePwd.length > 0 && isRePwdLengthProper === false && (
            <span>비밀번호가 너무 짧습니다!</span>
          )}
          {newUser.pwd.length > 0 && isPwdProper === false && (
            <span>두 비밀번호가 다릅니다!</span>
          )}
          <S.Input
            type="password"
            placeholder="비밀번호 확인"
            id="rePwd"
            value={newUser.rePwd}
            onChange={upDateUserInfo}
          />
          <S.InterestingTitle>관심분야(1 ~ 3개 선택)</S.InterestingTitle>
          <S.ListContainer>
            <S.Label>
              수능
              <S.InputCheck
                type="checkbox"
                name="health"
                value="health"
                onChange={updateInterestedField}
                checked={newUser.interestedField.health}
              />
            </S.Label>
            <S.Label>
              자격증
              <S.InputCheck
                type="checkbox"
                name="certification"
                value="certification"
                onChange={updateInterestedField}
                checked={newUser.interestedField.certification}
              />
            </S.Label>
            <S.Label>
              IT
              <S.InputCheck
                type="checkbox"
                name="IT"
                value="IT"
                onChange={updateInterestedField}
                checked={newUser.interestedField.IT}
              />
            </S.Label>
            <S.Label>
              예체능
              <S.InputCheck
                type="checkbox"
                name="entertainment"
                value="entertainment"
                onChange={updateInterestedField}
                checked={newUser.interestedField.entertainment}
              />
            </S.Label>
            <S.Label>
              외국어
              <S.InputCheck
                type="checkbox"
                name="religion"
                value="religion"
                onChange={updateInterestedField}
                checked={newUser.interestedField.religion}
              />
            </S.Label>
            <S.Label>
              기타
              <S.InputCheck
                type="checkbox"
                name="tech"
                value="tech"
                onChange={updateInterestedField}
                checked={newUser.interestedField.tech}
              />
            </S.Label>
          </S.ListContainer>
          <S.None type="submit" />
        </S.FormContainer>
        <S.SignUpBtn isAllClear={() => isAllClear()} onClick={signUpHandler}>
          가입하기
        </S.SignUpBtn>
        <S.LoginBtn onClick={goToLogin}>로그인하러가기</S.LoginBtn>
      </S.Container>
    </S.BackgroundContainer>
  );
};

export default SignUp;
