import React from "react";
import { DayOfWeek } from "../";

import styles from "./WeeklyWeather.module.scss";

export default function WeeklyWeather({ daily }) {
  return (
    <ul className={`${styles.tileList} ${styles.weeklyWeather}`}>
      {[...Array(7)].map(
        (v, i) => daily[i] && <DayOfWeek key={i} data={daily[i]} />
      )}
    </ul>
  );
}
