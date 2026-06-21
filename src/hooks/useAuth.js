import { useAtom } from "jotai";
import { authAtom, setAuthAtom, login, logout } from "@/atoms/authAtoms";

export const useAuth = () => {
  const [isLoggedIn] = useAtom(authAtom);
  const [, setAuth] = useAtom(setAuthAtom);

  const loginAuth = () => {
    console.log("로그인");
    setAuth(login());
  };

  const logoutAuth = () => {
    console.log("로그 아웃");
    setAuth(logout());
  };

  const toggleAuth = () => {
    if (isLoggedIn) logoutAuth();
    else loginAuth();
  };

  return {
    isLoggedIn,
    login: loginAuth,
    logout: logoutAuth,
    toggleAuth,
  };
};
