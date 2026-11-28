import { css } from "@emotion/react";
import { skeletonBlock } from "./skeletonBlock";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

const styles = css({
  borderTop: `1px solid ${theme.colors.lightLine}`,
  "& .inner": { width: "90%", maxWidth: 1280, margin: "0 auto", borderInline: `1px solid ${theme.colors.lightLine}` },
  "& .hero": { minHeight: "60vh", display: "flex", justifyContent: "space-between" },
  "& .title": { flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", gap: 26, padding: "32px" },
  "& .info": { width: "20%", borderLeft: `1px solid ${theme.colors.lightLine}`, display: "flex", flexDirection: "column", justifyContent: "center" },
  "& .row": { padding: 16, borderBottom: `1px solid ${theme.colors.lightLine}`, display: "grid", gap: 8 },
  "& .gallery": { borderBlock: `1px solid ${theme.colors.lightLine}`, padding: 32, display: "flex", gap: 24, height: "23vh" },
  "& .gallery > div": { width: "30%", height: "100%" },
  "& .detail": { margin: "32px auto", width: "90%", aspectRatio: "16 / 9" },
  [mq("mobile")]: {
    "& .hero": { flexDirection: "column" },
    "& .title": { padding: "42px 12px" },
    "& .info": { width: "100%", borderLeft: 0 },
    "& .gallery": { height: "30vh" },
    "& .gallery > div": { width: "100%" },
    "& .gallery > div:not(:first-of-type)": { display: "none" },
  },
});

export default function ProjectDetailSkeleton() {
  return <div css={styles} role="status" aria-label="프로젝트 정보를 불러오는 중입니다">
    <div className="inner hero" aria-hidden="true">
      <div className="title">
        <div css={skeletonBlock} style={{ width: 160, height: 16 }} />
        <div css={skeletonBlock} style={{ width: "60%", height: 40 }} />
        <div css={skeletonBlock} style={{ width: "80%", height: 20 }} />
        <div css={skeletonBlock} style={{ width: 180, height: 48 }} />
      </div>
      <div className="info">{Array.from({ length: 5 }, (_, i) => <div className="row" key={i}>
        <div css={skeletonBlock} style={{ width: "35%", height: 12 }} />
        <div css={skeletonBlock} style={{ width: "75%", height: 18 }} />
      </div>)}</div>
    </div>
    <div className="inner gallery" aria-hidden="true">{Array.from({ length: 3 }, (_, i) => <div css={skeletonBlock} key={i} />)}</div>
    <div className="inner" aria-hidden="true"><div className="detail" css={skeletonBlock} /></div>
  </div>;
}
