// src/features/Routine/hooks/useRoutineStream.js

import { useRef, useState } from "react";

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const useRoutineStream = () => {
  const [progress, setProgress] = useState(0);
  const [stage1, setStage1] = useState(false);
  const [stage2, setStage2] = useState(false);
  const [stage3, setStage3] = useState(false);

  const [error, setError] = useState(null);
  const [isProgressing, setIsProgressing] = useState(false);

  const [dataA, setDataA] = useState(null);
  const [dataB, setDataB] = useState(null);

  const draftRef = useRef({
    date: "",
    selfiePath: null,
    weather: null,
    skin: null,
    conflicts: [],
    routine: { apply: [], skip: [] },
  });

  // 매개변수를 selfiePath 하나로 축소! (나머지는 훅 내부에서 알아서 가져옴)
  const startStream = async (selfiePath) => {
    const actualSelfiePath = !selfiePath || selfiePath === "none" ? null : selfiePath;

    setIsProgressing(true);
    setError(null);
    setProgress(0);
    setStage1(false);
    setStage2(false);
    setStage3(false);
    setDataA(null);
    setDataB(null);

    const today = new Date().toISOString().split("T")[0];
    draftRef.current = {
      date: today,
      selfiePath: actualSelfiePath,
      weather: null,
      skin: null,
      conflicts: [],
      routine: { apply: [], skip: [] },
    };

    const { recordDetailsMockup } = await import("@/mockup/barum/recordDetailsMockup.js");
    runMockSequence("mock-user-123", actualSelfiePath, recordDetailsMockup);
  };

  const runMockSequence = (userId, actualSelfiePath, recordDetailsMockup) => {
    setTimeout(() => {
      setStage1(true);
      setProgress(getRandomInt(29, 39));
    }, 2000);

    setTimeout(() => {
      setStage2(true);
      setProgress(getRandomInt(59, 68));
    }, 4000);

    setTimeout(() => {
      setStage3(true);
      setProgress(getRandomInt(90, 99));
    }, 6000);

    setTimeout(() => {
      setProgress(100);
      setIsProgressing(false);

      const finalMockupData = {
        ...recordDetailsMockup,
        skin: actualSelfiePath ? recordDetailsMockup.skin : null,
      };

      setDataB(finalMockupData);
      setDataA({
        ...finalMockupData,
        selfiePath: actualSelfiePath ? `${userId}/2026-08-11.jpg` : null,
      });
    }, 8000);
  };

  return {
    startStream,
    progress,
    stage1,
    stage2,
    stage3,
    error,
    isError: !!error,
    isProgressing,
    dataA,
    dataB,
  };
};
