import { homeRecordListStyle } from "./HomeRecordList.stlye";
import { useNavigate } from "react-router-dom";
import { useGetHomeRecord } from "../../hooks/useGetHomeRecord";
import { BarumRecordList } from "@/features/barum/Record/components";
import RecordList from "@/pages/barum/Record/RecordList/RecordList";

const HomeRecordList = () => {
  const {
    data: listData,
    isLoading: isListDataLoading,
    isError: isListDataError,
  } = useGetHomeRecord({
    // enabled: !!selectedUniv,
  });

  const nav = useNavigate();
  return (
    <section css={homeRecordListStyle}>
      <div className="title-box">
        <span className="title">최근 기록</span>
        <span className="button" onClick={() => nav("/project/barum/record")}>
          전체 보기
        </span>
      </div>
      {/* 리스트 */}
      <RecordList listData={listData} isLoading={isListDataLoading} isError={isListDataError} skeletonCount={2} />
    </section>
  );
};
export default HomeRecordList;
