import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

// 1. sessionStorage를 사용하도록 storage 객체 생성
const sessionStorageBase = createJSONStorage(() => sessionStorage);

// 2. atom 대신 atomWithStorage 사용 (첫 번째 인자는 스토리지에 저장될 key 이름입니다)
export const authAtom = atomWithStorage("auth", false, sessionStorageBase);

export const loginInfoAtom = atomWithStorage(
  "loginInfo",
  {
    isLogin: false,
    userData: {
      userId: null,
      userName: null,
    },
    lastValidated: null,
  },
  sessionStorageBase,
);

export const roadmapReportIdAtom = atomWithStorage("roadmapReportId", null, sessionStorageBase);

// 아래의 write-only atom들은 기존 코드 그대로 두셔도 무방합니다.
// set을 통해 기본 atom의 값이 변경되면, atomWithStorage가 알아서 sessionStorage까지 업데이트해 줍니다.
export const setAuthAtom = atom(null, (get, set, update) => {
  const current = Boolean(get(authAtom));
  const next = typeof update === "function" ? Boolean(update(current)) : Boolean(update);
  set(authAtom, next);
});

export const setLoginInfoAtom = atom(null, (_get, set, update) => {
  const nextLoginInfo =
    typeof update === "function"
      ? update({
          isLogin: false,
          userData: {
            userId: null,
            userName: null,
          },
          lastValidated: null,
        })
      : update;

  set(loginInfoAtom, nextLoginInfo);
  set(authAtom, Boolean(nextLoginInfo?.isLogin));
});

export const setRoadmapReportIdAtom = atom(null, (_get, set, update) => {
  set(roadmapReportIdAtom, typeof update === "function" ? update : (update ?? null));
});

export const login = () => true;
export const logout = () => false;
