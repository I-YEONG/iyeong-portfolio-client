/** @jsxImportSource @emotion/react */
import { useEffect, useState, useRef, useCallback } from "react";
import { useDeviceMode } from "@/hooks/useDeviceMode";

// Emotion 스타일 임포트
import { foodMapPageMainStyle, foodMapContainerStyle } from "./style";
import { useInput } from "@/hooks/useInput";
import { FoodMobileCP, FoodPcCP } from "@/features/food/components";
import { useAuth } from "@/hooks/useAuth";
import { useGetFoodQuery } from "@/features/food/hooks/useGetFoodQuery";

// ✅ [추가] 서울역 고정 좌표 상수 선언
const SEOUL_STATION = {
  lat: 37.555946,
  lng: 126.972317,
};

// 주소 -> 좌표 변환 (Promise)
const addressToCoords = (address) => {
  return new Promise((resolve, reject) => {
    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) return reject("Kakao map not loaded");
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, function (result, status) {
      if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
        resolve({ lat: parseFloat(result[0].y), lng: parseFloat(result[0].x) });
      } else {
        reject("주소 변환 실패: " + address);
      }
    });
  });
};

// 좌표 -> 주소 변환 (Promise)
const coordsToAddress = (lat, lng) => {
  return new Promise((resolve, reject) => {
    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) return reject("Kakao map not loaded");
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.coord2Address(lng, lat, function (result, status) {
      if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
        resolve(result[0].address.address_name);
      } else {
        reject("좌표 변환 실패: " + lat + "," + lng);
      }
    });
  });
};

// schedule 배열을 주소->좌표 변환하여 lat/lng 필드 추가 (비동기)
const enrichScheduleWithCoords = async (scheduleArr) => {
  const newArr = await Promise.all(
    scheduleArr.map(async (item) => {
      if (item.mapAddress && (!item.lat || !item.lng)) {
        try {
          const coords = await addressToCoords(item.mapAddress);
          return { ...item, lat: coords.lat, lng: coords.lng };
        } catch {
          return item;
        }
      }
      return item;
    }),
  );
  return newArr;
};

// schedule 배열을 좌표->주소 변환하여 mapAddress 필드 추가 (비동기)
const enrichScheduleWithAddress = async (scheduleArr) => {
  const newArr = await Promise.all(
    scheduleArr.map(async (item) => {
      if (item.lat && item.lng && !item.mapAddress) {
        try {
          const address = await coordsToAddress(item.lat, item.lng);
          return { ...item, mapAddress: address };
        } catch {
          return item;
        }
      }
      return item;
    }),
  );
  return newArr;
};

const FoodMapPage = () => {
  const { isPc } = useDeviceMode(); // isPc를 삼항연산자 및 분기 처리에 사용
  // ✅ [수정] 기본 중심 좌표를 서울역 좌표로 변경
  const defaultCenterRef = useRef({
    lat: SEOUL_STATION.lat,
    lng: SEOUL_STATION.lng,
  });
  const [ftData, setFtData] = useState();
  const mapRef = useRef(null);
  const mapTypeControlRef = useRef(null);
  const [filter, onChangeFilter, setFilter] = useInput("");
  const [details, setDetails] = useState([]);
  const [onDetails, setOnDetails] = useState(false);

  // ✅ [핵심] 백엔드에서 20개 더미데이터(data)를 받아옴
  const { data, isLoading, isError } = useGetFoodQuery(`/map`, {
    // enabled: !!selectedUniv,
  });

  // ✅ [수정] onChangeFtData 및 다른 로직에서 사용되므로 위쪽에 선언
  const onChangeMapGPS = useCallback((gps) => {
    if (!mapRef.current || !gps) return;
    const center = new window.kakao.maps.LatLng(gps.lat, gps.lng);
    mapRef.current.setCenter(center);
  }, []);

  const getMapInfo = useCallback(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    const center = map.getCenter();
    // ✅ useRef 객체의 current 속성을 변경하므로 React Compiler 에러 발생하지 않음
    defaultCenterRef.current.lat = center.getLat();
    defaultCenterRef.current.lng = center.getLng();
  }, []);

  const { isLogin } = useAuth();

  const onDeleteLike = useCallback(
    (ftId) => {
      if (!isLogin) return alert("로그인 후 이용해주세요.");
      if (!ftId) return console.error("푸드트럭 ID가 없습니다.");

      // 1) 상세 보기(details) 상태 변경
      setDetails((prev) => ({ ...prev, like: false }));

      // 2) 전체 목록(ftData) 상태도 함께 동기화
      setFtData((prev) => prev?.map((item) => (item.truckId === ftId ? { ...item, like: false } : item)));
    },
    [isLogin],
  );

  const onAddSms = useCallback(
    (ftId, day) => {
      if (!isLogin) return alert("로그인 후 이용해주세요.");
      if (!ftId || !day) return console.error("푸드트럭 ID 또는 요일이 없습니다.");

      // 1) 상세 보기(details) 일정 업데이트
      setDetails((prev) => {
        const updatedSchedule = prev.schedule.map((sch) => (sch.day === day ? { ...sch, sms: true } : sch));
        return { ...prev, schedule: updatedSchedule };
      });

      // 2) 전체 목록(ftData) 일정 동기화
      setFtData((prev) =>
        prev?.map((item) => {
          if (item.truckId === ftId) {
            const updatedSchedule = item.schedule.map((sch) => (sch.day === day ? { ...sch, sms: true } : sch));
            return { ...item, schedule: updatedSchedule };
          }
          return item;
        }),
      );
    },
    [isLogin],
  );

  const onDeleteSms = useCallback(
    (ftId, day) => {
      if (!isLogin) return alert("로그인 후 이용해주세요.");
      if (!ftId || !day) return console.error("푸드트럭 ID 또는 요일이 없습니다.");

      // 1) 상세 보기(details) 일정 업데이트
      setDetails((prev) => {
        const updatedSchedule = prev.schedule.map((sch) => (sch.day === day ? { ...sch, sms: false } : sch));
        return { ...prev, schedule: updatedSchedule };
      });

      // 2) 전체 목록(ftData) 일정 동기화
      setFtData((prev) =>
        prev?.map((item) => {
          if (item.truckId === ftId) {
            const updatedSchedule = item.schedule.map((sch) => (sch.day === day ? { ...sch, sms: false } : sch));
            return { ...item, schedule: updatedSchedule };
          }
          return item;
        }),
      );
    },
    [isLogin],
  );

  const onAddLike = useCallback(
    (ftId) => {
      if (!isLogin) return alert("로그인 후 이용해주세요.");
      if (!ftId) return console.error("푸드트럭 ID가 없습니다.");

      // 1) 상세 보기(details) 상태 변경
      setDetails((prev) => ({ ...prev, like: true }));

      // 2) 전체 목록(ftData) 상태도 함께 동기화
      setFtData((prev) => prev?.map((item) => (item.truckId === ftId ? { ...item, like: true } : item)));
    },
    [isLogin],
  );

  // ✅ [수정] onChangeMapGPS가 이미 위에서 선언되었으므로 정상 접근 및 의존성 배열 적용 가능
  const onChangeFtData = useCallback(
    (dataArr) => {
      if (!dataArr || !Array.isArray(dataArr) || dataArr.length === 0) return;
      const today = new Date().getDay();
      const dayMap = ["일", "월", "화", "수", "목", "금", "토"];
      if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) return;
      const geocoder = new window.kakao.maps.services.Geocoder();
      const map = mapRef.current;
      const center = map ? map.getCenter() : new window.kakao.maps.LatLng(defaultCenterRef.current.lat, defaultCenterRef.current.lng);

      let pending = 0;
      let total = 0;
      const resultArr = [...dataArr];

      resultArr.sort((a, b) => {
        const todayA = a.schedule.find((sch) => sch.day === dayMap[today]);
        const todayB = b.schedule.find((sch) => sch.day === dayMap[today]);
        if (todayA && todayB) {
          if (todayA.holiday === todayB.holiday) return 0;
          if (todayA.holiday) return -1;
          return 1;
        }
        return 0;
      });

      resultArr.forEach((item, idx) => {
        const todaySchedule = item.schedule.find((sch) => sch.day === dayMap[today] && sch.holiday && sch.mapAddress && sch.mapAddress.trim() !== "");
        if (!todaySchedule) return;
        total++;
        geocoder.addressSearch(todaySchedule.mapAddress, function (result, status) {
          if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
            const lat = parseFloat(result[0].y);
            const lng = parseFloat(result[0].x);
            const itemLatLng = new window.kakao.maps.LatLng(lat, lng);
            const polyline = new window.kakao.maps.Polyline({
              path: [center, itemLatLng],
            });
            const distance = polyline.getLength();
            resultArr[idx] = {
              ...item,
              coords: { lat, lng },
              distance,
            };
            if (map) {
              const marker = new window.kakao.maps.Marker({
                map,
                position: itemLatLng,
                title: item.name,
                clickable: true,
              });

              window.kakao.maps.event.addListener(marker, "click", function () {
                onChangeMapGPS({ lat, lng });
                setDetails({
                  name: item.name,
                  category: item.category,
                  intro: item.intro,
                  schedule: item.schedule,
                  menu: item.menu,
                  review: item.review,
                  truckId: item.truckId,
                  like: item.like,
                  imageUrl: item.imageUrl,
                });
                setOnDetails(true);
              });
            }
          }
          pending++;
          if (pending === total) {
            const sortedArr = [...resultArr].sort((a, b) => {
              if (typeof a.distance === "number" && typeof b.distance === "number") {
                return a.distance - b.distance;
              }
              return 0;
            });
            setFtData(sortedArr);
          }
        });
      });
    },
    [onChangeMapGPS],
  );

  // ✅ [수정] 백엔드 API로부터 받은 'data'를 기반으로 필터링 처리
  const onChangeFilterFun = useCallback(() => {
    if (!data || !Array.isArray(data)) return;
    let filteredData = data;
    if (filter && filter !== "") {
      filteredData = data.filter((item) => item.category === filter);
    }
    onChangeFtData(filteredData);
  }, [filter, data, onChangeFtData]);

  // ✅ [수정] 백엔드에서 데이터(data)를 성공적으로 받아오면 바로 지도 마커 및 목록을 업데이트
  useEffect(() => {
    if (mapRef.current && data) {
      onChangeFilterFun();
    }
  }, [data, onChangeFilterFun]);

  useEffect(() => {
    onChangeFilterFun();
  }, [mapRef, onChangeFilterFun]);

  useEffect(() => {
    onChangeFilterFun();
  }, [filter, onChangeFilterFun]);

  useEffect(() => {
    // if (!window.kakao || !window.kakao.maps || !mapRef.current) return;
    // const map = mapRef.current;
    // const handleCenterChanged = () => {
    //   getMapInfo();
    // };
    // window.kakao.maps.event.addListener(
    //   map,
    //   "center_changed",
    //   handleCenterChanged
    // );
    // return () => {
    //   window.kakao.maps.event.removeListener(
    //     map,
    //     "center_changed",
    //     handleCenterChanged
    //   );
    // };
  }, [getMapInfo]);

  // ✅ [수정] 사용자 GPS 조회 로직을 제거하고 무조건 서울역 좌표로 지도를 생성하도록 수정
  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) return;
    const container = document.getElementById("map");
    if (!container) return;

    const createMap = (center) => {
      mapRef.current = new window.kakao.maps.Map(container, {
        center,
        level: 3,
      });
      mapTypeControlRef.current = new window.kakao.maps.MapTypeControl();
      mapRef.current.addControl(mapTypeControlRef.current, window.kakao.maps.ControlPosition.TOPRIGHT);
      if (window.kakao.maps.RoadviewMarker) {
        const marker = new window.kakao.maps.RoadviewMarker({
          position: center,
        });
        marker.setRange(100);
        mapRef.current.addOverlay(marker);
      }
      onChangeFilterFun();
    };

    // 무조건 서울역 좌표를 기준으로 설정
    const seoulStationCenter = new window.kakao.maps.LatLng(SEOUL_STATION.lat, SEOUL_STATION.lng);
    createMap(seoulStationCenter);

    // 마커도 서울역 위치에 표시
    const imageSrc = "https://hiqyqzmyoxafmrrspntv.supabase.co/storage/v1/object/public/iyeong-portfolio-file-bucket/foodmap/myLocation.png ";
    const imageSize = new window.kakao.maps.Size(30, 43);
    const imageOption = { offset: new window.kakao.maps.Point(27, 69) };
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    const marker = new window.kakao.maps.Marker({
      position: seoulStationCenter,
      image: markerImage,
      title: "서울역 위치",
    });
    marker.setMap(mapRef.current);
  }, [onChangeFilterFun]);

  // ✅ [수정] 현위치 버튼 클릭 시 사용자 GPS를 조회하지 않고 서울역 좌표로 이동하도록 변경
  const currentLocationButton = () => {
    if (!window.kakao || !window.kakao.maps || !mapRef.current) return;

    const center = new window.kakao.maps.LatLng(SEOUL_STATION.lat, SEOUL_STATION.lng);
    mapRef.current.setCenter(center);

    if (ftData && ftData.length > 0) {
      onChangeFtData(ftData);
    }
  };

  const categoryList = [
    { value: "분식", data: "분식 (어묵, 떡볶이, 순대)" },
    { value: "간식", data: "간식 (붕어빵, 타코야끼, 크레페, 츄러스, 와플)" },
    { value: "튀김", data: "튀김 (감자튀김, 치즈볼, 오징어튀김, 새우튀김)" },
    { value: "꼬치", data: "꼬치 (닭꼬치, 소시지꼬치)" },
    {
      value: "샌드위치/토스트",
      data: "샌드위치/토스트 (샌드위치, 토스트, 버거)",
    },
    {
      value: "디저트/음료",
      data: "디저트/음료 (아이스크림, 커피, 음료, 팥빙수)",
    },
    { value: "식사", data: "식사 (덮밥, 초밥)" },
    { value: "기타", data: "기타" },
  ];

  const onClickRelay = useCallback(() => {
    onChangeFtData(ftData);
  }, [ftData, onChangeFtData]);

  const onDeleteDetails = useCallback(() => {
    setOnDetails(false);
    setDetails([]);
  }, []);

  const onSetDetails = useCallback(
    (data) => {
      setDetails({
        name: data.name,
        category: data.category,
        intro: data.intro,
        schedule: data.schedule,
        menu: data.menu,
        review: data.review,
        truckId: data.truckId,
        like: data.like,
        imageUrl: data.imageUrl,
      });
      setOnDetails(true);
      onChangeMapGPS({ lat: data.coords.lat, lng: data.coords.lng });
    },
    [onChangeMapGPS],
  );

  return (
    <div css={foodMapPageMainStyle(isPc)}>
      {isPc ? (
        <FoodPcCP
          currentLocationButton={currentLocationButton}
          filter={filter}
          onChangeFilter={onChangeFilter}
          categoryList={categoryList}
          ftData={ftData}
          onClickRelay={onClickRelay}
          onDeleteDetails={onDeleteDetails}
          onSetDetails={onSetDetails}
          details={details}
          onDetails={onDetails}
          onDeleteLike={onDeleteLike}
          onAddLike={onAddLike}
          onDeleteSms={onDeleteSms}
          onAddSms={onAddSms}
          isLogin={isLogin}
        />
      ) : (
        <FoodMobileCP
          currentLocationButton={currentLocationButton}
          filter={filter}
          onChangeFilter={onChangeFilter}
          categoryList={categoryList}
          ftData={ftData}
          onClickRelay={onClickRelay}
          onDeleteDetails={onDeleteDetails}
          onSetDetails={onSetDetails}
          details={details}
          onDetails={onDetails}
          onDeleteLike={onDeleteLike}
          onAddLike={onAddLike}
          onDeleteSms={onDeleteSms}
          onAddSms={onAddSms}
          isLogin={isLogin}
        />
      )}
      {/* 지도 */}
      <div id="map" css={foodMapContainerStyle(isPc)}></div>
    </div>
  );
};

export default FoodMapPage;
