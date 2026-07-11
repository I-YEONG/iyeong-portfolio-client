import { useState } from "react";
import UnivNoticeInputCP from "@/features/univNotice/components/_common/UnivNoticeInputCP";
import { useInput } from "@/hooks/useInput";
import UnivNoticeKeywordCP from "./UnivNoticeKeywordCP";
import "@/styles/univNotice.global.css";
import "./style.css";
import UnivNoticeButtonCP from "@/features/univNotice/components/_common/UnivNoticeButtonCP";

const UnivNoticeSettingCP = ({ pageId, data, setKeywordFunc, nextButtonClick, skipAll }) => {
  const [keywords, setKeywords] = useState(data.keywords || []);
  const [inputValue, onChangeInputValue, setInputValue] = useInput("");

  // 키워드 추가 함수
  // 1. inputValue가 비어있으면 아무 작업도 하지 않음
  // 2. '/'로 분리하여 여러 키워드 입력 가능 (예: 'A/B/C')
  // 3. 각 키워드 앞뒤 공백 제거 및 빈 값 제거
  // 4. 이미 등록된 키워드는 중복 추가하지 않음
  // 5. 새로운 키워드가 있으면 기존 배열에 추가하고 상태 업데이트
  // 6. setKeywordFunc prop이 있으면 부모에도 변경 알림
  const addKeyword = () => {
    if (!inputValue) return;
    const newKeywords = inputValue
      .split("/")
      .map((kw) => kw.trim())
      .filter((kw) => kw);
    const uniqueNewKeywords = newKeywords.filter((kw) => !keywords.includes(kw));
    if (uniqueNewKeywords.length === 0) return;
    const updatedKeywords = [...keywords, ...uniqueNewKeywords];
    setKeywords(updatedKeywords);
    setKeywordFunc && setKeywordFunc(updatedKeywords);
    setInputValue("");
  };

  const deleteKeyword = (kw) => {
    const updatedKeywords = keywords.filter((k) => k !== kw);
    setKeywords(updatedKeywords);
    setKeywordFunc && setKeywordFunc(updatedKeywords);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      addKeyword();
    }
  };

  return (
    <div className="univnoticeCenterBox settingCP">
      {/* 타이틀 */}
      <div className="univnoticeTitleBox">
        <h2 className="univnoticeTitle">
          <span className="bold">{data.category}</span>의<br />
          키워드를 설정합니다!
        </h2>
        <h4 className="subTitle">
          아래 키워드가 포함된 공지가 올라오면 을 받아요
          <br />
          키워드 입력을 하지 않고 건너뛸 수 있어요!
        </h4>
      </div>
      <div className="univnoticeFlexCol">
        <UnivNoticeInputCP
          value={inputValue}
          onChange={onChangeInputValue}
          univnoticeTitle="키워드"
          placeholder="' / '로 구분, Enter로 등록"
          onKeyDown={onKeyDown}
        />
        <div className="keywordList">
          {keywords.map((kw, idx) => (
            <UnivNoticeKeywordCP key={idx} kw={kw} onDelete={deleteKeyword} />
          ))}
        </div>
      </div>
      <div className="bottomItem">
        <div onClick={nextButtonClick}>
          <UnivNoticeButtonCP>다음</UnivNoticeButtonCP>
        </div>
        {pageId === 1 && (
          <p className="deleteAccount">
            <span onClick={() => skipAll()}>전체 스킵</span>
          </p>
        )}
      </div>
    </div>
  );
};
export default UnivNoticeSettingCP;
