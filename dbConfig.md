# 세션(방) 정보

- rooms
  - sessionId(방이름)
    - hashTag
      - ...hasTags
    - peopleCount(방에 접속한 유저수)
    - sessionId(방이름)
    - secret(방의 비밀방/공개방여부, 공개방이면 값이 'public'이들어가고 그렇지않으면 '방의 비밀번호'값이 들어감)

# 유저정보

- users
  - uid
    - email
    - joinRoom(접속한 방) (접속안했으면 0)
    - studyTimeInRoom
      - focus : 방에서 집중시간
      - total : 방에서 총공부시간
    - name(별명)
    - score(집중도를 위한 점수)
    - uid
    - hashTag(관심분야) (관심분야는 최소 한개에서 최대 세개까지 강제적으로 누르게 클라이언트에서 제한함)
      - ...hashTags
