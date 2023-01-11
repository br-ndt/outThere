import { OpenWeatherResponse } from "./WeatherData";

export type LocationData = {
  campgrounds: any[];
  city: CityInfo;
  parks: any[];
  weather: OpenWeatherResponse;
};

export type CityInfo = {
  name: string;
  state: string;
};

export type Attraction = {
  name: string;
  images: {
    url: string;
  }[];
  designation: string;
  activities: {
    name: string;
    id: string;
  }[];
  addresses: {
    line1: string;
    city: string;
    stateCode: string;
  }[];
  description: string;
}
