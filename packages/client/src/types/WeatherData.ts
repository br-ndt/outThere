export interface OpenWeatherResponse {
  current: WeatherGrouping;
  daily: DailyWeather[];
  hourly: WeatherGrouping[];
  lat: string;
  lon: string;
  timezone: string;
}

export interface WeatherGrouping {
  clouds: string;
  dateTime: number;
  feelsLike: number;
  humidity: string;
  pressure: string;
  temp: number;
  uvi: string;
  visibility: string;
  weather: WeatherInstance[];
  wind_speed: string;
}

export interface CurrentWeather extends WeatherGrouping {}

export interface DailyWeather extends Omit<WeatherGrouping, "temp"> {
  temp: {
    max: number;
    min: number;
  }
}

export interface WeatherInstance {
  id: number;
  description: string;
  icon: string;
}
