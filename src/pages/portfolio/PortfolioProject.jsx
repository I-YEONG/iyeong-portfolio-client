import { useParams } from "react-router-dom";

import { useState } from "react";
import { useAtom } from "jotai";
import { authAtom, setAuthAtom, login, logout } from "@/atoms/authAtoms";
import { ProjectHeader } from "@/features/portfolio/project/components";

const PortfolioProject = () => {
  const { projectName, "*": restPath } = useParams();

  const [isPcMode, setIsPcMode] = useState(true);
  const [auth] = useAtom(authAtom);
  const [, setAuth] = useAtom(setAuthAtom);

  const toggleAuth = () => {
    if (auth?.isLoggedIn) setAuth(logout());
    else setAuth(login({ name: "Demo User" }));
  };

  const onChangeDevice = () => {
    setIsPcMode((prev) => !prev);
  };

  return (
    <div>
      <ProjectHeader isPcMode={isPcMode} onChangeDevice={onChangeDevice} isLogin={auth?.isLoggedIn} onChangeLogin={toggleAuth} />
      <div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
export default PortfolioProject;
