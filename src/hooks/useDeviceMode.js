import { useAtom } from "jotai";
import { useCallback } from "react"; // 🌟 useCallback 임포트
import { deviceFlagsAtom, toggleDeviceModeAtom, deviceModeAtom, DEVICE_MODE } from "@/atoms/deviceAtoms";

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
