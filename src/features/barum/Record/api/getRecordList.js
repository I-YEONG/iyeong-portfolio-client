export const getRecordList = async () => {
  const { recordMockup } = await import("@/mockup/barum/recordMockup.js");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return recordMockup;
};
