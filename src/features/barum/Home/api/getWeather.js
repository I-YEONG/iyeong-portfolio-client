export const getWeather = async (lat, lon) => {
  void lat;
  void lon;
  const { weatherMockup } = await import("@/mockup/barum/weatherMockup.js");
  return weatherMockup;
};
