import React from "react";
import getDate from "../helpers/getDate";

const DayOfWeek = (props) => {

  if (props.data) {
    let date = getDate(props.data.dt);
    return (
      <li className="weekDay dailyWeather">
        <h4 className="weekDay-title">{date.split(",")[0]}</h4>
        <p className="weekDay-date">{date.split(",")[1]}</p>
        <p className="weekDay-highTemp">{Math.round(props.data.temp.max)}°F</p>
        <p className="weekDay-lowTemp">{Math.round(props.data.temp.min)}°F</p>
        <img
          src={`http://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`}
        />
        <p className="weekDay-desc">{props.data.weather[0].description}</p>
      </li>
    );
  } else {
    return null;
  }
};

export default DayOfWeek;
