import "./style.css";
import "@/styles/univNotice.global.css";
const UnivNoticeButtonToggleCP = ({ data, isSelected, onClickToggle }) => (
  <div onClick={() => onClickToggle(data)} className={`buttonToggleCP ${isSelected ? "select" : ""}`}>
    {data.category}
  </div>
);

export default UnivNoticeButtonToggleCP;
