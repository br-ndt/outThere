export default function randomCoords() {
  const coords = [];
  let lat = 0;
  let long = 0;

  lat = Math.ceil(Math.random() * 90 * (Math.round(Math.random()) ? 1 : -1));
  long = Math.ceil(Math.random() * 180 * (Math.round(Math.random()) ? 1 : -1));
  coords.push(lat, long);
  return coords;
}
