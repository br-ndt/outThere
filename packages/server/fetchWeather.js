import fetch from 'node-fetch';

let weather = {};
let timestamp = "";
let curTime = "";

let lat = 42.526194;
let lon = -71.086227;

const checkIfFetch = () =>
{
    curTime = new Date();
    if(timestamp = "" || curTime - timestamp > 2000)
    {
        // more time than rate limit has passed
        timestamp = curTime;
        return true;
    }
    return false;
}

const fetchWeather = async (apiKey) =>
{
    if(checkIfFetch())
    {
        await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial&exclude=minutely`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then((json) =>
        {
            console.log(Object.keys(json));
            weather = json;
        })
        .catch((error) =>
        {
            console.log(`Sorry, unable to fetch because ${error}`)
        });
    }

    return weather;
}

export default fetchWeather;