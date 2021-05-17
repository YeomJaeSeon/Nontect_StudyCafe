import React from 'react';
import * as S from './Login.style';
import { useHistory } from 'react-router-dom';

const Login = (props) => {
  const history = useHistory();

  const goToSignUp = () => {
    history.push('/signup');
  };
  return (
    <S.Container>
      <S.Title>
        <S.TitleText>Nontect Study</S.TitleText>
      </S.Title>
      <S.Box>
        <S.FormBox>
          <S.Input type="text" placeholder="이메일 또는 전화번호" />
          <S.Input type="password" placeholder="비밀번호" />
          <S.SubmitBtn type="submit" value="로그인" />
          <S.Button type="button">비밀번호 찾기</S.Button>
        </S.FormBox>
        <S.DivLine />
        <S.SignUpBtn onClick={goToSignUp}>새 계정 만들기</S.SignUpBtn>
      </S.Box>
    </S.Container>
  );
};
export default Login;
