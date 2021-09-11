import React, { useEffect, useState } from "react";
import * as S from "./Myinfo.style";
import { useHistory } from "react-router-dom";
import Header from "../../components/header/Header";

/*회원정보창에서 이름은 텍스트필드, 해쉬테그는 체크박스,
  집중정보는 리스트형태
  원하는 정보를 입력, 수정한 뒤 저장누르면 자동으로 업데이트
  그냥 세션을 나갈경우 기존 정보가 저장

  집중비율은 SUM(totalStudySec) / SUM(focusStudySec)
*/

const Myinfo = ({ authService, dataService }) => {
  //getLoginStatus를 통해 로그인한 유저의 uid를 받아오기 위함
  const [isLoading, setIsLoading] = useState(false);
  const [uid, setUid] = useState(); // 유저의 uid

  const [userData, setUserData] = useState({
    name: "",
    focusRecord: {},
    hashTag: {
      health: false,
      IT: false,
      certification: false,
      entertainment: false,
      religion: false,
      tech: false,
    },
  }); //로그인한 유저의 정보

  const [isReadOnly, setIsReadOnly] = useState(true);

  const history = useHistory();

  useEffect(() => {
    setIsLoading(true); //로딩중

    const unscribe = authService.getLoginStatus((user) => {
      if (user) {
        setUid(user.uid);
      } else {
        history.push("/");
        alert("로그아웃 성공");
      }
    });

    return () => {
      unscribe();
    };
  }, []);

  //로그인한 회원의 정보를 받아오는 로즥
  useEffect(() => {
    dataService.getLoginUserData(uid, (userDataFromFB) => {
      console.log("로그인한 유저의 데이터받아오기");
      console.log(userDataFromFB);
      if (userDataFromFB.uid) {
        setUserData((prev) => {
          const newHashTag = {
            health: false,
            IT: false,
            certification: false,
            entertainment: false,
            religion: false,
            tech: false,
          };
          Object.keys(userDataFromFB.hashTag).forEach((hash) => {
            newHashTag[`${hash}`] = true;
          });
          return {
            ...prev,
            name: userDataFromFB.name,
            focusRecord: userDataFromFB.focusRecord,
            hashTag: newHashTag,
          };
        });
      }

      setIsLoading(false);
    });
  }, [uid]);

  const logout = () => {
    authService.logout();
  };

  //수정 - 완료 버튼 클릭 핸들러 함수
  const changeBtnHandler = () => {
    console.log("change btn clicked");
    setIsReadOnly((prev) => {
      if (!prev) {
        //완료 버튼 클릭시 - db에 수정내용 적용되어야함
        if (userData.name.length < 2) {
          alert("별명이 너무 짧습니다.");
          return;
        } else if (userData.name.trim() == "") {
          alert("공백만으로 이루어져있습니다.");
          return;
        } else {
          const interestedField = Object.keys(userData.hashTag).filter(
            (hashTagName) => userData.hashTag[`${hashTagName}`]
          );

          console.log(interestedField);
          dataService.updateLoginUserData(uid, userData.name, interestedField);
        }
      }
      return !prev;
    });
  };

  //별명 수정 핸들러 함수
  const changeNameHandler = (e) => {
    const value = e.currentTarget.value;
    if (value.length > 6) return;
    setUserData((prev) => ({
      ...prev,
      name: value,
    }));
  };

  // 1 ~ 3 checkbox (관심사 수정 핸들러 함수)
  const updateInterestedField = (e) => {
    if (isReadOnly) return;
    const name = e.currentTarget.name;
    const isChecked = e.currentTarget.checked;

    const checkedCount = Object.values(userData.hashTag).filter(
      (bool) => bool
    ).length;
    if (checkedCount === 1 && userData.hashTag[name] === true) return;
    if (checkedCount === 3 && userData.hashTag[name] === false) return;
    setUserData((user) => ({
      ...user,
      hashTag: {
        ...user.hashTag,
        [name]: isChecked,
      },
    }));
  };

  return (
    <>
      {isLoading ? (
        <>
          <Header />
          <S.LoadingSpinnerContainer>
            <S.LoadingSpinner />
          </S.LoadingSpinnerContainer>
        </>
      ) : (
        <>
          <Header location="myinfo" logout={logout} />
          <S.BackgroundContainer>
            <S.Background src="./main_background.jpg" alt="main"></S.Background>
            <S.MainContainer>
              <S.FormContainer
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                {isReadOnly ? (
                  <S.EditBtn onClick={changeBtnHandler}>수정</S.EditBtn>
                ) : (
                  <S.EditBtn onClick={changeBtnHandler}>완료</S.EditBtn>
                )}
                <S.SmallTitle>내 정보</S.SmallTitle>
                <S.InterestingTitle>별명</S.InterestingTitle>
                <S.Input
                  type="text"
                  id="character"
                  value={userData.name}
                  readOnly={isReadOnly}
                  onChange={changeNameHandler}
                />
                <S.InterestingTitle>관심분야</S.InterestingTitle>
                <S.ListContainer>
                  <S.Label>
                    건강
                    <S.InputCheck
                      type="checkbox"
                      name="health"
                      value="health"
                      checked={userData.hashTag.health}
                      readOnly={isReadOnly}
                      onChange={updateInterestedField}
                    />
                  </S.Label>
                  <S.Label>
                    자격증
                    <S.InputCheck
                      type="checkbox"
                      name="certification"
                      value="certification"
                      checked={userData.hashTag.certification}
                      readOnly={isReadOnly}
                      onChange={updateInterestedField}
                    />
                  </S.Label>
                  <S.Label>
                    IT
                    <S.InputCheck
                      type="checkbox"
                      name="IT"
                      value="IT"
                      checked={userData.hashTag.IT}
                      readOnly={isReadOnly}
                      onChange={updateInterestedField}
                    />
                  </S.Label>
                  <S.Label>
                    예능
                    <S.InputCheck
                      type="checkbox"
                      name="entertainment"
                      value="entertainment"
                      checked={userData.hashTag.entertainment}
                      readOnly={isReadOnly}
                      onChange={updateInterestedField}
                    />
                  </S.Label>
                  <S.Label>
                    종교
                    <S.InputCheck
                      type="checkbox"
                      name="religion"
                      value="religion"
                      checked={userData.hashTag.religion}
                      readOnly={isReadOnly}
                      onChange={updateInterestedField}
                    />
                  </S.Label>
                  <S.Label>
                    기술
                    <S.InputCheck
                      type="checkbox"
                      name="tech"
                      value="tech"
                      checked={userData.hashTag.tech}
                      readOnly={isReadOnly}
                      onChange={updateInterestedField}
                    />
                  </S.Label>
                </S.ListContainer>
                <S.DivLine />
                <S.SmallTitle>공부 정보</S.SmallTitle>
              </S.FormContainer>
            </S.MainContainer>
          </S.BackgroundContainer>
        </>
      )}
    </>
  );
};

export default Myinfo;
