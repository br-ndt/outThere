import degToRad from "./degToRad.js";

const imperialRadius = 3958.8;
const metricRadius = 6371;

export default function getDistanceFromCoords(
  lat1,
  lon1,
  lat2,
  lon2,
  imperial
) {
  const latRad = degToRad(lat2 - lat1);
  const lonRad = degToRad(lon2 - lon1);
  const a =
    Math.sin(latRad / 2) * Math.sin(latRad / 2) +
    Math.cos(degToRad(lat1)) *
      Math.cos(degToRad(lat2)) *
      Math.sin(lonRad / 2) *
      Math.sin(lonRad / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (imperial ? imperialRadius : metricRadius) * c;
}
