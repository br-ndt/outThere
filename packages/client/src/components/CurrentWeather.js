import React from "react";
import getDate from "../helpers/getDate";

const CurrentWeather = (props) => {
  let date = getDate(props.current.dt);
  console.log(props);
  return (
    <div className="currentWeather">
      <h3 className="weekDay-title">{date.split(",")[0]},{date.split(",")[1]}, {date.split(" at ")[1]}</h3>
      <p>high: {Math.round(props.today.temp.max)}°F</p>
      <p>low: {Math.round(props.today.temp.min)}°F</p>
      <p className="todayWeather-currentTemp">{Math.round(props.current.temp)}°F</p>
      <p>feels like: {Math.round(props.current.feels_like)}°F</p>
      <img
          src={`http://openweathermap.org/img/wn/${props.current.weather[0].icon}@2x.png`}
        />
      <p className="weekDay-desc">{props.current.weather[0].description}</p>
    </div>
  );
};

export default CurrentWeather;
