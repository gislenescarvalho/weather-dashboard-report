export const containsSubstring = (str: string, substring: string) => {
  return str.toLowerCase().includes(substring.toLowerCase());
};

export const roundCoordinates = (lat: number, lon: number) => {
  const roundedLat = Math.round(lat * 100) / 100;
  const roundedLon = Math.round(lon * 100) / 100;
  return { lat: roundedLat, long: roundedLon };
};
