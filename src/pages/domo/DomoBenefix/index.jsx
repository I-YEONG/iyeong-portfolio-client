import { useCallback, useState, lazy, Suspense, useEffect } from "react";
const DomoFilter = lazy(() => import("@/features/domo/components/DomoFilter.jsx"));
// import "./style.css";

import { DomoMobileSearchModal, DomoMobileSort, DomoPagination, DomoCustomSwiper } from "@/features/domo/components";
import { DomoMainLayout } from "@/layouts";
import { useDeviceMode } from "@/hooks/useDeviceMode";
import { domoBenefixStyle } from "./style";
import { useGetDomoQuery } from "@/features/domo/hooks/useGetDomoQuery";

const ITEMS_PER_PAGE = 20; // API 페이지 사이즈에 맞춤

const DomoBenefix = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { isMobile } = useDeviceMode();

  // API 데이터 상태
  const [benefitsData, setBenefitsData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  // 모바일 더보기 상태
  const [mobileDisplayCount, setMobileDisplayCount] = useState(5);
  const [mobileApiPage, setMobileApiPage] = useState(1);

  // 검색 및 필터 상태
  const [displayValue, setDisplayValue] = useState("");
  const [sortType, setSortType] = useState("benefix");
  const [mobileSearchToggle, setMobileSearchToggle] = useState(false);

  const { data, isLoading, isError } = useGetDomoQuery(`/benefix`, {});

  // 혜택 데이터 가져오기 함수 (append 가능)
  const loadBenefits = useCallback(
    async (search = "", sort = "benefit", page = 1, append = false) => {
      if (data && data.data) {
        console.log(data.data);
        const newItems = data.data.items || [];
        setBenefitsData((prev) => (append ? [...prev, ...newItems] : newItems));
        setTotalPages(data.data.totalPages || 0);
        setCurrentPage(page - 1); // API는 1부터, 컴포넌트는 0부터
      }
    },
    [isLoading, data],
  );

  // 컴포넌트 마운트 시 초기 데이터 로드
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadBenefits("", sortType, 1, false);
    setMobileApiPage(1);
  }, [loadBenefits, sortType]);

  const handlePageClick = (event) => {
    const page = event.selected + 1; // 컴포넌트는 0부터, API는 1부터
    loadBenefits(displayValue, sortType, page, false);
  };

  const onChangeDisplayValue = useCallback(
    (value) => {
      setDisplayValue(value);
      if (!isMobile) return;
      setMobileSearchToggle(false);
    },
    [isMobile],
  );

  const onChangeFilter = (value) => {
    setSortType(value);
    // 정렬 변경 시 첫 페이지부터 다시 로드
    loadBenefits(displayValue, value, 1, false);
    setMobileApiPage(1);
    setMobileDisplayCount(5);
  };

  const onChangeMobileToggle = () => {
    setMobileSearchToggle(true);
  };

  // 모바일 더보기: 부족하면 다음 페이지를 불러와 누적
  const handleMobileLoadMore = async () => {
    // 현재 보이는 개수를 5 늘리는 시도
    const target = mobileDisplayCount + 5;

    // 현재 보유 데이터로 충분하면 카운트만 증가
    if (target <= benefitsData.length) {
      setMobileDisplayCount(target);
      return;
    }

    // 더 불러올 페이지가 있으면 다음 페이지 로드 후 증가
    if (mobileApiPage < totalPages && !isLoading) {
      const nextPage = mobileApiPage + 1;
      await loadBenefits(displayValue, sortType, nextPage, true);
      setMobileApiPage(nextPage);
      setMobileDisplayCount((prev) => prev + 5);
      return;
    }

    // 더 불러올 데이터가 없으면 보유 데이터 범위까지만 확장
    setMobileDisplayCount(Math.min(target, benefitsData.length));
  };

  // API 데이터를 UI에 맞게 변환
  const transformedData = benefitsData.map((item, index) => ({
    id: item.placeId || index,
    title: item.name || "혜택 이름",
    region: item.address || "지역 이름",
    kind: `${item.discountPercent || 0}% 할인`,
    discountPercent: item.discountPercent || 0,
    popularity: item.popularity || 0,
    address: item.address || "주소 정보 없음",
    lat: item.lat || 0,
    lng: item.lng || 0,
  }));

  // ★ 추가된 필터링 로직 ★
  // displayValue(선택한 지역이나 검색어)가 있으면 address에 포함되는지 확인
  const filteredData = displayValue ? transformedData.filter((item) => item.address && item.address.includes(displayValue)) : transformedData;

  // 표시 데이터: 필터링된 데이터를 기준으로 모바일은 슬라이스, PC는 전체
  const displayData = isMobile ? filteredData.slice(0, mobileDisplayCount) : filteredData;

  return (
    <DomoMainLayout onChangeMobileToggle={onChangeMobileToggle}>
      {/* 모바일 주소검색 */}
      {mobileSearchToggle && isMobile && (
        <DomoMobileSearchModal
          isOpen={mobileSearchToggle}
          onClose={() => setMobileSearchToggle(false)}
          onChangeDisplayValue={onChangeDisplayValue}
          displayValue={displayValue}
        />
      )}
      <section className="slider-section">
        <DomoCustomSwiper />
      </section>

      <div className="benefix-container" css={domoBenefixStyle(isMobile)}>
        <div className="benefix-title-row">
          <h2 className="benefix-title">
            <span className="span-domo-blue">도모</span>가 도와주는 혜택 모아보기!
          </h2>
          {isMobile && <DomoMobileSort value={sortType} onChange={onChangeFilter} />}
        </div>

        <Suspense fallback={<div>필터 로딩중...</div>}>
          <DomoFilter
            onChangeDisplayValue={onChangeDisplayValue}
            display={displayValue}
            onChangeFilter={onChangeFilter}
            onChangeMobileToggle={setMobileSearchToggle}
          />
        </Suspense>

        {/* 혜택 목록 */}
        <div className="benefits-list">
          {displayData.map((item) => (
            <a
              key={item.id}
              href={`https://map.naver.com/p/search/${encodeURIComponent(`${item.address || ""} ${item.title || ""}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}>
              <div className="benefit-card">
                <div className="card-tags">
                  <span className="tag-blue">{item.region}</span>
                  <span className="tag-yellow">{item.kind === "할인" ? `${item.discountPercent}% 할인` : item.kind}</span>
                </div>
                <p className="card-title">{item.title}</p>
              </div>
            </a>
          ))}
        </div>

        {/* 데이터가 없을 때 메시지 */}
        {!isLoading && displayData.length === 0 && <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>해당 지역의 검색 결과가 없습니다.</div>}

        {/* 페이지네이션 - PC에서 항상 표시 */}
        {!isMobile && <DomoPagination pageCount={Math.max(totalPages || 1, 1)} onPageChange={handlePageClick} currentPage={currentPage} />}

        {/* 모바일 더보기 버튼 - 항상 표시 */}
        {isMobile && displayData.length > 0 && (
          <div>
            <button className="m-more-button" onClick={handleMobileLoadMore} disabled={isLoading}>
              더보기
            </button>
          </div>
        )}
      </div>
    </DomoMainLayout>
  );
};

export default DomoBenefix;
