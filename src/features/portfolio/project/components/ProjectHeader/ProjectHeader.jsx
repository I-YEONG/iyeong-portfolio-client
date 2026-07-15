import LEFT_ICON from "@/assets/portfolio/icon/left.svg?react";
import LOGO from "@/assets/portfolio/icon/logo.svg?react";
import PC_ICON from "@/assets/portfolio/icon/pc.svg?react";
import MOBILE_ICON from "@/assets/portfolio/icon/mobile.svg?react";
import LOGIN_ICON from "@/assets/portfolio/icon/login.svg?react";
import LOGOUT_ICON from "@/assets/portfolio/icon/logout.svg?react";
import GIT_ICON from "@/assets/portfolio/skill/github.svg?react";
import MENU_ICON from "@/assets/portfolio/icon/menu.svg?react";
import XMARK_ICON from "@/assets/portfolio/icon/xmark.svg?react";

import { ProjectHeaderCss } from "./ProjectHeader.styles";
import { Link } from "react-router-dom";

const ProjectHeader = ({ isPcMode, onChangeDevice, isLogin, onChangeLogin, menuToggle, isOffMenu, isOnMenu }) => {
  return (
    <header css={ProjectHeaderCss}>
      <Link className="icon-div" to="/projects" aria-label="go-back">
        <LEFT_ICON />
        <LOGO className="logo" />
      </Link>
      <div className="icon-div">
        <button onClick={onChangeDevice} aria-label="device-toggle" className="device">
          {!isPcMode ? <PC_ICON /> : <MOBILE_ICON />}
        </button>
        <button onClick={onChangeLogin} aria-label="auth-toggle">
          {isLogin ? <LOGOUT_ICON /> : <LOGIN_ICON />}
        </button>
        <button onClick={onChangeLogin} aria-label="auth-toggle">
          <GIT_ICON className="git" />
        </button>
        <button aria-label="auth-toggle" className="menu">
          {menuToggle ? <XMARK_ICON onClick={isOffMenu} /> : <MENU_ICON onClick={isOnMenu} />}
        </button>
      </div>
    </header>
  );
};
export default ProjectHeader;
