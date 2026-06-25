import { useAtom } from "jotai";
import { deviceFlagsAtom, toggleDeviceModeAtom } from "@/atoms/deviceAtoms";

/**
 * const { isPc, isMobile, toggleDeviceMode } = useDeviceMode();
 * @returns { isPc, isMobile, toggleDeviceMode }
 */
export const useDeviceMode = () => {
  const [deviceFlags] = useAtom(deviceFlagsAtom);
  const [, toggleDeviceMode] = useAtom(toggleDeviceModeAtom);

  return {
    ...deviceFlags,
    toggleDeviceMode,
  };
};
