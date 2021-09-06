import React, { useState } from "react";
import * as S from "./Room.style";
import OpenViduSession from "openvidu-react";
import axios from "axios";
import { useHistory } from "react-router";
import Modal from "react-modal";
import { ReactComponent as LockSVG } from "../../assets/svg/lock-solid.svg";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Room = ({ id, name, hashTag, peopleCount, secret, dataService }) => {
  const [secreteNumber, setSecreteNumber] = useState("");

  //==모달==//
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    console.log("모달 열려");
    setIsOpen(true);
  };
  function afterOpenModal() {}

  function closeModal() {
    console.log("모달 닫혀");
    setIsOpen(false);
  }
  //==모달==//

  const history = useHistory();
  const enterSession = () => {
    dataService.getAllRooms((callback) => {
      console.log(callback);
      console.log("이녀석 어떨까!!!!!!!!!!!!!!");
      if (callback == undefined) {
        //방이 존재안하면x
        alert("존재하지 않는 방입니다. 새로고침해주세요");
      } else {
        console.log("콜백");
        console.log(callback);
        const length = Object.keys(callback).filter((v) => v == name).length;

        console.log("길이" + length);
        if (length == 0) alert("존재하지 않는 방입니다. 새로고침해주세요");
        else {
          if (peopleCount >= 6) {
            alert("인원이 모두 찼습니다.");
            return;
          }
          if (secret != "public") {
            //비밀방이면
            openModal();
            return;
          }
          history.push({
            pathname: "/rooms/room",
            state: { name: name },
          });
        }
      }
    });
  };

  const enterSecretRoom = () => {
    console.log("비밀방 입장 시도");
    if (secreteNumber == secret) {
      //비밀방 입장 성공
      dataService.getAllRooms((callback) => {
        console.log(callback);
        console.log("이녀석 어떨까!!!!!!!!!!!!!!");
        if (callback == undefined) {
          //방이 존재안하면x
          alert("존재하지 않는 방입니다. 새로고침해주세요");
        } else {
          console.log("콜백");
          console.log(callback);
          const length = Object.keys(callback).filter((v) => v == name).length;

          console.log("길이" + length);
          if (length == 0) alert("존재하지 않는 방입니다. 새로고침해주세요");
          else {
            if (peopleCount >= 6) {
              alert("인원이 모두 찼습니다.");
              return;
            }
            history.push({
              pathname: "/rooms/room",
              state: { name: name },
            });
          }
        }
      });
    } else {
      //비밀방 입장 실패
      alert("비밀번호 다르네요");
      return;
    }
  };

  const inputSecreteNumberHandler = (e) => {
    setSecreteNumber(e.target.value);
  };
  return (
    <>
      <S.RoomContainer onClick={enterSession}>
        <S.RoomTitleBox>{name}</S.RoomTitleBox>
        <S.InnerContainer>
          <S.LeftSection>
            <S.HashTagContainer>
              {hashTag.map((tag, idx) => {
                return <S.HashTagContent key={idx}>#{tag} </S.HashTagContent>;
              })}
            </S.HashTagContainer>
            {secret != "public" && (
              <S.SecretRoomName>
                <LockSVG width={20} height={20} />
              </S.SecretRoomName>
            )}
          </S.LeftSection>
          <S.PeopleCountContent peopleCount={peopleCount}>
            {peopleCount}/6
          </S.PeopleCountContent>
        </S.InnerContainer>
      </S.RoomContainer>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        appElement={document.getElementById("hereIsYourRootElementId")}
        contentLabel="graph Modal"
      >
        <S.ModalCloseButton onClick={closeModal}>닫기</S.ModalCloseButton>
        <S.secretRoomInput>
          <h3>방 비밀번호 입력해주세요</h3>
          <S.secretInput
            type="password"
            placeholder="방 비밀번호 입력"
            value={secreteNumber}
            onChange={inputSecreteNumberHandler}
          />{" "}
          <br></br>
          <S.ModalCloseButton onClick={enterSecretRoom}>
            입장
          </S.ModalCloseButton>
        </S.secretRoomInput>
      </Modal>
    </>
  );
};

export default Room;
