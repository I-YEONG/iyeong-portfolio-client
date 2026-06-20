import LEFT_ICON from "@/assets/portfolio/icon/left.svg?react";
import LOGO from "@/assets/portfolio/icon/logo.svg?react";
import PC_ICON from "@/assets/portfolio/icon/pc.svg?react";
import MOBILE_ICON from "@/assets/portfolio/icon/mobile.svg?react";
import LOGIN_ICON from "@/assets/portfolio/icon/login.svg?react";
import LOGOUT_ICON from "@/assets/portfolio/icon/logout.svg?react";
import GIT_ICON from "@/assets/portfolio/skill/github.svg?react";

import { ProjectHeaderCss } from "./ProjectHeader.styles";

const ProjectHeader = ({ isPcMode, onChangeDevice, isLogin, onChangeLogin }) => {
  return (
    <header css={ProjectHeaderCss}>
      <div className="icon-div">
        <LEFT_ICON />
        <LOGO className="logo" />
      </div>
      <div className="icon-div">
        <button onClick={onChangeDevice} aria-label="device-toggle">
          {isPcMode ? <PC_ICON /> : <MOBILE_ICON />}
        </button>
        <button onClick={onChangeLogin} aria-label="auth-toggle">
          {isLogin ? <LOGOUT_ICON /> : <LOGIN_ICON />}
        </button>
        <GIT_ICON className="git" />
      </div>
    </header>
  );
};
export default ProjectHeader;
