import React, { useState, useEffect } from "react";
import * as S from "./Login.style";
import { useHistory } from "react-router-dom";
import Header from "../../components/header/Header";

const Login = ({ authService }) => {
  const [user, setUser] = useState({
    id: "",
    pwd: "",
  });
  const [isLoginState, setIsLoginState] = useState(false);
  const history = useHistory();

  const goToSignUp = () => {
    history.push("/signup");
  };

  useEffect(() => {
    const goToMain = (uid) => {
      history.push({
        pathname: "/rooms",
        state: { id: uid },
      });
    };

    const unscribe = authService.getLoginStatus((user) => {
      user && goToMain(user.uid);
    });

    return () => {
      unscribe();
    };
  }, [authService]);

  const updateUserInfo = (e) => {
    const type = e.currentTarget.id;
    const value = e.currentTarget.value;
    if (type === "id") {
      setUser((user) => ({ ...user, id: value }));
    } else {
      setUser((user) => ({ ...user, pwd: value }));
    }
  };

  const loginHandler = () => {
    if (isLoginState) return;
    setIsLoginState(true); // 로그인중
    authService
      .login(user.id, user.pwd)
      .then(() => {
        alert("로그인성공");
      })
      .catch(() => {
        alert("로그인실패 ㅠㅠ");
      })
      .finally(() => {
        setIsLoginState(false);
      });
  };
  return (
    <>
      <Header />
      <S.Container>
        <S.Title>
          <S.TitleText>Nontect Study</S.TitleText>
        </S.Title>
        <S.Box>
          <div>안녕하세요</div>
          <S.FormBox
            onSubmit={(e) => {
              e.preventDefault();
              loginHandler();
            }}
          >
            <S.Input
              type="text"
              placeholder="이메일 또는 전화번호"
              id="id"
              value={user.id}
              onChange={updateUserInfo}
            />
            <S.Input
              type="password"
              id="pwd"
              placeholder="비밀번호"
              value={user.pwd}
              onChange={updateUserInfo}
            />
            <S.SubmitBtn type="submit" value="로그인" />
            <S.Button type="button">비밀번호 찾기</S.Button>
          </S.FormBox>
          <S.DivLine />
          <S.SignUpBtn onClick={goToSignUp}>새 계정 만들기</S.SignUpBtn>
        </S.Box>
      </S.Container>
    </>
  );
};
export default Login;
