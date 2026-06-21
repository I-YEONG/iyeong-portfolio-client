import { atom } from "jotai";

export const DEVICE_MODE = {
  PC: "pc",
  MOBILE: "mobile",
};

// source of truth: persist as string mode
export const deviceModeAtom = atom(DEVICE_MODE.PC);

// UI-friendly shape similar to useMedia return values
export const deviceFlagsAtom = atom((get) => {
  const mode = get(deviceModeAtom);

  return {
    isPc: mode === DEVICE_MODE.PC,
    isMobile: mode === DEVICE_MODE.MOBILE,
  };
});

export const toggleDeviceModeAtom = atom(null, (get, set) => {
  const mode = get(deviceModeAtom);
  const nextMode = mode === DEVICE_MODE.PC ? DEVICE_MODE.MOBILE : DEVICE_MODE.PC;
  set(deviceModeAtom, nextMode);
});

// Backward-compatible boolean atom for existing components
export const isPcModeAtom = atom(
  (get) => get(deviceModeAtom) === DEVICE_MODE.PC,
  (get, set, update) => {
    const prev = get(deviceModeAtom) === DEVICE_MODE.PC;
    const next = typeof update === "function" ? update(prev) : update;
    set(deviceModeAtom, next ? DEVICE_MODE.PC : DEVICE_MODE.MOBILE);
  },
);
