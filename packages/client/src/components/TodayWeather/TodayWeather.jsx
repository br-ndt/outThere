import React from "react";

import { HourOfDay } from "../";

import styles from "./TodayWeather.module.scss";

export default function TodayWeather({ hourly }) {
  return (
    <ul className={`${styles.tileList} ${styles.todayWeather}`}>
      {[...Array(24)].map(
        (v, i) => hourly[i] && <HourOfDay hour={hourly[i]} key={`hour${i}`} />
      )}
    </ul>
  );
}
