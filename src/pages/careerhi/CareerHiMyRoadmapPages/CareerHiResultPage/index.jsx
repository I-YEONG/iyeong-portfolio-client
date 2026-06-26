import { useNavigate } from "react-router-dom";
import { useDeviceMode } from "@/hooks/useDeviceMode";
import useAlertCP from "@/features/careerhi/hook/useAlertCP";
import AlertCP from "@/features/careerhi/components/_common/alertCP";
import HeaderPc from "@/layouts/careerhi/Header_PC";
import HeaderCP from "@/features/careerhi/components/_common/headerCP";
import MainContentLayout from "@/layouts/careerhi/MainLayout";
import { useEffect, useState } from "react";
import SpinnersCP from "@/features/careerhi/components/_common/spinnersCP/spinnersCP";
import { flushSync } from "react-dom";

import percentage_0 from "@/assets/careerhi/image/percentage/0.svg";
import percentage_10 from "@/assets/careerhi/image/percentage/10.svg";
import percentage_20 from "@/assets/careerhi/image/percentage/20.svg";
import percentage_30 from "@/assets/careerhi/image/percentage/30.svg";
import percentage_40 from "@/assets/careerhi/image/percentage/40.svg";
import percentage_50 from "@/assets/careerhi/image/percentage/50.svg";
import percentage_60 from "@/assets/careerhi/image/percentage/60.svg";
import percentage_70 from "@/assets/careerhi/image/percentage/70.svg";
import percentage_80 from "@/assets/careerhi/image/percentage/80.svg";
import percentage_90 from "@/assets/careerhi/image/percentage/90.svg";
import percentage_100 from "@/assets/careerhi/image/percentage/100.svg";

import portfolio_img from "@/assets/careerhi/image/portfolio.png";
import ButtonCP from "@/features/careerhi/components/_common/buttonCP";
import { useAuth } from "@/hooks/useAuth";
import { useGetCareerHiQuery } from "@/features/careerhi/hook/useGetCareerHiQuery";

const CareerHiResultPage = () => {
  const percentageImages = {
    0: percentage_0,
    10: percentage_10,
    20: percentage_20,
    30: percentage_30,
    40: percentage_40,
    50: percentage_50,
    60: percentage_60,
    70: percentage_70,
    80: percentage_80,
    90: percentage_90,
    100: percentage_100,
  };
  const getPercentageKey = (rate) => {
    const n = Number(rate) || 0;
    return Math.max(0, Math.min(100, Math.round(n / 10) * 10));
  };
  const getRoundedTensPercent = (value) => {
    const n = Number(value) || 0;
    return Math.max(0, Math.min(100, Math.round(n / 10) * 10));
  };
  const { isPc } = useDeviceMode();
  const nav = useNavigate();

  // Alert 관련 상태
  const [isAlertOpen, alertTitleText, alertButtonText, setAlertTitleText, setAlertButtonText, closeAlert, openAlert] = useAlertCP();

  const [alertUrl, setAlertUrl] = useState(null);

  const { isLogin, login } = useAuth();
  const {
    data: reportData,
    isLoading: loading,
    isError: error,
  } = useGetCareerHiQuery(`/roadmap/result/${new URLSearchParams(window.location.search).get("report_id")}`, {
    enabled: !!isLogin, // 로그인 상태일 때만 쿼리 실행
  });

  useEffect(() => {
    if (!isLogin) {
      setAlertTitleText("로그인이 필요합니다.");
      setAlertButtonText("로그인/회원가입");
      openAlert();
    } else {
      const reportId = new URLSearchParams(window.location.search).get("report_id");
      if (!reportId) {
        flushSync(() => {
          setAlertTitleText("올바르지 않은 접근입니다.");
          setAlertButtonText("로드맵 보관함으로 이동");
          setAlertUrl("/project/careerhi/roadmap/list");
        });
        openAlert();
        return;
      }
    }
    if (error) {
      nav("/project/careerhi/roadmap/list");
      return alert("ID또는 백엔드가 다릅니다.\n로드맵 ID를 확인 후 다시 시도해주세요.");
    }
  }, [isLogin, openAlert, setAlertButtonText, setAlertTitleText]);

  const getTargetJobLabel = (targetJob) => {
    const map = {
      IT_DATA: "IT/데이터",
    };

    return map[targetJob] || targetJob;
  };

  const onReportDeleteHandler = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?\n삭제된 로드맵은 복구할 수 없습니다.")) {
      return;
    }

    //   const targetReportId = reportData?.reportId || roadmapReportId;
    //   if (!targetReportId) {
    //     alert("삭제할 리포트 정보를 찾을 수 없습니다.");
    //     return;
    //   }

    //   const deleteResult = await api_reportDelete(targetReportId);
    //   if (!deleteResult?.success) {
    //     alert(deleteResult?.message || "로드맵 삭제에 실패했습니다.");
    //     return;
    //   }

    //   alert(deleteResult?.message || "로드맵이 삭제되었습니다.");
    alert("데이터 삭제 로직입니다.\n실제 삭제는 동작하지 않았습니다.");
    nav("/project/careerhi/roadmap/list");
  };

  return (
    <div>
      {isAlertOpen && (
        <AlertCP
          titleText={alertTitleText}
          buttonText={alertButtonText}
          closeButton={closeAlert}
          okButton={() => {
            closeAlert();
            if (alertUrl) {
              nav(alertUrl);
            }
            login();
          }}
        />
      )}
      <div className="w-full h-full bg-white" style={isAlertOpen ? { position: "absolute", top: 0, left: 0 } : {}}>
        <div className="fixed hidden w-full h-fit md:block z-999">
          <HeaderPc />
        </div>
        {!isPc && <HeaderCP>로드맵 보관함</HeaderCP>}
        <div className="">
          <MainContentLayout page="roadmap_list" fixed={true} scroll={true} footer={true}>
            {loading && isLogin && <SpinnersCP height={isPc ? "calc(100vh - 5.125rem - 10.25rem)" : "calc(100vh - 22px - 32px)"} size="26" />}

            {/* 콘텐츠 - 시작 */}
            {!loading && isLogin && reportData && (
              <section className="w-full h-full">
                <p className="text-orange-400 text-end B4">
                  {isPc && "AI를 통해 최신 공고를 분석해 만든 결과로 실제와 차이가 있을 수 있습니다."}
                  {!isPc && "AI를 통해 만들어진 결과로 실제와 차이가 있을 수 있습니다."}
                </p>

                {/* 그래프 - 시작 */}
                <div className="relative w-full my-24">
                  <p className="mx-auto leading-8 text-center w-fit H2_bold">
                    {reportData.userName}님은 <span className="text-point-main">{getTargetJobLabel(reportData.targetJob)}</span>직군에
                    <br />
                    필요한 역량을 {reportData.matchRate}% 갖추었네요!
                  </p>
                  <div
                    style={{ backgroundPositionY: "-50%", backgroundImage: `url(${percentageImages[getPercentageKey(reportData.matchRate)]})` }}
                    className="mx-auto bg-no-repeat bg-cover w-full sm:w-6/10 h-65 sm:h-80 bg-[radial-gradient(circle, transparent_50%,white_100%)]"></div>
                  <div className="break-keep mt-4 p-6 text-gray-500 B3 leading-4.5 rounded-lg bg-gray-100">{reportData.overallComment}</div>
                </div>
                {/* 그래프 - 끝 */}

                {/* 자격증 - 시작 */}
                <div className="my-26">
                  <h2 className="H2_bold">{reportData.certificateAnalysis.title}</h2>
                  {/* 자격증 리스트 */}
                  <div className="flex flex-wrap gap-4 my-12 sm:gap-6">
                    {/* 보유 중 */}
                    {reportData.certificateAnalysis?.preferred?.map((item, idx) => (
                      <div className="h-18 sm:h-22 px-9 border rounded-lg border-point-sub  flexCenter bg-[#FFF1F5] text-point-sub-bold font-bold" key={idx}>
                        {item}
                      </div>
                    ))}
                    {/* 미보유 */}
                    {reportData.certificateAnalysis?.required?.map((item, idx) => (
                      <div className="border border-gray-300 rounded-lg h-18 sm:h-22 px-9 flexCenter" key={idx}>
                        {item}
                      </div>
                    ))}
                  </div>
                  {/* 업계 동향, 방향성 */}
                  <div className="p-4 my-4 leading-5 bg-gray-100">
                    <p className="mb-3 font-bold text-point-main">업계 동향</p>
                    <div className="text-gray-500 B3 break-keep">{reportData.certificateAnalysis.industryTrend || "내용이 존재하지 않습니다."}</div>
                  </div>
                  <div className="my-4 p-4 bg-[#FFF8FA] leading-5">
                    <p className="mb-3 font-bold text-point-sub-bold">방향성 코칭</p>
                    <div className="text-gray-600 B3 break-keep">{reportData.certificateAnalysis.coaching || "내용이 존재하지 않습니다."}</div>
                  </div>
                </div>
                {/* 자격증 - 끝 */}

                {/* 취업시장 - 시작 */}
                <div className="my-26">
                  <h2 className="H2_bold">{reportData.awardAnalysis.title}</h2>
                  {/* 차트 - 시작 */}
                  <div>
                    {reportData.awardAnalysis.charts.map((chart, idx) => (
                      <div key={idx} className="flex flex-col my-12 gap-y-4">
                        {/* 그래프 */}
                        <div className="relative flex flex-row gap-4 min-h-18">
                          <div
                            style={{ flexBasis: `${getRoundedTensPercent(chart.userPercent)}%` }}
                            className="flex items-center p-6 text-white rounded-lg bg-point-main">
                            {chart.userPercent}%
                          </div>
                          <div
                            style={{ flexBasis: `${getRoundedTensPercent(chart.otherPercent)}%` }}
                            className="rounded-lg bg-[#F0F9EB] p-6 flex items-center text-gray-500">
                            {chart.otherPercent}%
                          </div>
                        </div>
                        {/* 설명 */}
                        <div className="flex gap-4">
                          <div className="flex gap-1">
                            <div className="w-3 h-3 rounded-full bg-point-main"></div>
                            <span className="B3">{chart.label}</span>
                          </div>
                          <div className="flex gap-1">
                            <div className="rounded-full h-3 w-3 bg-[#d9edcf]"></div>
                            <span className="B3">해당 없음</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* 차트 - 끝 */}
                  <div className="p-4 my-4 leading-5 text-gray-500 bg-gray-100">
                    <p className="mb-3 font-bold text-point-main">업계 동향</p>
                    <div className="B3 ">{reportData.awardAnalysis.industryTrend.summary || "내용이 존재하지 않습니다."}</div>
                    <ul className="pl-5 mt-2 list-disc list-inside">
                      {reportData.awardAnalysis.industryTrend.details?.map((detail, idx) => (
                        <li className="text-gray-500 B3 bullet-list" key={idx} style={{ listStyleType: "disc", display: "list-item" }}>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="my-4 p-4 bg-[#FFF8FA] leading-5 text-gray-600">
                    <p className="mb-3 font-bold text-point-sub-bold">방향성 코칭</p>
                    <div className="B3">{reportData.awardAnalysis.coaching.summary || "내용이 존재하지 않습니다."}</div>
                    <ul className="pl-5 mt-2 list-disc list-inside">
                      {reportData.awardAnalysis.coaching.details?.map((detail, idx) => (
                        <li className="B3 bullet-list" key={idx} style={{ listStyleType: "disc", display: "list-item" }}>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* 취업시장 - 끝 */}

                {/* 필수 수택 - 시작 */}
                <div className="my-26">
                  <h2 className="my-12 H2_bold">{reportData.skillGap.title}</h2>
                  {/* 스택 */}
                  <div className="flex flex-col gap-6">
                    {reportData.skillGap.items.map((item, idx) => (
                      <div className="flex gap-4 min-h-20 sm:min-h-24" key={idx}>
                        <div className="min-w-24.5 basis-2/10 flexCenter flex-col gap-1 p-4 rounded-lg bg-[#EAFFE5] border border-[#38D255] text-[#38D255]">
                          <p className="text-center B3_bold break-keep">{item.badgeTitle}</p>
                          {item.badgeValue !== "상" && item.badgeValue !== "중" && item.badgeValue !== "하" ? (
                            <p className="B3">{item.badgeValue}</p>
                          ) : (
                            <p className="B4">
                              <span className={`${item.badgeValue === "하" ? "B3_bold" : "B4"}`}>하</span> /{" "}
                              <span className={`${item.badgeValue === "중" ? "B3_bold" : "B4"}`}>중</span> /{" "}
                              <span className={`${item.badgeValue === "상" ? "B3_bold" : "B4"}`}>상</span>
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col gap-4 p-4 bg-gray-100 rounded-lg basis-8/10">
                          <p className="B3_bold text-point-main">{item.contentTitle}</p>
                          <p className="leading-5 text-gray-500 B3 break-keep ">{item.contentDescription}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* 필수 수택 - 끝 */}

                {/* 포트폴리오 - 시작 */}
                <div>
                  <h2 className="text-center H2_bold mt-30">{reportData.portfolioAnalysis.title}</h2>

                  <img src={portfolio_img} alt="포트폴리오 분석 결과 이미지" className="mx-auto my-12 w-45 h-45" />

                  <div className="p-4 my-4 leading-5 text-gray-500 bg-gray-100">
                    <p className="mb-3 font-bold text-point-main">분석 결과</p>
                    <div className="B3 ">{reportData.portfolioAnalysis.analysisResult || "내용이 존재하지 않습니다."}</div>
                  </div>
                  <div className="my-4 p-4 bg-[#FFF8FA] leading-5 text-gray-600">
                    <p className="mb-3 font-bold text-point-sub-bold">피드백</p>

                    <ul className="pl-5 mt-2 list-disc list-inside">
                      {reportData.portfolioAnalysis.feedbackList?.map((detail, idx) => (
                        <li className="B3 bullet-list" key={idx} style={{ listStyleType: "disc", display: "list-item" }}>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* 포트폴리오 - 끝 */}

                <div className="flex items-end justify-end w-full gap-6 mb-32 mt-22">
                  <span onClick={onReportDeleteHandler} className="p-2 cursor-pointer B4 text-point-sub-bold">
                    로드맵 삭제
                  </span>
                  <div className="w-1/2 sm:w-2/10" onClick={() => nav("/project/careerhi/roadmap/list")}>
                    <ButtonCP bg="bg-point-text" color="text-white">
                      히스토리 열람
                    </ButtonCP>
                  </div>
                </div>
              </section>
            )}
            {/* 콘텐츠 - 끝 */}
          </MainContentLayout>
        </div>
      </div>
    </div>
  );
};
export default CareerHiResultPage;
