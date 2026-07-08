import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { authAtom, setAuthAtom, login, logout } from "@/atoms/authAtoms";

/**
 * const { isLogin, isAuthLoading, login, logout, toggleAuth } = useAuth();
 * @returns { isLogin, isAuthLoading, login, logout, toggleAuth }
 */
export const useAuth = () => {
  const [isLogin] = useAtom(authAtom);
  const [, setAuth] = useAtom(setAuthAtom);

  // 💡 스토리지(세션) 마운트 완료 여부를 확인하는 상태 (초기값: true)
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAuthLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

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
    isAuthLoading, // 추가된 로딩 상태 반환
    login: loginAuth,
    logout: logoutAuth,
    toggleAuth,
  };
};
