/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faPen } from "@fortawesome/free-solid-svg-icons";
import DaumPostcode from "react-daum-postcode";

// 훅 및 외부 컴포넌트 임포트
import { useDeviceMode } from "@/hooks/useDeviceMode";
import { foodMyFTCPMainStyle, foodMyFTCPMenuStyle, foodMyFTCPScheduleStyle } from "./style";
import { useInput } from "@/hooks/useInput";

import { FoodSelectInputCP, FoodInputCP, FoodTextAreaInputCP, FoodOutLineButtonCP, FoodButtonCP } from "@/features/food/components";

const FoodMyFTCP = ({ myTruckList = [] }) => {
  // 이미지 파일 상태
  const [file, setFile] = useState(null);
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  // useDeviceMode를 사용해 isPc 값 받기
  const { isPc } = useDeviceMode();

  const [modalState, setModalState] = useState(false);
  const [selectedScheduleIdx, setSelectedScheduleIdx] = useState(null);

  const nameErrorRef = useRef();
  const categoryErrorRef = useRef();
  const introErrorRef = useRef();
  const menuErrorRef = useRef();
  const termsErrorRef = useRef();

  const [scheduleErrors, setScheduleErrors] = useState(Array(7).fill({ open: false, close: false, address: false }));
  const [originData, setOriginData] = useState(myTruckList[0] || null);

  const updateSubmitHandler = (e) => {
    e.preventDefault();
    let error = false;
    let errorMsgs = [];

    if (!FTName || FTName.length < 2) {
      nameErrorRef.current.style.visibility = "visible";
      errorMsgs.push("푸드트럭 이름은 2글자 이상 입력해야 합니다.");
      error = true;
    } else {
      nameErrorRef.current.style.visibility = "hidden";
    }

    if (!FTCategory) {
      categoryErrorRef.current.style.visibility = "visible";
      errorMsgs.push("카테고리를 선택하세요.");
      error = true;
    } else {
      categoryErrorRef.current.style.visibility = "hidden";
    }

    if (!FTIntro || FTIntro.length < 20) {
      introErrorRef.current.style.visibility = "visible";
      errorMsgs.push("푸드트럭 소개는 20자 이상 입력해야 합니다.");
      error = true;
    } else {
      introErrorRef.current.style.visibility = "hidden";
    }

    if (!menuList || menuList.length === 0) {
      menuErrorRef.current.style.visibility = "visible";
      errorMsgs.push("메뉴를 하나 이상 등록하세요.");
      error = true;
    } else {
      menuErrorRef.current.style.visibility = "hidden";
    }

    let hasOpenDay = false;
    let newScheduleErrors = scheduleErrors.map(() => ({
      open: false,
      close: false,
      address: false,
    }));

    scheduleList.forEach((item, idx) => {
      if (item.holiday) {
        hasOpenDay = true;
        const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;
        if (!timeRegex.test(item.start)) {
          newScheduleErrors[idx].open = true;
          errorMsgs.push(`${item.day}요일 오픈 시간은 00:00 형식(24시간제)으로 입력하세요.`);
          error = true;
        }
        if (!timeRegex.test(item.end)) {
          newScheduleErrors[idx].close = true;
          errorMsgs.push(`${item.day}요일 클로징 시간은 00:00 형식(24시간제)으로 입력하세요.`);
          error = true;
        }
        if (timeRegex.test(item.start) && timeRegex.test(item.end)) {
          const [startH, startM] = item.start.split(":").map(Number);
          const [endH, endM] = item.end.split(":").map(Number);
          const startTotal = startH * 60 + startM;
          const endTotal = endH * 60 + endM;
          if (endTotal < startTotal) {
            newScheduleErrors[idx].close = true;
            errorMsgs.push(`${item.day}요일 클로징 시간은 오픈 시간보다 빠를 수 없습니다.`);
            error = true;
          }
        }
      }
    });
    setScheduleErrors(newScheduleErrors);
    if (!hasOpenDay) {
      errorMsgs.push("요일 중 하나 이상 영업 체크가 필요합니다.");
      error = true;
    }

    const termsChecked = document.getElementById("terms")?.checked;
    if (!termsChecked) {
      termsErrorRef.current.style.visibility = "visible";
      errorMsgs.push("약관에 동의해야 합니다.");
      error = true;
    } else {
      termsErrorRef.current.style.visibility = "hidden";
    }

    if (error) {
      if (errorMsgs.length > 0) {
        alert(errorMsgs.join("\n"));
      } else {
        alert("입력값에 문제가 있습니다.");
      }
      return;
    }

    const truckId = originData?.truckId;

    if (!truckId) {
      alert("푸드트럭 ID가 없습니다. 다시 시도해주세요.");
      return;
    }

    const buildScheduleWithLatLng = async (list) => {
      return Promise.all(
        list.map(async (item) => {
          const start = item.start.length === 2 ? item.start + ":00" : item.start;
          const end = item.end.length === 2 ? item.end + ":00" : item.end;
          let lat = item.lat,
            lng = item.lng;

          if (item.mapAddress && (!lat || !lng)) {
            try {
              if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) throw new Error("Kakao map not loaded");
              const geocoder = new window.kakao.maps.services.Geocoder();
              const coords = await new Promise((resolve, reject) => {
                geocoder.addressSearch(item.mapAddress, function (result, status) {
                  if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
                    resolve({ lat: parseFloat(result[0].y), lng: parseFloat(result[0].x) });
                  } else {
                    reject("주소 변환 실패: " + item.mapAddress);
                  }
                });
              });
              lat = coords.lat;
              lng = coords.lng;
            } catch (e) {
              console.warn("주소->좌표 변환 실패:", item.mapAddress, e);
            }
          }
          return { day: item.day, holiday: item.holiday, start, end, mapAddress: item.mapAddress, userAddress: item.userAddress, lat, lng };
        }),
      );
    };

    const buildSendData = async () => {
      let sendData = {};
      if (!originData) {
        sendData.name = FTName;
        sendData.category = FTCategory || "";
        sendData.intro = FTIntro;
        sendData.menu = menuList.map((menu) => {
          const { name, price, info, num } = menu;
          return { name, price: String(price), info, num: String(num) };
        });
        sendData.schedule = await buildScheduleWithLatLng(scheduleList);
      } else {
        sendData.name = originData.name !== FTName ? FTName : originData.name;
        sendData.category = originData.category !== FTCategory ? FTCategory : originData.category;
        sendData.intro = originData.intro !== FTIntro ? FTIntro : originData.intro;
        const cleanMenu = (menuArr) => menuArr.map(({ name, price, info, num }) => ({ name, price: String(price), info, num: String(num) }));
        sendData.menu = cleanMenu(JSON.stringify(originData.menu) !== JSON.stringify(menuList) ? menuList : originData.menu);
        sendData.schedule =
          JSON.stringify(originData.schedule) !== JSON.stringify(scheduleList)
            ? await buildScheduleWithLatLng(scheduleList)
            : await buildScheduleWithLatLng(originData.schedule);
      }
      return sendData;
    };

    (async () => {
      const sendData = await buildSendData();
      const formData = new FormData();
      formData.append("request", JSON.stringify(sendData));

      if (file) {
        formData.append("image", file);
      }

      axios
        .put(`${import.meta.env.VITE_API_URL}/user/foodtruck/${truckId}`, formData, {
          withCredentials: true,
          headers: { Accept: "application/json" },
        })
        .then((res) => {
          if (res.status === 200) {
            alert("푸드트럭 정보가 수정되었습니다!");
            window.location.reload();
          } else {
            alert(res.data.message || "푸드트럭 정보 수정에 실패했습니다. 다시 시도해주세요.");
          }
        })
        .catch((err) => {
          console.error("푸드트럭 정보 수정 중 오류 발생:", err);
          alert("푸드트럭 정보 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
        });
    })();
  };

  const [FTName, onChangeFTName, setFTName] = useInput(originData?.name || "");
  const [FTCategory, onChangeFTCategory, setFTCategory] = useInput(originData?.category || "");

  const FTCategoryList = [
    { value: "분식", data: "분식 (어묵, 떡볶이, 순대)" },
    { value: "간식", data: "간식 (붕어빵, 타코야끼, 크레페, 츄러스, 와플)" },
    { value: "튀김", data: "튀김 (감자튀김, 치즈볼, 오징어튀김, 새우튀김, 치킨)" },
    { value: "꼬치", data: "꼬치 (닭꼬치, 소시지꼬치)" },
    { value: "샌드위치/토스트", data: "샌드위치/토스트 (샌드위치, 토스트, 버거)" },
    { value: "디저트/음료", data: "디저트/음료 (아이스크림, 커피, 음료, 팥빙수)" },
    { value: "식사", data: "식사 (덮밥, 초밥)" },
    { value: "기타", data: "기타" },
  ];

  const [FTIntro, onChangeFTIntro, setFTIntro] = useInput(originData?.intro || "");
  const [menuList, setMenuList] = useState(originData?.menu || []);
  const [menuModify, setMenuModify] = useState(false);
  const [editMenuNum, setEditMenuNum] = useState("");
  const [menuName, onChangeMenuName, setMenuName] = useInput("");
  const [menuPrice, onChangeMenuPrice, setMenuPrice] = useInput("");
  const [menuInfo, onChangeMenuInfo, setMenuInfo] = useInput("");
  const [menuNum, onChangeMenuNum, setMenuNum] = useInput("");
  // useCallback과 의존성 배열을 모두 제거하고 일반 화살표 함수로 선언하세요.

  const menuAddHandler = () => {
    if (!menuName || menuName.length < 3) {
      alert("메뉴 이름은 3글자 이상 입력해야 합니다.");
      return;
    }
    if (!menuPrice || !/^[0-9]+$/.test(menuPrice) || Number(menuPrice) < 1) {
      alert("가격은 1 이상의 숫자만 입력해야 합니다.");
      return;
    }
    if (menuList.some((menu) => menu.num === menuNum)) {
      alert("이미 해당 번호에 메뉴가 존재합니다.");
      return;
    }

    const newMenu = { name: menuName, price: menuPrice, info: menuInfo, num: menuNum };
    setMenuList((prev) => [...prev, newMenu]);
    alert("메뉴가 등록되었습니다!");
    setMenuName("");
    setMenuPrice("");
    setMenuInfo("");
    setMenuNum("");
  };

  const menuEditHandler = () => {
    if (!editMenuNum) return;
    if (!menuName || menuName.length < 3) {
      alert("메뉴 이름은 3글자 이상 입력해야 합니다.");
      return;
    }
    if (!menuPrice || !/^[0-9]+$/.test(menuPrice) || Number(menuPrice) < 1) {
      alert("가격은 1 이상의 숫자만 입력해야 합니다.");
      return;
    }
    if (menuList.some((menu) => menu.num === menuNum && menu.num !== editMenuNum)) {
      alert("이미 해당 번호에 메뉴가 존재합니다.");
      return;
    }
    setMenuList((prev) => prev.map((menu) => (menu.num === editMenuNum ? { ...menu, name: menuName, price: menuPrice, info: menuInfo, num: menuNum } : menu)));
    alert("메뉴가 수정되었습니다!");
    setMenuName("");
    setMenuPrice("");
    setMenuInfo("");
    setMenuNum("");
    setMenuModify(false);
    setEditMenuNum("");
  };

  const menuDeleteHandler = useCallback(
    (num) => {
      setMenuList((prev) => prev.filter((menu) => menu.num !== num));
      if (menuModify && editMenuNum === num) {
        setMenuModify(false);
        setEditMenuNum("");
        setMenuName("");
        setMenuPrice("");
        setMenuInfo("");
        setMenuNum("");
      }
    },
    [menuModify, editMenuNum, setMenuInfo, setMenuName, setMenuNum, setMenuPrice],
  );

  const dayNames = useMemo(() => ["월", "화", "수", "목", "금", "토", "일"], []);
  const [scheduleList, setScheduleList] = useState(
    dayNames.map((day) => ({
      day,
      holiday: false,
      start: "",
      end: "",
      mapAddress: "",
      userAddress: "",
    })),
  );

  const handleScheduleChange = (idx, key, value) => {
    setScheduleList((prev) => prev.map((item, i) => (i === idx ? { ...item, [key]: value } : item)));
  };

  const handleAddressSearch = (idx) => {
    setSelectedScheduleIdx(idx);
    setModalState(true);
  };

  const onCompletePost = (data) => {
    setModalState(false);
    if (selectedScheduleIdx !== null) {
      setScheduleList((prev) => prev.map((item, i) => (i === selectedScheduleIdx ? { ...item, mapAddress: data.address } : item)));
    }
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/user/foodtruck/mine`, { withCredentials: true })
      .then((res) => {
        if (res.data?.length === 0) {
          alert("등록된 푸드트럭이 없습니다.");
          if (window.confirm("푸드트럭을 등록하시겠습니까?")) {
            window.location.href = "/project/foodmap/register";
          }
          return;
        }
        if (Array.isArray(res.data) && res.data.length > 0) {
          const data = res.data[0];
          setOriginData(data);
          setFTName(data.name);
          setFTIntro(data.intro);
          setMenuList(data.menu || []);
          setScheduleList(
            data.schedule ||
              dayNames.map((day) => ({
                day,
                holiday: false,
                start: "",
                end: "",
                mapAddress: "",
                userAddress: "",
              })),
          );
        }
      })
      .catch((err) => {
        console.error("내 푸드트럭 정보 로딩 중 오류:", err);
      });
  }, [setFTName, setFTCategory, setFTIntro, dayNames]);

  const ftDelecteHandler = (e) => {
    e.preventDefault();
    const truckId = originData?.truckId;
    if (!truckId) {
      alert("푸드트럭 ID가 없습니다. 다시 시도해주세요.");
      return;
    }
    if (window.confirm("정말로 푸드트럭을 삭제하시겠습니까? 삭제 시 복구할 수 없습니다.")) {
      axios
        .delete(`${import.meta.env.VITE_API_URL}/user/foodtruck/${truckId}`, {
          withCredentials: true,
          headers: { Accept: "application/json" },
        })
        .then((res) => {
          if (res.status === 200) {
            alert("푸드트럭이 삭제되었습니다.");
            window.location.reload();
          } else {
            alert(res.data.message || "푸드트럭 삭제에 실패했습니다.\n다시 시도해주세요.");
          }
        })
        .catch((err) => {
          console.error("푸드트럭 삭제 중 오류 발생:", err);
          alert("푸드트럭 삭제 중 오류가 발생했습니다.\n다시 시도해주세요.");
        });
    }
  };

  return (
    <div css={foodMyFTCPMainStyle(isPc)}>
      <section>
        <div>
          <h1>푸드트럭 정보 수정</h1>
          <p>등록된 푸드트럭 정보를 수정할 수 있습니다. 변경하고 싶은 내용을 입력하고 수정 신청을 눌러주세요.</p>
        </div>
        <div>
          <h2>기본 정보</h2>
          <div className="col">
            <div>
              <FoodInputCP title="푸드트럭 이름" essential="true" value={FTName} ex="황금 잉어빵" onChangeHandler={onChangeFTName} />
              <span className="nameError error" ref={nameErrorRef}>
                2글자 이상 입력하세요
              </span>
            </div>
            <div>
              <FoodSelectInputCP title="카테고리" essential="true" listData={FTCategoryList} value={FTCategory} onChangeHandler={onChangeFTCategory} />
              <span className="categoryError error" ref={categoryErrorRef}>
                카테고리를 선택하세요
              </span>
            </div>
          </div>
          <div className="col-full">
            <div>
              <FoodTextAreaInputCP
                title="푸드트럭 소개"
                essential="true"
                ex="푸드트럭에 대한 소개를 입력하세요."
                onChangeHandler={onChangeFTIntro}
                value={FTIntro}
                maxRows={7}
                minRows={5}
              />
              <span className="introError error" ref={introErrorRef}>
                20자 이상 입력하세요
              </span>
            </div>
          </div>
        </div>

        <div>
          <h2>이미지</h2>
          <div className="image-upload col foodFlexCenter">
            <div>
              <p>푸드트럭이 드러난 이미지를 업로드 해 주세요</p>
              <p>선택사항</p>
              <input type="file" accept="image/*" onChange={handleChange} />
            </div>
          </div>
        </div>

        <div css={foodMyFTCPMenuStyle(isPc)}>
          <h2>메뉴 정보</h2>
          <div className="col">
            <div className="menu-list">
              <p>
                메뉴 리스트<span className="essential">*</span>
              </p>
              <div className={menuList.length === 0 ? "foodFlexCenter" : "foodFlexCol"}>
                {menuList.length === 0 && <p>메뉴를 등록하세요</p>}
                {menuList
                  .slice()
                  .sort((a, b) => Number(a.num) - Number(b.num))
                  .map((menu, idx) => (
                    <div key={idx} className="menu-item">
                      <div className="foodFlexBetween">
                        <p className="foodFlexBetween">
                          <span>{menu.num}.</span>
                          <span>{menu.name}</span>
                          <span>({Number(menu.price).toLocaleString()}원)</span>
                        </p>
                        <p className="foodFlexBetween icon">
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setMenuModify(true);
                              setEditMenuNum(menu.num);
                              setMenuName(menu.name);
                              setMenuPrice(menu.price);
                              setMenuInfo(menu.info);
                              setMenuNum(menu.num);
                            }}>
                            <FontAwesomeIcon icon={faPen} />
                          </span>
                          <span style={{ cursor: "pointer" }} onClick={() => menuDeleteHandler(menu.num)}>
                            <FontAwesomeIcon icon={faEraser} />
                          </span>
                        </p>
                      </div>
                      <p className="menu-item-info">{menu.info}</p>
                    </div>
                  ))}
              </div>
              <span className="menuError error" ref={menuErrorRef}>
                메뉴를 하나 이상 등록하세요
              </span>
            </div>
            <div className="menu-add">
              <p>메뉴 등록</p>
              <div>
                <FoodInputCP title="메뉴 이름" value={menuName} onChangeHandler={onChangeMenuName} essential="true" />
                <FoodInputCP title="가격" value={menuPrice} onChangeHandler={onChangeMenuPrice} essential="true" ex="숫자만 입력" />
                <FoodInputCP title="설명" value={menuInfo} onChangeHandler={onChangeMenuInfo} />
                <FoodInputCP
                  title="표시 순서"
                  value={menuNum}
                  onChangeHandler={onChangeMenuNum}
                  essential="true"
                  ex="숫자가 이어질 필요가 없습니다. 메뉴는 오름차순으로 표시됩니다."
                />
              </div>
              <div>
                {!menuModify && (
                  <div onClick={menuAddHandler}>
                    <FoodButtonCP>등록</FoodButtonCP>
                  </div>
                )}
                {menuModify && (
                  <div onClick={menuEditHandler}>
                    <FoodButtonCP>수정</FoodButtonCP>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div css={foodMyFTCPScheduleStyle(isPc)}>
          <h2>
            운영 정보<span className="essential">*</span>
          </h2>
          {scheduleList.map((item, idx) => (
            <div key={item.day} style={{ marginBottom: "2rem" }}>
              <div>
                <span>
                  {item.day}요일&nbsp;&nbsp;
                  <input
                    type="checkbox"
                    checked={item.holiday}
                    onChange={(e) => handleScheduleChange(idx, "holiday", e.target.checked)}
                    id={`holiday-${item.day}`}
                  />
                </span>
                {isPc && (
                  <span
                    style={{ textAlign: "center", visibility: "hidden" }}
                    className={!item.holiday ? "disabled-food-ring" : scheduleErrors[idx]?.open ? "error-food-ring" : ""}>
                    ~
                  </span>
                )}
                <FoodInputCP
                  value={item.start}
                  onChangeHandler={(e) => handleScheduleChange(idx, "start", e.target.value)}
                  ex="영업 시작 시간 (ex: 15)"
                  className={!item.holiday ? "disabled-food-ring" : scheduleErrors[idx]?.open ? "error-food-ring" : ""}
                />
                <span style={{ textAlign: "center" }} className={!item.holiday ? "disabled-food-ring" : scheduleErrors[idx]?.open ? "error-food-ring" : ""}>
                  ~
                </span>
                <FoodInputCP
                  value={item.end}
                  onChangeHandler={(e) => handleScheduleChange(idx, "end", e.target.value)}
                  ex="영업 종료 시간 (ex: 21)"
                  className={!item.holiday ? "disabled-food-ring" : scheduleErrors[idx]?.close ? "error-food-ring" : ""}
                />
              </div>
              <div>
                <div onClick={() => item.holiday && handleAddressSearch(idx)}>
                  <FoodOutLineButtonCP color="#A47764" borderColor="--food-brown-light" className={!item.holiday ? "disabled-food-ring" : ""}>
                    주소찾기
                  </FoodOutLineButtonCP>
                </div>
                {isPc && (
                  <span
                    style={{ textAlign: "center", visibility: "hidden" }}
                    className={!item.holiday ? "disabled-food-ring" : scheduleErrors[idx]?.open ? "error-food-ring" : ""}>
                    ~
                  </span>
                )}
                <FoodInputCP
                  value={item.mapAddress}
                  lock={true}
                  ex="지도 상 주소"
                  className={!item.holiday ? "disabled-food-ring" : scheduleErrors[idx]?.address ? "error-food-ring" : ""}
                />
                {isPc && (
                  <span
                    style={{ textAlign: "center", visibility: "hidden" }}
                    className={!item.holiday ? "disabled-food-ring" : scheduleErrors[idx]?.open ? "error-food-ring" : ""}>
                    ~
                  </span>
                )}
                <FoodInputCP
                  value={item.userAddress}
                  onChangeHandler={(e) => handleScheduleChange(idx, "userAddress", e.target.value)}
                  ex="사용자 안내용 주소"
                  className={!item.holiday ? "disabled-food-ring" : scheduleErrors[idx]?.address ? "error-food-ring" : ""}
                />
              </div>
            </div>
          ))}
        </div>

        <form className="terms foodFlexHeightCenter">
          <input type="checkbox" id="terms" name="terms" />
          <label htmlFor="terms">
            <a href="/project/foodmap/terms" target="_blank" rel="noopener noreferrer">
              이용약관
            </a>{" "}
            및{" "}
            <a href="/project/foodmap/privacy-policy" target="_blank" rel="noopener noreferrer">
              개인정보처리방침
            </a>
            에 동의합니다<span className="essential">*</span>
          </label>
        </form>
        <span
          className="termsError error"
          ref={termsErrorRef}
          style={{
            display: "block",
            color: "red",
            fontSize: "0.9rem",
            margin: "0.5rem 0",
            visibility: "hidden",
          }}>
          약관에 동의해야 합니다.
        </span>
        <div className="col-full">
          <div className="axiosButton" onClick={updateSubmitHandler}>
            <FoodButtonCP>수정 신청</FoodButtonCP>
          </div>
        </div>
        <div className="col-full">
          <div className="axiosButton" onClick={ftDelecteHandler}>
            <FoodButtonCP color="--food-red">푸드트럭 삭제</FoodButtonCP>
          </div>
        </div>
      </section>

      {modalState && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setModalState(false)}>
          <div
            style={{
              background: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              padding: 0,
              zIndex: 10001,
            }}
            onClick={(e) => e.stopPropagation()}>
            <DaumPostcode style={{ width: 400, height: 500 }} onComplete={onCompletePost} />
          </div>
        </div>
      )}
      <div>
        <h2>수정 안내사항</h2>
        <p>ㆍ허위 정보 입력 시 서비스 이용이 제한될 수 있습니다.</p>
        <p>ㆍ수정 신청 후 관리자 승인까지 1~2일 소요될 수 있습니다.</p>
        <p>ㆍ문의사항은 Q&A 게시판으로 연락해주세요.</p>
      </div>
    </div>
  );
};

export default FoodMyFTCP;
