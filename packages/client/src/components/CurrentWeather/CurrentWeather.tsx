import React from "react";

import Card from "../Card/Card";

import { DailyWeather, WeatherGrouping } from "../../types/WeatherData";

import getDateString from "../../helpers/getDateString";

import styles from "./CurrentWeather.module.scss";

interface CurrentWeatherProps {
  current: WeatherGrouping;
  today: DailyWeather;
}

export default function CurrentWeather({
  current,
  today,
}: CurrentWeatherProps) {
  const date = getDateString(current.dateTime);

  return (
    <Card className={`${styles.currentWeather}`}>
      {date && (
        <>
          <h3>
            {date.split(",")[0]},{date.split(",")[1]}, {date.split(" at ")[1]}
          </h3>
          <p>high: {Math.round(today.temp.max)}°F</p>
          <p>low: {Math.round(today.temp.min)}°F</p>
          <p>{Math.round(current.temp)}°F</p>
          <p>feels like: {Math.round(current.feelsLike)}°F</p>
          <img
            src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
          />
          <p>{current.weather[0].description}</p>
        </>
      )}
    </Card>
  );
}
