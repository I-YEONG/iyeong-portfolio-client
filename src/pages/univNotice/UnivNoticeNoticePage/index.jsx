import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeviceMode } from "@/hooks/useDeviceMode";
import { useAuth } from "@/hooks/useAuth";
import UnivNoticeHeader from "@/layouts/univNotice/UnivNoticeHeader";
import { UnivNoticeNoticeListLiCP, UnivNoticeNoticeListLiMobileCP } from "@/features/univNotice/components";
import { useGetUnivNoticeQuery } from "@/features/univNotice/hooks/useGetUnivNoticeQuery";

import "./style.css";

const UnivNoticeNoticePage = () => {
  const nav = useNavigate();
  const [paging, setPaging] = useState(0);
  const [alarmOnly, setAlarmOnly] = useState(false);

  const { isPc, isMobile } = useDeviceMode();
  const { isLogin, login } = useAuth();
  console.log(isLogin);
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const isSameDay = (a, b) => a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();

  const { data: demoData, isLoading: isDemoDataLoading } = useGetUnivNoticeQuery(`/notice`, {});

  useEffect(() => {
    if (!isLogin) {
      login();
    }
  }, [isLogin, login]);

  // 💡 [수정됨] 안전한 데이터 참조
  const noticeData = demoData || [];

  // 💡 [수정됨] useState 제거! 파생 상태 적용
  // paging이 바뀔 때마다 아래 변수들이 새롭게 계산되어 자동으로 타이틀과 목록이 바뀝니다.
  const univnoticeTitle = noticeData[paging]?.category || "";
  const base = noticeData[paging]?.Notices || [];
  const pagingData = alarmOnly ? base.filter((d) => (d.NoticeKeywordMatches?.length || 0) > 0) : base;

  return (
    <div className="noticePageOut" style={{ width: "100%", height: "100%", paddingTop: !isMobile ? 0 : "18px", backgroundColor: "#fff" }}>
      <UnivNoticeHeader mainPageLayout={true} />

      {/* 💡 [수정됨] 로딩 중일 때 처리 */}
      {isDemoDataLoading ? (
        <div className="univnoticeFlexCenter" style={{ height: "100%", minHeight: "300px" }}>
          데이터를 불러오는 중입니다...
        </div>
      ) : (
        isLogin && (
          <div style={{ width: "100%", height: isPc ? "100%" : "96%", paddingTop: isPc ? undefined : "20%" }} className="noticePage">
            <div className="centerSection">
              {/* 💡 자동으로 계산된 타이틀 표시 */}
              <h2>{univnoticeTitle}</h2>

              <div className="alarmCheck univnoticeFlexHeightCenter" style={{ gap: "16px", cursor: "pointer" }}>
                <div></div>
                <div className="univnoticeFlexHeightCenter" style={{ gap: "8px" }}>
                  <input
                    type="checkbox"
                    id="alarmOnly"
                    checked={alarmOnly}
                    onChange={(e) => setAlarmOnly(e.target.checked)}
                    style={{ accentColor: "var(--univ-main-color)", width: 18, height: 18, cursor: "pointer" }}
                  />
                  <label htmlFor="alarmOnly" style={{ cursor: "pointer", userSelect: "none" }}>
                    알림 공지만 보기
                  </label>
                </div>
              </div>
              <div className="noticeNav">
                {noticeData.map((data, index) => {
                  let hasRecent = false;
                  let hasRecentAlarm = false;

                  if (Array.isArray(data.Notices)) {
                    for (const notice of data.Notices) {
                      if (!notice.published_at) continue;
                      const pubDate = new Date(notice.published_at);
                      const isRecent = isSameDay(pubDate, now) || isSameDay(pubDate, yesterday);

                      if (!isRecent) continue;
                      hasRecent = true;

                      if ((notice.NoticeKeywordMatches?.length || 0) > 0) {
                        hasRecentAlarm = true;
                        break;
                      }
                    }
                  }

                  let indicator = null;
                  if (index === paging) {
                    indicator = <div className="point"></div>;
                  } else if (hasRecentAlarm) {
                    indicator = <div className="point" style={{ backgroundColor: "var(--univ-light-orange)" }}></div>;
                  } else if (hasRecent) {
                    indicator = <div className="point" style={{ backgroundColor: "var(--univ-point-color-3)" }}></div>;
                  }

                  return (
                    <div
                      onClick={() => {
                        // 💡 [수정됨] setTitle 제거! setPaging만 호출하면 자동으로 화면이 리렌더링되며 title이 계산됨
                        setPaging(index);
                      }}
                      key={index}
                      className="navBtn"
                      style={{
                        color: index === paging ? "var(--black-5)" : "var(--black-4)",
                        fontWeight: index === paging ? "600" : "400",
                      }}>
                      <div className="text">
                        {data.category}
                        {indicator}
                      </div>
                      <div className="line"></div>
                    </div>
                  );
                })}
              </div>
              <div className="noticeList">
                {isPc && (
                  <div className="noticeListLiCPTitle">
                    <div className="noticeListLiCP-univnoticeTitle">제목</div>
                    <div className="noticeListLiCP-author">작성자</div>
                    <div className="noticeListLiCP-attachments">첨부파일</div>
                    <div className="noticeListLiCP-published_at">등록일</div>
                  </div>
                )}
                {isPc &&
                  pagingData.length > 0 &&
                  pagingData.map((data, idx) => <UnivNoticeNoticeListLiCP url={noticeData[paging].url} key={idx} data={data} />)}
                {!isPc &&
                  pagingData.length > 0 &&
                  pagingData.map((data, idx) => <UnivNoticeNoticeListLiMobileCP url={noticeData[paging].url} key={idx} data={data} />)}

                {pagingData.length === 0 && !alarmOnly && <div className="notdefine-deivce univnoticeFlexCenter">등록된 공지가 없습니다</div>}
                {pagingData.length === 0 && alarmOnly && <div className="notdefine-deivce univnoticeFlexCenter">알람 설정에 부합하는 공지가 없습니다.</div>}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};
export default UnivNoticeNoticePage;
