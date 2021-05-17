import React, { useState } from 'react';
import * as S from './Search.style';

const Search = (props) => {
  const [search, setSearch] = useState('');
  return (
    <S.SelectorContainer>
      <S.Selector>
        <option>제목</option>
        <option>해시태그</option>
      </S.Selector>
      <S.Input type="text" placeholder="검색" />
    </S.SelectorContainer>
  );
};

export default Search;
