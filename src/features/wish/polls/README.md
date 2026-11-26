# 무대 투표

`PollScreen`은 기존 `/polls`와 `/polls/:id` 페이지에서만 사용한다. 공개 시각은 2026-10-03 14:00 Asia/Seoul이다. 그 전에는 투표 API를 호출하지 않고 기존 공개 대기 화면을 표시한다. 공개된 화면은 현재 세션의 `/api/users/me`가 학생 인증을 확인한 뒤에만 사용자 투표 API를 호출한다. 목록은 처음에 OPEN 상태만 보여 주고 상태 버튼은 서버 순서를 유지하며 해당 상태만 거른다.

API 함수는 `api/pollsApi.ts`, 세션별 조회 키와 인증 문턱은 `hooks/usePollQueries.ts`, 제출의 불확실성 조정은 `hooks/usePollSubmission.ts`에 있다. 화면에서는 서버의 복수 제출 허용 설정과 관계없이 투표당 한 번만 참여할 수 있다. 제출 전에 자신의 기존 제출 ID를 읽고, 이미 내역이 있으면 추가 POST를 막는다. POST 결과가 불분명하면 다시 읽어 새 ID와 답안을 대조한다. 자동으로 POST를 반복하지 않는다. 실패한 최초 제출은 확인 후 직접 재시도할 수 있지만, 성공한 제출 기록은 초기화하지 않는다. 모달을 닫거나 세션이 바뀌어도 진행 중인 POST를 다른 사용자 화면에 반영하지 않는다. 회색 모달 배너는 아직 API 필드가 없는 자리다. 질문 media와 선택지 imageUrl만 실제 응답에서 표시한다.

## 로컬 브라우저 QA

프로젝트 루트에서 `node tests/polls-preview.mjs`를 실행하고 `http://127.0.0.1:5175/polls`를 연다. 다른 작업자가 5175를 사용 중이면 `POLLS_PREVIEW_PORT=5177`처럼 별도 포트를 지정한다. 이 미리보기의 합성 서버와 `/__poll-fixture`는 `tests/`에만 있으며 제품 빌드에는 포함되지 않는다. 실제 운영 계정이나 답안을 사용하지 않는다.

`GET /__poll-fixture`는 현재 설정, 합성 제출의 ID·투표·사용자 식별자, 안전한 요청 흔적을 반환한다. 흔적은 method, path, fixture actor, 지연, 상태, 취소 여부와 POST의 질문 ID·선택 개수·텍스트 존재 여부만 담는다. 토큰과 답안 원문은 기록하지 않는다. `POST /__poll-fixture`에 JSON `{}`를 보내면 요청 흔적만 지우고, `{"reset":true}`는 설정·제출·흔적을 초기화한다. 설정을 바꾸면서 흔적을 보존하려면 `"preserveRequests":true`를 함께 보낸다.

기본 시각은 공개 직후인 `2026-10-03T05:01:00Z`다. 공개 전 경계를 재현하려면 `{"clock":"2026-10-03T04:59:59.000Z"}`를 보낸 뒤 페이지를 새로고침한다. HTML에 주입된 시각은 실제 경과 시간만큼 전진하므로 1초 뒤 열린 탭이 자동 전환되는지, 그 전의 poll 요청이 없는지 확인할 수 있다. `clock` 변경은 새 HTML을 읽을 때 적용된다. 공개 후 초점/가시성 복귀도 검사한다.

합성 사용자는 `alpha`, `beta`, `unverified`, `anonymous`다. `user` 설정은 새 인증 복구에 적용되고, 로컬 로그인 폼에서는 `qa-alpha`, `qa-beta`, `qa-unverified`로 같은 SPA에서 계정을 바꿀 수 있다. 비밀번호 값은 fixture가 사용하지 않는다. A→B→A 전환 중 `delays`로 이전 요청을 늦춰 이전 응답이 다른 세션에 나타나지 않는지 본다. `unverified`는 투표 API에서 403, `anonymous`는 401을 받는다. 학생회비 상태는 인증 예외가 아니다.

| 설정                                                                                                             | 재현 내용                                                                                     |
| ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `states: {"3":"OPEN"}`                                                                                           | 3번 짧은 글 질문을 열어 텍스트 모달 확인                                                      |
| `scenario: "media"` / `"missingMedia"` / `"longLabels"`                                                          | 이미지·재생 가능한 동영상 순서, 누락 media, HTML처럼 보이는 문자열·이모지·공백 없는 긴 문자열 |
| `resultsMode: "zero"` / `"textOnly"`                                                                             | 0표, 글 답변 및 HTML 문자열 이스케이프                                                        |
| `results: {"2":true}`, `resultsStatus: 403`                                                                      | 결과 공개 전후와 공개 취소 응답                                                               |
| `listStatus`, `detailStatus`, `submissionsStatus`, `meStatus`                                                    | 각 조회의 실패/재시도, 404 및 인증 상태                                                       |
| `refreshStatus: 503`, `pollAuthStatus: 403`                                                                      | 인증 복구 불가 및 인증된 세션의 투표 API 학생 인증 거부                                       |
| `studentFeePaid: true`, `festivalRoles: ["ADMIN"]`                                                               | 회비 납부·관리자 역할이 미인증 학생의 투표 권한을 열지 않는지 검사                            |
| `delayMs`, `delays: {"/api/polls":1000}`, `postDelayMs`                                                          | 전체·경로별 응답 지연, 빠른 닫기/계정 전환/중복 클릭                                          |
| `postBehavior: "success"` / `"409NotOpen"` / `"409Submitted"` / `"networkBeforeCommit"` / `"networkAfterCommit"` | 정상 제출, 서버 차단, 확정 전후 네트워크 오류와 제출 내역 조정                                |

기본 1번 OPEN 투표는 단일 선택·복수 선택·선택적 짧은 글·선택적 긴 글과 공개 결과를 가진다. 서버의 복수 제출 허용 플래그가 켜져 있어도 화면에서 재참여가 차단되는지 확인하는 사례다. 2번은 18문항 긴 단일 참여 사례, 3번은 예정 상태의 필수 짧은 글, 4번은 마감/결과 사례다. 1번 결과의 복수 선택은 두 66.7% 공동 1위와 합계 100% 초과를 보여 준다. 393×852에서 목록/선택/글/결과, 320×480과 393×600에서 긴 모달, 480×852에서 가로 넘침, 키보드로 인한 160–200px 가시 높이에서 닫기·스크롤·제출, 필터별 카드 링크의 초점 복귀를 확인한다.

미디어 시나리오의 동영상은 [MDN HTML video 예제의 flower.webm](https://developer.mozilla.org/shared-assets/videos/flower.webm)을 `tests/polls/media-video.webm`에 로컬 보관한 것이다. SHA-256은 `C6F8A348953395598A9A73B9BAB1676436410797BCE9F398F4BE1531D6E76DDA`이며 이 fixture는 Range 요청에도 실제 WebM 바이트를 반환한다.

프로젝트 검사는 `npm test`, `npm run lint`, `npm run format:check`, `npm run build`다. 독립 QA는 각 시나리오 시작 전에 fixture를 초기화하고 요청 흔적에서 메서드·경로·상태·답안 모양만 검토한다.
