let timestamp = "";

export default function checkIfFetch() {
  const curTime = new Date();
  if ((timestamp = "" || curTime - timestamp > 2000)) {
    // more time than rate limit has passed
    timestamp = curTime;
    return true;
  }
  return false;
}
