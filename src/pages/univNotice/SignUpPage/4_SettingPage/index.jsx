import UnivNoticeLogoLayout from "@/layouts/univNotice/UnivNoticeLogoLayout";
import "./style.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UnivNoticeSettingCP } from "@/features/univNotice/components";
import "@/styles/univNotice.global.css";

const UnivNoticeSettingPage = () => {
  const nav = useNavigate();
  const setting_id = useParams().setting_id;

  const category = JSON.parse(localStorage.getItem("signupCategory"));

  const [settingCategory, setSettingCategory] = useState(
    category
      .slice() // 원본 배열 복사(불변성)
      .sort((a, b) => a.id - b.id)
      .map((item) => ({ ...item, keywords: [] })),
  );

  // 현재 카테고리의 키워드 배열을 업데이트하는 함수
  const setKeywordFunc = (updatedKeywords) => {
    setSettingCategory((prev) => {
      const newArr = [...prev];
      newArr[Number(setting_id) - 1] = {
        ...newArr[Number(setting_id) - 1],
        keywords: updatedKeywords,
      };
      return newArr;
    });
  };

  const nextButtonClick = () => {
    localStorage.setItem("signupKeyword", JSON.stringify(settingCategory));
    if (category.length > Number(setting_id)) {
      nav(`/signup/4/${Number(setting_id) + 1}`);
    } else {
      nav("/signup/5");
    }
  };

  // 전체 건너뛰기 버튼 클릭 시 모든 카테고리의 keywords를 빈 배열로 저장하고 다음 단계로 이동
  const skipAll = () => {
    const skipped = settingCategory.map((item) => ({ ...item, keywords: [] }));
    localStorage.setItem("signupKeyword", JSON.stringify(skipped));
    nav("/signup/5");
  };

  return (
    <UnivNoticeLogoLayout>
      <section className="settingPage univnoticeFlexCenter">
        {settingCategory?.length >= 1 && (
          <UnivNoticeSettingCP
            skipAll={skipAll}
            data={settingCategory[Number(setting_id) - 1]}
            key={setting_id}
            pageId={Number(setting_id)}
            setKeywordFunc={setKeywordFunc}
            nextButtonClick={nextButtonClick}
          />
        )}
      </section>
    </UnivNoticeLogoLayout>
  );
};
export default UnivNoticeSettingPage;
