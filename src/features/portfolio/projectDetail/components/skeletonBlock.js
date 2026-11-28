import { css, keyframes } from "@emotion/react";
import { theme } from "@/styles/theme";

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export const skeletonBlock = css({
  backgroundImage: `linear-gradient(90deg, ${theme.colors.lightLine} 0%, ${theme.colors.black100} 50%, ${theme.colors.lightLine} 100%)`,
  backgroundSize: "200% 100%",
  animation: `${shimmer} 1.2s ease-in-out infinite`,
  borderRadius: 6,
  "@media (prefers-reduced-motion: reduce)": { animation: "none" },
});

