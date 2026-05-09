import LoadingSpinner from "@/assets/common/Spinner.svg?react";
import { theme } from "@/styles/theme";

const Loading = () => {
  return (
    <div css={{ width: "100%", height: "100%", maxHeight: "42px", position: "relative", ...theme.flex.center, overflow: "hidden" }}>
      <LoadingSpinner width="42px" height="42px" />
    </div>
  );
};
export default Loading;
