export const getHomeRecord = async () => {
  const { homeRecordMockup } = await import("@/mockup/barum/homeRecordMockup.js");
  return homeRecordMockup;
};
