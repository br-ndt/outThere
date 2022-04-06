import React from 'react';
import HourOfDay from './HourOfDay';

const TodayWeather = (props) => {
  console.log(props);
  const constructDay = () => {
    const day = [];
    for (let i = 0; i < 24; ++i) {
      day.push(<HourOfDay hour={props.hourly[i]} />)
    }
    return day;
  };
  return (
    <ul className="todayWeather">{ constructDay() }</ul>
  )
}

export default TodayWeather;