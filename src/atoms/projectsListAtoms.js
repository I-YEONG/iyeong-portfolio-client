import { atom } from "jotai";

export const PROJECT_FILTER = {
  ALL: "ALL",
  FRONT: "FRONT",
  OPS: "OPS",
};

export const PROJECT_SORT = {
  LATEST: "LATEST",
  OLDEST: "OLDEST",
};

export const projectsFilterAtom = atom(PROJECT_FILTER.ALL);
export const projectsSortAtom = atom(PROJECT_SORT.LATEST);
