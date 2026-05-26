# 📂 포트폴리오 아키텍처

백엔드 연동을 고려하여 정적 데이터 폴더를 제외하고, 
렌더링 최적화를 위해 전역 상태 관리는 Atom 패턴을 채택했습니다.
스타일링은 **Emotion(CSS-in-JS)**을 사용합니다.

## 1. 디렉토리 구조 (Directory Structure)

```text
src/
├── apis/                # 🌐 전역 API 설정 (NEW!)
│   └── client.js        # Axios 인스턴스 (Base URL, 헤더 등)
│
├── assets/              # 정적 자원 (이미지, 아이콘 등)
│
├── atoms/               # ⚛️ Jotai/Recoil 기반 전역 상태 관리
│   └── themeAtom.js     # 다크모드/라이트모드 상태
│
├── components/          # 공용 UI 컴포넌트
│   └── Button/
│       ├── Button.jsx
│       ├── Button.styles.js
│   └── index.js     # Barrel 패턴 적용
│
├── features/
│   └── projects/
│       ├── api/
│       │   └── getProjects.js       # 1. Axios로 순수하게 데이터만 가져오는 함수
│       │
│       ├── hooks/
│       │   └── useProjects.js       # ✨ 2. React Query의 useQuery로 API를 감싼 커스텀 훅
│       │
│       └── components/
│           └── ProjectList.jsx      # 3. UI에서는 useProjects 훅만 호출해서 사용!
│
├── hooks/               # 전역 커스텀 훅
│   └── useScroll.js
│
├── layouts/             # 전체 레이아웃
│   └── Header/
│
├── pages/               # 라우팅 페이지
│   └── Home.jsx
│
├── styles/              # 🎨 Emotion 전역 설정
│   ├── global.js        # Reset 및 기본 폰트
│   ├── theme.js         # 브랜드 컬러 (다크/라이트모드 색상 등)
│   └── mq.js            # 반응형 미디어 쿼리 헬퍼
│
└── utils/               # 전역 헬퍼 함수
```

---
## 2. 네이밍 컨벤션 (Naming Conventions)

### 컴포넌트 파일명
- **컴포넌트 폴더명:** 파스칼 케이스 (PascalCase) 적용 (예: `Button`, `ProjectCard`)
- **컴포넌트 파일명:** 폴더명과 동일하게 작성 (예: `Button.jsx`)
- 탭 지옥(Tab Hell)을 방지하기 위해 `index.jsx` 대신 명시적인 이름을 사용합니다.

### 스타일 파일 (Emotion)
- 컴포넌트명 뒤에 `.styles.js`를 붙여 명확히 구분합니다. (예: `Button.styles.js`)
- 내부 스타일 변수명은 주로 의미 있는 이름을 부여합니다. (예: `const Wrapper = styled.div`)

### Barrel 패턴 적용 (index.js)
- 각 컴포넌트 폴더 내부에는 `index.js`를 두어 외부에서 깔끔하게 불러올 수 있도록 캡슐화합니다.
- **index.js 내용:** `export { default } from './Button';`
- **사용 시:** `import { Button } from '@/components/Button';`
- 
