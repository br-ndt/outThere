import React from "react";

import Card from "../Card/Card";

import getDateString from "../../helpers/getDateString";

import styles from "./DayOfWeek.module.scss";

export default function DayOfWeek({ data }) {
  const date = getDateString(data.dt);
  return (
    <Card>
      {date && (
        <li className={`${styles.weatherTile} ${styles.dayOfWeek}`}>
          <h4>{date.split(",")[0]}</h4>
          <p>{date.split(",")[1]}</p>
          <p>{Math.round(data.temp.max)}°F</p>
          <p>{Math.round(data.temp.min)}°F</p>
          <img
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          />
          <p>{data.weather[0].description}</p>
        </li>
      )}
    </Card>
  );
}
