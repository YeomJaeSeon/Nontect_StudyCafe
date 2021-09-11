import React from "react";
import * as S from "./Header.style";
import { useHistory } from "react-router";

const Header = ({ location, logout, chatting }) => {
  const history = useHistory();

  const goToHome = () => {
    history.push("/");
  };

  const goMyInfo = () => {
    history.push("/myinfo");
  };

  const displayMenu = () => {
    if (location === "main") {
      return (
        <>
          <S.InfoBtn onClick={goMyInfo}> 내 정보</S.InfoBtn>
          <S.LogoutBtn onClick={logout}>로그아웃</S.LogoutBtn>
        </>
      );
    } else if (location === "myinfo") {
      return (
        <>
          <S.InfoBtn onClick={goToHome}>메인으로</S.InfoBtn>
          <S.LogoutBtn onClick={logout}>로그아웃</S.LogoutBtn>
        </>
      );
    }
  };
  return (
    <>
      {chatting ? (
        <S.NonHeader></S.NonHeader>
      ) : (
        <S.HeaderContainer>
          {displayMenu()}
          <S.LogoContainer
            src="/openvidu_logo.png"
            art="logo"
            onClick={goToHome}
          ></S.LogoContainer>
        </S.HeaderContainer>
      )}
    </>
  );
};

export default Header;
