import { css } from "@emotion/react";
import { useNavigate, Link } from "react-router-dom";
import { theme } from "@/styles/theme";
import LogoIcon from "@/assets/portfolio/icon/logo.svg?react";
import DownloadIcon from "@/assets/portfolio/icon/download.svg?react";
import GitIcon from "@/assets/portfolio/skill/github.svg?react";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
];

const Header = ({ themeCode = "light" }) => {
  const nav = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // 불필요한 상태 업데이트를 막기 위해 조건 추가
      const isScrolled = window.scrollY > 160;
      if (scrolled !== isScrolled) setScrolled(isScrolled);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrolled]);

  return (
    <header css={headerCss(scrolled, themeCode)}>
      <section css={sectionCss(scrolled)}>
        <div css={logoCss} onClick={() => nav("/")}>
          <LogoIcon style={{ width: "100%", height: "auto" }} />
        </div>

        {/* Nav */}
        <nav css={navCss}>
          {NAV_ITEMS.map((item) => (
            <Link key={item.path} to={item.path} css={navItemCss}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* ICON */}
        <div css={iconCss}>
          {/* FIXME: 이력서 or 기술이력서 PDF 다운로드 */}
          <a download href="/">
            <DownloadIcon style={{ width: 18, height: 18 }} />
          </a>
          <a href="https://github.com/iyeonggyu0" target="_blank" rel="noreferrer">
            <GitIcon style={{ width: 18, height: 18 }} />
          </a>
        </div>
      </section>
    </header>
  );
};

export default Header;

const headerCss = (isScrolled, themeCode) =>
  css({
    position: "sticky",
    zIndex: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    margin: "0px auto",
    // top: "12px",
    // paddingBottom: "12px",
    top: 0,
    padding: "12px 0",
    minHeight: "80px",

    borderBottomStyle: "solid",
    borderBottomWidth: isScrolled ? 0 : 1,

    "& svg": {
      width: "18px",
      height: "18px",
      cursor: "pointer",
      padding: "8px",
      boxSizing: "content-box",
    },

    // 테마 분기
    ...(themeCode === "light" && {
      ...theme.fonts.captionXl_B, // 기존 테마 폰트 병합
      backgroundColor: "#fff",
      color: theme.colors.text,
      borderBottomColor: theme.colors.lightLine,
      transition: isScrolled
        ? "background-color 0.3s, border-bottom-width 0.3s, border-bottom-color 0.3s"
        : "background-color 0.3s 1s, border-bottom-width 0.3s 1s, border-bottom-color 0.3s 1s",
    }),

    ...(themeCode === "dark" && {
      ...theme.fonts.captionXl_B, // 기존 테마 폰트 병합
      backgroundColor: isScrolled ? "#fff" : theme.colors.darkBG,
      color: isScrolled ? theme.colors.text : "#fff",
      borderBottomColor: theme.colors.darkLine,
      transition: isScrolled
        ? "background-color 0.3s, border-bottom-width 0s, border-bottom-color 0s, color 0.3s"
        : "background-color 0.3s 1s, border-bottom-width 0.3s 1s, border-bottom-color 0.3s 1s, color 0.3s 1s",
    }),
  });

const sectionCss = (isScrolled) =>
  css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: isScrolled ? "90%" : "80%",
    padding: "12px 46px",
    borderRadius: "999px",
    transition: isScrolled
      ? "box-shadow 0.3s, max-width 0.9s cubic-bezier(0.4, 1.1, 0.6, 1), border-radius 0.9s cubic-bezier(0.4, 1.1, 0.6, 1), width 0.9s cubic-bezier(0.4, 1.1, 0.6, 1)"
      : "box-shadow 0.3s 1s, max-width 0.9s cubic-bezier(0.4, 1.1, 0.6, 1), border-radius 0.9s cubic-bezier(0.4, 1.1, 0.6, 1), width 0.9s cubic-bezier(0.4, 1.1, 0.6, 1)",

    // scrolled
    maxWidth: isScrolled ? "1200px" : "1460px",
    height: "68px",
    boxShadow: isScrolled ? "0 8px 25px -8px rgba(0,0,0,0.15)" : "none",
  });

const navCss = css({
  display: "flex",
  justifyContent: "space-between",
  gap: "3vw",
});

const navItemCss = css({
  cursor: "pointer",
  padding: "8px 12px",
});

const logoCss = css({
  ...theme.flex.center,
  width: "16%",
  minWidth: "80px",
  maxWidth: "180px",
  cursor: "pointer",
});

const iconCss = css({
  ...theme.flex.center,
  gap: "16px",
  justifyContent: "flex-end",
  width: "16%",
  minWidth: "80px",
  maxWidth: "180px",

  "& img": {
    width: "18px",
    height: "18px",
    cursor: "pointer",
    padding: "8px",
    boxSizing: "content-box",
  },
});
