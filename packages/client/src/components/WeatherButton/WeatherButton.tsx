import React from "react";

interface WeatherButtonProps {
  onClick: () => void;
}

export default function WeatherButton({ onClick }: WeatherButtonProps) {
  return (
    <section className="weather-button">
      <input type="number" max={90} min={-90} id="latitude"></input>
      <label htmlFor="latitude">
        <p>latitude</p>
      </label>
      <input type="number" max={90} min={-90} id="longitude"></input>
      <label htmlFor="longitude">
        <p>longitude</p>
      </label>
      <button
        onClick={onClick}
        id="weather"
        className="weather-button"
      ></button>
      <label htmlFor="weather">
        <p>WEATHER</p>
      </label>
    </section>
  );
}
