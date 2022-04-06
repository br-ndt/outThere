import React from "react";

const WeatherButton = (props) => {
  return (
    <>
      <input type="number" max={90} min={-90} id="latitude"></input>
      <label htmlFor="latitude">
        <p>latitude</p>
      </label>
      <input type="number" max={90} min={-90} id="longitude"></input>
      <label htmlFor="longitude">
        <p>longitude</p>
      </label>
      <button
        onClick={props.onClick}
        id="weather"
        className="weather-button"
      ></button>
      <label htmlFor="weather">
        <p>WEATHER</p>
      </label>
    </>
  );
};

export default WeatherButton;
