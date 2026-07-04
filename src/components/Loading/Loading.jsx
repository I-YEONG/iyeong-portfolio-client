import LoadingSpinner from "@/assets/common/Spinner.svg?react";
import { theme } from "@/styles/theme";

const Loading = (size = "42px") => {
  return (
    <div css={{ width: "100%", height: "100%", maxHeight: "42px", position: "relative", ...theme.flex.center, overflow: "hidden" }}>
      <LoadingSpinner width={size} height={size} />
    </div>
  );
};
export default Loading;
