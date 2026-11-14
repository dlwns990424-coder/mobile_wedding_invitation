# 모청 (모바일 청첩장) 작업 현황

> 다른 컴퓨터에서 이어서 작업할 때 참고용. 날짜는 작업 당시 기준.

## 프로젝트 개요
- 신랑 문호기 / 신부 이초은, 2027.02.20(토) 11:00, 벡스코 W웨딩홀
- 순수 정적 HTML/CSS/JS (빌드 과정 없음, 번들러 없음, ES 모듈 아님)
- **`index.html`을 더블클릭해서 바로 열어도 동작해야 함** — 모든 스크립트는 `<script src="...">`로 순서대로 로드되는 classic script, 함수/변수는 전역 스코프

## 저장소 / 배포
- GitHub: https://github.com/dlwns990424-coder/mobile_wedding_invitation.git (`main` 브랜치)
- 배포: Netlify Drop 방식 — **git 연동 자동배포 아님**
  - 사이트: https://j-soft-mobile-wedding-invitation.netlify.app
  - 수정 후 반영하려면: app.netlify.com 로그인 → 해당 사이트 → **Deploys** 탭 → `모청` 폴더를 통째로 다시 드래그 앤 드롭
- 로컬 테스트: `node <static-server.js 경로> "C:\Users\wns\Desktop\모청" 8743` 으로 띄우고 `http://localhost:8743/index.html` 접속 (또는 그냥 `index.html` 더블클릭)

## 완료된 기능 (섹션별)
- **Intro**: 날짜/이름(호기 🤍초은, 하트는 `img/heart_1.png`)/사진틀(placeholder), 배경에 꽃 이미지 6개(`flower_1/2/opacity/opacity_2.png`) 기울기+둥실 애니메이션, 섹션 높이는 `svh` 기준 1화면 고정(태블릿 등 큰 화면은 900px 캡)
- **Family**: 부모님 성함/이름, 봉투+편지 열림 스크롤 애니메이션(`img/basic,open,open_2,paper.png`), 배경 dot 패턴
- **Gallery**: 그리드 placeholder, 9장씩 더보기
- **Calendar(Save the Date)**: 달력, D-day 문구("호기 & 초은 결혼까지/결혼한지/오늘 ~" 3분기, 이름/일수 강조색), 배경에 꽃 이미지 3개 둥실 애니메이션
- **Location**: 카카오맵 연동(JS 키는 `js/data/location.js`에 설정됨), 지도 바로가기 모달(네이버지도/카카오내비/T맵), 지하철/주차 안내
- **Account("마음 전하실 곳")**: 신랑측/신부측 모달, 계좌 복사(토스트 "복사되었습니다"), 전화 아이콘(`img/call.png`)/복사 아이콘(`img/copy.png`), 하트 이미지
- **Guestbook("축하 메시지 남기기")**: 포스트잇 이미지(`postit_1/2.png`) 가로 마퀴(자동 흐름 + 드래그/터치로 수동 스크롤, 상호작용 시 2초간 자동흐름 정지), 작성은 모달(이름 8자/메시지 50자 제한+카운터), 내가 쓴 메시지만 `localStorage`에 저장되어 삭제(×, confirm 확인창) 가능, 메시지 폰트 13px
- **RSVP("참석 여부 남기기")**: 섹션엔 제목+버튼만, 클릭 시 모달 폼(이름 8자 제한/연락처 숫자만+11자 제한/신랑신부 토글/참석여부 토글), 제출 시 `localStorage` 저장 + 토스트 "제출이 완료되었습니다" + 모달 자동 닫힘. "참석자 확인하기" 버튼 → 비밀번호(`1234`) 입력 → 신랑측/신부측 탭 전환 + 높이 고정(300px, 10개 정도+스크롤) 목록, 이름+연락처(010-xxxx-xxxx 포맷) 표시
- **Footer**: "청첩장 공유하기"(navigator.share 또는 클립보드 복사 — 복사 완료 표시는 구식 textContent 방식, 토스트로 안 바꿈, 아래 TODO 참고)
- **전역**: 토스트 알림 공통 유틸(`showToast`), safe-area 대응, `html/body`는 스크롤 안 되고 `.phone-frame` 내부에서만 스크롤되는 구조(카카오톡 인앱 브라우저 등에서 상하단 바가 스크롤에 반응해 움직이는 현상 방지)

## 아직 비어있는 실제 콘텐츠
- Intro/Family 메인 사진, Gallery 사진 18장 — 전부 회색 placeholder
- 배경음악 파일 — `assets/bgm.mp3` 실제로 없음(버튼만 있고 재생 안 됨)
- 아버님/어머님 성함, 계좌번호, 연락처 — `index.html` / `js/data/accounts.js`에 더미 텍스트 그대로

## 확인/정리가 필요한 것 (TODO)
1. **카카오 디벨로퍼스 도메인 등록 확인** — `https://j-soft-mobile-wedding-invitation.netlify.app`을 플랫폼(Web) 사이트 도메인에 등록했는지, 배포 사이트에서 지도가 실제로 뜨는지 재확인 필요
2. **참석자 확인 비밀번호** — `js/rsvp.js`의 `RSVP_ADMIN_PASSWORD = '1234'` 그대로, 실제 사용 전 변경 권장
3. **공유하기 토스트 통일** — `js/share.js`만 아직 옛날 방식(버튼 텍스트 1.5초 교체)으로 남아있음, `showToast()`로 교체하기로 논의했으나 미완료
4. **카카오톡 공유(카카오링크) 연동** — 나중에 할 경우: 카카오 디벨로퍼스에서 "카카오톡 공유" 제품 활성화 → SDK 로드 → `Kakao.init()` → `Kakao.Share.sendDefault()`. 단, 미리보기 이미지(`imageUrl`)는 실제 배포된 URL이어야 확인 가능(로컬 테스트 불가)
5. **방명록/RSVP 데이터는 이 브라우저(localStorage)에만 저장** — 하객마다 기기가 달라 서로 안 보임. 추후 Supabase 연동 예정이면 Anonymous Auth + RLS(`delete using (auth.uid() = created_by)`) 방식 추천. 현재 코드는 `loadGuestbookEntries/saveGuestbookEntries/deleteGuestbookEntry`, `localStorage.getItem(RSVP_ENTRIES_KEY)` 부분만 교체하면 되도록 분리해둠

## 참고
- 카카오맵 JS 키: `js/data/location.js`의 `KAKAO_JS_KEY` (공개용 클라이언트 키라 git에 커밋되어 있어도 무방)
- 벡스코 W웨딩홀 좌표: `js/data/location.js`의 `venue.lat/lng`
