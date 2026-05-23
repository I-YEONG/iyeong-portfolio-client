import { Button, Loading } from "@/components";
import { theme } from "@/styles/theme";
import useFormatDate from "@/hooks/useFormatDate";
import Tags from "@/components/Tags/Tags";
import { useNavigate } from "react-router-dom";
import { projectDetailHeroCss } from "./ProjectDetailHero.styles";

const ProjectDetailHero = ({ data }) => {
  const nav = useNavigate();
  return (
    <div>
      {!data && <Loading />}
      {data && (
        <section css={projectDetailHeroCss} className="content-box">
          <div className="content-center">
            <div className="title-box">
              {/* title box */}
              <p className="path">Home / Projects /</p>
              <p className="title">{data.name}</p>
              <p className="description">{data.description}</p>
              <div className="button-box">
                <div onClick={() => nav(`${data.url}`)}>
                  <Button buttonType="goto" cssObj={{ ...theme.fonts.captionXl, width: "fit-content", backgroundColor: theme.colors.green, color: "white" }}>
                    페이지 바로가기
                  </Button>
                </div>
                {data.pdfUrl !== null && data.pdfUrl !== "null" && (
                  <a href={data.pdfUrl} role="button">
                    <Button
                      buttonType="pdf"
                      cssObj={{
                        ...theme.fonts.captionXl,
                        width: "fit-content",
                        backgroundColor: theme.colors.redBG,
                        color: theme.colors.red,
                        border: `1px solid ${theme.colors.red}`,
                      }}>
                      PDF 다운로드
                    </Button>
                  </a>
                )}
                <a href={data.gitUrl} target="_blank" rel="noreferrer">
                  <Button
                    buttonType="git"
                    cssObj={{
                      width: "fit-content",
                      padding: "16px",
                      gap: "0px",
                      backgroundColor: theme.colors.darkBG,
                      color: "white",
                      border: `1px solid ${theme.colors.darkBG}`,
                    }}
                  />
                </a>
                <a href={import.meta.env.VITE_GITHUB_URL} target="_blank" rel="noreferrer">
                  <Button
                    buttonType="git"
                    cssObj={{ ...theme.fonts.captionXl, width: "fit-content", padding: "16px", gap: "0px", border: `1px solid ${theme.colors.darkBG}` }}
                  />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
export default ProjectDetailHero;
