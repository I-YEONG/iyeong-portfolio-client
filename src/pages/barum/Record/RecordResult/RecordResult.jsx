import { BarumLeftButton } from "@/components/barum";
import { BarumBasicLayout } from "@/layouts";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { layoutStyle, recordResultStyle } from "./RecordResult.style";
import { BarumApplyBox, BarumCrashBox, BarumSelfieBox, BarumSkipBox, BarumResultWeatherBox } from "@/features/barum/Result/components";
import { useGetRecordDetails } from "@/features/barum/Result/hooks/useGetRecordList";
import { useDeleteDetails } from "@/features/barum/Result/hooks/useDeleteDetails";

const RecordResult = () => {
  const [searchParams] = useSearchParams();
  const y = searchParams.get("y");
  const m = searchParams.get("m");
  const d = searchParams.get("d");

  const nav = useNavigate();
  const { mutate: deleteRecord } = useDeleteDetails(`${y}-${m}-${d}`, {
    onSuccess: () => {
      nav("/project/barum/record"); // 삭제 후 뒤로가기
    },
    onError: (error) => {
      alert("삭제 중 오류가 발생했습니다.");
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteRecord();
    }
  };

  // 요일
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
  const dateObj = new Date(Number(y), Number(m) - 1, Number(d));
  const dayIndex = dateObj.getDay();
  const dayName = weekDays[dayIndex];

  const isDateValid = y && m && d;

  const formattedDate = isDateValid ? `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}` : null;

  const { data, isLoading, isError, error } = useGetRecordDetails(formattedDate, {
    enabled: !!isDateValid,
  });

  useEffect(() => {
    if (!isError || !error) return;

    const errorCode = error?.code || error?.response?.data?.code || "EXTERNAL_API_ERROR";

    if (errorCode === "BAD_REQUEST") {
      alert("기록 데이터를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.");
      return;
    }

    if (errorCode === "INVALID_SELFIE_PATH") {
      alert("셀카 경로가 올바르지 않아 이미지를 표시할 수 없어요.");
    }
  }, [isError, error]);

  return (
    <BarumBasicLayout styleObj={layoutStyle}>
      <header>
        <div className="left-box">
          <div onClick={() => nav(-1)}>
            <BarumLeftButton />
          </div>
          <p>
            {m}월 {d}일 {dayName}요일
          </p>
        </div>
        <span className="delete" onClick={handleDelete}>
          삭제
        </span>
      </header>
      <section css={recordResultStyle}>
        {/* 셀카 */}
        {!isError && (
          <BarumSelfieBox
            isLoading={isLoading}
            data={{
              img: data?.selfieUrl || "none",
              text: data?.skin?.summary || "",
            }}
          />
        )}

        {/* 날씨 */}
        {!isError && <BarumResultWeatherBox isLoading={isLoading} data={data?.weather || {}} />}

        {/* 충돌 crash */}
        {!isError && <BarumCrashBox isLoading={isLoading} data={data?.conflicts || []} />}

        {/* 바를 것 */}
        {!isError && <BarumApplyBox isLoading={isLoading} data={data?.routine?.apply || []} />}

        {/* 뺄 것 */}
        {!isError && <BarumSkipBox isLoading={isLoading} data={data?.routine?.skip || []} />}
      </section>
    </BarumBasicLayout>
  );
};
export default RecordResult;
