/** @jsxImportSource @emotion/react */
import {
  FoodInput,
  FoodLabel,
  FoodTextarea,
  FoodSelect,
  FoodSelectTrigger,
  FoodSelectValue,
  FoodSelectItem,
  FoodSelectContent,
} from "@/features/food/components";
import { Pencil, Eraser } from "lucide-react";
import React, { useCallback, useState, forwardRef } from "react";
import { useDeviceMode } from "@/hooks/useDeviceMode"; // 미디어 쿼리 훅 임포트
import { foodReportPageMenuStyle } from "./style"; // 스타일 임포트

const FoodFTInfoCP = forwardRef(({ formData, setFormData, handleInputChange, errors }, refs) => {
  const { isPc } = useDeviceMode(); // 미디어 쿼리 훅 호출

  const [menuModify, setMenuModify] = useState(false);
  const [editMenuNum, setEditMenuNum] = useState(""); // 수정 중인 메뉴 번호

  // 푸드트럭 카테고리 리스트
  const categoryList = [
    { value: "분식", data: "분식 (어묵, 떡볶이, 순대)" },
    { value: "간식", data: "간식 (붕어빵, 타코야끼, 크레페, 츄러스, 와플)" },
    { value: "튀김", data: "튀김 (감자튀김, 치즈볼, 오징어튀김, 새우튀김, 치킨)" },
    { value: "꼬치", data: "꼬치 (닭꼬치, 소시지꼬치)" },
    { value: "샌드위치/토스트", data: "샌드위치/토스트 (샌드위치, 토스트, 버거)" },
    { value: "디저트/음료", data: "디저트/음료 (아이스크림, 커피, 음료, 팥빙수)" },
    { value: "식사", data: "식사 (덮밥, 초밥)" },
    { value: "기타", data: "기타" },
  ];

  /**
   * 메뉴 등록 함수
   */
  const handleAddMenu = () => {
    // menuName 3글자 이상 체크
    if (!formData.menuName || formData.menuName.length < 3) {
      alert("메뉴 이름은 3글자 이상 입력해야 합니다.");
      return;
    }
    // menuPrice 숫자만 허용, 1 이상
    const price = Number((formData.menuPrice || "").trim());
    if (!price || !Number.isInteger(price) || Number(price) < 1) {
      alert("가격은 1 이상의 숫자만 입력해야 합니다.");
      return;
    }
    // menuNum 입력 체크
    if (!formData.menuNum) {
      alert("메뉴 번호를 입력해야 합니다.");
      return;
    }
    // menuNum 중복 체크
    if (formData.menu.some((menu) => menu.num === formData.menuNum)) {
      alert("이미 해당 번호에 메뉴가 존재합니다.");
      return;
    }
    alert("메뉴가 등록되었습니다!");
    setFormData((prev) => ({
      ...prev,
      menu: [
        ...prev.menu,
        {
          num: formData.menuNum,
          name: formData.menuName,
          price: formData.menuPrice,
          info: formData.menuInfo,
        },
      ],
      menuNum: "",
      menuName: "",
      menuPrice: "",
      menuInfo: "",
    }));
  };

  /**
   * 메뉴 수정 함수
   */
  const handleEditMenu = (editNum) => {
    // menuName 3글자 이상 체크
    if (!formData.menuName || formData.menuName.length < 3) {
      alert("메뉴 이름은 3글자 이상 입력해야 합니다.");
      return;
    }
    // menuPrice 숫자만 허용, 1 이상
    const price = Number((formData.menuPrice || "").trim());
    if (!price || !Number.isInteger(price) || Number(price) < 1) {
      alert("가격은 1 이상의 숫자만 입력해야 합니다.");
      return;
    }
    // menuNum 중복 체크 (수정 중인 메뉴 제외)
    if (formData.menu.some((menu) => menu.num === formData.menuNum && menu.num !== editNum)) {
      alert("이미 해당 번호에 메뉴가 존재합니다.");
      console.log(`formData:: ${formData.menuNum}, editNum: ${editNum}`);
      return false;
    }
    alert("메뉴가 수정되었습니다!");
    setFormData((prev) => ({
      ...prev,
      menu: prev.menu.map((item) =>
        item.num === editNum
          ? {
              ...item,
              num: formData.menuNum,
              name: formData.menuName,
              price: formData.menuPrice,
              info: formData.menuInfo,
            }
          : item,
      ),
      menuNum: "",
      menuName: "",
      menuPrice: "",
      menuInfo: "",
    }));
    setMenuModify(false);
  };

  /**
   * 메뉴 삭제 함수
   */
  const menuDeleteHandler = useCallback(
    (num) => {
      setFormData((prev) => ({
        ...prev,
        menu: prev.menu.filter((menu) => menu.num !== num),
        // 만약 수정모드에서 삭제한 메뉴가 현재 수정 중이라면 수정모드 해제
        ...(menuModify && editMenuNum === num
          ? {
              menuName: "",
              menuPrice: "",
              menuInfo: "",
              menuNum: "",
            }
          : {}),
      }));
      if (menuModify && editMenuNum === num) {
        setMenuModify(false);
        setEditMenuNum("");
      }
    },
    [menuModify, editMenuNum, setFormData],
  );

  return (
    <section className="p-6 cards">
      <div>
        <h1 className="text-2xl font-bold text-brown-10">푸드트럭 기본 정보</h1>
        <p className="text-sm text-food-muted-foreground">제보하려는 푸드트럭의 기본 정보를 입력해주세요</p>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-1 ">
            <FoodLabel htmlFor="name">푸드트럭 이름 *</FoodLabel>
            <FoodInput
              ref={refs.name}
              className="mt-2 border border-solid"
              id="name"
              placeholder="황금 잉어빵"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
            />
            {errors.name && <span className="text-sm text-red-500">{errors.name}</span>}
          </div>
          <div className="flex-1">
            <FoodLabel htmlFor="category">카테고리 *</FoodLabel>
            <FoodSelect
              ref={refs.category}
              onValueChange={(value) => {
                const selected = categoryList.find((item) => item.data === value);
                handleInputChange("category", selected.value);
              }}>
              <FoodSelectTrigger className="mt-2 border border-solid">
                <FoodSelectValue placeholder="카테고리 선택">
                  {formData.category ? categoryList.find((item) => item.value === formData.category)?.data : "카테고리 선택"}
                </FoodSelectValue>
              </FoodSelectTrigger>
              <FoodSelectContent className="border border-solid border-gray-3">
                {categoryList.map((items) => (
                  <FoodSelectItem key={items.value} value={items.data}>
                    {items.data}
                  </FoodSelectItem>
                ))}
              </FoodSelectContent>
            </FoodSelect>
            {errors.category && <span className="text-sm text-red-500">{errors.category}</span>}
          </div>
        </div>
        <div className="col-full">
          <div>
            <FoodLabel htmlFor="intro">푸드트럭 설명</FoodLabel>
            <FoodTextarea
              ref={refs.intro}
              className="mt-2 border border-solid"
              id="intro"
              placeholder="푸드트럭의 특징, 맛, 분위기 등을 자유롭게 설명해주세요"
              value={formData.intro}
              onChange={(e) => handleInputChange("intro", e.target.value)}
              rows={5}
            />
            {errors.intro && <span className="text-sm text-red-500">{errors.intro}</span>}
          </div>
        </div>
      </div>

      {/* Styled Component 대체 */}
      <div css={foodReportPageMenuStyle(isPc)}>
        <h2>메뉴 정보</h2>
        <div className="col">
          <div className="menu-list">
            <p>
              메뉴 리스트<span className="essential">*</span>
            </p>
            <div className={formData.menu.length === 0 ? "flexCenter" : "flexCol"}>
              {formData.menu.length === 0 && <p>메뉴를 등록하세요</p>}
              {/* menuList를 num 오름차순으로 정렬하여 출력 */}
              {formData.menu
                .slice()
                .sort((a, b) => Number(a.num) - Number(b.num))
                .map((menu, idx) => (
                  <div key={idx} className="menu-item">
                    <div className="flexBetween">
                      <p className="flexBetween">
                        <span>{menu.num}.</span>
                        <span>{menu.name}</span>
                        <span>({Number(menu.price).toLocaleString()}원)</span>
                      </p>
                      <p className="flexBetween icon">
                        {/* 수정 아이콘 클릭 시 해당 메뉴 정보로 input값 세팅 및 수정모드 진입 */}
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setMenuModify(true);
                            setEditMenuNum(menu.num);
                            setFormData((prev) => ({
                              ...prev,
                              menuName: menu.name,
                              menuPrice: menu.price,
                              menuInfo: menu.info,
                              menuNum: menu.num,
                            }));
                          }}>
                          <Pencil />
                        </span>
                        <span style={{ cursor: "pointer" }} onClick={() => menuDeleteHandler(menu.num)}>
                          <Eraser />
                        </span>
                      </p>
                    </div>
                    <p className="menu-item-info">{menu.info}</p>
                  </div>
                ))}
            </div>
            {errors.menu && <span className="text-sm text-red-500">{errors.menu}</span>}
          </div>
          <div className="menu-add">
            <p>메뉴 등록</p>
            <div>
              <InputCP
                title="메뉴 이름"
                value={formData.menuName || ""}
                onChangeHandler={(e) => handleInputChange("menuName", e.target.value)}
                essential="true"
              />
              <InputCP
                title="가격"
                value={formData.menuPrice || ""}
                onChangeHandler={(e) => handleInputChange("menuPrice", e.target.value)}
                essential="true"
                ex="숫자만 입력"
              />
              <InputCP title="설명" value={formData.menuInfo} onChangeHandler={(e) => handleInputChange("menuInfo", e.target.value)} />
              <InputCP
                title="표시 순서"
                value={formData.menuNum}
                onChangeHandler={(e) => handleInputChange("menuNum", e.target.value)}
                essential="true"
                ex="숫자가 이어질 필요가 없습니다. 메뉴는 오름차순으로 표시됩니다."
              />
            </div>
            <div className="btnMod">
              {/* 수정모드, 등록모드 버튼 구분 */}
              {!menuModify && (
                <div onClick={handleAddMenu}>
                  <ButtonCP>등록</ButtonCP>
                </div>
              )}
              {menuModify && (
                <div onClick={() => handleEditMenu(editMenuNum)}>
                  <ButtonCP>수정</ButtonCP>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default FoodFTInfoCP;
