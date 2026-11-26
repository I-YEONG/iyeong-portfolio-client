# 공통 UI 사용 안내

공통 컴포넌트는 이 디렉토리에서 직접 import한다. 페이지 데이터, 이동 정책, 로그인·납부 여부는 사용하는 화면에서 결정한다. 기능 전용 UI는 기존 `features/{기능}/components`에 둔다.

## 스타일과 폰트

- 토큰과 전역 스타일: `src/index.css`. 기존 색상 이름(`main-01`, `main-02`, `gray-01` 등)을 재사용한다.
- `font-display`: 기존 패키지로 로드하는 Hahmlet. 기본 `font-sans` 설정도 유지한다.
- `font-body`: 정보성 본문에 사용하는 Pretendard Variable 1.3.9. `public/pretendard/PretendardVariable.woff2`를 자체 호스팅하며, 가변 굵기 45–920을 지원한다. `font-display: swap`과 시스템 sans-serif 대체 폰트를 사용한다.
- 폰트 원본의 라이선스는 `public/pretendard/LICENSE.txt`에 보관한다. 배포본의 중복 정적 폰트·데스크톱 폰트는 배포하지 않는다. 제목의 Hahmlet 설정은 기존대로 사용한다.
- `page-surface`: 흰 배경·검은 본문·`font-body`·최소 화면 높이. 공지·분실물·협찬사처럼 해당 표면을 사용하는 페이지 루트에 명시한다.
- 키보드 포커스: 전역 `:focus-visible`에 파란 2px 테두리가 있다. 컴포넌트에서 임의로 제거하지 않는다.
- 기존 Tailwind reset을 사용한다. 별도 reset, 색상 팔레트, breakpoint를 추가하지 않는다.

## 컴포넌트

| 이름 / 직접 import 경로                                     | 주요 props                                                                                                | 동작                                                                                       |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `PageHeader` / `@/components/layout/PageHeader`             | `title`, `onBack`, `backLabel?`, `className?`                                                             | 제목과 뒤로 가기 버튼. 제목은 `h1`이므로 페이지에 다른 `h1`을 중복 배치하지 않는다.        |
| `CategoryTabs` / `@/components/CategoryTabs`                | `items: { id, label, to }[]`, `activeId`, `ariaLabel?`, `className?`                                      | 현재 페이지 링크를 선택 표시. 공지·분실물·협찬사 사이 이동에 사용한다.                     |
| `BottomNavigation` / `@/components/layout/BottomNavigation` | `items: { id, label, to, icon }[]`, `activeId`, `variant?: 'paid' \| 'guest'`, `ariaLabel?`, `className?` | 아이콘 메뉴와 현재 페이지 강조. 기본 variant는 `paid`이며 실제 상태는 호출부에서 전달한다. |
| `RootLayout` / `@/components/layout/RootLayout`             | 기존 API 유지                                                                                             | 라우터가 이미 사용하는 최대 480px 컨테이너. 다시 중첩하지 않는다.                          |

내비게이션의 `id`는 고유하고 안정적인 값으로 제공한다. 상세 화면에서도 상위 카테고리를 `activeId`로 전달한다. `to`에는 기존 `ROUTES` 또는 `generatePath` 결과를 사용한다. 링크를 비활성 버튼처럼 사용하지 않는다. 별도의 loading/disabled 상태는 이번 디자인 범위에 없다.

```tsx
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { CategoryTabs } from '@/components/CategoryTabs'
import { PageHeader } from '@/components/layout/PageHeader'
import { ROUTES } from '@/constants/routes'

const categories = [
  { id: 'notices', label: '공지사항', to: ROUTES.NOTICES },
  { id: 'lost-items', label: '분실물', to: ROUTES.LOST_ITEMS },
  { id: 'sponsors', label: '협찬사', to: ROUTES.SPONSORS },
]

export function NoticeContent({ children }: { children: ReactNode }) {
  const navigate = useNavigate()

  return (
    <div className="page-surface">
      <PageHeader title="공지사항" onBack={() => navigate(ROUTES.HOME)} />
      <main className="px-4 py-6">
        <CategoryTabs items={categories} activeId="notices" />
        {children}
      </main>
    </div>
  )
}
```

하단 메뉴의 아이콘과 목적지를 전달하는 최소 예시:

```tsx
import { IconHome } from '@tabler/icons-react'
import voteIcon from '@/assets/material-symbols_how-to-vote-outline-rounded.svg'
import { BottomNavigation } from '@/components/layout/BottomNavigation'
import { ROUTES } from '@/constants/routes'

export function NavigationExample() {
  return (
    <BottomNavigation
      items={[
        { id: 'home', label: '홈', to: ROUTES.HOME, icon: <IconHome /> },
        {
          id: 'polls',
          label: '투표',
          to: ROUTES.POLLS,
          icon: <img src={voteIcon} alt="" />,
        },
      ]}
      activeId="polls"
      variant="paid"
    />
  )
}
```

예시는 props 사용법이다. 실제 메뉴 순서·목적지·표시 여부는 페이지 담당자가 확정한 구성으로 전달한다. 컴포넌트 자체는 route나 사용자 상태를 소유하지 않는다. 일반 문서 흐름에 렌더링하므로, 하단 고정이 필요한 화면은 고정 wrapper·본문 아래 여백·`env(safe-area-inset-bottom)`을 함께 적용한다. 채팅 입력창 등이 있는 화면에 전역으로 강제 삽입하지 않는다.

## 반응형과 접근성

- 기존 `RootLayout`의 `w-full max-w-mobile min-h-dvh`를 유지한다. 화면 높이를 852px로 고정하지 않는다.
- 헤더는 최소 56px, 뒤로 가기는 44×44px, 긴 제목은 말줄임한다. Figma의 기기 상태바는 웹 UI에 포함하지 않는다.
- 카테고리 링크는 가로 공간이 부족하면 해당 영역 안에서 스크롤한다. 현재 페이지는 `aria-current="page"`로도 표시한다.
- 하단 메뉴는 최대 365×70px, 좌우 14px 여백, 아이콘 26px, 링크 최소 44×44px다. Figma의 최대 6개 메뉴를 320px 이상의 화면에서 수용한다.
- 메뉴의 `label`은 스크린 리더용 이름이다. 전달하는 `icon`은 장식으로 처리되므로 클릭 가능한 요소나 추가 링크를 넣지 않는다. 직접 전달한 SVG와 `img`는 모두 26px로 표시하며, `img`에는 `alt=""`를 지정한다.
- `CategoryTabs`는 페이지 이동 링크이므로 ARIA tab 역할이나 좌우 방향키 제어를 추가하지 않는다. 브라우저의 Tab·Enter 동작을 사용한다.

## 자산과 디자인 차이

- 공통 SVG 자산은 `src/assets`에서 import한다. 자체 호스팅하는 Pretendard와 라이선스는 `public/pretendard`에 둔다.
- 아이콘은 기존 `@tabler/icons-react`를 재사용한다. 예: `IconChevronLeft`, `IconMapPin`, `IconMicrophone2`, `IconHome`, `IconMail`, `IconMessageCircle`.
- 투표 아이콘: `src/assets/material-symbols_how-to-vote-outline-rounded.svg`. 사용자가 제공한 Figma의 Material Symbols 원본이며, 24×24 `viewBox`와 흰색 벡터를 유지했다. 하단 메뉴에서는 위 예시처럼 SVG 파일을 import한 `img`로 전달한다.
- 로고: `src/assets/make-a-wish-logo.svg`. 사용자가 제공한 [메인로고 281:2000](https://www.figma.com/design/omsaW8MC3h1oR8gOaq97Ps/2026?node-id=281-2000)의 SVG 원본이다. 내보내기 영역은 발광 효과 여백을 포함한 480×291이며, 파일 내용과 효과를 유지했다.
- 로고는 흰색 벡터와 발광 효과가 있어 어두운 배경에서 사용한다. `h-auto`로 비율을 유지하고, 추가 shadow나 `object-cover`로 원본 효과를 중복하거나 자르지 않는다. 같은 이름의 제목을 함께 보여 주는 장식용 배치에서는 `alt=""`를 사용한다.
- 하단 메뉴는 [specimen 450:519](https://www.figma.com/design/omsaW8MC3h1oR8gOaq97Ps/2026?node-id=450-519)의 크기·radius·아이콘을 기준으로 한다. Glass 효과는 CSS의 반투명 표면·내부 테두리·blur로 보수적으로 표현했다. 효과 세부값은 디자이너 확인이 필요하다.
- 선택 강조는 기존 `main-01`/`main-02`를 사용한다. specimen의 단일 raw 값 `#73FFEA`를 새 전역 토큰으로 추가하지 않았다.
- 선택된 카테고리의 흰 글자/`gray-04` 조합은 기존 디자인을 유지했다. 작은 본문 글자의 명도 대비는 디자이너 확인이 필요하다.

```tsx
import makeAWishLogo from '@/assets/make-a-wish-logo.svg'

export function FestivalBrand() {
  return (
    <img
      src={makeAWishLogo}
      alt="Make A Wish"
      width={480}
      height={291}
      className="block h-auto max-w-full"
    />
  )
}
```

### Tabler 아이콘 사용

기존 `@tabler/icons-react` 3.46.0을 사용한다. React 19와 호환되는 peer 범위, TypeScript 타입, ESM export가 제공되어 별도 설정이나 SVG 파일을 추가할 필요가 없다. 필요한 아이콘만 named import한다.

| 용도      | import 이름         |
| --------- | ------------------- |
| 뒤로 가기 | `IconChevronLeft`   |
| 부스 지도 | `IconMapPin`        |
| 공연      | `IconMicrophone2`   |
| 홈        | `IconHome`          |
| 축하 편지 | `IconMail`          |
| 대나무숲  | `IconMessageCircle` |

기본값은 24×24, `stroke={2}`, `color="currentColor"`다. `BottomNavigation`은 전달받은 SVG를 26×26으로 표시하고 흰색을 상속한다. 원본 디자인과 선 굵기를 맞출 때는 `stroke`를 명시한다. 투표는 제공된 Material Symbols SVG를 사용하고, 로고·사진·일러스트는 별도의 원본 자산을 사용한다. API와 tree shaking 설명은 [Tabler React 공식 문서](https://docs.tabler.io/icons/libraries/react)를 참고한다.

### Glass 효과의 현재 범위

현재 하단 메뉴의 반투명 표면·흐림·내부 테두리는 Figma Glass의 근사 표현이다. Figma Glass에는 광원 방향·강도, 굴절, 깊이, 색 분산, Frost 등이 포함되며 단순한 `backdrop-filter: blur()`만으로 모두 재현되지 않는다. [Figma 공식 효과 설명](https://help.figma.com/hc/en-us/articles/360041488473-Apply-effects-to-layers)

원본 효과를 더 충실히 옮기려면 `Rectangle 108`(450:520)의 실제 Glass 설정값을 확인한 뒤, 굴절 필터와 방향성 하이라이트를 조정해야 한다. 현재 연결된 Figma 계정의 보기 권한에서는 상세값이 노출되지 않아 임의 수치를 원본값으로 사용하지 않는다. SVG 필터를 이용한 배경 굴절은 브라우저별 지원 차이도 있으므로 대상 브라우저에서 확인한다.

## 이번 단계에서 보류한 항목

- P2: 범용 Button/Input/Modal, 이미지 타일·리스트 카드, 인증 전용 폼, 개별 페이지·API 로직.
- 확정 전 자산/표현: 메인 배경·배너, 빈 협찬사 화면.
- 새로운 컴포넌트·variant는 실제 반복 사용과 디자인이 확인될 때만 추가한다.
