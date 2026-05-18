import { atom } from "jotai";

export const PROJECT_SORT = {
  LATEST: "LATEST",
  OLDEST: "OLDEST",
};

export const projectsSortAtom = atom(PROJECT_SORT.LATEST);
