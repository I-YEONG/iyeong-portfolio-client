import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.css";
import "@/styles/careerhi.global.css";
import { useState } from "react";

const SelectCP = ({ value, setValue, selectList, placeholder = "", disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full overflow-y-visible max-h-12">
      <div
        style={{
          opacity: disabled ? 0.5 : 1,
        }}
        className="relative z-10 flex items-center gap-3 px-5 bg-white border border-gray-300 rounded-lg cursor-pointer SelectCP flex-nowrap"
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 100)}>
        <input
          type="text"
          className="B4 h-11.5 cursor-pointer text-point-text flex-1 w-full outline-none border-0 caret-transparent"
          value={value}
          readOnly
          disabled={disabled}
          placeholder={placeholder}
        />
        {isOpen && <FontAwesomeIcon icon={faCaretUp} className="text-gray-500" />}
        {!isOpen && <FontAwesomeIcon icon={faCaretDown} className="text-gray-500" />}
      </div>

      {/* 셀렉트박스 */}
      {isOpen && (
        <div className="cursor-pointer rounded-lg border border-gray-400 relative bg-white p-4 z-51 mt-1.5">
          <div className="w-fit">
            {selectList.map((item, index) => (
              <div
                onMouseDown={(e) => {
                  e.preventDefault();

                  setValue(item);

                  setTimeout(() => {
                    setIsOpen(false);
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur();
                    }
                  }, 50);
                }}
                key={index}
                className="mb-2 last:mb-0 cursor-pointer B4 px-2.5 py-1 rounded-sm hover:bg-[#fff9fb]"
                style={{
                  backgroundColor: item === value ? "#FFF2F5" : "withe",
                  color: item === value ? "var(--color-point-sub-bold)" : "var(--color-point-text)",
                }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default SelectCP;
