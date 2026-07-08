import { useAtom } from "jotai";
import { useCallback } from "react"; // 🌟 useCallback 임포트
import { deviceFlagsAtom, toggleDeviceModeAtom, deviceModeAtom, DEVICE_MODE } from "@/atoms/deviceAtoms";

/**
 * useDeviceMode 훅은 현재 디바이스 모드(PC 또는 모바일)를 관리하고, 모드를 전환하거나 설정하는 기능을 제공합니다.
 * @returns { isPc: boolean, isMobile: boolean, toggleDeviceMode: function, setPcMode: function, setMobileMode: function }
 */
export const useDeviceMode = () => {
  const [deviceFlags] = useAtom(deviceFlagsAtom);
  const [, toggleDeviceMode] = useAtom(toggleDeviceModeAtom);
  const [, setDeviceMode] = useAtom(deviceModeAtom);

  const setPcMode = useCallback(() => setDeviceMode(DEVICE_MODE.PC), [setDeviceMode]);
  const setMobileMode = useCallback(() => setDeviceMode(DEVICE_MODE.MOBILE), [setDeviceMode]);

  return {
    ...deviceFlags,
    toggleDeviceMode,
    setPcMode,
    setMobileMode,
  };
};
