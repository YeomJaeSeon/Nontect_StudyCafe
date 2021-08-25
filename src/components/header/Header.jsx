import React from "react";
import * as S from "./Header.style";
import { useHistory } from "react-router";

const Header = ({ location, logout, chatting }) => {
  const history = useHistory();

  const goToHome = () => {
    history.push("/");
  };

  const displayMenu = () => {
    if (location === "main") {
      return (
        <>
          <S.InfoBtn>내 정보</S.InfoBtn>
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
