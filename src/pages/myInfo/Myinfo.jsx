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
                <S.SmallTitle>내 정보</S.SmallTitle>
                <S.InterestingTitle>별명</S.InterestingTitle>
                {}
                <S.Input
                  type="text"
                  id="character"
                  value={userData.name}
                  readOnly
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
                      readOnly
                    />
                  </S.Label>
                  <S.Label>
                    자격증
                    <S.InputCheck
                      type="checkbox"
                      name="certification"
                      value="certification"
                      checked={userData.hashTag.certification}
                      readOnly
                    />
                  </S.Label>
                  <S.Label>
                    IT
                    <S.InputCheck
                      type="checkbox"
                      name="IT"
                      value="IT"
                      checked={userData.hashTag.IT}
                      readOnly
                    />
                  </S.Label>
                  <S.Label>
                    예능
                    <S.InputCheck
                      type="checkbox"
                      name="entertainment"
                      value="entertainment"
                      checked={userData.hashTag.entertainment}
                      readOnly
                    />
                  </S.Label>
                  <S.Label>
                    종교
                    <S.InputCheck
                      type="checkbox"
                      name="religion"
                      value="religion"
                      checked={userData.hashTag.religion}
                      readOnly
                    />
                  </S.Label>
                  <S.Label>
                    기술
                    <S.InputCheck
                      type="checkbox"
                      name="tech"
                      value="tech"
                      checked={userData.hashTag.tech}
                      readOnly
                    />
                  </S.Label>
                </S.ListContainer>
                <S.DivLine />
              </S.FormContainer>
            </S.MainContainer>
          </S.BackgroundContainer>
        </>
      )}
    </>
  );
};

export default Myinfo;
