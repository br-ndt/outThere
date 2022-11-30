import fetch from "node-fetch";

export default async function fetchCity(apiKey, lat, lon) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}&limit=${1}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(`Sorry, unable to fetch city because ${error}`);
  }
}
