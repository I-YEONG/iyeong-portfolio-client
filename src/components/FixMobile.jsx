import { useDeviceMode } from "@/hooks/useDeviceMode";
import { useEffect } from "react";
import { Outlet } from "react-router-dom"; // Outlet을 반드시 import 해야 합니다.

const FixMobile = () => {
  const { isPc, setMobileMode } = useDeviceMode();

  useEffect(() => {
    if (isPc) {
      setTimeout(() => {
        setMobileMode();
      }, 100);
    }
  }, [isPc, setMobileMode]);

  // 하위 경로(<Route>들)를 렌더링하기 위해 Outlet을 반환합니다.
  return <Outlet />;
};

export default FixMobile;
