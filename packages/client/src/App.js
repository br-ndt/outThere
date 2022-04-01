import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import TodayWeather from './containers/todayWeather.js';
import WeeklyWeather from './containers/weeklyWeather.js';
import getWeather from './helpers/getWeather.js';

const App = () => {
    const [weather, setWeather] = useState({});

    useEffect(() => {
        if('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                getWeather(position.coords.latitude, position.coords.longitude, setWeather);
            })
        }
    },[]);

    const weatherInfo = () => {
        if(Object.keys(weather).length > 0) {
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
        else return <h2>'loading weather...'</h2>;
    }

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