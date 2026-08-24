export const getMakeupList = async () => {
  const { makeupMockup } = await import("@/mockup/barum/makeupMockup.js");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return makeupMockup.items;
};
