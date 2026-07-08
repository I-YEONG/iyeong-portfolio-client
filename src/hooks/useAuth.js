import { useAtom } from "jotai";
import { authAtom, setAuthAtom, login, logout } from "@/atoms/authAtoms";

/**
 * const { isLogin, login, logout, toggleAuth } = useAuth();
 * @returns { isLogin, login, logout, toggleAuth }
 */
export const useAuth = () => {
  const [isLogin] = useAtom(authAtom);
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
    if (isLogin) logoutAuth();
    else loginAuth();
  };

  return {
    isLogin,
    login: loginAuth,
    logout: logoutAuth,
    toggleAuth,
  };
};
