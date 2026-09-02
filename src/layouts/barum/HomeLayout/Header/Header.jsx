import { BarumLeftButton, BarumMenuButton } from "@/components/barum";
import { theme } from "@/styles/theme";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const style = {
    ...theme.barum.flex.rowStart,
    gap: "16px",
    width: "100%",
    marginBottom: "26px",
  };

  const nav = useNavigate();

  return (
    <header css={style}>
      <span onClick={() => nav(-1)}>
        <BarumLeftButton />
      </span>
      <BarumMenuButton />
    </header>
  );
};
export default Header;
