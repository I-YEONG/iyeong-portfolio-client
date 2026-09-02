import { BarumHomeLayout } from "@/layouts";
import { getTodayFormatted } from "@/utils/barum/getTodayFormatted";
import { homePageStyle } from "./Home.style";
import { BarumHomeRecordList, BarumWeatherBox } from "@/features/barum/Home/components";
import { BarumBarButton } from "@/components/barum";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const todayString = getTodayFormatted();
  const nav = useNavigate();

  return (
    <BarumHomeLayout>
      <section css={homePageStyle}>
        {/* 타이틀 박스 시작 */}
        <div className="title-box home">
          <p className="date">{todayString}</p>
          <p className="title">오늘 뭘 바를까요</p>
        </div>
        {/* 타이틀 박스 종료 */}

        {/* 날씨 박스 */}
        <BarumWeatherBox />
        <BarumBarButton clickFun={() => nav("/project/barum/routine/create/selfie")}>오늘의 루틴 받기</BarumBarButton>

        {/* 기록 */}
        <BarumHomeRecordList />
      </section>
    </BarumHomeLayout>
  );
};
export default HomePage;
