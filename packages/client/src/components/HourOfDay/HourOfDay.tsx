import React from "react";

import Card from "../Card/Card";

import { WeatherGrouping } from "../../types/WeatherData";

import getDateString from "../../helpers/getDateString";

import styles from "./HourOfDay.module.scss";

interface HourOfDayProps {
  hour: WeatherGrouping;
}

export default function HourOfDay({ hour }: HourOfDayProps) {
  const date = getDateString(hour.dateTime);

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
