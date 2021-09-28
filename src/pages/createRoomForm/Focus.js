let closeEyeCnt = 0;
let mouthCnt = 0;
var startConv = Boolean(false); //대화를 하는지 판별 => 다른쪽 보고있는
var mouthState = Boolean(false); //입의 상태( open = true, close= false)
var closeStateHold = 0; //닫은 상태를 유지하는 시간
var openStateHold = 0; //연 상태를 유지하는 시간
var convState = Boolean(false); //최종적으로 대화하는지 확인하는 변수 ==>
export var Focus = Boolean(true);
export function setFocus(value) {
  Focus = value;
}

//mesh와 console에출력되는 데이터는 1초에 2번(Interval 간격 800ms)
export const alarm = (data) => {
  //console.log(data);

  //[][n], n : meshdata의 인덱스 0은 왼쪽 9는 오른쪽, 범위 0 ~ 9
  const leftEyeTop = data.leftEyeLower0[0][1]; // 왼쪽 윗눈꺼풀 y좌표
  const leftEyeBottom = data.leftEyeUpper0[0][1]; // 왼쪽 아랫눈꺼풀 y좌표

  const rightEyeTop = data.rightEyeLower0[0][1]; // 오른쪽 윗눈꺼풀 y좌표
  const rightEyeBottom = data.rightEyeUpper0[0][1]; //오른쪽 아랫눈꺼풀 y좌표

  const InnerMouthTop = data.lipsUpperInner[5][1]; // 윗입술 안쪽 정 중앙 y좌표
  const InnerMouthBottom = data.lipsLowerInner[5][1]; // 아랫입술 안쪽 정 중앙 y좌표

  //눈 감음 감지
  const leftEyeDiff = leftEyeTop - leftEyeBottom;
  const rightEyeDiff = rightEyeTop - rightEyeBottom;
  // 입 움직임 감지
  const openMouth = InnerMouthBottom - InnerMouthTop;

  // 좌우 방향 체크
  const lookingLeftDirection = data.rightEyeLower0[0][2];
  const lookingRightDirection = data.leftEyeLower0[0][2];

  //상하 방향 체크
  const lookingUpDownDirection = data.midwayBetweenEyes[0][2];

  //입술의 움직임으로 집중 감지
  if (openMouth > 3.7 && startConv === Boolean(false)) {
    //입을 벌린 순간 대화로 인식
    startConv = Boolean(true);
    console.log("대화 시작");
  } else if (openMouth < 2.0 && startConv === Boolean(true)) {
    //대화도중 입술이 다물어지는 순간
    //입이 다물어진 시간을 통해 하품과 같은 일시적인 움직임인지 대화인지 파악
    mouthState = Boolean(false); //입이 다물어졌으니 false
    openStateHold = 0; //입이 열린 시간 0으로 초기화
    ++closeStateHold; //입이 닫힌 시간 ++연산
    if (closeStateHold > 15 && mouthState === Boolean(false)) {
      //입술이 닫힌채로 움직임 없을 때
      console.log("대화가 아님");
      startConv = Boolean(false);
      convState = Boolean(false);
      closeStateHold = 0;
      mouthCnt = 0;
      Focus = Boolean(true);
      //console.log("@@@ "+ Focus + "@@@");
    } else {
      ++mouthCnt;
    }
  } else if (openMouth > 3.7 && startConv === Boolean(true)) {
    //대화라고 판단한상태에서 입이 계속 열려있음
    mouthState = Boolean(true); //입술이 열림
    closeStateHold = 0;
    ++openStateHold;
    if (openStateHold > 6 && mouthState === Boolean(true)) {
      //입을 연채로 움직임 없을 때
      console.log("대화가 아님");
      startConv = Boolean(false);
      convState = Boolean(false);
      openStateHold = 0;
      mouthCnt = 0;
      //Focus = Boolean(true);  // 집중을 하고있다고 판단하기 애매
    } else {
      ++mouthCnt;
    }
  }

  //눈의 움직임 감지
  if (leftEyeDiff < 0.3 && rightEyeDiff < 0.3) {
    ++closeEyeCnt;
    if (closeEyeCnt >= 5)
      //원래 : 25
      // 눈 감고 25초 경과시
      // alert("졸지 마시오!");
      Focus = Boolean(false);
  } else {
    closeEyeCnt = 0;
    Focus = Boolean(true);
    //console.log("###"+ Focus + "###");
  }
  closeEyeCnt > 0 && console.log(`${closeEyeCnt}초동안 눈감음`);

  if (mouthCnt > 5 && startConv === Boolean(true)) {
    // 원래 40
    startConv = Boolean(false);
    convState = Boolean(true);
    Focus = Boolean(false);
    mouthCnt = 0;
  }

  //입을 벙긋하다 멈췄을 때 초기화 하는 조건이 필요함
  //console.log(openMouth);
  console.log("대화 상태 : " + startConv);
  console.log("입열고 닫은 횟수 : " + mouthCnt);
  console.log("닫은 상태 : " + closeStateHold);
  console.log("연 상태 : " + openStateHold);
  console.log("현재 집중상태" + Focus);

  if (lookingLeftDirection < -1) {
    console.log("왼쪽 보는중");
    if (convState === Boolean(true)) {
      console.log("왼쪽 보고 잡담하는중");
      // alert("잡담금지^^");
      Focus = Boolean(false);
    } else {
      console.log("왼쪽 보고 잡담안함");
      Focus = Boolean(true);
      //console.log("!!! "+ Focus + "!!!");
    }
  }
  if (lookingRightDirection < -1) {
    console.log("오른쪽 보는중");
    if (convState === Boolean(true)) {
      console.log("오른쪽 보고 잡담하는중");
      // alert("잡담금지^^");
      Focus = Boolean(false);
    } else {
      console.log("오른쪽 보고 잡담안함");
      Focus = Boolean(true);
      //console.log("&&&"+ Focus + "&&&");
    }
  }

  if (lookingUpDownDirection > 10) {
    console.log("위쪽 보는중");
  }
  if (lookingUpDownDirection < -14) {
    console.log("아래쪽 보는중");
  }
};
