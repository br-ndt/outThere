import React, { useEffect, useRef, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import AppHeader from "./components/AppHeader.js";
import CurrentWeather from "./components/CurrentWeather.js";
import TodayWeather from "./components/TodayWeather.js";
import WeeklyWeather from "./components/WeeklyWeather.js";

const App = () => {
  const [weather, setWeather] = useState({});
  const hasWeatherData = Object.keys(weather).length;
  const isMounted = useRef(true);

  useEffect(() => {
    if ("geolocation" in navigator && isMounted.current) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetchWeather(
          position.coords.latitude,
          position.coords.longitude
        );
      });
    }

    return () => {
      isMounted.current = false;
    }
  }, []);

  const fetchWeather = async (lat, lon) => {
    let data = {
      lat,
      lon,
    };
    try {
      if(!hasWeatherData && isMounted.current) {
        const response = await fetch(`/api/v1/weather`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if(!response.ok) {
          throw new Error(`${response.status} (${response.statusText})`);
        }
        const json = await response.json();
        console.log("Weather was successfully fetched from API.");
        if(isMounted.current) setWeather(json);
      }
    } catch (error) {
      console.log(`Sorry, unable to fetch from API because ${error}`);
    }
  }

  const loadMessage = <h2>'loading weather...'</h2>;

  const currentWeather = hasWeatherData
    ? <CurrentWeather current={weather.current} today={weather.daily[0]} />
    : loadMessage;

  const todayWeather = hasWeatherData
    ? <TodayWeather hourly={weather.hourly} />
    : loadMessage;

  const weeklyWeather = hasWeatherData
    ? <WeeklyWeather daily={weather.daily} />
    : loadMessage;

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={
          <>
            <AppHeader/>
            <div className="App-body">
              <Outlet/>
            </div>
          </>
        }>
          <Route path='/' element={currentWeather}/>
          <Route path='/today' element={todayWeather}/>
          <Route path='/week' element={weeklyWeather}/>
          <Route path="*" element={
            <h2>404: not found</h2>
          }/>
        </Route>

      </Routes>
    </div>
  );
};

export default App;