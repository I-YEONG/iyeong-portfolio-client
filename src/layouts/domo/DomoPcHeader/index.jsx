import { NavLink, useNavigate } from "react-router-dom";
import "./index.css";

const DomoPcHeader = () => {
  const nav = useNavigate();
  return (
    <header className="pc-header">
      <nav className="nav">
        <div className="logo">
          <p onClick={() => nav("/project/domo/")} style={{ cursor: "pointer" }}>
            DOMO
          </p>
        </div>
        <ul className="navList">
          <li>
            <NavLink to="/project/domo/">홈</NavLink>
          </li>
          <li>
            <NavLink to="/project/domo/recs">일정 짜기</NavLink>
          </li>
          /project/domo
          <li>
            <NavLink to="/project/domo/benefix">혜택 보기</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default DomoPcHeader;
