import { useNavigate, Link } from "react-router-dom";
import LogoIcon from "@/assets/portfolio/icon/logo.svg?react";
import DownloadIcon from "@/assets/portfolio/icon/download.svg?react";
import GitIcon from "@/assets/portfolio/skill/github.svg?react";

import { useEffect, useState } from "react";

// 스타일
import { headerCss, sectionCss, logoCss, navCss, navItemCss, iconCss } from "./Header.styles";
import { useMedia } from "@/hooks/useMedia";

const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
];

const Header = ({ themeCode = "light" }) => {
  const nav = useNavigate();
  const { isTablet } = useMedia();
  const githubUrl = import.meta.env.VITE_GITHUB_URL;

  const [scrolled, setScrolled] = useState(() => {
    try {
      return window?.scrollY > 80;
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    const onScroll = () => {
      // 불필요한 상태 업데이트를 막기 위해 조건 추가
      const isScrolled = window.scrollY > 80;
      if (scrolled !== isScrolled) setScrolled(isScrolled);
    };

    // 초기 상태 동기화 (마운트 시 현재 스크롤 위치 반영)
    onScroll();

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
        {isTablet && (
          <div css={iconCss}>
            {/* FIXME: 이력서 or 기술이력서 PDF 다운로드 */}
            <a download href="/">
              <DownloadIcon style={{ width: 18, height: 18 }} />
            </a>
            <a href={githubUrl} target="_blank" rel="noreferrer">
              <GitIcon style={{ width: 18, height: 18 }} />
            </a>
          </div>
        )}
      </section>
    </header>
  );
};

export default Header;
