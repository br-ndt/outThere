import React from 'react';

const dayOfWeek = (props) => {
    const DATEOPTIONS = { dateStyle: 'full' };

    const getDate = () => {
        const DATE = new Date(props.data.dt * 1000);
        return new Intl.DateTimeFormat('en-US', DATEOPTIONS).format(DATE)
    }

    if(props.data) {
        let date = getDate();
        return(
            <li className="weekDay dailyWeather">
                <h4 className="weekDay-title">{date.split(',')[0]}</h4>
                <p className="weekDay-date">{date.split(',')[1]}</p>
                <p className="weekDay-highTemp">{Math.trunc(props.data.temp.max)}F</p>
                <p className="weekDay-lowTemp">{Math.trunc(props.data.temp.min)}F</p>
                <img src={`http://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`}/>
                <p className="weekDay-desc">{props.data.weather[0].description}</p>
            </li>
        );
    }
    else {
        return null;
    }
}

export default dayOfWeek;