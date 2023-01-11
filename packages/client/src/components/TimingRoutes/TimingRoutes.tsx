import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";

import {
  CurrentWeather,
  LoadingSpinner,
  Nearby,
  TodayWeather,
  WeeklyWeather,
} from "..";
import { useLocation } from "../../contexts/LocationContext";

import styles from "./TimingRoutes.module.scss";

export default function TimingRoutes() {
  const { location } = useLocation();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            {location && (
              <h2 className={styles.cityName}>
                {location.city &&
                  `${location.city.name}, ${location.city.state}`}
              </h2>
            )}
            <Outlet />
            {location && <Nearby />}
          </>
        }
      >
        <Route
          path="/"
          element={
            location ? (
              <CurrentWeather
                current={location.weather.current}
                today={location.weather.daily[0]}
              />
            ) : (
              <LoadingSpinner />
            )
          }
        />
        <Route
          path="/today"
          element={
            location ? (
              <TodayWeather hourly={location.weather.hourly} />
            ) : (
              <LoadingSpinner />
            )
          }
        />
        <Route
          path="/week"
          element={
            location ? (
              <WeeklyWeather daily={location.weather.daily} />
            ) : (
              <LoadingSpinner />
            )
          }
        />
        <Route path="*" element={<h2>404: not found</h2>} />
      </Route>
    </Routes>
  );
}
