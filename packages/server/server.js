import express from 'express';
import fetchWeather from './fetchWeather.js'
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = dotenv.config({
    path: path.join(__dirname, '../../.env')
}).parsed;

const api = express();
const port = env.APP_SERVER_PORT || 8000;

// parse application/x-www-form-urlencoded
api.use(express.urlencoded({ extended: true }));

// parse application/json
api.use(express.json());

api.listen(port, () => console.log(`Listening on port ${port}!`));

api.get('/api', (req, res) =>
{
    res.status(200).send({ express: 'The API says hello' });
});

api.post('/weather', async (req, res) =>
{
    console.log(req.body);
    if(req.body)
    {
        res.status(200).send(await fetchWeather(env.APP_WEATHER_API_KEY, req.body.lat, req.body.lon));
    }
    else
    {
        res.status(504);
    }
});