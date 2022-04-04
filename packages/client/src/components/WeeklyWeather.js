import React from "react";
import DayOfWeek from "./DayOfWeek.js";

const weeklyWeather = (props) => {
  const constructWeek = () => {
    const week = [];
    for (let i = 0; i < 7; ++i) {
      week.push(<DayOfWeek key={i} data={props.daily[i]} />);
    }
    return week;
  };

  return <ul className="weeklyWeather">{constructWeek()}</ul>;
};

export default weeklyWeather;
