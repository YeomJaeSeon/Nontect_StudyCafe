import React, { useEffect, useState } from "react";
import axios from "axios";
import * as S from "./Myinfo.style";
import { useHistory } from "react-router-dom";
import Header from "../../components/header/Header";
import { firebaseAuth } from "../../services/firebase";

/*회원정보창에서 이름은 텍스트필드, 해쉬테그는 체크박스,
  집중정보는 리스트형태
  원하는 정보를 입력, 수정한 뒤 저장누르면 자동으로 업데이트
  그냥 세션을 나갈경우 기존 정보가 저장

  집중비율은 SUM(totalStudySec) / SUM(focusStudySec)
*/

const Myinfo = ({ authService, dataService }) => {
  //getLoginStatus를 통해 로그인한 유저의 uid를 받아오기 위함
  const [state, setState] = useState({
    myUid: "", //유저 uid
  });

  const [userData, setUserData] = useState({
    character: " ",
    interestedField: {
      health: false,
      IT: false,
      certification: false,
      entertainment: false,
      religion: false,
      tech: false,
    },
  });

  useEffect(() => {
    //로그인한 유저의 uid를 넘김
    authService.getLoginStatus((uid) => {
      setState((user) => ({
        ...user,
        myUid: uid.uid,
      }));
    });
  }, []);

  useEffect(() => {
    if (state.myuid !== "") {
      if (userData.character === " ") {
        console.log("더이상 빈 문자열이 아냐");
        dataService.getLoginUserData(state.myUid, (values) => {
          setUserData((user) => ({
            ...user,
            character: values.name,
          }));
        });
      }
    }
  });
  console.log("#######" + state.myUid);
  console.log("#######" + userData.character);
  const [isCharacterProper, setIsCharacterProper] = useState(false);
  const [existedUsers, setExistedUsers] = useState([]);
  const history = useHistory();

  const updateHandler = (e) => {
    //먼저 이미 먼저 가입한 회원들의 이름을 가져옴
    dataService.getAllUsers((data) => {
      if (data) {
        const names = Object.values(data).map((data) => data.name);
        //console.log(names);
        setExistedUsers(names);
      }
    });

    e.preventDefault();
    if (!isCharacterProper) {
      alert("이미 존재하는 이름입니다.");
      return;
    }
  };

  const upDateUserInfo = (e) => {
    const id = e.currentTarget.id;
    const value = e.currentTarget.value;
    // 별명 2 ~ 6자리까지 && 존재하는별명있는지
    if (id === "character") {
      if (value.length > 6) return;
      value.length >= 2
        ? existedUsers.some((characterName) => value === characterName)
          ? setIsCharacterProper(false)
          : setIsCharacterProper(true)
        : setIsCharacterProper(false);
    }
    setUserData((user) => ({ ...user, [id]: value }));
  };

  // 1 ~ 3 checkbox
  const updateInterestedField = (e) => {
    const name = e.currentTarget.name;
    const isChecked = e.currentTarget.checked;

    const checkedCount = Object.values(userData.interestedField).filter(
      (bool) => bool
    ).length;
    if (checkedCount === 1 && userData.interestedField[name] === true) return;
    if (checkedCount === 3 && userData.interestedField[name] === false) return;
    setUserData((user) => ({
      ...user,
      interestedField: {
        ...user.interestedField,
        [name]: isChecked,
      },
    }));
  };

  useEffect(() => {
    const unscribe = authService.getLoginStatus((user) => {
      if (!user) {
        history.push("/");
      }
    });
    return () => {
      unscribe();
    };
  });
  //로그아웃
  const logout = () => {
    authService.logout();
    history.push("/");
  };

  return (
    <>
      <Header location="MyInfo" logout={logout} />
      <S.BackgroundContainer>
        <S.Background src="./main_background.jpg" alt="main"></S.Background>
        <S.MainContainer>
          <S.FormContainer onSubmit={updateHandler}>
            <S.Input
              type="text"
              id="character"
              value={userData.character}
              onChange={upDateUserInfo}
            />
            <S.InterestingTitle>관심분야 재설정</S.InterestingTitle>
            <S.ListContainer>
              <S.Label>
                건강
                <S.InputCheck
                  type="checkbox"
                  name="health"
                  value="health"
                  onChange={updateInterestedField}
                  checked={userData.interestedField.health}
                />
              </S.Label>
              <S.Label>
                자격증
                <S.InputCheck
                  type="checkbox"
                  name="certification"
                  value="certification"
                  onChange={updateInterestedField}
                  checked={userData.interestedField.certification}
                />
              </S.Label>
              <S.Label>
                IT
                <S.InputCheck
                  type="checkbox"
                  name="IT"
                  value="IT"
                  onChange={updateInterestedField}
                  checked={userData.interestedField.IT}
                />
              </S.Label>
              <S.Label>
                예능
                <S.InputCheck
                  type="checkbox"
                  name="entertainment"
                  value="entertainment"
                  onChange={updateInterestedField}
                  checked={userData.interestedField.entertainment}
                />
              </S.Label>
              <S.Label>
                종교
                <S.InputCheck
                  type="checkbox"
                  name="religion"
                  value="religion"
                  onChange={updateInterestedField}
                  checked={userData.interestedField.religion}
                />
              </S.Label>
              <S.Label>
                기술
                <S.InputCheck
                  type="checkbox"
                  name="tech"
                  value="tech"
                  onChange={updateInterestedField}
                  checked={userData.interestedField.tech}
                />
              </S.Label>
            </S.ListContainer>
            <S.DivLine />
          </S.FormContainer>
        </S.MainContainer>
      </S.BackgroundContainer>
    </>
  );
};

export default Myinfo;
