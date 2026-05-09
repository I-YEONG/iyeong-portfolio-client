import { useMedia } from "@/hooks/useMedia";
import { FullCenterLayout } from "@/layouts";
import { aboutExpCss } from "./AboutExp.styles";
import { useExpQuery } from "../../hooks/useExp";
import { Loading } from "@/components";
import { useMemo } from "react";
import { theme } from "@/styles/theme";

const TypeItem = ({ type }) => {
  const typeColor = {
    해커톤: theme.colors.green,
    수상: theme.colors.orange,
    강의: theme.colors.deepGreen,
    동아리: theme.colors.red,
    프로젝트: theme.colors.blue,
    개인: "",
    알바: theme.colors.black600,
    인턴: "",
  };

  const typeBackgroundColor = {
    해커톤: theme.colors.greenBG,
    수상: theme.colors.orangeBG,
    강의: theme.colors.deepGreenBG,
    동아리: theme.colors.redBG,
    프로젝트: theme.colors.blueBG,
    개인: "",
    알바: theme.colors.black100,
    인턴: "",
  };
  return (
    <div
      css={{
        widthL: "fit-content",
        padding: "4px 6px",
        color: typeColor[type],
        backgroundColor: typeBackgroundColor[type],
        borderRadius: "4px",
        fontSize: "10px",
        fontWeight: "500",
      }}>
      {type}
    </div>
  );
};

const formatDate = (value) => {
  if (!value) return "";
  return value.replaceAll("-", ". ");
};

const AboutExp = () => {
  const { isPc } = useMedia();
  const { data: exp, isLoading: isExpLoading, isError: isExpError } = useExpQuery();

  const sortedExp = useMemo(() => {
    if (!Array.isArray(exp)) {
      return [];
    }

    return [...exp].sort((a, b) => {
      const aIsOngoing = a.endDate === "2099-12-30";
      const bIsOngoing = b.endDate === "2099-12-30";

      if (aIsOngoing !== bIsOngoing) {
        return aIsOngoing ? -1 : 1;
      }

      return new Date(b.startDate) - new Date(a.startDate);
    });
  }, [exp]);

  return (
    <section>
      <FullCenterLayout
        title="Outside Experience"
        subTitle={
          <p>
            강의실 밖에서 마주한 실전 문제들을 해결하며
            {isPc && <br />}
            성장해온 기록들입니다.
          </p>
        }>
        <div css={aboutExpCss}>
          <div className="row header">
            <div className="title">활동 명</div>
            <div className="type">구분</div>
            <div className="detail">설명</div>
            <div className="period">기간</div>
            <div className="note">비고</div>
          </div>
          {isExpLoading && (
            <div className="loading-box">
              <Loading />
            </div>
          )}
          {!isExpLoading &&
            sortedExp.map((item) => (
              <div className="row" key={item.id}>
                <div className="title">{item.title}</div>
                <div className="type">
                  {item?.types?.map((type, idx) => (
                    <TypeItem type={type} key={idx} />
                  ))}
                </div>
                <div className="detail">{item.detail}</div>
                <div className="period" style={{ textAlign: item.endDate !== "2099-12-30" ? "center" : "left" }}>
                  {formatDate(item.startDate)} {item.endDate !== "2099-12-30" ? " - " + formatDate(item.endDate) : " ~ 진행중"}
                </div>
                <div className="note">{item.note}</div>
              </div>
            ))}
        </div>
      </FullCenterLayout>
    </section>
  );
};
export default AboutExp;
