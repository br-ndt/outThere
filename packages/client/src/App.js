import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import TodayWeather from './Containers/todayWeather.js';
import WeeklyWeather from './Containers/weeklyWeather.js';

const App = () =>
{
    const [weather, setWeather] = useState({});

    const getWeather = async (lat, lon) =>
    {
        let data = {
            lat,
            lon
        }
        console.log('calling getWeather with: ' + data.lat + ', ' + data.lon);
        console.log(JSON.stringify(data));
        await fetch(`/weather`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then((json) =>
        {
            setWeather(json);
        })
        .catch((error) =>
        {
            console.log(`Sorry, unable to fetch from API because ${error}`)
        });
    }

    // const displayTestData = () =>
    // {
    //     if(testData !== null)
    //     {
    //         return testData;
    //     }
    //     else
    //     {
    //         return { data: "no response" };
    //     }
    // }

    const weatherInfo = () =>
    {
        if(Object.keys(weather).length > 0)
        {
            return(
                <>
                    <TodayWeather
                    current={weather.current}
                    hourly={weather.hourly}/>
                    <WeeklyWeather
                    daily={weather.daily}/>
                </>
            )
        }
        else return null;
    }

    useEffect(() =>
    {
        if('geolocation' in navigator)
        {
            navigator.geolocation.getCurrentPosition((position) =>
            {
                getWeather(position.coords.latitude, position.coords.longitude);
            })
        }
    },[]);

    return(
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="App-title">outThere</h1>
            </header>
            {weatherInfo()}
        </div>
    )
}

export default App;