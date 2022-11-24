import express from "express";

import checkIfFetch from "../../helpers/checkIfFetch.js";
import areCoordinatesValid from "../../helpers/areCoordinatesValid.js";
import fetchCity from "../../fetchers/fetchCity.js";
import fetchWeather from "../../fetchers/fetchWeather.js";
import fetchCampgrounds from "../../fetchers/fetchCampgrounds.js";
import fetchParks from "../../fetchers/fetchParks.js";
import LocationSerializer from "../../serializers/LocationSerializer.js";

const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.status(200).send({
    appTitle: process.env.APP_TITLE,
    appEnvironment: process.env.NODE_ENV,
    appTimezone: process.env.APP_TIMEZONE,
  });
});

apiRouter.get("/campgrounds", async (req, res) => {
  const campgrounds = await fetchCampgrounds(process.env.NPS_API_KEY);
  res.status(200).send(campgrounds);
});

apiRouter.get("/parks", async (req, res) => {
  const parks = await fetchParks(process.env.NPS_API_KEY);
  res.status(200).send(parks);
});

apiRouter.post("/location", async (req, res) => {
  if (req.body) {
    console.log(
      `Received /weather post with body... ${req.body.lat}, ${req.body.lon}`
    );
    if (areCoordinatesValid(req.body.lat, req.body.lon) && checkIfFetch()) {
      const weather = await fetchWeather(
        process.env.OPEN_WEATHER_API_KEY,
        req.body.lat,
        req.body.lon
      );
      const cityNames = await fetchCity(
        process.env.OPEN_WEATHER_API_KEY,
        req.body.lat,
        req.body.lon
      );
      const campgrounds = await fetchCampgrounds(process.env.NPS_API_KEY);
      const parks = await fetchParks(process.env.NPS_API_KEY);
      res.status(200).send(LocationSerializer.Details(weather, cityNames[0], campgrounds.data, parks.data));
    } else {
      res.status(400);
    }
  } else {
    res.status(400);
  }
});

export default apiRouter;
