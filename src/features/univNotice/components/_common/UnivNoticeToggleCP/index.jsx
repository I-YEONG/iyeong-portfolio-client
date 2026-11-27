import { useState } from "react";
import "./style.css";

const UnivNoticeToggleCP = ({ univnoticeTitle = "", value = true, onClickFun }) => {
  const [toggleValue, setToggleValue] = useState(value);
  const [previousValue, setPreviousValue] = useState(value);
  if (value !== previousValue) {
    setPreviousValue(value);
    setToggleValue(value);
  }

  return (
    <div className="toggleCP">
      <p>{univnoticeTitle}</p>
      <div>
        <div
          onClick={() => {
            const nextValue = !toggleValue;
            setToggleValue(nextValue);
            onClickFun(nextValue);
          }}
          className={`toggleCp-container ${toggleValue ? "active" : ""}`}>
          <div className={`toggleCp-circle`}></div>
        </div>
      </div>
    </div>
  );
};
export default UnivNoticeToggleCP;
