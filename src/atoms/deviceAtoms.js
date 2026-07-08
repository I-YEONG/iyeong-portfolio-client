import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils"; // 추가 임포트

export const DEVICE_MODE = {
  PC: "pc",
  MOBILE: "mobile",
};

// 1. atomWithStorage를 사용하여 초기값 로딩 및 동기화 자동화
// 첫 번째 인자: key, 두 번째 인자: 초기값
export const deviceModeAtom = atomWithStorage("device-mode", DEVICE_MODE.PC);

// UI-friendly shape
export const deviceFlagsAtom = atom((get) => {
  const mode = get(deviceModeAtom);
  return {
    isPc: mode === DEVICE_MODE.PC,
    isMobile: mode === DEVICE_MODE.MOBILE,
  };
});

// 토글 함수
export const toggleDeviceModeAtom = atom(null, (get, set) => {
  const mode = get(deviceModeAtom);
  const nextMode = mode === DEVICE_MODE.PC ? DEVICE_MODE.MOBILE : DEVICE_MODE.PC;
  set(deviceModeAtom, nextMode);
});

// Backward-compatible boolean atom
export const isPcModeAtom = atom(
  (get) => get(deviceModeAtom) === DEVICE_MODE.PC,
  (get, set, update) => {
    const next = typeof update === "function" ? update(get(deviceModeAtom) === DEVICE_MODE.PC) : update;
    set(deviceModeAtom, next ? DEVICE_MODE.PC : DEVICE_MODE.MOBILE);
  },
);
