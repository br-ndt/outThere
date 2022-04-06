import React from 'react';
import getDate from '../helpers/getDate';

const HourOfDay = (props) => {
  let date = getDate(props.hour.dt);
  return(
    <li>
      <p>{Math.round(props.hour.temp)}°F</p>
      <img src={`http://openweathermap.org/img/wn/${props.hour.weather[0].icon}@2x.png`} />
      <p>{props.hour.weather[0].description}</p>
      <p>{date.split(" at ")[1]}</p>
    </li>
  )
}

export default HourOfDay;