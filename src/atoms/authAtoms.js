import { atom } from "jotai";

export const authAtom = atom({ isLoggedIn: false, user: null });

// write-only atom to update auth state. Accepts a partial update object
export const setAuthAtom = atom(null, (get, set, update) => {
  const current = get(authAtom) || { isLoggedIn: false, user: null };
  // if update is a function, call it with current state
  const next = typeof update === "function" ? update(current) : { ...current, ...update };
  set(authAtom, next);
});

export const login = (user) => ({ isLoggedIn: true, user });
export const logout = () => ({ isLoggedIn: false, user: null });
