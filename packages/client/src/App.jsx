import React, { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";

import { AppHeader, CurrentWeather, TodayWeather, WeeklyWeather } from "./components"

import styles from "./styles/app.module.scss";

export default function App() {
  const [weather, setWeather] = useState({});
  const hasWeatherData = Object.keys(weather).length;

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        await fetchWeather(position.coords.latitude, position.coords.longitude);
      });
    }
  }, []);

  const fetchWeather = async (lat, lon) => {
    let data = {
      lat,
      lon,
    };
    try {
      if (!hasWeatherData) {
        const response = await fetch(`/api/v1/weather`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error(`${response.status} (${response.statusText})`);
        }
        const json = await response.json();
        console.log("Weather was successfully fetched from API.");
        setWeather(json);
      }
    } catch (error) {
      console.log(`Sorry, unable to fetch from API because ${error}`);
    }
  };

  const loadMessage = <h2>'loading weather...'</h2>;

  return (
    <div className={styles.app}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <AppHeader />
              <div className={styles.appBody}>
                <Outlet />
              </div>
            </>
          }
        >
          <Route
            path="/"
            element={
              hasWeatherData ? (
                <CurrentWeather
                  current={weather.current}
                  today={weather.daily[0]}
                />
              ) : (
                loadMessage
              )
            }
          />
          <Route
            path="/today"
            element={
              hasWeatherData ? (
                <TodayWeather hourly={weather.hourly} />
              ) : (
                loadMessage
              )
            }
          />
          <Route
            path="/week"
            element={
              hasWeatherData ? (
                <WeeklyWeather daily={weather.daily} />
              ) : (
                loadMessage
              )
            }
          />
          <Route path="*" element={<h2>404: not found</h2>} />
        </Route>
      </Routes>
    </div>
  );
}
