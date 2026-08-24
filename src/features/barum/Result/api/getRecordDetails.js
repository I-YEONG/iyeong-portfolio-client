export const getRecordDetails = async (date) => {
  void date;
  const { recordDetailsMockup } = await import("@/mockup/barum/recordDetailsMockup.js");
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return recordDetailsMockup;
};
