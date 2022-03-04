import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fetchWeather from './fetchWeather.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = dotenv.config({
    path: path.join(__dirname, '../../.env')
}).parsed;
const api = express();
const port = env.APP_SERVER_PORT || 8000;

api.listen(port, () => console.log(`Listening on port ${port}!`));

api.get('/', (req, res) =>
{
    res.status(200).send({ express: 'Hi I am the API' });
});

api.get('/weather', async (req, res) =>
{
    res.status(200).send(await fetchWeather(env.APP_WEATHER_API_KEY));
});