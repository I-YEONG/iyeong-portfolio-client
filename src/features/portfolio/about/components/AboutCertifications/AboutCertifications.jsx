import { TitleLayout } from "@/layouts";
import { aboutCertificationsCss } from "./AboutCertifications.styles";
import { Loading } from "@/components";
import { useCertificationsQuery } from "../../hooks/useCertifications";
import { useMemo } from "react";
import AboutCertItemBox from "../AboutCertItemBox/AboutCertItemBox.jsx";
import { useMedia } from "@/hooks/useMedia";

const AboutCertifications = () => {
  const { isPc } = useMedia();

  const { data: cert, isLoading: isCertLoading, isError: isCertError } = useCertificationsQuery();

  // 개발 후 api로 수정
  // const stack = stackMockupData;

  const certList = useMemo(() => {
    if (!Array.isArray(cert)) {
      return { engineering: [], cloud: [], dataScience: [] };
    }

    const engineering = cert.filter((item) => item.type === "engineering");
    const cloud = cert.filter((item) => item.type === "cloud");
    const dataScience = cert.filter((item) => item.type === "dataScience");

    // 각 카테고리별로 홀수면 dummy 추가
    const addDummyIfOdd = (arr, type) => {
      let list = [...arr];
      if (isPc && list.length % 2 === 1) {
        list.push({
          id: 999,
          type,
          name: "",
          organization: "",
          status: false,
          acquiredDate: null,
          logoUrl: null,
          isDummy: true,
        });
      }
      return list;
    };

    return {
      engineering: addDummyIfOdd(engineering, "engineering"),
      cloud: addDummyIfOdd(cloud, "cloud"),
      dataScience: addDummyIfOdd(dataScience, "dataScience"),
    };
  }, [cert]);

  return (
    <section>
      <TitleLayout title="Certifications" subTitle={<p>검증된 전문성과 멈추지 않는 성장을 위해 취득한 자격증</p>} />
      <section css={aboutCertificationsCss}>
        <div className="content-box">
          {isCertLoading && (
            <div className="loading-box">
              <Loading />
            </div>
          )}
          {!isCertLoading && (
            <div className="content">
              <div className="items-box">
                <div className="item-title-box">
                  <p className="title">Engineering</p>
                  <p className="sub-title">관련 자격증: {certList.engineering.filter((item) => item.status).length}개</p>
                </div>
                <div className="item-list-box">
                  {certList.engineering.map((item) => (
                    <AboutCertItemBox key={item.id} data={item} />
                  ))}
                </div>
              </div>
              <div className="items-box">
                <div className="item-title-box">
                  <p className="title">Cloud & Infrastructure</p>
                  <p className="sub-title">관련 자격증: {certList.cloud.filter((item) => item.status).length}개</p>
                </div>
                <div className="item-list-box">
                  {certList.cloud.map((item) => (
                    <AboutCertItemBox key={item.id} data={item} />
                  ))}
                </div>
              </div>
              <div className="items-box">
                <div className="item-title-box">
                  <p className="title">Data Science & AI</p>
                  <p className="sub-title">관련 자격증: {certList.dataScience.filter((item) => item.status).length}개</p>
                </div>
                <div className="item-list-box">
                  {certList.dataScience.map((item) => (
                    <AboutCertItemBox key={item.id} data={item} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </section>
  );
};
export default AboutCertifications;
