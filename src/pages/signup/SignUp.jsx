import React, { useState } from 'react';
import * as S from './SignUp.style';
import { useHistory } from 'react-router-dom';

const EmailReg =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// 관심분야 체크박스 0 ~ 3
const SignUp = ({ authService }) => {
  const [isCharacterProper, setIsCharacterProper] = useState(false);
  const [isEmailProper, setIsEmailProper] = useState(false);
  const [isPwdProper, setIsPwdProper] = useState(false);
  const [isPwdLengthProper, setIsPwdLengthProper] = useState(false);
  const [isRePwdLengthProper, setIsRePwdLengthProper] = useState(false);

  const [newUser, setNewUser] = useState({
    character: '',
    email: '',
    pwd: '',
    rePwd: '',
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
    history.push('/');
  };

  const signUpHandler = () => {
    if (!isAllClear()) return;
    if (isSignUping) return;
    // 회원가입중이면 아무것도안함.
    if (!isCharacterProper) {
      alert('이미 존재하는 이름입니다.');
      return;
    }

    setIsSignUping(true);
    // 회원가입중
    authService
      .signUp(newUser.email, newUser.pwd)
      .then((user) => {
        // user &&
        //   user.user &&
        //   databaseService.createUser(user.user?.uid, newUser.character);
        alert('회원가입 성공!');
        authService.logout();
        goToLogin();
      })
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use') {
          alert('이미 존재하는 이메일입니다.');
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
    if (id === 'character') {
      if (value.length > 6) return;
      value.length >= 2
        ? existedUsers.some((characterName) => value === characterName)
          ? setIsCharacterProper(false)
          : setIsCharacterProper(true)
        : setIsCharacterProper(false);
      // email - 정규식에맞는지
    } else if (id === 'email') {
      value.match(EmailReg) ? setIsEmailProper(true) : setIsEmailProper(false);
    }
    // 비번 6 ~ 10 - 재비번도 동일
    else if (id === 'pwd') {
      if (value.length > 10) return;
      if (value.length < 6) {
        setIsPwdLengthProper(false);
      } else {
        setIsPwdLengthProper(true);
      }
      if (newUser.rePwd)
        newUser.rePwd === value ? setIsPwdProper(true) : setIsPwdProper(false);
    } else if (id === 'rePwd') {
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
    <S.Container>
      <S.SignUpHeader>
        <S.Title>가입하기</S.Title>
        <S.SubTitle>빠르고 간단하게!</S.SubTitle>
      </S.SignUpHeader>
      <S.DivLine />
      <S.FormContainer
        onSubmit={(e) => {
          signUpHandler();
          e.preventDefault();
        }}
      >
        {newUser.character.length > 0 && isCharacterProper === false && (
          <span>최소 2글자입니다.</span>
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
        <S.Input
          type="password"
          placeholder="비밀번호"
          id="pwd"
          value={newUser.pwd}
          onChange={upDateUserInfo}
        />
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
            건강
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
            예능
            <S.InputCheck
              type="checkbox"
              name="entertainment"
              value="entertainment"
              onChange={updateInterestedField}
              checked={newUser.interestedField.entertainment}
            />
          </S.Label>
          <S.Label>
            종교
            <S.InputCheck
              type="checkbox"
              name="religion"
              value="religion"
              onChange={updateInterestedField}
              checked={newUser.interestedField.religion}
            />
          </S.Label>
          <S.Label>
            기술
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
      <S.SignUpBtn onClick={signUpHandler}>가입하기</S.SignUpBtn>
    </S.Container>
  );
};

export default SignUp;
