import React from "react";

import Card from "../Card/Card";

import getDateString from "../../helpers/getDateString";

import styles from "./HourOfDay.module.scss";

export default function HourOfDay({ hour }) {
  const date = getDateString(hour.dt);
  return (
    <Card>
      {date && (
        <li className={`${styles.weatherTile} ${styles.hourOfDay}`}>
          <p>{Math.round(hour.temp)}°F</p>
          <img
            src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
          />
          <p>{hour.weather[0].description}</p>
          <p>{date.split(" at ")[1]}</p>
        </li>
      )}
    </Card>
  );
}
