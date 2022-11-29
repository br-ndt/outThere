import React from "react";

import { DayOfWeek } from "..";

import { DailyWeather } from "../../types/weatherData";

import styles from "./WeeklyWeather.module.scss";

interface WeeklyWeatherProps {
  daily: DailyWeather[];
}

export default function WeeklyWeather({ daily }: WeeklyWeatherProps) {
  return (
    <ul className={`${styles.tileList} ${styles.weeklyWeather}`}>
      {[...Array(7)].map(
        (v, i) => daily[i] && <DayOfWeek key={i} data={daily[i]} />
      )}
    </ul>
  );
}
