import { useCallback, useState } from "react";
import "./style.css";
import "@/styles/univNotice.global.css";
import ClearIcon from "@mui/icons-material/Clear";
import UnivNoticeToggleCP from "../../_common/UnivNoticeToggleCP";
import UnivNoticeMyPageKeywordCP from "./UnivNoticeMyPageKeywordCP";
import AddIcon from "@mui/icons-material/Add";

const UnivNoticeCategoryCP = ({ category, onEnabledCategory, onDeleteKeyword, onPostKeyword }) => {
  const onEnabledCategoryFunc = (value) => {
    onEnabledCategory(category.id, value);
  };

  const onPostKeywordFunc = () => {
    if (category?.Categories.length === 0) {
      alert("키워드를 추가하려면 먼저 카테고리를 활성화해야 합니다.");
      return;
    }

    const userInput = prompt(`${category.category}에 키워드를 추가합니다.\n'/'로 키워드 구분, Enter로 등록`);

    if (!userInput || userInput.trim() === "") {
      return;
    }

    // 키워드 처리 ('/'로 구분)
    const keywords = userInput
      .split("/")
      .map((kw) => kw.trim())
      .filter((kw) => kw !== "");

    if (keywords.length === 0) {
      alert("유효한 키워드를 입력해 주세요.");
      return;
    }

    onPostKeyword(category?.Categories[0]?.id, keywords);
  };

  return (
    <div className="categoryCP">
      <div className="univnoticeFlexBetween">
        <div className="title">{category.category}</div>
        <div className="univnoticeFlexBetween" style={{ alignItems: "center", gap: "8px", color: "var(--black-3)" }}>
          <AddIcon onClick={onPostKeywordFunc} style={{ cursor: "pointer" }} />
          <UnivNoticeToggleCP value={category?.Categories.length === 0 ? false : true} onClickFun={onEnabledCategoryFunc} />
        </div>
      </div>
      <div className="keyword">
        {category?.Categories[0]?.Keywords?.length !== 0 &&
          category?.Categories[0]?.Keywords?.map((keyword, idx) => (
            <UnivNoticeMyPageKeywordCP key={idx} kw={keyword.keyword} keyword_id={keyword.id} onDelete={onDeleteKeyword} />
          ))}
        {category?.Categories[0]?.Keywords?.length === 0 && <p style={{ fontSize: "0.825rem", color: "var(--black-4)" }}>전체 공지에 대한 알림을 받습니다.</p>}
      </div>
    </div>
  );
};
export default UnivNoticeCategoryCP;
