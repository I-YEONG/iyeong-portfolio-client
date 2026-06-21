import { atom } from "jotai";

export const authAtom = atom(false);

// write-only atom to update auth state as boolean
export const setAuthAtom = atom(null, (get, set, update) => {
  const current = Boolean(get(authAtom));
  const next = typeof update === "function" ? Boolean(update(current)) : Boolean(update);
  set(authAtom, next);
});

export const login = () => true;
export const logout = () => false;
