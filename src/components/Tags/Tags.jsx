import { css } from "@emotion/react";
import { theme } from "@/styles/theme";

const Tags = ({ tagList }) => {
  return (
    <div>
      {/* TAG */}
      {tagList &&
        tagList.map((tag, index) => (
          <span css={tagsCss(tag)} key={index}>
            {tag}
          </span>
        ))}
    </div>
  );
};
export default Tags;

const tagsCss = (tag) =>
  css({
    padding: "4px 6px",
    ...theme.fonts.captionMd,
    ...(tag === "FULL" || tag === "FRONT"
      ? {
          color: theme.colors.green,
          backgroundColor: theme.colors.greenBG,
        }
      : tag === "BACK"
        ? {
            color: theme.colors.orange,
            backgroundColor: theme.colors.orangeBG,
          }
        : tag === "DEVOPS"
          ? {
              color: theme.colors.blue,
              backgroundColor: theme.colors.blueBG,
            }
          : tag === "TEAM_LEADER"
            ? {
                color: theme.colors.deepGreen,
                backgroundColor: theme.colors.deepGreenBG,
              }
            : {}),
  });
