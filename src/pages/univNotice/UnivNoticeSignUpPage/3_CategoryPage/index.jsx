import { useCallback, useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import UnivNoticeLogoLayout from "@/layouts/univNotice/UnivNoticeLogoLayout";
import "@/styles/univNotice.global.css";
import { UnivNoticeButtonCP, UnivNoticeButtonToggleCP } from "@/features/univNotice/components";
import { useDeviceMode } from "@/hooks/useDeviceMode";
import { useGetUnivNoticeQuery } from "@/features/univNotice/hooks/useGetUnivNoticeQuery";

const UnivNoticeCategoryPage = () => {
  const userInfo = JSON.parse(localStorage.getItem("signupInfo"));

  const { data: categoryList, isLoading: isUnivListLoading, isError: isUnivListError } = useGetUnivNoticeQuery("/category/1");

  const nav = useNavigate();
  const { isPc } = useDeviceMode();

  const loadCategoryData = useCallback(async () => {
    // if (!userInfo) return;
    // const { school_id, department_id } = userInfo;
    // try {
    //   const data = await signupCategoryLoad(school_id, department_id);
    //   setCategoryList(data || []);
    // } catch (error) {
    //   console.error("카테고리 데이터 로드 오류:", error);
    // }
  }, []);

  useEffect(() => {
    if (!userInfo) {
      window.confirm("잘못된 접근입니다. 회원가입 첫 페이지로 이동합니다.");
      nav("/project/univnotice/signup/1");
    }

    loadCategoryData();
  }, []);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const toggleCategory = (data) => {
    const isSelected = selectedCategories.find((item) => item.id === data.id);
    if (isSelected) {
      setSelectedCategories(selectedCategories.filter((item) => item.id !== data.id));
    } else {
      setSelectedCategories([...selectedCategories, { id: data.id, category: data.category }]);
    }
  };

  const nextButtonClick = () => {
    if (selectedCategories.length === 0) {
      alert("하나 이상의 카테고리를 선택해 주세요.");
      return;
    }
    localStorage.setItem("signupCategory", JSON.stringify(selectedCategories));
    nav("/project/univnotice/signup/4/1");
  };

  useEffect(() => {
    const box = document.querySelector(".buttonBox");
    if (!box) return;
    const togglePadding = () => {
      box.style.paddingRight = box.scrollHeight > box.clientHeight ? "4px" : "0";
    };
    togglePadding();
    box.addEventListener("scroll", togglePadding);
    window.addEventListener("resize", togglePadding);
    return () => {
      box.removeEventListener("scroll", togglePadding);
      window.removeEventListener("resize", togglePadding);
    };
  }, []);

  return (
    <UnivNoticeLogoLayout>
      <section className="categoryPage univnoticeFlexCenter" style={isPc ? { padding: "0 6rem" } : { padding: "0 3rem" }}>
        <div className="univnoticeCenterBox">
          <div className="univnoticeTitleBox">
            <h2 className="univnoticeTitle">
              알림 받을 <span className="bold">공지</span>를
              <br />
              선택해 주세요!
            </h2>
            <h4 className="subTitle">다음 단계에서 공지 유형별로 키워드를 설정합니다.</h4>
          </div>
          {categoryList?.length > 0 && (
            <div className="univnoticeFlexCol buttonBox" style={{ gap: "26px", width: "100%" }}>
              {categoryList?.map((data, idx) => (
                <UnivNoticeButtonToggleCP
                  key={idx}
                  data={data}
                  isSelected={selectedCategories.some((item) => item.id === data.id)}
                  onClickToggle={toggleCategory}
                />
              ))}
            </div>
          )}

          <div className="bottomItem" onClick={nextButtonClick}>
            <UnivNoticeButtonCP>다음</UnivNoticeButtonCP>
          </div>
        </div>
      </section>
    </UnivNoticeLogoLayout>
  );
};
export default UnivNoticeCategoryPage;
