import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { theme } from "@/styles/theme";
import logo from "@/assets/portfolio/icon/logo.svg";
import download from "@/assets/portfolio/icon/download.svg";
import git from "@/assets/portfolio/skill/github.svg";
import { useEffect, useMemo, useState } from "react";

const Header = ({ themeCode }) => {
  const nav = useNavigate();

  const [scrolled, setScrolled] = useState(false);

  const navItems = useMemo(
    () => [
      { label: "Home", path: "/" },
      { label: "About", path: "/about" },
      { label: "Projects", path: "/projects" },
    ],
    [],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={scrolled ? "sticky" : ""} css={[...themeStyles[themeCode], cssData]}>
      <section>
        <div className="logo" onClick={() => nav("/")}>
          <img src={logo} alt="LOGO" />
        </div>
        {/* Nav */}
        <nav>
          {navItems.map((item) => (
            <p key={item.path} onClick={() => nav(item.path)}>
              {item.label}
            </p>
          ))}
        </nav>
        {/* ICON */}
        <div className="icon">
          {/* FIXME: 이력서 or 기술이력서 PDF 다운로드 */}
          <a download href="/">
            <img src={download} alt="download" />
          </a>
          <a href="https://github.com/iyeonggyu0" target="_blank" rel="noreferrer">
            <img src={git} alt="git" />
          </a>
        </div>
      </section>
    </header>
  );
};
export default Header;

const themeStyles = {
  light: [
    theme.fonts.captionXl_B,
    {
      backgroundColor: "#fff",
      color: theme.colors.text,
    },
  ],
};

const cssData = css({
  position: "sticky",
  top: 0,
  zIndex: 100,
  display: "flex",
  width: "100%",
  maxWidth: "100%",
  margin: "0 auto",
  justifyContent: "center",
  alignItems: "center",
  borderBottom: `1px solid ${theme.colors.lightLine}`,
  transition: "all 0.9s cubic-bezier(0.4, 1.1, 0.6, 1)",

  // 스크롤
  "&.sticky": {
    top: "12px",
    maxWidth: "1200px",
    margin: "0 auto",
    borderRadius: "999px",
    border: `1px solid ${theme.colors.lightLine}`,
  },

  "&.sticky > section": {
    width: "90%",
    height: "72px",
  },

  // 중앙
  "& > section": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    height: "80px",
    maxWidth: "1460px",
    padding: "16px 0",
  },

  "& nav": {
    display: "flex",
    justifyContent: "space-between",
    gap: "4vw",
  },

  "& nav p": {
    cursor: "pointer",
    padding: "8px 12px",
  },

  // 로고
  "& .logo": [theme.flex.center, { width: "16%", minWidth: "80px", maxWidth: "180px", cursor: "pointer" }],

  // 아이콘
  "& .icon": [theme.flex.center, { gap: "16px", justifyContent: "flex-end", width: "16%", minWidth: "80px", maxWidth: "180px" }],
  "& .icon img": {
    width: "18px",
    height: "18px",
    cursor: "pointer",
    padding: "8px",
    boxSizing: "content-box",
  },
});
