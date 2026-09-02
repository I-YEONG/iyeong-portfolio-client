import { useMutation } from "@tanstack/react-query";

import { saveRoutineRecord } from "../api/saveRoutineRecord";

export const useSaveRoutineRecord = () => {
  return useMutation({
    mutationFn: (payload) => saveRoutineRecord({ payload }),
  });
};
