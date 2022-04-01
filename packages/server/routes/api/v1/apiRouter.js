import express from 'express';
import fetchWeather from '../../../helpers/fetchWeather.js'

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
    res.status(200).send({ appTitle: process.env.APP_TITLE, appEnvironment: process.env.APP_ENV, appTimezone: process.env.APP_TIMEZONE });
});

apiRouter.post('/weather', async (req, res) => {
    if(req.body) {
        res.status(200).send(await fetchWeather(process.env.APP_WEATHER_API_KEY, req.body.lat, req.body.lon));
    } else {
        res.status(400);
    }
});

export default apiRouter;