import fetch from "node-fetch";

let timestamp = "";
let curTime = "";

const checkIfFetch = () => {
  curTime = new Date();
  if ((timestamp = "" || curTime - timestamp > 2000)) {
    // more time than rate limit has passed
    timestamp = curTime;
    return true;
  }
  return false;
};

const randomCoords = () => {
  const coords = [];
  let lat = 0;
  let long = 0;

  lat = Math.ceil(Math.random() * 90 * (Math.round(Math.random()) ? 1 : -1));
  long = Math.ceil(Math.random() * 180 * (Math.round(Math.random()) ? 1 : -1));
  coords.push(lat, long);
  return coords;
};

const fetchWeather = async (apiKey, lat = -2000, lon = -2000) => {
  if (lat === -2000 || lon === -2000) {
    let coords = randomCoords();
    if (lat === -2000) {
      lat = coords[0];
    }
    if (lon === -2000) {
      lon = coords[1];
    }
  }
  try {
    if (checkIfFetch()) {
      console.log(lat, lon);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial&exclude=minutely`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      return json;
    }
  } catch (error) {
    console.log(`Sorry, unable to fetch weather because ${error}`);
  }
};

export default fetchWeather;
