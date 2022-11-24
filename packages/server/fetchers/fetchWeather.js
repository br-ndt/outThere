import fetch from "node-fetch";

export default async function fetchWeather(apiKey, lat, lon) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial&exclude=minutely`,
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
    console.log(`Sorry, unable to fetch weather because ${error}`);
  }
}
