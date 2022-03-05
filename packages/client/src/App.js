import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import WeatherButton from './Containers/weatherButton.js';

const App = () =>
{
    const [testData, setTestData] = useState(null);
    const [weather, setWeather] = useState({});

    const callBackendAPI = async () =>
    {
        const response = await fetch(`/api`);
        const body = await response.json();

        if(response.status !== 200)
        {
            throw Error(body.message);
        }
        return body;
    }

    const getWeather = async (lat, lon) =>
    {
        await fetch(`/weather`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: {
                'lat': lat,
                'lon': lon
            }
        })
        .then(response => response.json())
        .then((json) =>
        {
            console.log(Object.keys(json));
            setWeather(json);
        })
        .catch((error) =>
        {
            console.log(`Sorry, unable to fetch because ${error}`)
        });
    }

    const displayTestData = () =>
    {
        if(testData !== null)
        {
            return testData;
        }
        else
        {
            return { data: "no response" };
        }
    }

    const weatherInfo = () =>
    {
        if(Object.keys(weather).length > 0)
        {
            console.log(weather);
        }
        else return
    }

    useEffect(() =>
    {
        callBackendAPI()
            .then(res => setTestData({ data: res.express }))
            .catch(err => console.log(err));
    },[]);

    return(
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="App-title">outThere</h1>
            </header>

            <p className="App-intro">{displayTestData().data}</p>
            <WeatherButton
                onClick={getWeather}
            />
            {weatherInfo()}
        </div>
    )
}

export default App;