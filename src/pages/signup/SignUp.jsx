import React from 'react';
import * as S from './SignUp.style';

// 관심분야 체크박스 0 ~ 3
const SignUp = (props) => {
  return (
    <S.Container>
      <S.SignUpHeader>
        <S.Title>가입하기</S.Title>
        <S.SubTitle>빠르고 간단하게!</S.SubTitle>
      </S.SignUpHeader>
      <S.DivLine />
      <S.FormContainer>
        <S.Input type="text" placeholder="별명" />
        <S.Input type="text" placeholder="이메일" />
        <S.Input type="password" placeholder="비밀번호" />
        <S.Input type="password" placeholder="비밀번호 확인" />
        <S.InterestingTitle>관심분야</S.InterestingTitle>
        <S.ListContainer>
          <S.Label>
            건강
            <S.InputCheck type="checkbox" name="health" value="health" />
          </S.Label>
          <S.Label>
            자격증
            <S.InputCheck
              type="checkbox"
              name="certification"
              value="certification"
            />
          </S.Label>
          <S.Label>
            IT
            <S.InputCheck type="checkbox" name="IT" value="IT" />
          </S.Label>
          <S.Label>
            예능
            <S.InputCheck
              type="checkbox"
              name="entertainment"
              value="entertainment"
            />
          </S.Label>
          <S.Label>
            종교
            <S.InputCheck type="checkbox" name="religion" value="religion" />
          </S.Label>
          <S.Label>
            기술
            <S.InputCheck type="checkbox" name="tech" value="tech" />
          </S.Label>
        </S.ListContainer>
      </S.FormContainer>
      <S.SignUpBtn>가입하기</S.SignUpBtn>
    </S.Container>
  );
};

export default SignUp;
