import { BarumHomeLayout } from "@/layouts";
import { BarumRecordRecordList } from "@/features/barum/Record/components";
import { recordPageStyle } from "./RecordList.style";

const RecordList = () => {
  return (
    <BarumHomeLayout>
      <section css={recordPageStyle}>
        {/* 타이틀 박스 시작 */}
        <div className="title-box record">
          <p className="title">기록</p>
          <p className="date">최대 15일</p>
        </div>

        {/* 기록 */}
        <BarumRecordRecordList />
      </section>
    </BarumHomeLayout>
  );
};
export default RecordList;
