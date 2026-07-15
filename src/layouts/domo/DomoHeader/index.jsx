import { NavLink } from "react-router-dom";
// import "./index.css";
import "@/styles/domo.global.css";

const DomoHeader = () => {
  return (
    <>
      <header>
        <nav className="nav">
          <div className="logo">
            <p className="logo-text">DOMO</p>
            <p className="sub-logo">가장 완벽한 당신의 일정 도우미</p>
          </div>

          <ul className="navList">
            <li>
              <NavLink to="/project/domo/">홈</NavLink>
            </li>
            <li>
              <NavLink to="/project/domo/recs">일정 짜기</NavLink>
            </li>
            <li>
              <NavLink to="/project/domo/benefix">혜택 보기</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default DomoHeader;
