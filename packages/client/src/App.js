import React, { useEffect, useState } from 'react';
import logo from './logo.svg';

const App = () =>
{
    const [testData, setTestData] = useState(null);

    const callBackendAPI = async () =>
    {
        const response = await fetch('/');
        const body = await response.json();

        if(response.status !== 200)
        {
            throw Error(body.message);
        }
        return body;
    }

    useEffect(() =>
    {
        callBackendAPI()
            .then(res => setTestData({ data: res.express }))
            .catch(err => console.log(err));
    },[testData]);

    return(
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="App-title">outThere</h1>
            </header>

            <p className="App-intro">{testData}</p>

        </div>
    )
}

export default App;