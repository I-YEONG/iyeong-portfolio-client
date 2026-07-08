import { atom } from "jotai";

export const authAtom = atom(false);

export const loginInfoAtom = atom({
  isLogin: false,
  userData: {
    userId: null,
    userName: null,
  },
  lastValidated: null,
});

export const roadmapReportIdAtom = atom(null);

// write-only atom to update auth state as boolean
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
