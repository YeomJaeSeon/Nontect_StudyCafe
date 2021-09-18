import React, { useState } from "react";
import * as S from "./Search.style";

const Search = ({
  hashMatch,
  searchRooms,
  recommendUserRooms,
  myHashTag,
  isSelectMyHash,
}) => {
  const [search, setSearch] = useState("title");
  const [inputSearch, setInputSearch] = useState("");
  const [hashSearch, setHashSearch] = useState("수능");
  const searchOption = (e) => {
    e.preventDefault();
    console.log("검색");
    if (search == "title") {
      if (inputSearch == "") {
        alert("방 제목을 입력해주세요");
        return;
      }
      searchRooms(search, inputSearch);
    } else {
      searchRooms(search, hashSearch);
    }
  };

  const handleHashChangeHandler = (e) => {
    setHashSearch(e.target.value);
  };

  const recommendMyRooms = () => {
    recommendUserRooms();
  };

  const displayMyHashTag = () => {
    return (
      <S.HashBox>
        {myHashTag.map((value) => (
          <S.HashSpan>{value}</S.HashSpan>
        ))}
      </S.HashBox>
    );
  };
  return (
    <S.SelectorContainer>
      <S.FormContainer onSubmit={searchOption}>
        <S.Selector
          onChange={(e) => {
            console.log(e.target.value);
            setSearch(e.target.value);
            console.log("변경됨");
          }}
        >
          <option name="title" value="title">
            제목
          </option>
          <option name="hashTag" value="hashTag">
            해시태그
          </option>
        </S.Selector>
        {search == "title" ? (
          <S.Input
            type="text"
            placeholder="제목 검색"
            value={inputSearch}
            onChange={(e) => {
              setInputSearch(e.target.value);
            }}
          />
        ) : (
          <S.Select onChange={handleHashChangeHandler}>
            {Object.values(hashMatch).map((value, idx) => {
              return (
                <option key={idx} value={value}>
                  {value}
                </option>
              );
            })}
          </S.Select>
        )}
        <S.SearchBtn onClick={searchOption}>
          <S.SearchIcon src="/search.png" alt="search"></S.SearchIcon>
        </S.SearchBtn>
        <S.RecommendBtn onClick={recommendMyRooms} type="button">
          나에게 맞는 방 추천
        </S.RecommendBtn>
        {isSelectMyHash && displayMyHashTag()}
      </S.FormContainer>
    </S.SelectorContainer>
  );
};

export default Search;
