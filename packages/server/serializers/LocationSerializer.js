import getDistanceFromCoords from "../helpers/haversineFormulae.js";

export default class LocationSerializer {
  static Details(weather, city, campgrounds, parks) {
    return {
      campgrounds: this.RangeFilterAndSort(campgrounds, city.lat, city.lon),
      city: {
        ...city,
      },
      parks: this.RangeFilterAndSort(parks, city.lat, city.lon),
      weather: {
        current: {
          dateTime: weather.current.dt,
          feelsLike: weather.current.feels_like,
          temp: weather.current.temp,
          weather: weather.current.weather,
        },
        hourly: weather.hourly.map((hour) => ({
          dateTime: hour.dt,
          feelsLike: hour.feels_like,
          temp: hour.temp,
          weather: hour.weather,
        })),
        daily: weather.daily.map((day) => ({
          dateTime: day.dt,
          temp: day.temp,
          weather: day.weather,
        })),
      },
    };
  }
  static RangeFilterAndSort(landmarks, lat, lon, distance = 30) {
    return landmarks
      .map((landmark) => ({
        ...landmark,
        distance: getDistanceFromCoords(
          lat,
          lon,
          landmark.latitude,
          landmark.longitude,
          true
        ),
      }))
      .filter((landmark) => landmark.distance <= distance)
      .sort((a, b) => a.distance - b.distance);
  }
}
