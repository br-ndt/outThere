import React from "react";

import Card from "../Card/Card";

import getDateString from "../../helpers/getDateString";

import styles from "./CurrentWeather.module.scss";

export default function CurrentWeather({ current, today }) {
  const date = getDateString(current.dt);

  return (
    <Card className={`${styles.currentWeather}`}>
      <h3>
        {date.split(",")[0]},{date.split(",")[1]}, {date.split(" at ")[1]}
      </h3>
      <p>high: {Math.round(today.temp.max)}°F</p>
      <p>low: {Math.round(today.temp.min)}°F</p>
      <p>{Math.round(current.temp)}°F</p>
      <p>feels like: {Math.round(current.feels_like)}°F</p>
      <img
        src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
      />
      <p>{current.weather[0].description}</p>
    </Card>
  );
}
