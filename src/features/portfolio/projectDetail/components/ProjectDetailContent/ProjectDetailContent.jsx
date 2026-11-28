import { Loading } from "@/components";
import { projectDetailContentCss } from "./ProjectDetailContent.styles";
import { useState } from "react";
import { skeletonBlock } from "../skeletonBlock";

const ProjectDetailContent = ({ data }) => {
  const detailImg = data?.images?.find((img) => img.isDetail)?.imageUrl;
  const [loadedImage, setLoadedImage] = useState(null);
  return (
    <div>
      {!data && <Loading />}
      {data && (
        <section css={projectDetailContentCss} className="content-box">
          <div className="content-center">
            {detailImg && <div style={{ width: "100%" }}>
              {loadedImage !== detailImg && <div css={skeletonBlock} role="status" aria-label="상세 이미지를 불러오는 중입니다" style={{ width: "100%", aspectRatio: "16 / 9" }} />}
              <img src={detailImg} alt="프로젝트 상세 이미지" onLoad={() => setLoadedImage(detailImg)} onError={() => setLoadedImage(detailImg)} style={{ display: loadedImage === detailImg ? "block" : "none" }} />
            </div>}
          </div>
        </section>
      )}
    </div>
  );
};
export default ProjectDetailContent;
