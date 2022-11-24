export default function areCoordinatesValid(lat, lon) {
  if (!isNaN(lat) && !isNaN(lon)) {
    return Math.abs(lat) <= 90 && Math.abs(lon) <= 180;
  } else {
    return false;
  }
}
