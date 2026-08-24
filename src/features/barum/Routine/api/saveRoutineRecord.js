export const saveRoutineRecord = async ({ payload }) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { date: payload?.date };
};
