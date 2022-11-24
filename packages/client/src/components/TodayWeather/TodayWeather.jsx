import React from "react";

import { Card, LineChart } from "../";

import getDateString from "../../helpers/getDateString";

import styles from "./TodayWeather.module.scss";

export default function TodayWeather({ hourly }) {
  const data = hourly.slice(0, 25).map((hour, i) => {
    const dateString = getDateString(hour.dateTime);
    const timeString = dateString.split(" at ")[1];
    return {
      index: i,
      label: timeString,
      value: hour.temp,
      tooltipContent: `<b>${hour.temp.toFixed(0)}&deg;F</b><br>${
        hour.weather[0].description
      }<br><b>${timeString}</b>`,
    };
  });
  return (
    <>
      <Card className={`${styles.todayWeather}`}>
        <h2>{getDateString(hourly[0].dateTime).split(" at ")[0]}</h2>
        <LineChart data={data} width={480} height={300} yMin={0} yMax={100} />
      </Card>
    </>
  );
}
