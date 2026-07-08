import { useCallback } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { api_deleteUser, api_login, api_loginCheck, api_logout } from "../api/login";
import { api_signup } from "../api/signup";
import { api_changePassword } from "../api/changePassword";
import { clearTokenInfo, setTokenInfo } from "../api";
import { loginInfoAtom, roadmapReportIdAtom, setAuthAtom, setLoginInfoAtom, setRoadmapReportIdAtom } from "@/atoms/authAtoms";

const DEFAULT_LOGIN_INFO = {
  isLogin: false,
  userData: {
    userId: null,
    userName: null,
  },
  lastValidated: null,
};

export const useLoginInfo = () => {
  const loginInfo = useAtomValue(loginInfoAtom);
  const roadmapReportId = useAtomValue(roadmapReportIdAtom);
  const setLoginInfo = useSetAtom(setLoginInfoAtom);
  const setRoadmapReportId = useSetAtom(setRoadmapReportIdAtom);
  const setAuth = useSetAtom(setAuthAtom);

  const loginCheck = useCallback(async () => {
    const now = Date.now();
    const lastValidated = loginInfo.lastValidated;
    const isExpired = lastValidated === null || now - lastValidated > 60000;

    if (!isExpired && lastValidated !== null) {
      return loginInfo;
    }

    try {
      const res = await api_loginCheck();
      if (res.success) {
        const next = {
          isLogin: true,
          userData: res.userInfo,
          lastValidated: Date.now(),
        };
        setLoginInfo(next);
        setAuth(true);
        setTokenInfo(res.tokenInfo);
        return next;
      }

      setLoginInfo(DEFAULT_LOGIN_INFO);
      setAuth(false);
      clearTokenInfo();
      return DEFAULT_LOGIN_INFO;
    } catch (err) {
      console.error("Login check failed:", err);
      setLoginInfo(DEFAULT_LOGIN_INFO);
      setAuth(false);
      clearTokenInfo();
      return DEFAULT_LOGIN_INFO;
    }
  }, [loginInfo, setAuth, setLoginInfo]);

  const login = useCallback(
    async (email, password) => {
      if (loginInfo.isLogin) {
        return { success: false, message: "이미 로그인된 상태입니다." };
      }

      try {
        const res = await api_login({ email, password });
        if (res.success) {
          const next = {
            isLogin: true,
            userData: res.userInfo,
            lastValidated: Date.now(),
          };
          setLoginInfo(next);
          setAuth(true);
          setTokenInfo(res.tokenInfo);
          return { success: true, message: res?.message || "로그인에 성공했습니다." };
        }

        setLoginInfo(DEFAULT_LOGIN_INFO);
        setAuth(false);
        clearTokenInfo();
        return { success: false, message: res?.message || "로그인에 실패했습니다." };
      } catch (err) {
        console.error(err);
        setLoginInfo(DEFAULT_LOGIN_INFO);
        setAuth(false);
        clearTokenInfo();
        return { success: false, message: "로그인에 실패했습니다." };
      }
    },
    [loginInfo.isLogin, setAuth, setLoginInfo],
  );

  const signup = useCallback(
    async (data) => {
      if (loginInfo.isLogin) {
        return { success: false, message: "이미 로그인된 상태입니다." };
      }

      try {
        const res = await api_signup(data);
        if (res.success) {
          const next = {
            isLogin: true,
            userData: res.userInfo,
            lastValidated: Date.now(),
          };
          setLoginInfo(next);
          setAuth(true);
          setTokenInfo(res.tokenInfo);
          return { success: true, message: res?.message || "회원가입에 성공했습니다." };
        }

        setLoginInfo(DEFAULT_LOGIN_INFO);
        setAuth(false);
        clearTokenInfo();
        return { success: false, message: res?.message || "회원가입에 실패했습니다." };
      } catch (err) {
        console.error(err);
        setLoginInfo(DEFAULT_LOGIN_INFO);
        setAuth(false);
        clearTokenInfo();
        return { success: false, message: "회원가입에 실패했습니다." };
      }
    },
    [loginInfo.isLogin, setAuth, setLoginInfo],
  );

  const changePassword = useCallback(
    async (data) => {
      if (loginInfo.isLogin) {
        return { success: false, message: "이미 로그인된 상태입니다." };
      }

      try {
        return await api_changePassword(data);
      } catch (err) {
        console.error(err);
        return false;
      }
    },
    [loginInfo.isLogin],
  );

  const userDelete = useCallback(async () => {
    try {
      const res = await api_deleteUser();
      if (res?.success) {
        setLoginInfo(DEFAULT_LOGIN_INFO);
        setAuth(false);
        clearTokenInfo();
        return { success: true, message: res?.message || "회원 탈퇴에 성공했습니다." };
      }

      return { success: false, message: res?.message || "회원 탈퇴에 실패했습니다." };
    } catch (err) {
      console.error(err);
      return { success: false, message: "회원 탈퇴에 실패했습니다." };
    }
  }, [setAuth, setLoginInfo]);

  const logout = useCallback(async () => {
    try {
      const res = await api_logout();
      if (res?.success) {
        setLoginInfo(DEFAULT_LOGIN_INFO);
        setAuth(false);
        clearTokenInfo();
      }

      return {
        success: !!res?.success,
        message: res?.message || (res?.success ? "로그아웃 되었습니다." : "로그아웃에 실패했습니다."),
      };
    } catch (err) {
      console.error(err);
      return { success: false, message: "로그아웃에 실패했습니다." };
    }
  }, [setAuth, setLoginInfo]);

  return {
    loginInfo,
    setLoginInfo,
    loginCheck,
    login,
    signup,
    changePassword,
    roadmapReportId,
    setRoadmapReportId,
    userDelete,
    logout,
  };
};
