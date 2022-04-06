import React, { useEffect, useState } from "react";
import AppHeader from "./components/AppHeader.js";
import CurrentWeather from "./components/CurrentWeather.js";
import TodayWeather from "./components/TodayWeather.js";
import WeeklyWeather from "./components/WeeklyWeather.js";
import getWeather from "./helpers/getWeather.js";

const App = () => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        getWeather(
          position.coords.latitude,
          position.coords.longitude,
          setWeather
        );
      });
    }
  }, []);

  const weatherInfo = () => {
    if (Object.keys(weather).length > 0) {
      return (
        <>
          <CurrentWeather current={weather.current} today={weather.daily[0]} />
          <TodayWeather hourly={weather.hourly} />
          <WeeklyWeather daily={weather.daily} />
        </>
      );
    } else return <h2>'loading weather...'</h2>;
  };

  return (
    <div className="App">
      <AppHeader />
      {weatherInfo()}
    </div>
  );
};

export default App;

// const displayTestData = () =>
// {
//     if(testData !== null)
//     {
//         return testData;
//     }
//     else
//     {
//         return { data: "no response" };
//     }
// }
