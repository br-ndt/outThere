import React, { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";

import {
  AppHeader,
  CurrentWeather,
  Nearby,
  TodayWeather,
  WeeklyWeather,
} from "./components";

import styles from "./styles/app.module.scss";

export default function App() {
  const [locationData, setLocationData] = useState({});
  const hasLocationData = Object.keys(locationData).length > 0;

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        await fetchLocationData(
          position.coords.latitude,
          position.coords.longitude
        );
      });
    }
  }, []);

  const fetchLocationData = async (lat, lon) => {
    let coords = {
      lat,
      lon,
    };
    try {
      if (!hasLocationData) {
        const response = await fetch(`/api/location`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(coords),
        });
        if (!response.ok) {
          throw new Error(`${response.status} (${response.statusText})`);
        }
        const json = await response.json();
        console.log("LocationData was successfully fetched from API.");
        setLocationData(json);
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
              <AppHeader city={locationData.city} />
              <div className={styles.appBody}>
                <h2 className={styles.cityName}>
                  {locationData.city &&
                    `${locationData.city.name}, ${locationData.city.state}`}
                </h2>
                <Outlet />
                {/* TODO: context instead of prop-drill */}
                {hasLocationData && (
                  <Nearby
                    campgrounds={locationData.campgrounds}
                    parks={locationData.parks}
                  />
                )}
              </div>
            </>
          }
        >
          <Route
            path="/"
            element={
              hasLocationData ? (
                <CurrentWeather
                  current={locationData.weather.current}
                  today={locationData.weather.daily[0]}
                />
              ) : (
                loadMessage
              )
            }
          />
          <Route
            path="/today"
            element={
              hasLocationData ? (
                <TodayWeather hourly={locationData.weather.hourly} />
              ) : (
                loadMessage
              )
            }
          />
          <Route
            path="/week"
            element={
              hasLocationData ? (
                <WeeklyWeather daily={locationData.weather.daily} />
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
