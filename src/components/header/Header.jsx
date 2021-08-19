import React from "react";
import * as S from "./Header.style";

const Header = ({ location, logout }) => {
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
  return <S.HeaderContainer>{displayMenu()}</S.HeaderContainer>;
};

export default Header;
