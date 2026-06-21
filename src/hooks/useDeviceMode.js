import { useAtom } from "jotai";
import { deviceFlagsAtom, toggleDeviceModeAtom } from "@/atoms/deviceAtoms";

export const useDeviceMode = () => {
  const [deviceFlags] = useAtom(deviceFlagsAtom);
  const [, toggleDeviceMode] = useAtom(toggleDeviceModeAtom);

  return {
    ...deviceFlags,
    toggleDeviceMode,
  };
};
