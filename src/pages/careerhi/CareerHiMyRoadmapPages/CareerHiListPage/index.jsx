import { useNavigate } from "react-router-dom";
import AlertCP from "@/features/careerhi/components/_common/alertCP";
import HeaderCP from "@/features/careerhi/components/_common/headerCP";
import { useDeviceMode } from "@/hooks/useDeviceMode";
import MainContentLayout from "@/layouts/careerhi/MainLayout";
import useAlertCP from "@/features/careerhi/hooks/useAlertCP";
import HeaderPc from "@/layouts/careerhi/Header_PC";
import RoadmapChartCP from "@/features/careerhi/components/roadmapCP/roadmapChartCP";
import { useEffect } from "react";
import SpinnersCP from "@/features/careerhi/components/_common/spinnersCP/spinnersCP";
import ButtonCP from "@/features/careerhi/components/_common/buttonCP";
import MainLayout from "@/layouts/careerhi";
import { useAuth } from "@/hooks/useAuth";
import { useGetCareerHiQuery } from "@/features/careerhi/hooks/useGetCareerHiQuery";

const CareerHiListPage = () => {
  const { isPc } = useDeviceMode();
  const nav = useNavigate();
  const { isLogin, login } = useAuth();

  const {
    data: resData,
    isLoading: loading,
    isError: error,
  } = useGetCareerHiQuery("/roadmap/list", {
    enabled: !!isLogin, // 로그인 상태일 때만 쿼리 실행
  });

  // Alert 관련 상태
  const [isAlertOpen, alertTitleText, alertButtonText, setAlertTitleText, setAlertButtonText, closeAlert, openAlert] = useAlertCP();

  // 스펙 클릭 핸들러
  const onClickGotoReports = (reportId) => {
    nav(`/project/careerhi/roadmap/result?report_id=${reportId}`);
  };

  // 로그인 체크 및 데이터 로드

  // 로그인되지 않았을 때 알림 처리
  useEffect(() => {
    if (!isLogin) {
      setAlertTitleText("로그인이 필요합니다.");
      setAlertButtonText("로그인/회원가입");
      openAlert();
    } else {
      closeAlert();
    }
  }, [isLogin, setAlertTitleText, setAlertButtonText, openAlert, closeAlert]);

  // 데이터 가공 (useState와 useEffect 삭제)
  const listData = resData?.reportHistory || [];
  const graphData = resData?.growthChart
    ? {
        date: resData.growthChart.map((item) => item.date),
        rate: resData.growthChart.map((item) => item.matchRate),
      }
    : { date: [], rate: [] };
  const chartAnalysis = resData?.chartAnalysis || "";

  // 에러 처리 (로그인 상태인데 에러가 났을 때)
  useEffect(() => {
    if (isLogin && error) {
      setAlertTitleText("로드맵 목록을 불러오지 못했습니다.");
      setAlertButtonText("확인");
      openAlert();
    }
  }, [isLogin, error, setAlertTitleText, setAlertButtonText, openAlert]);

  return (
    <div>
      {isAlertOpen && (
        <AlertCP
          titleText={alertTitleText}
          buttonText={alertButtonText}
          okButton={() => {
            closeAlert();
            login();
          }}
        />
      )}
      <div className="w-full h-full" style={isAlertOpen ? { position: "absolute", top: 0, left: 0 } : {}}>
        <div className="fixed hidden w-full h-fit md:block z-999">
          <HeaderPc />
        </div>
        <MainLayout mobile_block={true} page="roadmap_list">
          {!isPc && <HeaderCP>로드맵 보관함</HeaderCP>}
          <div className="">
            <MainContentLayout page="roadmap_list" fixed={true} scroll={true} footer={true}>
              {loading && <SpinnersCP height={isPc ? "calc(100vh - 5.125rem - 10.25rem)" : "calc(100vh - 22px - 32px)"} size="26" />}
              {!loading && isLogin && <RoadmapChartCP data={graphData} />}
              {!loading && isLogin && (
                <div className="w-full p-5.25 mt-8 mb-18 bg-gray-100 rounded-lg">
                  <p className="mb-4 B2 text-point-main">그래프 분석</p>
                  <p className="text-gray-500 B3">{chartAnalysis || "아직 분석 내용이 없습니다."}</p>
                </div>
              )}

              {!loading && isLogin && (
                <div>
                  <p className="mb-4 H2_bold">이전 로드맵</p>
                  {listData.length === 0 && <div className="w-full px-5.25 B3 text-gray-500">생성된 로드맵이 없습니다.</div>}
                  {listData.length !== 0 &&
                    listData.map((data, index) => (
                      <div
                        key={index}
                        className="relative flex flex-wrap items-center justify-between w-full p-4 mb-6 bg-gray-100 rounded-lg h-fit sm:h-full sm:p-8">
                        <div className="flex flex-col justify-between gap-2 h-fit sm:h-full">
                          <p className="font-bold">
                            사용자ㆍ{data.title?.split(" - ")?.[1] || data.title}ㆍ{data.matchRate}점
                          </p>
                          <p className="B4 text-point-main">{data.date}</p>
                        </div>
                        <div onClick={() => onClickGotoReports(data.reportId)} className="">
                          <ButtonCP bg="bg-point-main" color="text-white">
                            보고서{isPc && " 다시 보기"}
                            {/* FIXME: 보고서 다시보기 만들기 */}
                          </ButtonCP>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </MainContentLayout>
          </div>
        </MainLayout>
      </div>
    </div>
  );
};
export default CareerHiListPage;
